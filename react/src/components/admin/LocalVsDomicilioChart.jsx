import React from 'react';
import { useTheme } from '@context/ThemeContext';

export function LocalVsDomicilioChart({ data }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!data) return null;

  const { local, domicilio, porcentajeLocal, porcentajeDomicilio } = data;

  const colorLocal = isDark ? '#832F46' : 'var(--color-charcoal)';
  const colorDomicilio = isDark ? '#382F48' : 'var(--color-champagne)';
  const centerBg = isDark ? '#191622' : '#FFFFFF';
  const textColor = isDark ? '#FAF5EF' : 'var(--color-charcoal)';
  const labelColor = isDark ? '#8F869A' : 'var(--color-warm-gray)';

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-subtitle" style={{ color: labelColor }}>Distribución</div>
          <h3 className="card-title" style={{ color: textColor }}>Local vs Domicilio</h3>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        <div
          className="donut-chart"
          style={{
            background: `conic-gradient(
              ${colorLocal} 0% ${porcentajeLocal}%,
              ${colorDomicilio} ${porcentajeLocal}% 100%
            )`,
          }}
        >
          <div className="donut-chart-center" style={{ background: centerBg }}>
            <div className="donut-chart-value" style={{ color: textColor }}>{porcentajeLocal}%</div>
            <div className="donut-chart-label" style={{ color: labelColor }}>Local</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: colorLocal }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: textColor }}>En Local Atelier</div>
              <div style={{ fontSize: 12, color: labelColor }}>
                {local} citas · {porcentajeLocal}%
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: colorDomicilio }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: textColor }}>A Domicilio</div>
              <div style={{ fontSize: 12, color: labelColor }}>
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
