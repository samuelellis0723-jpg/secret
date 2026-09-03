import React from 'react';

export function ReservationFilters({
  filtroEstado,
  setFiltroEstado,
  filtroModalidad,
  setFiltroModalidad,
  conteo,
}) {
  const estadoOptions = [
    { value: 'todas', label: `Todas (${conteo?.todas || 0})` },
    { value: 'pendiente', label: `Pendientes (${conteo?.pendientes || 0})` },
    { value: 'confirmada', label: `Confirmadas (${conteo?.confirmadas || 0})` },
    { value: 'completada', label: `Completadas (${conteo?.completadas || 0})` },
    { value: 'cancelada', label: `Canceladas (${conteo?.canceladas || 0})` },
  ];

  const modalidadOptions = [
    { value: 'todas', label: 'Todas las modalidades' },
    { value: 'local', label: 'Local Atelier' },
    { value: 'domicilio', label: 'A Domicilio' },
  ];

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      <div className="input-group" style={{ minWidth: 200 }}>
        <label className="input-label">Estado</label>
        <select
          className="select"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          {estadoOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group" style={{ minWidth: 180 }}>
        <label className="input-label">Modalidad</label>
        <select
          className="select"
          value={filtroModalidad}
          onChange={(e) => setFiltroModalidad(e.target.value)}
        >
          {modalidadOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ReservationFilters;
