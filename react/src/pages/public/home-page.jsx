import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scissors,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Star,
  ArrowUpRight,
  Phone,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  // State para formulario rápido de disponibilidad
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    servicioId: '2',
    modalidad: 'local',
    jornada: 'Manana',
  });
  const [sent, setSent] = useState(false);

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      navigate('/reservar');
    }, 1500);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#0D0D0D] font-sans">
      {/* ── HEADER / NAVIGATION ── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(250, 248, 245, 0.92)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #EAE5DC',
          padding: '16px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#0D0D0D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Scissors size={16} color="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, tracking: '-0.02em' }}>
            SECRET <span style={{ fontWeight: 300, color: '#A39E93', fontSize: '1rem' }}>| ATELIER</span>
          </span>
        </div>

        <nav style={{ display: 'flex', gap: 28, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 500, color: '#6B6560' }}>
          <a href="#servicios" style={{ transition: 'color 150ms' }}>SERVICIOS</a>
          <a href="#modalidad">MODALIDADES</a>
          <a href="#galeria">GALERÍA</a>
          <a href="#ubicacion">UBICACIÓN & HORARIOS</a>
        </nav>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button
            onClick={() => navigate('/login')}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0D0D0D' }}
          >
            ACCESO CLIENTES
          </button>
          <button
            onClick={() => navigate('/login')}
            className="btn btn-primary btn-sm"
            style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em' }}
          >
            PANEL ADMIN
          </button>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section style={{ padding: '60px 40px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 48, alignItems: 'center' }}>
          <div>
            <span className="label-upper" style={{ display: 'block', marginBottom: 12 }}>
              MANICURA RUSA & ATENCIÓN INDIVIDUALIZADA EN SAN JOSÉ
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '3.25rem',
                lineHeight: 1.15,
                fontWeight: 400,
                color: '#0D0D0D',
                marginBottom: 20,
              }}
            >
              El arte de la manicura elevada a su <em style={{ fontStyle: 'italic', color: '#6B6560' }}>máxima</em> expresión.
            </h1>

            <p style={{ fontSize: 15, color: '#6B6560', lineHeight: 1.7, marginBottom: 32, maxWidth: 540 }}>
              Con cuidado minucioso, técnica rusa de nivel maestro y atención personalizada en nuestro atelier privado en Desamparados o con el confort supremo de una especialista en el nivel de tu hogar.
            </p>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 40 }}>
              <button
                onClick={() => navigate('/reservar')}
                className="btn btn-primary"
                style={{ padding: '14px 28px', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em' }}
              >
                SOLICITAR CITA <ArrowUpRight size={16} />
              </button>
              <a
                href="#servicios"
                className="btn btn-secondary"
                style={{ padding: '14px 24px', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em' }}
              >
                VER SERVICIOS & PRECIOS
              </a>
            </div>

            {/* Metricas */}
            <div style={{ display: 'flex', gap: 40, borderTop: '1px solid #EAE5DC', paddingTop: 24 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 500 }}>100%</div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#A39E93' }}>
                  MANICURA RUSA
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 500 }}>2.5k+</div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#A39E93' }}>
                  ATENCIONES EN SAN JOSÉ
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 500 }}>4.9★</div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#A39E93' }}>
                  VALORACIÓN DE CLIENTAS
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta Imagen Hero */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid #EAE5DC',
                boxShadow: 'var(--shadow-lg)',
                background: '#F5F2EC',
                position: 'relative',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80"
                alt="Secret Manicure Atelier"
                style={{ width: '100%', height: 440, objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 20,
                  left: 20,
                  right: 20,
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 12,
                  padding: '14px 18px',
                  border: '1px solid #EAE5DC',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Sparkles size={18} color="#9A7B38" />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#0D0D0D' }}>Glass Veil & Rubber Precision</div>
                    <div style={{ fontSize: 11, color: '#A39E93' }}>Técnica de nivelación ultraligera exclusiva de Secret</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANNER CITA CITA / QUOTE ── */}
      <section style={{ background: '#F5F2EC', borderTop: '1px solid #EAE5DC', borderBottom: '1px solid #EAE5DC', padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontStyle: 'italic', color: '#6B6560', maxWidth: 840, margin: '0 auto' }}>
          “En Secret, el lujo no se presume. Se vive en el servicio personalizado, en la calidad minuciosa de la manicura rusa y en el confort supremo de tu tiempo.”
        </p>
        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#A39E93', marginTop: 12, display: 'block' }}>
          — VALENTINA REYES · DIRECTORA ATELIER
        </span>
      </section>

      {/* ── SERVICIOS DE AUTOR ── */}
      <section id="servicios" style={{ padding: '80px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="label-upper">CATÁLOGO DE TRATAMIENTOS</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', marginTop: 6 }}>
            Nuestros Servicios de <em>Autor</em>
          </h2>
          <p style={{ fontSize: 14, color: '#6B6560', maxWidth: 600, margin: '8px auto 0' }}>
            Cada servicio incluye manicura combinada rusa de alta precisión y un ritual de nutrición en aceite de almendras dulces.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {/* Servicio 1 */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 180 }}>
              <img
                src="https://images.unsplash.com/photo-1632345031435-8727fec88f2d?auto=format&fit=crop&w=600&q=80"
                alt="Manicura Rusa"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span className="badge badge-confirmada" style={{ position: 'absolute', top: 12, right: 12 }}>
                MÁS POPULAR
              </span>
            </div>
            <div style={{ padding: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 6 }}>
                Manicura Rusa / Combinada
              </h3>
              <p style={{ fontSize: 12, color: '#6B6560', marginBottom: 16, lineHeight: 1.5 }}>
                Limpieza profunda de cutículas con torno y tijera, nivelación de placa y esmaltado de alta duración.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EFECE6', paddingTop: 14 }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>₡12,000 <span style={{ fontSize: 11, color: '#A39E93', fontWeight: 400 }}>/ Cita</span></span>
                <button onClick={() => navigate('/reservar')} className="btn btn-secondary btn-sm">RESERVAR ESTE</button>
              </div>
            </div>
          </div>

          {/* Servicio 2 */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 180 }}>
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80"
                alt="Soft Gel & Extensiones"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span className="badge badge-proxima" style={{ position: 'absolute', top: 12, right: 12 }}>
                TENDENCIA
              </span>
            </div>
            <div style={{ padding: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 6 }}>
                Soft Gel & Extensiones
              </h3>
              <p style={{ fontSize: 12, color: '#6B6560', marginBottom: 16, lineHeight: 1.5 }}>
                Extensiones de gel suave flexible con acabado natural, resistencia superior y retoque de diseño personalizado.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EFECE6', paddingTop: 14 }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>₡25,000 <span style={{ fontSize: 11, color: '#A39E93', fontWeight: 400 }}>/ Cita</span></span>
                <button onClick={() => navigate('/reservar')} className="btn btn-secondary btn-sm">RESERVAR ESTE</button>
              </div>
            </div>
          </div>

          {/* Servicio 3 */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 180 }}>
              <img
                src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80"
                alt="Kapping Gel"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 6 }}>
                Kapping Gel / Nivelación
              </h3>
              <p style={{ fontSize: 12, color: '#6B6560', marginBottom: 16, lineHeight: 1.5 }}>
                Capa de gel protector sobre la uña natural para evitar quiebres y permitir un crecimiento sano y elegante.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EFECE6', paddingTop: 14 }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>₡15,000 <span style={{ fontSize: 11, color: '#A39E93', fontWeight: 400 }}>/ Cita</span></span>
                <button onClick={() => navigate('/reservar')} className="btn btn-secondary btn-sm">RESERVAR ESTE</button>
              </div>
            </div>
          </div>

          {/* Servicio 4 */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 180 }}>
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
                alt="Spa Manicure"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 6 }}>
                Spa Clásica & Hidratación
              </h3>
              <p style={{ fontSize: 12, color: '#6B6560', marginBottom: 16, lineHeight: 1.5 }}>
                Experiencia relajante de nutrición intensa con exfoliante de sales botánicas, masaje y máscara botánica.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #EFECE6', paddingTop: 14 }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>₡14,000 <span style={{ fontSize: 11, color: '#A39E93', fontWeight: 400 }}>/ Cita</span></span>
                <button onClick={() => navigate('/reservar')} className="btn btn-secondary btn-sm">RESERVAR ESTE</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODALIDAD DUAL ── */}
      <section id="modalidad" style={{ background: '#F5F2EC', borderTop: '1px solid #EAE5DC', borderBottom: '1px solid #EAE5DC', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="label-upper">TU TIEMPO, TU ELECCIÓN</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', marginTop: 6 }}>
              Modalidad <em>Dual</em>
            </h2>
            <p style={{ fontSize: 14, color: '#6B6560', maxWidth: 540, margin: '8px auto 0' }}>
              Adaptamos nuestra atención a tu estilo de vida: elige el confort de nuestro refugio privado o el servicio Concierge a domicilio.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {/* Tarjeta Local Atelier */}
            <div className="card" style={{ padding: 32, background: 'white' }}>
              <span className="badge badge-local" style={{ marginBottom: 16 }}>ATENCIÓN EN SAN JOSÉ</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 12 }}>
                En Nuestro Atelier Privado
              </h3>
              <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.6, marginBottom: 20 }}>
                Un espacio diseñado para la desconexión total. Disfruta de té gourmet, música ambiental suave y la máxima comodidad mientras atendemos tus manos.
              </p>
              <ul style={{ listStyle: 'none', fontSize: 12, color: '#2D2D2D', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="#2D5A3F" /> Atención individualizada de una sola clienta por turno</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="#2D5A3F" /> Esterilización de instrumental bajo norma médica</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="#2D5A3F" /> Parqueo seguro y café o té de cortesía</li>
              </ul>
              <button onClick={() => navigate('/reservar')} className="btn btn-primary">AGENDAR EN LOCAL ↗</button>
            </div>

            {/* Tarjeta Domicilio Concierge */}
            <div className="card" style={{ padding: 32, background: '#0D0D0D', color: 'white', border: '1px solid #0D0D0D' }}>
              <span className="badge badge-domicilio" style={{ marginBottom: 16 }}>SERVICIO PREMIUM EN TU HOGAR</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'white', marginBottom: 12 }}>
                Servicio Concierge a Domicilio
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 20 }}>
                Llevamos todo el equipo estéril, lámparas LED UV y materiales de primera calidad hasta tu residencia u oficina en San José.
              </p>
              <ul style={{ listStyle: 'none', fontSize: 12, color: 'rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="#D4C9B5" /> Cobertura en Escazú, Santa Ana, San José Centro y Desamparados</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="#D4C9B5" /> Equipamiento portátil completo de alta precisión</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="#D4C9B5" /> Máxima puntualidad y discreción</li>
              </ul>
              <button onClick={() => navigate('/reservar')} className="btn btn-secondary" style={{ background: 'white', color: '#0D0D0D' }}>AGENDAR A DOMICILIO ↗</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PASOS Y FORMULARIO RÁPIDO ── */}
      <section style={{ padding: '80px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <span className="label-upper">PROCESO TRANSPARENTE</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', marginTop: 6, marginBottom: 24 }}>
              Agenda en <em>3 Simples Pasos</em>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F5F2EC', border: '1px solid #EAE5DC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 13 }}>1</div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: 14 }}>Elige tu Servicio & Estilo</h4>
                  <p style={{ fontSize: 13, color: '#6B6560', marginTop: 2 }}>Selecciona Manicura Rusa, Soft Gel o Kapping Gel según las necesidades de tus uñas.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F5F2EC', border: '1px solid #EAE5DC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 13 }}>2</div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: 14 }}>Selecciona Fecha & Modalidad</h4>
                  <p style={{ fontSize: 13, color: '#6B6560', marginTop: 2 }}>Verifica la disponibilidad en nuestro Atelier o solicita atención a domicilio.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F5F2EC', border: '1px solid #EAE5DC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 13 }}>3</div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: 14 }}>Confirmación Inmediata</h4>
                  <p style={{ fontSize: 13, color: '#6B6560', marginTop: 2 }}>Recibe tu aviso por WhatsApp con todos los detalles de tu cita agendada.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario Rápido */}
          <div className="card" style={{ padding: 32, background: 'white' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 6 }}>
              Solicitud Rápida de Disponibilidad
            </h3>
            <p style={{ fontSize: 12, color: '#6B6560', marginBottom: 20 }}>
              Completa tus datos y selecciona tu consulta de disponibilidad:
            </p>

            {sent ? (
              <div style={{ padding: 24, textAlign: 'center', background: '#EDF7F2', borderRadius: 8, color: '#15803D' }}>
                <CheckCircle2 size={32} style={{ margin: '0 auto 8px' }} />
                <h4 style={{ fontWeight: 600 }}>¡Solicitud enviada con éxito!</h4>
                <p style={{ fontSize: 12, marginTop: 4 }}>Redirigiendo a la pantalla de reservas...</p>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="input-group">
                  <label className="input-label">Nombre Completo</label>
                  <input
                    type="text"
                    className="input"
                    required
                    placeholder="Ej: María José Solano"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Teléfono WhatsApp</label>
                  <input
                    type="tel"
                    className="input"
                    required
                    placeholder="+506 8888 8888"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Servicio Preferido</label>
                  <select
                    className="select"
                    value={formData.servicioId}
                    onChange={(e) => setFormData({ ...formData, servicioId: e.target.value })}
                  >
                    <option value="1">Manicura Rusa (₡12,000)</option>
                    <option value="2">Esmaltado Semipermanente (₡18,000)</option>
                    <option value="3">Uñas Acrílicas (₡35,000)</option>
                    <option value="4">Soft Gel & Extensiones (₡25,000)</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 10, padding: 12 }}>
                  SOLICITAR DISPONIBILIDAD AHORA
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ARCHIVO VISUAL ── */}
      <section id="galeria" style={{ background: '#F5F2EC', borderTop: '1px solid #EAE5DC', borderBottom: '1px solid #EAE5DC', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="label-upper">GALERÍA DE TRABAJOS</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', marginTop: 6 }}>
              El Archivo Visual de <em>Secret</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            <img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=500&q=80" alt="Work 1" style={{ borderRadius: 12, height: 260, width: '100%', objectFit: 'cover' }} />
            <img src="https://images.unsplash.com/photo-1632345031435-8727fec88f2d?auto=format&fit=crop&w=500&q=80" alt="Work 2" style={{ borderRadius: 12, height: 260, width: '100%', objectFit: 'cover' }} />
            <img src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=500&q=80" alt="Work 3" style={{ borderRadius: 12, height: 260, width: '100%', objectFit: 'cover' }} />
            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80" alt="Work 4" style={{ borderRadius: 12, height: 260, width: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* ── UBICACIÓN & HORARIOS ── */}
      <section id="ubicacion" style={{ padding: '80px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <span className="label-upper">VISÍTANOS EN SAN JOSÉ</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', marginTop: 6, marginBottom: 20 }}>
              Ubicación & <em>Horarios</em>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 13, color: '#6B6560' }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <MapPin size={18} color="#0D0D0D" />
                <div>
                  <strong>Dirección Atelier Privado:</strong>
                  <div>Desamparados Centro, San José, Costa Rica. (Dirección exacta brindada tras confirmar la cita).</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <Clock size={18} color="#0D0D0D" />
                <div>
                  <strong>Horario de Atención:</strong>
                  <div>Lunes a Viernes: 09:00 AM - 18:00 PM</div>
                  <div>Sábados: 10:00 AM - 15:00 PM (Domingos Cerrado)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 24, textAlign: 'center', background: '#F5F2EC' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 8 }}>
              Secret Manicure Atelier
            </h4>
            <p style={{ fontSize: 12, color: '#6B6560', marginBottom: 16 }}>
              Atención presencial en San José y Concierge a domicilio.
            </p>
            <button onClick={() => navigate('/reservar')} className="btn btn-primary" style={{ width: '100%' }}>
              AGENDAR MI CITA AHORA
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0D0D0D', color: 'white', padding: '40px 40px 24px', borderTop: '1px solid #2D2D2D' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 400 }}>Secret Atelier</span>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
              © 2026 Secret Manicure Atelier · San José, Costa Rica. Todos los derechos reservados.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 20, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)' }}>
            <a href="#servicios">Servicios</a>
            <a href="#modalidad">Modalidad Dual</a>
            <a href="#galeria">Galería</a>
            <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#D4C9B5', cursor: 'pointer', textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.15em' }}>
              Acceso Admin
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
