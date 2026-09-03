import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '@services/adminService';
import {
  Scissors,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  Home,
} from 'lucide-react';

export default function RequestAppointmentPage() {
  const navigate = useNavigate();
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [step, setStep] = useState(1);
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [modalidad, setModalidad] = useState('local');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [hora, setHora] = useState('10:00');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const [createdCita, setCreatedCita] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    adminService
      .getServicios()
      .then((res) => {
        setServicios(res);
        if (res.length > 0) setSelectedServicio(res[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  const horasDisponibles = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !telefono || !selectedServicio) return;

    try {
      setSubmitting(true);
      const nuevaCita = {
        clienteId: 2, // Default o asignado
        servicioId: selectedServicio.id,
        fecha,
        hora,
        modalidad,
        direccion: modalidad === 'domicilio' ? direccion : '',
        estado: 'pendiente',
        precioTotal: selectedServicio.precio,
        observaciones: `[Reserva Web] ${nombre} (${telefono}) - ${observaciones}`,
      };

      const res = await adminService.createCita(nuevaCita);
      setCreatedCita({ ...nuevaCita, id: res?.id || Date.now() });
      setStep(4);
    } catch (err) {
      alert('Error al procesar reserva: ' + err);
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsAppConfirmation = () => {
    if (!createdCita || !selectedServicio) return;
    const msg = `Hola Secret Atelier ✨ Quisiera confirmar mi solicitud de cita:
• Clienta: ${nombre}
• Servicio: ${selectedServicio.nombre} (₡${selectedServicio.precio.toLocaleString('es-CR')})
• Fecha & Hora: ${fecha} a las ${hora}
• Modalidad: ${modalidad === 'domicilio' ? 'A Domicilio (' + direccion + ')' : 'Atelier Privado Desamparados'}`;

    window.open(`https://wa.me/50688888888?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh', color: '#0D0D0D' }}>
      {/* Header */}
      <header style={{ padding: '20px 40px', borderBottom: '1px solid #EAE5DC', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scissors size={16} color="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>SECRET ATELIER</span>
        </div>

        <button onClick={() => navigate('/')} className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
          <Home size={14} /> Volver al Inicio
        </button>
      </header>

      {/* Main Container */}
      <div style={{ maxWidth: 760, margin: '40px auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span className="label-upper">SISTEMA PRIVÉ DE AGENDAMIENTO</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginTop: 4 }}>
            Solicita tu <em>Cita de Autor</em>
          </h1>
        </div>

        {/* Wizard Steps indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 36, position: 'relative' }}>
          {['1. Servicio', '2. Modalidad', '3. Horario & Datos', '4. Confirmación'].map((label, i) => (
            <div key={label} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: step >= i + 1 ? '#0D0D0D' : '#EAE5DC',
                  color: step >= i + 1 ? '#FFFFFF' : '#6B6560',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: 12,
                  margin: '0 auto 6px',
                }}
              >
                {i + 1}
              </div>
              <span style={{ fontSize: 11, fontWeight: step === i + 1 ? 600 : 400, color: step === i + 1 ? '#0D0D0D' : '#A39E93' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* STEP 1: Seleccionar Servicio */}
        {step === 1 && (
          <div className="card" style={{ padding: 32, background: '#FFFFFF', borderRadius: 16, border: '1px solid #EAE5DC' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 6 }}>
              Selecciona tu Tratamiento
            </h3>
            <p style={{ fontSize: 13, color: '#6B6560', marginBottom: 24 }}>
              Cada servicio incluye manicura combinada rusa de alta precisión y nutrición de cutículas.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
              {servicios.map((s) => {
                const isSelected = selectedServicio?.id === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedServicio(s)}
                    style={{
                      padding: 20,
                      borderRadius: 12,
                      border: isSelected ? '2px solid #0D0D0D' : '1px solid #EAE5DC',
                      background: isSelected ? '#FDF8F3' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 150ms ease',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15, color: '#0D0D0D' }}>{s.nombre}</div>
                      <div style={{ fontSize: 12, color: '#6B6560', marginTop: 2 }}>{s.descripcion || `${s.duracion} minutos de atención individualizada`}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>
                        ₡{s.precio.toLocaleString('es-CR')}
                      </div>
                      <div style={{ fontSize: 11, color: '#A39E93' }}>{s.duracion} min</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn btn-primary"
              style={{ width: '100%', padding: 14, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}
            >
              CONTINUAR CON LA MODALIDAD <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Seleccionar Modalidad */}
        {step === 2 && (
          <div className="card" style={{ padding: 32, background: '#FFFFFF', borderRadius: 16, border: '1px solid #EAE5DC' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 6 }}>
              Selecciona la Modalidad
            </h3>
            <p style={{ fontSize: 13, color: '#6B6560', marginBottom: 24 }}>
              ¿Dónde deseas recibir la experiencia Secret Atelier?
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
              {/* Local */}
              <div
                onClick={() => setModalidad('local')}
                style={{
                  padding: 24,
                  borderRadius: 14,
                  border: modalidad === 'local' ? '2px solid #0D0D0D' : '1px solid #EAE5DC',
                  background: modalidad === 'local' ? '#FDF8F3' : '#FAF8F5',
                  cursor: 'pointer',
                }}
              >
                <span className="badge badge-local" style={{ marginBottom: 12 }}>EN SALÓN</span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 6 }}>Atelier Privado</h4>
                <p style={{ fontSize: 12, color: '#6B6560', lineHeight: 1.5 }}>
                  Atención en Desamparados Centro. Parqueo privado y té gourmet de bienvenida.
                </p>
              </div>

              {/* Domicilio */}
              <div
                onClick={() => setModalidad('domicilio')}
                style={{
                  padding: 24,
                  borderRadius: 14,
                  border: modalidad === 'domicilio' ? '2px solid #0D0D0D' : '1px solid #EAE5DC',
                  background: modalidad === 'domicilio' ? '#0D0D0D' : '#1A1A1A',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                <span className="badge badge-concierge" style={{ marginBottom: 12 }}>CONCIERGE</span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'white', marginBottom: 6 }}>A Domicilio</h4>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                  Llevamos el equipo estéril y materiales hasta tu hogar u oficina en San José.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(1)} className="btn btn-secondary" style={{ flex: 1 }}>
                <ArrowLeft size={16} /> Volver
              </button>
              <button onClick={() => setStep(3)} className="btn btn-primary" style={{ flex: 2 }}>
                CONTINUAR A FECHA & HORA <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Fecha, Hora y Contacto */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="card" style={{ padding: 32, background: '#FFFFFF', borderRadius: 16, border: '1px solid #EAE5DC' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 6 }}>
              Fecha, Hora y Datos de Contacto
            </h3>
            <p style={{ fontSize: 13, color: '#6B6560', marginBottom: 20 }}>
              Ingresa tus datos para registrar la solicitud en la agenda del Atelier.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div className="input-group">
                <label className="input-label">Fecha Preferida</label>
                <input
                  type="date"
                  className="input"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Hora Preferida</label>
                <select className="select" value={hora} onChange={(e) => setHora(e.target.value)}>
                  {horasDisponibles.map((h) => (
                    <option key={h} value={h}>{h} hrs</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: 16 }}>
              <label className="input-label">Nombre Completo</label>
              <input
                type="text"
                className="input"
                required
                placeholder="Ej: Camila Fernández"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="input-group" style={{ marginBottom: 16 }}>
              <label className="input-label">Teléfono WhatsApp</label>
              <input
                type="tel"
                className="input"
                required
                placeholder="+506 8888 8888"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            {modalidad === 'domicilio' && (
              <div className="input-group" style={{ marginBottom: 16 }}>
                <label className="input-label">Dirección Exacta de Atención</label>
                <input
                  type="text"
                  className="input"
                  required
                  placeholder="Calle, condominio, torre o cantón en San José..."
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
              </div>
            )}

            <div className="input-group" style={{ marginBottom: 24 }}>
              <label className="input-label">Observaciones Específicas</label>
              <textarea
                className="input"
                rows={2}
                placeholder="Preferencia de color, tipo de uñas o notas especiales..."
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="button" onClick={() => setStep(2)} className="btn btn-secondary" style={{ flex: 1 }}>
                <ArrowLeft size={16} /> Volver
              </button>
              <button type="submit" disabled={submitting} className="btn btn-primary" style={{ flex: 2 }}>
                {submitting ? 'Procesando...' : 'CONFIRMAR Y AGENDAR ↗'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Confirmación Inmediata */}
        {step === 4 && (
          <div className="card" style={{ padding: 40, background: '#FFFFFF', borderRadius: 16, border: '1px solid #EAE5DC', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#EDF7F2', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={32} />
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: 8 }}>
              ¡Solicitud de Cita Recibida!
            </h2>
            <p style={{ fontSize: 14, color: '#6B6560', maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.6 }}>
              Tu cita ha sido ingresada correctamente en el sistema de <strong>Secret Atelier</strong>.
            </p>

            <div style={{ background: '#FAF8F5', borderRadius: 12, padding: 20, textAlign: 'left', marginBottom: 28, border: '1px solid #EAE5DC' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0D0D0D', marginBottom: 6 }}>Resumen de Cita #{createdCita?.id}:</div>
              <div style={{ fontSize: 12, color: '#6B6560', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div>• <strong>Tratamiento:</strong> {selectedServicio?.nombre} (₡{selectedServicio?.precio.toLocaleString('es-CR')})</div>
                <div>• <strong>Fecha & Hora:</strong> {fecha} a las {hora} hrs</div>
                <div>• <strong>Modalidad:</strong> {modalidad === 'domicilio' ? `Concierge A Domicilio (${direccion})` : 'Atelier Privado Desamparados'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => navigate('/')} className="btn btn-secondary" style={{ flex: 1 }}>
                Ir al Inicio
              </button>
              <button onClick={openWhatsAppConfirmation} className="btn btn-primary" style={{ flex: 2, background: '#25D366', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                <MessageCircle size={18} /> CONFIRMAR POR WHATSAPP ↗
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
