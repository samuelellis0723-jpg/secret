import React from 'react';
import { StatusBadge } from './StatusBadge';
import { User, Phone } from 'lucide-react';
import { useTheme } from '@context/ThemeContext';

export function ClientList({ clientes, selectedId, onSelect }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (clientes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-title">Sin resultados</div>
        <div className="empty-state-text">No se encontraron clientes.</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {clientes.map((cliente) => {
        const isSelected = selectedId === cliente.id;
        return (
          <div
            key={cliente.id}
            className={`table-row-card${isSelected ? ' row-selected' : ''}`}
            onClick={() => onSelect(cliente.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 20px',
              borderBottom: `1px solid ${isDark ? '#292336' : 'var(--color-linen)'}`,
              cursor: 'pointer',
              transition: 'background 150ms ease',
              background: isSelected
                ? (isDark ? '#282136' : 'var(--color-cream)')
                : (isDark ? '#191622' : 'transparent'),
              borderLeft: isSelected
                ? `3px solid ${isDark ? '#F4A5BE' : 'var(--color-charcoal)'}`
                : '3px solid transparent',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: isDark ? '#262035' : 'var(--color-linen)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <User size={16} color={isDark ? '#F4A5BE' : 'var(--color-warm-gray)'} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 2, color: isDark ? '#FAF5EF' : 'var(--color-charcoal)' }}>
                {cliente.nombre}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: isDark ? '#8F869A' : 'var(--color-light-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Phone size={11} />
                  {cliente.telefono}
                </span>
              </div>
            </div>

            {cliente.notas && (
              <StatusBadge modalidad="local" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ClientList;
