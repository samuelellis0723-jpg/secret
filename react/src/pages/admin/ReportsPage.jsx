import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@components/admin/AdminSidebar';
import { AdminHeader } from '@components/admin/AdminHeader';
import { TopServicesChart } from '@components/admin/TopServicesChart';
import { LocalVsDomicilioChart } from '@components/admin/LocalVsDomicilioChart';
import { DemandChart } from '@components/admin/DemandChart';
import { PeakHoursChart } from '@components/admin/PeakHoursChart';
import { Button } from '@components/ui/Button';
import { Loader } from '@components/ui/Loader';
import adminService from '@services/adminService';
import { exportToCSV, printPage } from '@services/exportService';
import { Download, Printer } from 'lucide-react';

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

  const handleExportCSV = () => {
    if (!data) return;
    const summaryData = [
      { Métrica: 'Total Citas Registradas', Valor: data.totalCitas },
      { Métrica: 'Citas Completadas', Valor: data.citasCompletadas },
      { Métrica: 'Ingresos Totales (CLP)', Valor: data.ingresosTotales },
      { Métrica: 'Citas en Local Atelier', Valor: data.localVsDomicilio.local },
      { Métrica: 'Citas A Domicilio', Valor: data.localVsDomicilio.domicilio },
    ];
    exportToCSV(summaryData, `reporte-ejecutivo-secret-${new Date().toISOString().split('T')[0]}.csv`);
  };


  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <AdminHeader sectionTitle="REPORTES Y MÉTRICAS" />
        <div
          className="admin-page-header"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}
        >
          <div>
            <h1 className="admin-page-title">
              <em>Reportes</em> Rápidos
            </h1>
            <p className="admin-page-subtitle">Métricas acumuladas y análisis de demanda</p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              variant="secondary"
              size="sm"
              icon={Printer}
              onClick={printPage}
            >
              Imprimir Cierre
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Download}
              onClick={handleExportCSV}
            >
              Exportar CSV
            </Button>
          </div>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <TopServicesChart data={data.topServicios} />
              <PeakHoursChart data={data.franjasHorarias} />
            </div>
          </>
        )}
      </div>

    </div>
  );
}
