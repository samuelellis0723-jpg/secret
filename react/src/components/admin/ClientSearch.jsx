import React from 'react';

export function ClientSearch({ value, onChange }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <input
        type="text"
        className="input input-search"
        placeholder="Buscar por nombre, teléfono o email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default ClientSearch;
