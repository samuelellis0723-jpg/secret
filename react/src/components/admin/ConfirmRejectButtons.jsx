import React from 'react';
import { Button } from '@components/ui/Button';
import { CheckCircle, XCircle, Clock, MessageCircle } from 'lucide-react';

export function ConfirmRejectButtons({ cita, cliente, servicio, onConfirm, onReject, onComplete }) {
  if (!cita) return null;

  const handleWhatsApp = () => {
    const telefono = cliente?.telefono || cita?.clienteTelefono || '';
    const cleanPhone = telefono.replace(/\D/g, '');
    const nombre = cliente?.nombre || cita?.clienteNombre || 'Clienta Atelier';
    const servicioNombre = servicio?.nombre || 'Tratamiento de Manicura';
    const msg = encodeURIComponent(
      `Hola ${nombre}, te saludamos de Secret Manicure Atelier. Respecto a tu cita para "${servicioNombre}" el ${cita.fecha} a las ${cita.hora}:`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  };

  return (
    <div className="detail-actions" style={{ flexWrap: 'wrap', gap: 8 }}>
      {cita.estado === 'pendiente' && (
        <>
          <Button
            variant="success"
            size="sm"
            icon={CheckCircle}
            onClick={() => onConfirm(cita.id)}
          >
            Confirmar
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={XCircle}
            onClick={() => onReject(cita.id)}
          >
            Rechazar
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={MessageCircle}
            onClick={handleWhatsApp}
            style={{ background: '#25D366', color: 'white', borderColor: '#25D366' }}
          >
            WhatsApp
          </Button>
        </>
      )}

      {cita.estado === 'confirmada' && (
        <>
          <Button
            variant="success"
            size="sm"
            icon={CheckCircle}
            onClick={() => onComplete(cita.id)}
          >
            Marcar Completada
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={MessageCircle}
            onClick={handleWhatsApp}
            style={{ background: '#25D366', color: 'white', borderColor: '#25D366' }}
          >
            WhatsApp Clienta
          </Button>
        </>
      )}

      {cita.estado === 'completada' && (
        <div style={{ fontSize: 13, color: 'var(--color-completed-text)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <CheckCircle size={16} />
          Cita completada exitosamente
        </div>
      )}

      {cita.estado === 'cancelada' && (
        <div style={{ fontSize: 13, color: 'var(--color-cancelled-text)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <XCircle size={16} />
          Esta cita fue cancelada
        </div>
      )}
    </div>
  );
}

export default ConfirmRejectButtons;
