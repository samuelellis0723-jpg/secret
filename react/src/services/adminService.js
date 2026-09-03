import apiClient from './apiClient';

const MOCK_DATA = {
  usuarios: [
    { id: 1, nombre: "Valentina Reyes", email: "admin@salonsecret.cl", telefono: "+56912345678", role: "admin" },
    { id: 2, nombre: "Camila Fernández", email: "camila.fernandez@gmail.com", telefono: "+56987654321", role: "client", notas: "Cliente frecuente. Prefiere tonos neutros." },
    { id: 3, nombre: "Isidora Morales", email: "isidora.m@outlook.com", telefono: "+56976543210", role: "client", notas: "Cliente VIP. Le gusta nail art elaborado." },
    { id: 4, nombre: "Florencia Soto", email: "florencia.soto@yahoo.com", telefono: "+56965432109", role: "client", notas: "Cita preferida en la mañana." },
    { id: 5, nombre: "Antonia Vargas", email: "antonia.v@gmail.com", telefono: "+56954321098", role: "client", notas: "Pide citas cada mes." },
  ],
  servicios: [
    { id: 1, nombre: "Manicura Clásica", duracion: 45, precio: 12000 },
    { id: 2, nombre: "Esmaltado Semipermanente", duracion: 60, precio: 18000 },
    { id: 3, nombre: "Uñas Acrílicas", duracion: 90, precio: 35000 },
    { id: 4, nombre: "Nail Art Premium", duracion: 120, precio: 45000 },
    { id: 5, nombre: "Spa Manicure", duracion: 75, precio: 25000 },
  ],
  citas: [
    { id: 1, clienteId: 2, servicioId: 3, fecha: new Date().toISOString().split('T')[0], hora: "10:00", estado: "confirmada", modalidad: "local", precioTotal: 35000, observaciones: "Flores minimalistas." },
    { id: 2, clienteId: 3, servicioId: 4, fecha: new Date().toISOString().split('T')[0], hora: "11:30", estado: "confirmada", modalidad: "local", precioTotal: 45000, observaciones: "Nail art japonés." },
    { id: 3, clienteId: 5, servicioId: 2, fecha: new Date().toISOString().split('T')[0], hora: "14:00", estado: "pendiente", modalidad: "domicilio", direccion: "Av. Providencia 1234", precioTotal: 18000, observaciones: "Color terracota." },
  ],
  bloqueos: [
    { id: 1, fecha: new Date().toISOString().split('T')[0], horaInicio: "12:00", horaFin: "13:00", motivo: "Almuerzo Atelier" },
  ],
};

const ENDPOINTS = {
  usuarios: '/usuarios',
  citas: '/citas',
  servicios: '/servicios',
  disponibilidad: '/disponibilidad',
  bloqueos: '/bloqueos',
};

async function safeFetch(apiCall, fallbackData) {
  try {
    return await apiCall();
  } catch (e) {
    return fallbackData;
  }
}

