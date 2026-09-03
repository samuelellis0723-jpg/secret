import React from 'react';
import { StatusBadge } from './StatusBadge';
import {
  User,
  Scissors,
  Clock,
  DollarSign,
  MapPin,
  FileText,
  MessageSquare,
  Calendar,
} from 'lucide-react';

export function ReservationDetail({ cita, cliente, servicio }) {
  if (!cita) {
    return (
      <div className="detail-panel detail-panel-empty">
        <Calendar size={48} />
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem' }}>
          Selecciona una cita para ver los detalles
        </p>
        <p style={{ fontSize: 12 }}>Haz clic en una reserva de la lista</p>
      </div>
    );
  }

  return (
    <div className="detail-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 4 }}>
            Detalle de la Cita
          </h3>
          <p style={{ fontSize: 12, color: 'var(--color-light-muted)' }}>
            {'#'}{String(cita.id).padStart(4, '0')}
          </p>
        </div>
        <StatusBadge estado={cita.estado} />
      </div>

      <div className="detail-section">
        <div className="detail-section-title">
          <User size={12} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Cliente
        </div>
        <div className="detail-row">
          <span className="detail-label">Nombre</span>
          <span className="detail-value">{cliente?.nombre || '—'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Teléfono</span>
          <span className="detail-value">{cliente?.telefono || '—'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email</span>
          <span className="detail-value" style={{ fontSize: 12 }}>{cliente?.email || '—'}</span>
        </div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">
          <Scissors size={12} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Servicio
        </div>
        <div className="detail-row">
          <span className="detail-label">Tratamiento</span>
          <span className="detail-value">{servicio?.nombre || '—'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Duración</span>
          <span className="detail-value">
            <Clock size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            {servicio?.duracion || 0} min
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Precio</span>
          <span className="detail-value" style={{ fontWeight: 600 }}>
            <DollarSign size={12} style={{ marginRight: 2, verticalAlign: 'middle' }} />
            ${(cita.precioTotal || 0).toLocaleString('es-CL')}
          </span>
        </div>
      </div>

      <div className="detail-section">
        <div className="detail-section-title">
          <MapPin size={12} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Modalidad
        </div>
        <div className="detail-row">
          <span className="detail-label">Tipo</span>
          <StatusBadge modalidad={cita.modalidad} />
        </div>
        <div className="detail-row">
          <span className="detail-label">Fecha y Hora</span>
          <span className="detail-value">
            {new Date(cita.fecha + 'T12:00:00').toLocaleDateString('es-CL', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
            {' · '}
            {cita.hora}
          </span>
        </div>
        {cita.modalidad === 'domicilio' && cita.direccion && (
          <div className="detail-row">
            <span className="detail-label">Dirección</span>
            <span className="detail-value" style={{ maxWidth: '65%' }}>
              {cita.direccion}
            </span>
          </div>
        )}
      </div>

      {cita.observaciones && (
        <div className="detail-section">
          <div className="detail-section-title">
            <MessageSquare size={12} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            Observaciones
          </div>
          <p style={{
            fontSize: 13,
            color: 'var(--color-muted)',
            lineHeight: 1.6,
            background: 'var(--color-cream)',
            padding: '12px 14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-linen)',
          }}>
            {cita.observaciones}
          </p>
        </div>
      )}

      {cliente?.notas && (
        <div className="detail-section">
          <div className="detail-section-title">
            <FileText size={12} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            Notas de Preferencia
          </div>
          <p style={{
            fontSize: 12,
            color: 'var(--color-light-muted)',
            fontStyle: 'italic',
          }}>
            {cliente.notas}
          </p>
        </div>
      )}
    </div>
  );
}

export default ReservationDetail;
