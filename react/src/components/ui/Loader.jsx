import React from 'react';

export function Loader({ text }) {
  return (
    <div className="loader-container">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div className="loader" />
        {text && <span style={{ fontSize: 12, color: 'var(--color-warm-gray)' }}>{text}</span>}
      </div>
    </div>
  );
}

export default Loader;
