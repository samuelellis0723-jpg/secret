import React, { useState, useEffect } from 'react';
import adminService from '@services/adminService';
import { StatusBadge } from './StatusBadge';
import { Button } from '@components/ui/Button';
import { Calendar, Clock, FileText, User, Edit2, Check } from 'lucide-react';

export function ClientHistory({ cliente, onUpdateCliente }) {
  const [citas, setCitas] = useState([]);
  const [stats, setStats] = useState({ totalCitas: 0, completadas: 0, tier: 'primera_visita' });
  const [loading, setLoading] = useState(false);
  const [isEditingNotas, setIsEditingNotas] = useState(false);
  const [notasText, setNotasText] = useState('');
  const [savingNotas, setSavingNotas] = useState(false);

  useEffect(() => {
    if (!cliente) return;
    setLoading(true);
    setNotasText(cliente.notas || '');

    Promise.all([
      adminService.getCitasByCliente(cliente.id),
      adminService.getClienteStats(cliente.id),
    ])
      .then(([citasRes, statsRes]) => {
        setCitas(citasRes);
        setStats(statsRes);
      })
      .finally(() => setLoading(false));
  }, [cliente]);

  const handleSaveNotas = async () => {
    try {
      setSavingNotas(true);
      await adminService.updateClienteNotas(cliente.id, notasText);
      setIsEditingNotas(false);
      if (onUpdateCliente) onUpdateCliente();
    } catch (err) {
      alert('Error al guardar notas: ' + err);
    } finally {
      setSavingNotas(false);
    }
  };


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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 4 }}>
            {cliente.nombre}
          </h3>
          <p style={{ fontSize: 12, color: 'var(--color-light-muted)' }}>{cliente.email}</p>
          <p style={{ fontSize: 12, color: 'var(--color-light-muted)' }}>{cliente.telefono}</p>
        </div>
        <StatusBadge estado={stats.tier} />
      </div>

      <div style={{
        background: 'var(--color-cream)',
        border: '1px solid var(--color-linen)',
        borderRadius: 'var(--radius-md)',
        padding: '14px 16px',
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <FileText size={13} color="var(--color-warm-gray)" />
            <span className="label-upper">Notas de Preferencia</span>
          </div>
          {!isEditingNotas ? (
            <button
              onClick={() => setIsEditingNotas(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-muted)' }}
            >
              <Edit2 size={12} /> Editar
            </button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              icon={Check}
              disabled={savingNotas}
              onClick={handleSaveNotas}
            >
              Guardar
            </Button>
          )}
        </div>

        {!isEditingNotas ? (
          <p style={{ fontSize: 13, color: cliente.notas ? 'var(--color-muted)' : 'var(--color-light-muted)', fontStyle: cliente.notas ? 'italic' : 'normal' }}>
            {cliente.notas || 'Sin notas registradas para esta clienta. Haz clic en Editar para agregar preferencias.'}
          </p>
        ) : (
          <textarea
            className="input"
            rows={3}
            value={notasText}
            onChange={(e) => setNotasText(e.target.value)}
            placeholder="Escribe alergias, tonos favoritos, preferencias..."
            style={{ fontSize: 13 }}
          />
        )}
      </div>


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