export const adminService = {
  async getUsuarios() {
    return safeFetch(() => apiClient.get(ENDPOINTS.usuarios), MOCK_DATA.usuarios);
  },

  async getUsuarioById(id) {
    return safeFetch(
      () => apiClient.get(`${ENDPOINTS.usuarios}/${id}`),
      MOCK_DATA.usuarios.find((u) => u.id === Number(id))
    );
  },

  async getClientes() {
    const usuarios = await this.getUsuarios();
    return usuarios.filter((u) => u.role === 'client');
  },

  async getClienteById(id) {
    const usuarios = await this.getUsuarios();
    return usuarios.find((u) => u.id === Number(id));
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
    return safeFetch(() => apiClient.get(ENDPOINTS.servicios), MOCK_DATA.servicios);
  },

  async getServicioById(id) {
    const servicios = await this.getServicios();
    return servicios.find((s) => s.id === Number(id));
  },

  async getCitas() {
    return safeFetch(() => apiClient.get(ENDPOINTS.citas), MOCK_DATA.citas);
  },

  async getCitaById(id) {
    const citas = await this.getCitas();
    return citas.find((c) => c.id === Number(id));
  },

  async getCitasByEstado(estado) {
    const citas = await this.getCitas();
    if (!estado || estado === 'todas') return citas;
    return citas.filter((c) => c.estado === estado);
  },

  async getCitasByFecha(fecha) {
    const citas = await this.getCitas();
    return citas.filter((c) => c.fecha === fecha);
  },

  async getCitasHoy() {
    const today = new Date().toISOString().split('T')[0];
    return this.getCitasByFecha(today);
  },

  async getCitasByCliente(clienteId) {
    const citas = await this.getCitas();
    return citas.filter((c) => c.clienteId === Number(clienteId));
  },

  async updateCitaEstado(id, nuevoEstado) {
    return safeFetch(
      () => apiClient.patch(`${ENDPOINTS.citas}/${id}`, { estado: nuevoEstado }),
      (() => {
        const cita = MOCK_DATA.citas.find((c) => c.id === Number(id));
        if (cita) cita.estado = nuevoEstado;
        return cita;
      })()
    );
  },

  async updateCita(id, datos) {
    return safeFetch(() => apiClient.patch(`${ENDPOINTS.citas}/${id}`, datos), datos);
  },

  async createCita(datos) {
    return safeFetch(
      () => apiClient.post(ENDPOINTS.citas, datos),
      (() => {
        const nuevaCita = { ...datos, id: Date.now() };
        MOCK_DATA.citas.push(nuevaCita);
        return nuevaCita;
      })()
    );
  },

  async deleteCita(id) {
    return safeFetch(() => apiClient.delete(`${ENDPOINTS.citas}/${id}`), true);
  },

  async getDisponibilidad() {
    return safeFetch(() => apiClient.get(ENDPOINTS.disponibilidad), []);
  },

  async updateDisponibilidad(id, datos) {
    return safeFetch(() => apiClient.patch(`${ENDPOINTS.disponibilidad}/${id}`, datos), datos);
  },

  async getBloqueos() {
    return safeFetch(() => apiClient.get(ENDPOINTS.bloqueos), MOCK_DATA.bloqueos);
  },

  async createBloqueo(datos) {
    return safeFetch(
      () => apiClient.post(ENDPOINTS.bloqueos, datos),
      (() => {
        const nuevoBloqueo = { ...datos, id: Date.now() };
        MOCK_DATA.bloqueos.push(nuevoBloqueo);
        return nuevoBloqueo;
      })()
    );
  },

  async deleteBloqueo(id) {
    return safeFetch(
      () => apiClient.delete(`${ENDPOINTS.bloqueos}/${id}`),
      (() => {
        MOCK_DATA.bloqueos = MOCK_DATA.bloqueos.filter((b) => b.id !== Number(id));
        return true;
      })()
    );
  },

  async updateClienteNotas(id, notas) {
    return safeFetch(
      () => apiClient.patch(`${ENDPOINTS.usuarios}/${id}`, { notas }),
      (() => {
        const u = MOCK_DATA.usuarios.find((x) => x.id === Number(id));
        if (u) u.notas = notas;
        return u;
      })()
    );
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
      this.getCitas(),
      this.getServicios(),
      this.getUsuarios(),
    ]);

    const today = new Date().toISOString().split('T')[0];
    const citasHoy = citas.filter((c) => c.fecha === today);
    const pendientes = citas.filter((c) => c.estado === 'pendiente');
    const confirmadasHoy = citasHoy.filter((c) => c.estado === 'confirmada');
    const completadasHoy = citasHoy.filter((c) => c.estado === 'completada');

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
      this.getCitas(),
      this.getServicios(),
    ]);

    const demandaPorDia = {};
    const serviciosCount = {};
    const franjasHorarias = {
      manana: 0,
      tarde_temprano: 0,
      tarde_pico: 0,
      noche: 0,
    };
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

      const horaNum = parseInt(cita.hora ? cita.hora.split(':')[0] : '12', 10);
      if (horaNum >= 8 && horaNum < 12) franjasHorarias.manana++;
      else if (horaNum >= 12 && horaNum < 15) franjasHorarias.tarde_temprano++;
      else if (horaNum >= 15 && horaNum < 18) franjasHorarias.tarde_pico++;
      else franjasHorarias.noche++;
    });

    const topServicios = Object.entries(serviciosCount)
      .map(([nombre, total]) => ({ nombre, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    const totalModalidad = localCount + domicilioCount;

    return {
      demandaPorDia,
      topServicios,
      franjasHorarias,
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
