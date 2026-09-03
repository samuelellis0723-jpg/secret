import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@components/admin/AdminSidebar';
import { ReservationFilters } from '@components/admin/ReservationFilters';
import { ReservationsList } from '@components/admin/ReservationsList';
import { ReservationDetail } from '@components/admin/ReservationDetail';
import { ConfirmRejectButtons } from '@components/admin/ConfirmRejectButtons';
import { NewReservationModal } from '@components/admin/NewReservationModal';
import { Button } from '@components/ui/Button';
import { Loader } from '@components/ui/Loader';
import { Toast } from '@components/ui/Toast';
import adminService from '@services/adminService';
import { exportToCSV } from '@services/exportService';
import { Plus, Download } from 'lucide-react';

export default function ReservationsPage() {
  const [citas, setCitas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filtroEstado, setFiltroEstado] = useState('todas');
  const [filtroModalidad, setFiltroModalidad] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [isNewResModalOpen, setIsNewResModalOpen] = useState(false);

  const [toast, setToast] = useState({ message: '', type: 'success' });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [citasRes, usuariosRes, serviciosRes] = await Promise.all([
        adminService.getCitas(),
        adminService.getUsuarios(),
        adminService.getServicios(),
      ]);
      setCitas(citasRes);
      setUsuarios(usuariosRes);
      setServicios(serviciosRes);
    } catch (err) {
      setError(err?.toString() || 'Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getClienteById = (id) => usuarios.find((u) => u.id === id);
  const getServicioById = (id) => servicios.find((s) => s.id === id);

  const citasFiltradas = citas.filter((c) => {
    if (filtroEstado !== 'todas' && c.estado !== filtroEstado) return false;
    if (filtroModalidad !== 'todas' && c.modalidad !== filtroModalidad) return false;

    if (busqueda.trim()) {
      const lower = busqueda.toLowerCase();
      const cliente = getClienteById(c.clienteId);
      const servicio = getServicioById(c.servicioId);

      const nombreMatch = cliente?.nombre?.toLowerCase().includes(lower);
      const telMatch = cliente?.telefono?.includes(lower);
      const servicioMatch = servicio?.nombre?.toLowerCase().includes(lower);

      if (!nombreMatch && !telMatch && !servicioMatch) return false;
    }

    return true;
  });

  const selectedCita = citas.find((c) => c.id === selectedId);
  const selectedCliente = selectedCita ? getClienteById(selectedCita.clienteId) : null;
  const selectedServicio = selectedCita ? getServicioById(selectedCita.servicioId) : null;

  const conteo = {
    todas: citas.length,
    pendientes: citas.filter((c) => c.estado === 'pendiente').length,
    confirmadas: citas.filter((c) => c.estado === 'confirmada').length,
    completadas: citas.filter((c) => c.estado === 'completada').length,
    canceladas: citas.filter((c) => c.estado === 'cancelada').length,
  };

  const handleUpdateEstado = async (id, nuevoEstado) => {
    try {
      await adminService.updateCitaEstado(id, nuevoEstado);
      const labels = { confirmada: 'confirmada', cancelada: 'cancelada', completada: 'marcada como completada' };
      setToast({ message: `Cita #${id} ${labels[nuevoEstado] || 'actualizada'} con éxito`, type: 'success' });
      loadData();
    } catch (err) {
      setToast({ message: 'Error al actualizar el estado: ' + err, type: 'error' });
    }
  };

  const handleExport = () => {
    const dataToExport = citasFiltradas.map((c) => {
      const cliente = getClienteById(c.clienteId);
      const servicio = getServicioById(c.servicioId);
      return {
        ID: c.id,
        Fecha: c.fecha,
        Hora: c.hora,
        Cliente: cliente?.nombre || '—',
        Telefono: cliente?.telefono || '—',
        Servicio: servicio?.nombre || '—',
        Precio: c.precioTotal || 0,
        Modalidad: c.modalidad,
        Estado: c.estado,
      };
    });

    exportToCSV(dataToExport, `reservas-secret-${new Date().toISOString().split('T')[0]}.csv`);
    setToast({ message: 'Reporte CSV descargado con éxito', type: 'success' });
  };



  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div
          className="admin-page-header"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}
        >
          <div>
            <h1 className="admin-page-title">
              Gestión de <em>Reservas</em>
            </h1>
            <p className="admin-page-subtitle">Administra citas, solicitudes y atenciones del Atelier</p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={handleExport}
            >
              Exportar CSV
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setIsNewResModalOpen(true)}
            >
              + Nueva Reserva
            </Button>
          </div>
        </div>

        <NewReservationModal
          isOpen={isNewResModalOpen}
          onClose={() => setIsNewResModalOpen(false)}
          onReservationCreated={loadData}
        />


        <ReservationFilters
          filtroEstado={filtroEstado}
          setFiltroEstado={setFiltroEstado}
          filtroModalidad={filtroModalidad}
          setFiltroModalidad={setFiltroModalidad}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          conteo={conteo}
        />

        {loading && <Loader text="Cargando reservas..." />}

        {error && (
          <div style={{ padding: 16, color: 'var(--color-cancelled-text)', fontSize: 13 }}>
            Error: {error}
          </div>
        )}

        {!loading && (
          <div className="layout-two-col" style={{ marginTop: 16 }}>
            <div className="layout-two-col-list">
              <ReservationsList
                citas={citasFiltradas}
                getClienteById={getClienteById}
                getServicioById={getServicioById}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>

            <div className="layout-two-col-detail">
              <ReservationDetail
                cita={selectedCita}
                cliente={selectedCliente}
                servicio={selectedServicio}
              />
              {selectedCita && (
                <div style={{ padding: '0 28px 28px' }}>
                  <ConfirmRejectButtons
                    cita={selectedCita}
                    cliente={selectedCliente}
                    servicio={selectedServicio}
                    onConfirm={(id) => handleUpdateEstado(id, 'confirmada')}
                    onReject={(id) => handleUpdateEstado(id, 'cancelada')}
                    onComplete={(id) => handleUpdateEstado(id, 'completada')}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'success' })}
        />

      </div>
    </div>
  );
}
