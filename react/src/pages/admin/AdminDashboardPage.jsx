import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '@components/admin/AdminSidebar';
import { TodaySummary } from '@components/admin/TodaySummary';
import { AgendaDayView } from '@components/admin/AgendaDayView';
import { PendingRequestsWidget } from '@components/admin/PendingRequestsWidget';
import { WeeklyOccupancyWidget } from '@components/admin/WeeklyOccupancyWidget';
import { NewReservationModal } from '@components/admin/NewReservationModal';
import { BlockUnavailableModal } from '@components/admin/BlockUnavailableModal';
import { Loader } from '@components/ui/Loader';
import { Toast } from '@components/ui/Toast';
import adminService from '@services/adminService';
import { exportToCSV } from '@services/exportService';
import { AdminHeader } from '@components/admin/AdminHeader';
import { Repeat } from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isNewResModalOpen, setIsNewResModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [salonActive, setSalonActive] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

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
      setToast({ message: 'Solicitud confirmada con éxito', type: 'success' });
      fetchDashboard();
    } catch (err) {
      setToast({ message: 'Error al confirmar: ' + err, type: 'error' });
    }
  };

  const handleReject = async (id) => {
    try {
      await adminService.updateCitaEstado(id, 'cancelada');
      setToast({ message: 'Solicitud rechazada', type: 'info' });
      fetchDashboard();
    } catch (err) {
      setToast({ message: 'Error al rechazar: ' + err, type: 'error' });
    }
  };

  const handleFinish = async (id) => {
    try {
      await adminService.updateCitaEstado(id, 'completada');
      setToast({ message: 'Servicio finalizado con éxito', type: 'success' });
      fetchDashboard();
    } catch (err) {
      setToast({ message: 'Error al finalizar servicio: ' + err, type: 'error' });
    }
  };

  const handleBlockPersonal = async (datos) => {
    try {
      await adminService.createBloqueo(datos);
      setToast({ message: 'Turno bloqueado con éxito', type: 'success' });
      setIsBlockModalOpen(false);
    } catch (err) {
      setToast({ message: 'Error al bloquear turno: ' + err, type: 'error' });
    }
  };

  const handleExportDaily = () => {
    if (!data) return;
    exportToCSV(data.citasHoyDetalle, `cierre-agenda-${new Date().toISOString().split('T')[0]}.csv`);
    setToast({ message: 'Resumen del día exportado a CSV', type: 'success' });
  };

  return (
    <div className="admin-layout" style={{ background: '#FAF8F5' }}>
      <AdminSidebar />
      <div className="admin-content" style={{ padding: '24px 40px 60px' }}>
        {/* TOP BAR / BREADCRUMB */}
        <AdminHeader sectionTitle="ADMINISTRACIÓN" onRefreshData={fetchDashboard} />

        {/* HEADER PRINCIPAL DE BIENVENIDA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#B05B2B', fontWeight: 700, marginBottom: 4 }}>
              SAN JOSÉ, COSTA RICA • DESAMPARADOS ATELIER
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h1 className="admin-page-title" style={{ fontSize: '2.5rem', margin: 0 }}>
                Buenos días, <em>Atelierista</em>
              </h1>
              <span className="badge badge-concierge" style={{ fontSize: 11, padding: '4px 12px' }}>
                Miércoles, 24 de Octubre
              </span>
            </div>
            <p className="admin-page-subtitle" style={{ marginTop: 4 }}>
              Panel de gestión exclusivo para Secret Nail Atelier. Todo preparado para la sesión de cuidado artesanal de hoy.
            </p>
          </div>

          <button
            onClick={() => setSalonActive(!salonActive)}
            className="btn btn-secondary"
            style={{
              borderRadius: 24,
              padding: '8px 18px',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: salonActive ? '#FFFFFF' : '#F5F2EC',
              border: '1px solid #EAE5DC',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: salonActive ? '#2D5A3F' : '#9E3A3A' }} />
            {salonActive ? 'ACTIVO • ATENDIENDO EN SALÓN' : 'DESCONECTADO'}
            <Repeat size={13} color="#6B6560" />
          </button>
        </div>

        {loading && <Loader text="Cargando el Atelier Privé..." />}

        {error && (
          <div style={{ padding: 16, color: 'var(--color-cancelled-text)', fontSize: 13, marginBottom: 20 }}>
            Error: {error}
          </div>
        )}

        {data && (
          <>
            {/* SUMARIO KPI */}
            <TodaySummary data={data} />

            {/* GRID PRINCIPAL 2 COLUMNAS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24, alignItems: 'start' }}>
              <AgendaDayView
                citasHoy={data.citasHoyDetalle}
                onConfirm={handleConfirm}
                onReject={handleReject}
                onFinish={handleFinish}
              />
              <PendingRequestsWidget
                solicitudes={data.solicitudesPendientesDetalle}
                onConfirm={handleConfirm}
                onReject={handleReject}
                onAddManual={() => setIsNewResModalOpen(true)}
                onBlockPersonal={() => setIsBlockModalOpen(true)}
                onExportDaily={handleExportDaily}
              />
            </div>

            {/* RITMO SEMANAL OCUPACIÓN */}
            <WeeklyOccupancyWidget onBlockDescanso={() => setIsBlockModalOpen(true)} />
          </>
        )}

        {/* MODALES Y TOAST */}
        <NewReservationModal
          isOpen={isNewResModalOpen}
          onClose={() => setIsNewResModalOpen(false)}
          onReservationCreated={fetchDashboard}
        />

        <BlockUnavailableModal
          isOpen={isBlockModalOpen}
          onClose={() => setIsBlockModalOpen(false)}
          onBlock={handleBlockPersonal}
        />

        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'success' })}
        />
      </div>
    </div>
  );
}
