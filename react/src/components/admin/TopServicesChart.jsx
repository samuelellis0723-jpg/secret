import React from 'react';

export function TopServicesChart({ data }) {
  if (!data || data.length === 0) return null;

  const maxTotal = Math.max(...data.map((s) => s.total));

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-subtitle">Análisis</div>
          <h3 className="card-title">Servicios Más Solicitados</h3>
        </div>
      </div>

      <div className="chart-bar-container">
        {data.map((servicio) => (
          <div key={servicio.nombre} className="chart-bar-row">
            <span className="chart-bar-label">{servicio.nombre}</span>
            <div className="chart-bar-track">
              <div
                className="chart-bar-fill"
                style={{ width: `${(servicio.total / maxTotal) * 100}%` }}
              />
            </div>
            <span className="chart-bar-value">{servicio.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopServicesChart;
