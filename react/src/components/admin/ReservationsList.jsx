import React from 'react';
import { StatusBadge } from './StatusBadge';
import { Clock, MapPin } from 'lucide-react';

export function ReservationsList({ citas, getClienteById, getServicioById, selectedId, onSelect }) {
  if (citas.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-title">Sin resultados</div>
        <div className="empty-state-text">No se encontraron citas con los filtros seleccionados.</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {citas.map((cita) => {
        const cliente = getClienteById(cita.clienteId);
        const servicio = getServicioById(cita.servicioId);
        const isSelected = selectedId === cita.id;

        return (
          <div
            key={cita.id}
            className={`table-row-card${isSelected ? ' row-selected' : ''}`}
            onClick={() => onSelect(cita.id)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid var(--color-linen)',
              cursor: 'pointer',
              transition: 'background 150ms ease',
              background: isSelected ? 'var(--color-cream)' : 'white',
              borderLeft: isSelected ? '3px solid var(--color-charcoal)' : '3px solid transparent',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 500, fontSize: 14, color: 'var(--color-charcoal)' }}>
                  {cliente?.nombre || 'Clienta Atelier'}
                </span>
                <StatusBadge modalidad={cita.modalidad} />
              </div>

              <div style={{ fontSize: 13, color: 'var(--color-muted)', marginBottom: 4 }}>
                {servicio?.nombre || 'Tratamiento'}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--color-light-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={12} />
                  {cita.hora} · {servicio?.duracion || 0}min
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {new Date(cita.fecha + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })}
                </span>
                {cita.modalidad === 'domicilio' && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={12} />
                    Domicilio
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <StatusBadge estado={cita.estado} />
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-charcoal)' }}>
                ${(cita.precioTotal || 0).toLocaleString('es-CL')}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ReservationsList;
