import React, { useMemo, Fragment } from 'react';

const HORAS = [];
for (let h = 8; h <= 20; h++) {
  HORAS.push(`${String(h).padStart(2, '0')}:00`);
  if (h < 20) HORAS.push(`${String(h).padStart(2, '0')}:30`);
}

export function WeekView({ currentMonth, citas, bloqueos }) {
  const weekDays = useMemo(() => {
    const start = new Date(currentMonth);
    const dayOfWeek = start.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    start.setDate(start.getDate() + mondayOffset);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [currentMonth]);

  const getCitaAtHour = (fechaStr, hora) => {
    return citas.find((c) => c.fecha === fechaStr && c.hora === hora);
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ minWidth: 700 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60px repeat(7, 1fr)',
          gap: '1px',
          background: 'var(--color-sand)',
          border: '1px solid var(--color-sand)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}>
          <div style={{ background: 'var(--color-cream)', padding: '8px' }} />
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              style={{
                background: 'var(--color-cream)',
                padding: '8px 4px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-warm-gray)' }}>
                {day.toLocaleDateString('es-CL', { weekday: 'short' })}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>
                {day.getDate()}
              </div>
            </div>
          ))}

          {HORAS.map((hora) => (
            <Fragment key={hora}>
              <div style={{
                background: 'white',
                padding: '4px 8px',
                fontSize: 11,
                color: 'var(--color-light-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid var(--color-linen)',
              }}>
                {hora}
              </div>
              {weekDays.map((day) => {
                const fechaStr = day.toISOString().split('T')[0];
                const cita = getCitaAtHour(fechaStr, hora);
                const isBlocked = bloqueos.some(
                  (b) => b.fecha === fechaStr && hora >= b.horaInicio && hora < b.horaFin
                );

                return (
                  <div
                    key={`${fechaStr}-${hora}`}
                    style={{
                      background: isBlocked ? 'var(--color-cancelled-bg)' : 'white',
                      padding: 4,
                      borderBottom: '1px solid var(--color-linen)',
                      minHeight: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cita && (
                      <div
                        style={{
                          width: '100%',
                          padding: '3px 6px',
                          borderRadius: 4,
                          fontSize: 10,
                          fontWeight: 500,
                          textAlign: 'center',
                          background: cita.estado === 'confirmada'
                            ? 'var(--color-confirmed-bg)'
                            : cita.estado === 'pendiente'
                            ? 'var(--color-pending-bg)'
                            : 'var(--color-completed-bg)',
                          color: cita.estado === 'confirmada'
                            ? 'var(--color-confirmed-text)'
                            : cita.estado === 'pendiente'
                            ? 'var(--color-pending-text)'
                            : 'var(--color-completed-text)',
                        }}
                      >
                        {cita.hora}
                      </div>
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeekView;
