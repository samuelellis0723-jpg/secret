import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@components/ui/Button';

const DIAS_CORTOS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export function MonthView({ currentMonth, citas, bloqueos, onNextMonth, onPrevMonth, onSelectDate, onDeleteBlock }) {
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = (firstDay.getDay() + 6) % 7;
    const daysInMonth = lastDay.getDate();

    const days = [];

    const prevMonthLast = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLast - i),
        otherMonth: true,
      });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        date: new Date(year, month, d),
        otherMonth: false,
      });
    }

    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      days.push({
        date: new Date(year, month + 1, d),
        otherMonth: true,
      });
    }

    return days;
  }, [currentMonth]);

  const today = new Date().toISOString().split('T')[0];

  const getCitasForDate = (date) => {
    const fechaStr = date.toISOString().split('T')[0];
    return citas.filter((c) => c.fecha === fechaStr);
  };

  const getBloqueosForDate = (date) => {
    const fechaStr = date.toISOString().split('T')[0];
    return bloqueos.filter((b) => b.fecha === fechaStr);
  };

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: '1px solid var(--color-sand)',
      }}>
        <Button variant="ghost" size="sm" onClick={onPrevMonth}>
          <ChevronLeft size={16} />
        </Button>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem' }}>
          {MESES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <Button variant="ghost" size="sm" onClick={onNextMonth}>
          <ChevronRight size={16} />
        </Button>
      </div>

      <div className="calendar-grid">
        {DIAS_CORTOS.map((dia) => (
          <div key={dia} className="calendar-header-cell">{dia}</div>
        ))}

        {calendarDays.map((day, idx) => {
          const fechaStr = day.date.toISOString().split('T')[0];
          const citasDelDia = getCitasForDate(day.date);
          const bloqueosDelDia = getBloqueosForDate(day.date);
          const isToday = fechaStr === today;

          return (
            <div
              key={idx}
              className={`calendar-cell${day.otherMonth ? ' other-month' : ''}`}
              onClick={() => onSelectDate && onSelectDate(fechaStr)}
            >
              <div className={`calendar-cell-day${isToday ? ' today' : ''}`}>
                {day.date.getDate()}
              </div>

              {bloqueosDelDia.map((b, i) => (
                <div
                  key={`bloqueo-${b.id || i}`}
                  className="calendar-event"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`¿Liberar horario bloqueado "${b.motivo}"?`)) {
                      onDeleteBlock && onDeleteBlock(b.id);
                    }
                  }}
                  style={{
                    background: 'var(--color-cancelled-bg)',
                    color: 'var(--color-cancelled-text)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  title="Haz clic para liberar este horario"
                >
                  <span>{b.motivo}</span>
                  <span style={{ fontSize: 9, opacity: 0.7 }}>✕</span>
                </div>
              ))}


              {citasDelDia.slice(0, 3).map((cita) => (
                <div
                  key={cita.id}
                  className={`calendar-event calendar-event-${cita.estado}`}
                >
                  {cita.hora}
                </div>
              ))}

              {citasDelDia.length > 3 && (
                <div style={{ fontSize: 10, color: 'var(--color-light-muted)', paddingLeft: 6 }}>
                  +{citasDelDia.length - 3} más
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MonthView;
