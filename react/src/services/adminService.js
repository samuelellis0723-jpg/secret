import apiClient from './apiClient';

const ENDPOINTS = {
  usuarios: '/usuarios',
  citas: '/citas',
  servicios: '/servicios',
  disponibilidad: '/disponibilidad',
  bloqueos: '/bloqueos',
};

export const adminService = {
  async getUsuarios() {
    return apiClient.get(ENDPOINTS.usuarios);
  },

  async getUsuarioById(id) {
    return apiClient.get(`${ENDPOINTS.usuarios}/${id}`);
  },

  async getClientes() {
    const usuarios = await apiClient.get(ENDPOINTS.usuarios);
    return usuarios.filter((u) => u.role === 'client');
  },

  async getClienteById(id) {
    return apiClient.get(`${ENDPOINTS.usuarios}/${id}`);
  },

  async searchClientes(query) {
    const clientes = await this.getClientes();
    if (!query) return clientes;
    const lower = query.toLowerCase();
    return clientes.filter(
      (c) =>
        c.nombre.toLowerCase().includes(lower) ||
        c.telefono.includes(lower) ||
        c.email.toLowerCase().includes(lower)
    );
  },

  async getServicios() {
    return apiClient.get(ENDPOINTS.servicios);
  },

  async getServicioById(id) {
    return apiClient.get(`${ENDPOINTS.servicios}/${id}`);
  },

  async getCitas() {
    return apiClient.get(ENDPOINTS.citas);
  },

  async getCitaById(id) {
    return apiClient.get(`${ENDPOINTS.citas}/${id}`);
  },

  async getCitasByEstado(estado) {
    const citas = await apiClient.get(ENDPOINTS.citas);
    if (!estado || estado === 'todas') return citas;
    return citas.filter((c) => c.estado === estado);
  },

  async getCitasByFecha(fecha) {
    const citas = await apiClient.get(ENDPOINTS.citas);
    return citas.filter((c) => c.fecha === fecha);
  },

  async getCitasHoy() {
    const today = new Date().toISOString().split('T')[0];
    return this.getCitasByFecha(today);
  },

  async getCitasByCliente(clienteId) {
    const citas = await apiClient.get(ENDPOINTS.citas);
    return citas.filter((c) => c.clienteId === Number(clienteId));
  },

  async updateCitaEstado(id, nuevoEstado) {
    return apiClient.patch(`${ENDPOINTS.citas}/${id}`, { estado: nuevoEstado });
  },

  async updateCita(id, datos) {
    return apiClient.patch(`${ENDPOINTS.citas}/${id}`, datos);
  },

  async createCita(datos) {
    return apiClient.post(ENDPOINTS.citas, datos);
  },

  async deleteCita(id) {
    return apiClient.delete(`${ENDPOINTS.citas}/${id}`);
  },

  async getDisponibilidad() {
    return apiClient.get(ENDPOINTS.disponibilidad);
  },

  async updateDisponibilidad(id, datos) {
    return apiClient.patch(`${ENDPOINTS.disponibilidad}/${id}`, datos);
  },

  async getBloqueos() {
    return apiClient.get(ENDPOINTS.bloqueos);
  },

  async createBloqueo(datos) {
    return apiClient.post(ENDPOINTS.bloqueos, datos);
  },

  async deleteBloqueo(id) {
    return apiClient.delete(`${ENDPOINTS.bloqueos}/${id}`);
  },

  async updateClienteNotas(id, notas) {
    return apiClient.patch(`${ENDPOINTS.usuarios}/${id}`, { notas });
  },

  async getClienteStats(clienteId) {
    const citas = await this.getCitasByCliente(clienteId);
    const completadas = citas.filter((c) => c.estado === 'completada').length;
    let tier = 'primera_visita';
    if (completadas >= 5) tier = 'vip';
    else if (completadas >= 2) tier = 'frecuente';

    return {
      totalCitas: citas.length,
      completadas,
      tier,
    };
  },


  async getDashboardData() {
    const [citas, servicios, usuarios] = await Promise.all([
      apiClient.get(ENDPOINTS.citas),
      apiClient.get(ENDPOINTS.servicios),
      apiClient.get(ENDPOINTS.usuarios),
    ]);

    const today = new Date().toISOString().split('T')[0];
    const citasHoy = citas.filter((c) => c.fecha === today);
    const pendientes = citas.filter((c) => c.estado === 'pendiente');
    const confirmadasHoy = citasHoy.filter((c) => c.estado === 'confirmada');
    const completadasHoy = citasHoy.filter((c) => c.estado === 'completada');

    // Enriquecer detalle de citas de hoy con cliente y servicio para la agenda cronológica
    const citasHoyDetalle = citasHoy
      .sort((a, b) => (a.hora > b.hora ? 1 : -1))
      .map((c) => {
        const cliente = usuarios.find((u) => u.id === c.clienteId);
        const servicio = servicios.find((s) => s.id === c.servicioId);
        return {
          ...c,
          clienteNombre: cliente ? cliente.nombre : 'Clienta Atelier',
          clienteTelefono: cliente ? cliente.telefono : '',
          servicioNombre: servicio ? servicio.nombre : 'Tratamiento de Manicura',
        };
      });

    const proximosDias = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const fechaStr = d.toISOString().split('T')[0];
      const citasDelDia = citas.filter((c) => c.fecha === fechaStr);
      proximosDias.push({
        fecha: fechaStr,
        dia: d.toLocaleDateString('es-CL', { weekday: 'short' }),
        total: citasDelDia.length,
        pendientes: citasDelDia.filter((c) => c.estado === 'pendiente').length,
        confirmadas: citasDelDia.filter((c) => c.estado === 'confirmada').length,
        completadas: citasDelDia.filter((c) => c.estado === 'completada').length,
      });
    }

    return {
      totalCitasHoy: citasHoy.length,
      confirmadasHoy: confirmadasHoy.length,
      completadasHoy: completadasHoy.length,
      solicitudesPendientes: pendientes.length,
      totalClientes: usuarios.filter((c) => c.role === 'client').length,
      totalServicios: servicios.length,
      ingresosHoy: completadasHoy.reduce((acc, c) => acc + (c.precioTotal || 0), 0),
      citasHoyDetalle,
      proximosDias,
    };
  },

  async getReportes() {
    const [citas, servicios] = await Promise.all([
      apiClient.get(ENDPOINTS.citas),
      apiClient.get(ENDPOINTS.servicios),
    ]);

    const demandaPorDia = {};
    const serviciosCount = {};
    let localCount = 0;
    let domicilioCount = 0;

    citas.forEach((cita) => {
      const dia = new Date(cita.fecha).toLocaleDateString('es-CL', { weekday: 'long' });
      demandaPorDia[dia] = (demandaPorDia[dia] || 0) + 1;

      const servicio = servicios.find((s) => s.id === cita.servicioId);
      if (servicio) {
        serviciosCount[servicio.nombre] = (serviciosCount[servicio.nombre] || 0) + 1;
      }

      if (cita.modalidad === 'local') localCount++;
      else domicilioCount++;
    });

    const topServicios = Object.entries(serviciosCount)
      .map(([nombre, total]) => ({ nombre, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    const totalModalidad = localCount + domicilioCount;

    return {
      demandaPorDia,
      topServicios,
      localVsDomicilio: {
        local: localCount,
        domicilio: domicilioCount,
        porcentajeLocal: totalModalidad ? Math.round((localCount / totalModalidad) * 100) : 0,
        porcentajeDomicilio: totalModalidad ? Math.round((domicilioCount / totalModalidad) * 100) : 0,
      },
      totalCitas: citas.length,
      citasCompletadas: citas.filter((c) => c.estado === 'completada').length,
      ingresosTotales: citas
        .filter((c) => c.estado === 'completada')
        .reduce((acc, c) => acc + (c.precioTotal || 0), 0),
    };
  },
};

export default adminService;
