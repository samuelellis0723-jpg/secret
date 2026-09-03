import React from 'react';

const DIAS_ORDEN = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

export function DemandChart({ data }) {
  if (!data) return null;

  const entries = DIAS_ORDEN.map((dia) => ({
    dia: dia.charAt(0).toUpperCase() + dia.slice(1),
    total: data[dia] || 0,
  }));

  const maxTotal = Math.max(...entries.map((e) => e.total), 1);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-subtitle">Tendencia</div>
          <h3 className="card-title">Demanda por Día de la Semana</h3>
        </div>
      </div>

      <div className="chart-bar-container">
        {entries.map((entry) => (
          <div key={entry.dia} className="chart-bar-row">
            <span className="chart-bar-label">{entry.dia}</span>
            <div className="chart-bar-track">
              <div
                className="chart-bar-fill"
                style={{
                  width: `${(entry.total / maxTotal) * 100}%`,
                  background: entry.total === maxTotal
                    ? 'var(--color-charcoal)'
                    : 'var(--color-champagne)',
                }}
              />
            </div>
            <span className="chart-bar-value">{entry.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DemandChart;
