import React from 'react';
import { StatusBadge } from './StatusBadge';
import { MessageCircle, Check, X, Clock } from 'lucide-react';

export function AgendaDayView({ citasHoy = [], onConfirm, onReject }) {
  const handleWhatsApp = (telefono, nombre, hora, servicio) => {
    const cleanPhone = telefono ? telefono.replace(/\D/g, '') : '';
    const text = encodeURIComponent(
      `Hola ${nombre}, te saludamos de Secret Manicure Atelier. Confirmamos tu cita para el tratamiento "${servicio}" a las ${hora}. ¡Te esperamos!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="card" style={{ marginTop: 24 }}>
      <div className="card-header border-b border-[#EAE5DC] pb-4 mb-4">
        <div>
          <div className="label-upper">Cronograma Diario</div>
          <h2 className="card-title" style={{ marginTop: 4 }}>
            Agenda Cronológica de <em>Hoy</em>
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-warm-gray)', fontSize: 13 }}>
          <Clock size={16} />
          <span>{citasHoy.length} turnos registrados</span>
        </div>
      </div>

      {citasHoy.length === 0 ? (
        <div className="empty-state">
          <Clock size={32} className="empty-state-icon" />
          <h4 className="empty-state-title">Sin citas para hoy</h4>
          <p className="empty-state-text">No hay turnos ni solicitudes agendadas para la jornada actual.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {citasHoy.map((cita) => (
            <div
              key={cita.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: 'var(--color-ivory)',
                border: '1px solid var(--color-sand)',
                borderRadius: 'var(--radius-md)',
                transition: 'border-color var(--transition-fast)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: 'var(--color-charcoal)',
                    minWidth: 60,
                  }}
                >
                  {cita.hora}
                </span>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 500, margin: 0 }}>
                    {cita.clienteNombre}
                  </h4>
                  <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>
                    {cita.servicioNombre}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <StatusBadge estado={cita.estado} />

                {cita.clienteTelefono && (
                  <button
                    onClick={() => handleWhatsApp(cita.clienteTelefono, cita.clienteNombre, cita.hora, cita.servicioNombre)}
                    className="btn btn-sm btn-secondary"
                    style={{ background: '#25D366', color: 'white', borderColor: '#25D366', gap: 6 }}
                    title="Enviar mensaje por WhatsApp"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </button>
                )}

                {cita.estado === 'pendiente' && (
                  <>
                    <button
                      onClick={() => onConfirm && onConfirm(cita.id)}
                      className="btn btn-sm btn-primary"
                      style={{ gap: 4 }}
                      title="Confirmar Cita"
                    >
                      <Check size={14} />
                      <span>Confirmar</span>
                    </button>
                    <button
                      onClick={() => onReject && onReject(cita.id)}
                      className="btn btn-sm btn-danger"
                      style={{ gap: 4 }}
                      title="Rechazar Cita"
                    >
                      <X size={14} />
                      <span>Rechazar</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AgendaDayView;
