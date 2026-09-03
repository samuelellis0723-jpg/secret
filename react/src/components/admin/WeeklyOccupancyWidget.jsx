import React from 'react';
import { Lock } from 'lucide-react';
import { useTheme } from '@context/ThemeContext';

export function WeeklyOccupancyWidget({ onBlockDescanso }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cardBg = isDark ? '#191622' : '#FFFFFF';
  const cardBorder = isDark ? '#292336' : '#EAE5DC';
  const titleColor = isDark ? '#FAF5EF' : '#0D0D0D';
  const subtitleColor = isDark ? '#8F869A' : '#A39E93';

  const dias = [
    { dia: 'LUN', porcentaje: 85, active: false },
    { dia: 'MAR', porcentaje: 70, active: false },
    { dia: 'MIÉ', porcentaje: 100, active: true },
    { dia: 'JUE', porcentaje: 95, active: false },
    { dia: 'VIE', porcentaje: 88, active: false },
    { dia: 'SÁB', porcentaje: 60, active: false },
    { dia: 'DOM', porcentaje: 0, isOff: true },
  ];

  return (
    <div className="card" style={{ padding: 24, background: cardBg, borderRadius: 16, border: `1px solid ${cardBorder}`, marginTop: 24, transition: 'all 0.2s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: subtitleColor, fontWeight: 600 }}>
            RITMO SEMANAL
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 400, marginTop: 2, color: titleColor }}>
            Ritmo Semanal
          </h3>
          <p style={{ fontSize: 12, color: isDark ? '#A39BB0' : '#6B6560', marginTop: 2 }}>
            Capacidad reservada: <strong style={{ color: isDark ? '#F4A5BE' : '#0D0D0D' }}>88%</strong> • Lunes a Viernes 7:00 AM – 8:00 PM
          </p>
        </div>

        <button
          onClick={onBlockDescanso}
          className="btn btn-secondary btn-sm"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 11,
            padding: '8px 14px',
            background: isDark ? '#231E2E' : '#F5F2EC',
            borderColor: isDark ? '#382F48' : '#EAE5DC',
            color: isDark ? '#E5DFD7' : '#0D0D0D',
          }}
        >
          <Lock size={13} /> Bloquear Descanso
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 16, alignItems: 'end', height: 180, borderBottom: `1px solid ${isDark ? '#292336' : '#EAE5DC'}`, paddingBottom: 12 }}>
        {dias.map((d) => {
          const barFillColor = d.isOff
            ? (isDark ? '#272133' : '#EAE5DC')
            : d.active
            ? (isDark ? '#A63A5C' : '#0D0D0D')
            : (isDark ? '#5E2B3E' : '#8C5238');

          return (
            <div key={d.dia} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: 44,
                  height: 120,
                  background: isDark ? '#231E2E' : '#F5F2EC',
                  borderRadius: 8,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'flex-end',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: `${d.porcentaje}%`,
                    background: barFillColor,
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 300ms ease',
                    boxShadow: d.active && isDark ? '0 0 10px rgba(166, 58, 92, 0.5)' : 'none',
                  }}
                />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: d.active ? (isDark ? '#FAF5EF' : '#0D0D0D') : (isDark ? '#8F869A' : '#6B6560') }}>
                {d.dia}
              </span>
              <span style={{ fontSize: 10, color: subtitleColor }}>
                {d.isOff ? 'Off' : `${d.porcentaje}%`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyOccupancyWidget;
