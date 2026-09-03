import React from 'react';
import { Lock } from 'lucide-react';

export function WeeklyOccupancyWidget({ onBlockDescanso }) {
  const dias = [
    { dia: 'LUN', porcentaje: 85, color: '#B05B2B' },
    { dia: 'MAR', porcentaje: 70, color: '#B05B2B' },
    { dia: 'MIÉ', porcentaje: 90, color: '#0D0D0D', active: true },
    { dia: 'JUE', porcentaje: 95, color: '#B05B2B' },
    { dia: 'VIE', porcentaje: 100, color: '#B05B2B' },
    { dia: 'SÁB', porcentaje: 60, color: '#B05B2B' },
    { dia: 'DOM', porcentaje: 0, color: '#EAE5DC', isOff: true },
  ];

  return (
    <div className="card" style={{ padding: 24, background: '#FFFFFF', borderRadius: 16, border: '1px solid #EAE5DC', marginTop: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#A39E93', fontWeight: 600 }}>
            RITMO SEMANAL
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 400, marginTop: 2 }}>
            Ocupación Atelier
          </h3>
          <p style={{ fontSize: 12, color: '#6B6560', marginTop: 2 }}>
            Lunes a Viernes • 7:00 AM – 8:00 PM
          </p>
        </div>

        <button
          onClick={onBlockDescanso}
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, padding: '8px 14px', background: '#F5F2EC' }}
        >
          <Lock size={13} /> Bloquear Descanso
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 16, alignItems: 'end', height: 180, borderBottom: '1px solid #EAE5DC', paddingBottom: 12 }}>
        {dias.map((d) => (
          <div key={d.dia} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', maxWidth: 44, height: 120, background: '#F5F2EC', borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative' }}>
              <div
                style={{
                  width: '100%',
                  height: `${d.porcentaje}%`,
                  background: d.active ? '#0D0D0D' : d.isOff ? '#EAE5DC' : '#8C5238',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 300ms ease',
                }}
              />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: d.active ? '#0D0D0D' : '#6B6560' }}>{d.dia}</span>
            <span style={{ fontSize: 10, color: '#A39E93' }}>{d.isOff ? 'Off' : `${d.porcentaje}%`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyOccupancyWidget;
