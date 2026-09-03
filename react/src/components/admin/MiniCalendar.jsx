import React from 'react';

export function MiniCalendar({ proximosDias }) {
  if (!proximosDias || proximosDias.length === 0) return null;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-subtitle">Vista Rápida</div>
          <h3 className="card-title">Próximos 7 Días</h3>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {proximosDias.map((dia) => (
          <div
            key={dia.fecha}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              borderRadius: 6,
              fontSize: 13,
              background: dia.total > 0 ? 'var(--color-cream)' : 'transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  fontWeight: 500,
                  color: 'var(--color-charcoal)',
                  minWidth: 32,
                  textTransform: 'capitalize',
                }}
              >
                {dia.dia}
              </span>
              <span style={{ fontSize: 12, color: 'var(--color-light-muted)' }}>
                {new Date(dia.fecha + 'T12:00:00').toLocaleDateString('es-CL', {
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {dia.pendientes > 0 && (
                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--color-pending-text)',
                    background: 'var(--color-pending-bg)',
                    padding: '2px 8px',
                    borderRadius: 999,
                  }}
                >
                  {dia.pendientes} pend.
                </span>
              )}
              <span
                style={{
                  fontWeight: 600,
                  color: dia.total > 0 ? 'var(--color-charcoal)' : 'var(--color-light-muted)',
                  minWidth: 20,
                  textAlign: 'right',
                }}
              >
                {dia.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MiniCalendar;
