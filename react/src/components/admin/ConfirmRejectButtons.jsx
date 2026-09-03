import React, { useState } from 'react';
import { Button } from '@components/ui/Button';
import { WhatsAppTemplateModal } from './WhatsAppTemplateModal';
import { CheckCircle, XCircle, Clock, MessageCircle } from 'lucide-react';

export function ConfirmRejectButtons({ cita, cliente, servicio, onConfirm, onReject, onComplete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!cita) return null;

  return (
    <>
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
              onClick={() => setIsModalOpen(true)}
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
              onClick={() => setIsModalOpen(true)}
              style={{ background: '#25D366', color: 'white', borderColor: '#25D366' }}
            >
              WhatsApp Concierge
            </Button>
          </>
        )}

        {cita.estado === 'completada' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 13, color: 'var(--color-completed-text)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle size={16} />
              Cita completada exitosamente
            </div>
            <Button
              variant="secondary"
              size="sm"
              icon={MessageCircle}
              onClick={() => setIsModalOpen(true)}
              style={{ background: '#25D366', color: 'white', borderColor: '#25D366' }}
            >
              Seguimiento
            </Button>
          </div>
        )}

        {cita.estado === 'cancelada' && (
          <div style={{ fontSize: 13, color: 'var(--color-cancelled-text)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <XCircle size={16} />
            Esta cita fue cancelada
          </div>
        )}
      </div>

      <WhatsAppTemplateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cita={cita}
        cliente={cliente}
        servicio={servicio}
      />
    </>
  );
}

export default ConfirmRejectButtons;
