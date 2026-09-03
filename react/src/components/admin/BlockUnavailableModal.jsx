import React, { useState, useEffect } from 'react';
import { Modal } from '@components/ui/Modal';
import { Button } from '@components/ui/Button';

export function BlockUnavailableModal({ isOpen, onClose, onBlock, selectedDate }) {
  const [fecha, setFecha] = useState(selectedDate || '');
  const [horaInicio, setHoraInicio] = useState('12:00');
  const [horaFin, setHoraFin] = useState('14:00');
  const [motivo, setMotivo] = useState('');

  useEffect(() => {
    if (selectedDate) setFecha(selectedDate);
  }, [selectedDate]);

  const handleSubmit = () => {
    if (!fecha || !horaInicio || !horaFin || !motivo) return;
    onBlock({ fecha, horaInicio, horaFin, motivo });
    onClose();
    setFecha('');
    setHoraInicio('12:00');
    setHoraFin('14:00');
    setMotivo('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bloquear Horario"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>Bloquear</Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="input-group">
          <label className="input-label">Fecha</label>
          <input
            type="date"
            className="input"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="input-group">
            <label className="input-label">Hora Inicio</label>
            <input
              type="time"
              className="input"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Hora Fin</label>
            <input
              type="time"
              className="input"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
            />
          </div>
        </div>
        <div className="input-group">
          <label className="input-label">Motivo</label>
          <input
            type="text"
            className="input"
            placeholder="Ej: Almuerzo, mantenimiento, día libre..."
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}

export default BlockUnavailableModal;
