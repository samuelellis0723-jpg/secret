import React from 'react';

export function PeakHoursChart({ data = {} }) {
  const franjas = [
    { key: 'manana', label: '09:00 - 12:00 (Mañana)', count: data['manana'] || 0 },
    { key: 'tarde_temprano', label: '12:00 - 15:00 (Mediodía)', count: data['tarde_temprano'] || 0 },
    { key: 'tarde_pico', label: '15:00 - 18:00 (Tarde Pico)', count: data['tarde_pico'] || 0 },
    { key: 'noche', label: '18:00 - 21:00 (Noche)', count: data['noche'] || 0 },
  ];

  const maxCount = Math.max(...franjas.map((f) => f.count), 1);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-subtitle">Optimización de Atención</div>
          <h3 className="card-title">Análisis de Horas Pico (Demanda)</h3>
        </div>
      </div>

      <div className="chart-bar-container">
        {franjas.map((franja) => (
          <div key={franja.key} className="chart-bar-row">
            <span className="chart-bar-label" style={{ minWidth: 160 }}>{franja.label}</span>
            <div className="chart-bar-track">
              <div
                className="chart-bar-fill"
                style={{
                  width: `${(franja.count / maxCount) * 100}%`,
                  background: franja.count === maxCount ? '#B05B2B' : 'var(--color-charcoal)',
                }}
              />
            </div>
            <span className="chart-bar-value">{franja.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PeakHoursChart;
