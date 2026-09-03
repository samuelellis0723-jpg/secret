import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={18} color="#2D5A3F" />,
    error: <AlertCircle size={18} color="#9E3A3A" />,
    info: <Info size={18} color="#9A7B38" />,
  };

  const bgStyles = {
    success: 'bg-[#EBF5EE] border-[#D1E7D7] text-[#2D5A3F]',
    error: 'bg-[#FDF2F2] border-[#F7CACA] text-[#9E3A3A]',
    info: 'bg-[#FDF8EC] border-[#EEDC9A] text-[#9A7B38]',
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 18px',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--color-sand)',
        background: 'white',
        color: 'var(--color-charcoal)',
        animation: 'slideUp 250ms ease',
        maxWidth: 380,
      }}
    >
      {icons[type]}
      <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default Toast;
