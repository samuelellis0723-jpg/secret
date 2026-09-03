import React from 'react';

export function StatusBadge({ estado, modalidad }) {
  if (modalidad) {
    const isLocal = modalidad === 'local';
    return (
      <span className={`badge ${isLocal ? 'badge-local' : 'badge-domicilio'}`}>
        {isLocal ? 'Local Atelier' : 'A Domicilio'}
      </span>
    );
  }

  const badgeClasses = {
    completada: 'badge-completada',
    pendiente: 'badge-pendiente',
    en_curso: 'badge-pendiente',
    proxima: 'badge-proxima',
    concierge: 'badge-concierge',
    cancelada: 'badge-cancelada',
  };

  const labels = {
    completada: 'Completada',
    pendiente: 'Pendiente',
    en_curso: 'En Curso',
    proxima: 'Próxima',
    concierge: 'Concierge',
    cancelada: 'Cancelada',
  };

  return (
    <span className={`badge ${badgeClasses[estado] || 'badge-pendiente'}`}>
      {labels[estado] || estado}
    </span>
  );
}

export default StatusBadge;
