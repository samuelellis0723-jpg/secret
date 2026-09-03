import { useState } from 'react';
import { AdminSidebar } from '@shared/components/layout/admin-sidebar';
import useReservations from '@features/admin/reservations/use-reservations';
import { ReservationFilters } from '@features/admin/reservations/components/reservation-filters';
import { ReservationsList } from '@features/admin/reservations/components/reservations-list';
import { ReservationDetail } from '@features/admin/reservations/components/reservation-detail';
import { ConfirmRejectButtons } from '@features/admin/reservations/components/confirm-reject-buttons';
import { Loader } from '@shared/components/ui/loader';

export default function ReservationsPage() {
  const {
    citas,
    loading,
    error,
    filtroEstado,
    setFiltroEstado,
    filtroModalidad,
    setFiltroModalidad,
    actualizarEstado,
    getClienteById,
    getServicioById,
    getConteoPorEstado,
  } = useReservations();

  const [selectedId, setSelectedId] = useState(null);

  const selectedCita = citas.find((c) => c.id === selectedId);
  const selectedCliente = selectedCita ? getClienteById(selectedCita.clienteId) : null;
  const selectedServicio = selectedCita ? getServicioById(selectedCita.servicioId) : null;
  const conteo = getConteoPorEstado();

  const handleConfirm = (id) => actualizarEstado(id, 'confirmada');
  const handleReject = (id) => actualizarEstado(id, 'cancelada');
  const handleComplete = (id) => actualizarEstado(id, 'completada');

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-page-header">
          <h1 className="admin-page-title">
            Gestión de <em>Reservas</em>
          </h1>
          <p className="admin-page-subtitle">Administra las citas y solicitudes de tus clientas</p>
        </div>

        <ReservationFilters
          filtroEstado={filtroEstado}
          setFiltroEstado={setFiltroEstado}
          filtroModalidad={filtroModalidad}
          setFiltroModalidad={setFiltroModalidad}
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
                citas={citas}
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
                    onConfirm={handleConfirm}
                    onReject={handleReject}
                    onComplete={handleComplete}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
