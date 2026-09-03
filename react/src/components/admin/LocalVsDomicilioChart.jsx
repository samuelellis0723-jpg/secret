import React from 'react';

export function LocalVsDomicilioChart({ data }) {
  if (!data) return null;

  const { local, domicilio, porcentajeLocal, porcentajeDomicilio } = data;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-subtitle">Distribución</div>
          <h3 className="card-title">Local vs Domicilio</h3>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        <div
          className="donut-chart"
          style={{
            background: `conic-gradient(
              var(--color-charcoal) 0% ${porcentajeLocal}%,
              var(--color-champagne) ${porcentajeLocal}% 100%
            )`,
          }}
        >
          <div className="donut-chart-center">
            <div className="donut-chart-value">{porcentajeLocal}%</div>
            <div className="donut-chart-label">Local</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--color-charcoal)' }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>En Local Atelier</div>
              <div style={{ fontSize: 12, color: 'var(--color-light-muted)' }}>
                {local} citas · {porcentajeLocal}%
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--color-champagne)' }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>A Domicilio</div>
              <div style={{ fontSize: 12, color: 'var(--color-light-muted)' }}>
                {domicilio} citas · {porcentajeDomicilio}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocalVsDomicilioChart;
