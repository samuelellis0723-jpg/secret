import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@components/admin/AdminSidebar';
import { TopServicesChart } from '@components/admin/TopServicesChart';
import { LocalVsDomicilioChart } from '@components/admin/LocalVsDomicilioChart';
import { DemandChart } from '@components/admin/DemandChart';
import { Loader } from '@components/ui/Loader';
import adminService from '@services/adminService';

export default function ReportsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    adminService
      .getReportes()
      .then(setData)
      .catch((err) => setError(err?.toString() || 'Error al obtener reportes'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-page-header">
          <h1 className="admin-page-title">
            <em>Reportes</em> Rápidos
          </h1>
          <p className="admin-page-subtitle">Métricas y análisis de demanda</p>
        </div>

        {loading && <Loader text="Generando reportes del Atelier..." />}

        {error && (
          <div style={{ padding: 16, color: 'var(--color-cancelled-text)', fontSize: 13 }}>
            Error: {error}
          </div>
        )}

        {data && (
          <>
            <div className="summary-grid" style={{ marginBottom: 24 }}>
              <div className="summary-card">
                <div className="summary-card-label">Total Citas</div>
                <div className="summary-card-value">{data.totalCitas}</div>
                <div className="summary-card-detail">registradas</div>
              </div>
              <div className="summary-card">
                <div className="summary-card-label">Completadas</div>
                <div className="summary-card-value">{data.citasCompletadas}</div>
                <div className="summary-card-detail">finalizadas</div>
              </div>
              <div className="summary-card">
                <div className="summary-card-label">Ingresos Totales</div>
                <div className="summary-card-value">
                  ${(data.ingresosTotales || 0).toLocaleString('es-CL')}
                </div>
                <div className="summary-card-detail">acumulados</div>
              </div>
              <div className="summary-card">
                <div className="summary-card-label">Ticket Promedio</div>
                <div className="summary-card-value">
                  {data.citasCompletadas > 0
                    ? '$' + Math.round(data.ingresosTotales / data.citasCompletadas).toLocaleString('es-CL')
                    : '$0'}
                </div>
                <div className="summary-card-detail">por cita</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <DemandChart data={data.demandaPorDia} />
              <LocalVsDomicilioChart data={data.localVsDomicilio} />
            </div>

            <TopServicesChart data={data.topServicios} />
          </>
        )}
      </div>
    </div>
  );
}
