import React, { useState, useEffect } from 'react';
import adminService from '@services/adminService';
import { StatusBadge } from './StatusBadge';
import { Calendar, Clock, FileText, User } from 'lucide-react';

export function ClientHistory({ cliente }) {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cliente) return;
    setLoading(true);
    adminService
      .getCitasByCliente(cliente.id)
      .then(setCitas)
      .finally(() => setLoading(false));
  }, [cliente]);

  if (!cliente) {
    return (
      <div className="detail-panel detail-panel-empty">
        <User size={48} />
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem' }}>
          Selecciona un cliente
        </p>
      </div>
    );
  }

  return (
    <div className="detail-panel">
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 4 }}>
          {cliente.nombre}
        </h3>
        <p style={{ fontSize: 12, color: 'var(--color-light-muted)' }}>{cliente.email}</p>
        <p style={{ fontSize: 12, color: 'var(--color-light-muted)' }}>{cliente.telefono}</p>
      </div>

      {cliente.notas && (
        <div style={{
          background: 'var(--color-cream)',
          border: '1px solid var(--color-linen)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <FileText size={12} color="var(--color-warm-gray)" />
            <span className="label-upper">Notas de Preferencia</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--color-muted)', fontStyle: 'italic' }}>
            {cliente.notas}
          </p>
        </div>
      )}

      <div className="detail-section">
        <div className="detail-section-title">
          <Calendar size={12} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Historial de Citas ({citas.length})
        </div>

        {loading && <p style={{ fontSize: 13, color: 'var(--color-light-muted)' }}>Cargando...</p>}

        {!loading && citas.length === 0 && (
          <p style={{ fontSize: 13, color: 'var(--color-light-muted)' }}>Sin citas registradas.</p>
        )}

        {citas.map((cita) => (
          <div
            key={cita.id}
            style={{
              padding: '10px 0',
              borderBottom: '1px solid var(--color-linen)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>
                {new Date(cita.fecha + 'T12:00:00').toLocaleDateString('es-CL', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
                {' · '}
                {cita.hora}
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-light-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={11} />
                {'#'}{String(cita.id).padStart(4, '0')}
              </div>
            </div>
            <StatusBadge estado={cita.estado} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientHistory;
