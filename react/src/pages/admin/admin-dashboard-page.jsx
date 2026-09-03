import { AdminSidebar } from '@shared/components/layout/admin-sidebar';
import useDashboard from '@features/admin/dashboard/use-dashboard';
import { TodaySummary } from '@features/admin/dashboard/components/today-summary';
import { PendingRequestsWidget } from '@features/admin/dashboard/components/pending-requests-widget';
import { MiniCalendar } from '@features/admin/dashboard/components/mini-calendar';
import { Loader } from '@shared/components/ui/loader';

export default function AdminDashboardPage() {
  const { data, loading, error } = useDashboard();

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-page-header">
          <h1 className="admin-page-title">
            Bienvenida, <em>Valentina</em>
          </h1>
          <p className="admin-page-subtitle">Resumen del día y actividad reciente</p>
        </div>

        {loading && <Loader text="Cargando dashboard..." />}

        {error && (
          <div style={{ padding: 16, color: 'var(--color-cancelled-text)', fontSize: 13 }}>
            Error: {error}
          </div>
        )}

        {data && (
          <>
            <TodaySummary data={data} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 8 }}>
              <PendingRequestsWidget pendingCount={data.solicitudesPendientes} />
              <MiniCalendar proximosDias={data.proximosDias} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
