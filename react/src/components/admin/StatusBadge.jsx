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
    vip: 'badge-local',
    frecuente: 'badge-proxima',
    primera_visita: 'badge-completada',
  };

  const labels = {
    completada: 'Completada',
    pendiente: 'Pendiente',
    en_curso: 'En Curso',
    proxima: 'Próxima',
    concierge: 'Concierge',
    cancelada: 'Cancelada',
    vip: '👑 VIP Atelier',
    frecuente: '⭐ Frecuente',
    primera_visita: '🌱 Primera Visita',
  };


  return (
    <span className={`badge ${badgeClasses[estado] || 'badge-pendiente'}`}>
      {labels[estado] || estado}
    </span>
  );
}

export default StatusBadge;
