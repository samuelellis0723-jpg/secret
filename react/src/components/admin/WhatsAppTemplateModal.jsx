import React, { useState } from 'react';
import { Modal } from '@components/ui/Modal';
import { Button } from '@components/ui/Button';
import { MessageCircle, Check, Send } from 'lucide-react';

export function WhatsAppTemplateModal({ isOpen, onClose, cita, cliente, servicio }) {
  const [selectedTemplate, setSelectedTemplate] = useState('confirmacion');

  if (!cita) return null;

  const nombre = cliente?.nombre || cita?.clienteNombre || 'Clienta Atelier';
  const telefono = cliente?.telefono || cita?.clienteTelefono || '';
  const tratamiento = servicio?.nombre || 'Tratamiento de Manicura';
  const fecha = cita?.fecha || '';
  const hora = cita?.hora || '';

  const templates = {
    confirmacion: {
      titulo: 'Confirmación de Cita',
      desc: 'Enviar detalles del turno agendado',
      texto: `Hola ${nombre}, te saludamos desde Secret Manicure Atelier ✨ Confirmamos tu cita para el tratamiento "${tratamiento}" el día ${fecha} a las ${hora}. ¡Te esperamos para brindarte la mejor experiencia!`,
    },
    recordatorio: {
      titulo: 'Recordatorio Pre-Atención',
      desc: 'Recordatorio 2 horas antes de la cita',
      texto: `Hola ${nombre} ✨ Te recordamos que tu cita para "${tratamiento}" en Secret Manicure Atelier está agendada para hoy a las ${hora}. Por favor indícanos si tienes alguna duda antes de llegar.`,
    },
    seguimiento: {
      titulo: 'Seguimiento Post-Servicio',
      desc: 'Consulta de satisfacción y cuidado',
      texto: `¡Hola ${nombre}! 💅 Esperamos que hayas disfrutado tu experiencia en Secret Manicure Atelier. Recuerda mantener tus cutículas hidratadas. ¡Nos encantará verte de nuevo pronto!`,
    },
  };

  const handleSend = () => {
    const cleanPhone = telefono.replace(/\D/g, '');
    const textEncoded = encodeURIComponent(templates[selectedTemplate].texto);
    window.open(`https://wa.me/${cleanPhone}?text=${textEncoded}`, '_blank');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Concierge WhatsApp Atelier"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>Cancelar</Button>
          <Button
            variant="primary"
            size="sm"
            icon={Send}
            onClick={handleSend}
            style={{ background: '#25D366', borderColor: '#25D366' }}
          >
            Enviar por WhatsApp
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: 13, color: 'var(--color-muted)' }}>
          Selecciona una plantilla de mensaje personalizada para <strong>{nombre}</strong>:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {Object.entries(templates).map(([key, tpl]) => {
            const isSelected = selectedTemplate === key;
            return (
              <div
                key={key}
                onClick={() => setSelectedTemplate(key)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? '2px solid var(--color-charcoal)' : '1px solid var(--color-sand)',
                  background: isSelected ? 'var(--color-cream)' : 'white',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--color-charcoal)' }}>
                    {tpl.titulo}
                  </span>
                  {isSelected && <Check size={16} color="var(--color-charcoal)" />}
                </div>
                <p style={{ fontSize: 11, color: 'var(--color-warm-gray)', marginBottom: 8 }}>
                  {tpl.desc}
                </p>
                <p style={{ fontSize: 12, color: 'var(--color-muted)', fontStyle: 'italic', background: 'var(--color-ivory)', padding: 8, borderRadius: 4 }}>
                  "{tpl.texto}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

export default WhatsAppTemplateModal;
