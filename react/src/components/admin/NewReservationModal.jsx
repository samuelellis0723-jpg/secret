import React, { useState, useEffect } from 'react';
import { Modal } from '@components/ui/Modal';
import { Button } from '@components/ui/Button';
import adminService from '@services/adminService';

export function NewReservationModal({ isOpen, onClose, onReservationCreated }) {
  const [usuarios, setUsuarios] = useState([]);
  const [servicios, setServicios] = useState([]);

  const [clienteId, setClienteId] = useState('');
  const [servicioId, setServicioId] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [hora, setHora] = useState('11:00');
  const [modalidad, setModalidad] = useState('local');
  const [direccion, setDireccion] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    Promise.all([adminService.getUsuarios(), adminService.getServicios()]).then(
      ([uRes, sRes]) => {
        const clientesOnly = uRes.filter((u) => u.role === 'client');
        setUsuarios(clientesOnly);
        if (clientesOnly.length > 0) setClienteId(String(clientesOnly[0].id));
        setServicios(sRes);
        if (sRes.length > 0) setServicioId(String(sRes[0].id));
      }
    );
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!clienteId || !servicioId || !fecha || !hora) return;

    try {
      setSubmitting(true);
      const servicioSel = servicios.find((s) => String(s.id) === String(servicioId));
      const precioTotal = servicioSel ? servicioSel.precio : 0;

      const nuevaCita = {
        clienteId: Number(clienteId),
        servicioId: Number(servicioId),
        fecha,
        hora,
        modalidad,
        direccion: modalidad === 'domicilio' ? direccion : '',
        estado: 'confirmada',
        precioTotal,
        observaciones: observaciones ? `[Agendado por Admin] ${observaciones}` : '[Agendado por Admin]',
      };

      await adminService.createCita(nuevaCita);
      onReservationCreated && onReservationCreated();
      onClose();
      // Reset form
      setObservaciones('');
      setDireccion('');
    } catch (err) {
      alert('Error al agendar reserva: ' + err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Agendar Nueva Reserva (Atelier)"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" size="sm" disabled={submitting} onClick={handleSubmit}>
            {submitting ? 'Agendando...' : 'Confirmar Reserva'}
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="input-group">
          <label className="input-label">Clienta</label>
          <select
            className="select"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          >
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre} ({u.telefono})
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Tratamiento / Servicio</label>
          <select
            className="select"
            value={servicioId}
            onChange={(e) => setServicioId(e.target.value)}
          >
            {servicios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre} - ${s.precio.toLocaleString('es-CL')} ({s.duracion} min)
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="input-group">
            <label className="input-label">Fecha</label>
            <input
              type="date"
              className="input"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Hora</label>
            <input
              type="time"
              className="input"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Modalidad</label>
          <select
            className="select"
            value={modalidad}
            onChange={(e) => setModalidad(e.target.value)}
          >
            <option value="local">Local Atelier</option>
            <option value="domicilio">A Domicilio</option>
          </select>
        </div>

        {modalidad === 'domicilio' && (
          <div className="input-group">
            <label className="input-label">Dirección de Atención</label>
            <input
              type="text"
              className="input"
              placeholder="Calle, número, depto o comuna..."
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
        )}

        <div className="input-group">
          <label className="input-label">Observaciones Internas</label>
          <textarea
            className="input"
            rows={2}
            placeholder="Preferencias de esmaltado, notas especiales..."
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}

export default NewReservationModal;
