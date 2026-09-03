import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '@components/admin/AdminSidebar';
import { TodaySummary } from '@components/admin/TodaySummary';
import { AgendaDayView } from '@components/admin/AgendaDayView';
import { PendingRequestsWidget } from '@components/admin/PendingRequestsWidget';
import { MiniCalendar } from '@components/admin/MiniCalendar';
import { NewReservationModal } from '@components/admin/NewReservationModal';
import { Button } from '@components/ui/Button';
import { Loader } from '@components/ui/Loader';
import adminService from '@services/adminService';
import { Plus } from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNewResModalOpen, setIsNewResModalOpen] = useState(false);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminService.getDashboardData();
      setData(res);
    } catch (err) {
      setError(err?.toString() || 'Error al cargar el dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await adminService.updateCitaEstado(id, 'confirmada');
      fetchDashboard();
    } catch (err) {
      alert('Error al confirmar la cita: ' + err);
    }
  };

  const handleReject = async (id) => {
    try {
      await adminService.updateCitaEstado(id, 'cancelada');
      fetchDashboard();
    } catch (err) {
      alert('Error al rechazar la cita: ' + err);
    }
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
              Bienvenida, <em>Valentina</em>
            </h1>
            <p className="admin-page-subtitle">Resumen del día y cronograma de atención</p>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsNewResModalOpen(true)}
          >
            + Nueva Reserva
          </Button>
        </div>

        <NewReservationModal
          isOpen={isNewResModalOpen}
          onClose={() => setIsNewResModalOpen(false)}
          onReservationCreated={fetchDashboard}
        />


        {loading && <Loader text="Cargando el dashboard del Atelier..." />}

        {error && (
          <div style={{ padding: 16, color: 'var(--color-cancelled-text)', fontSize: 13 }}>
            Error: {error}
          </div>
        )}

        {!loading && data && (
          <>
            <TodaySummary data={data} />

            {/* Agenda Cronológica Diaria con WhatsApp y Acciones Rápidas */}
            <AgendaDayView
              citasHoy={data.citasHoyDetalle || []}
              onConfirm={handleConfirm}
              onReject={handleReject}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24 }}>
              <PendingRequestsWidget pendingCount={data.solicitudesPendientes} />
              <MiniCalendar proximosDias={data.proximosDias} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
