import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { StatusBadge } from '@components/admin/StatusBadge';
import adminService from '@services/adminService';
import { Scissors, Calendar, Clock, MapPin, Sparkles, MessageCircle, LogOut, Plus, Home } from 'lucide-react';

export default function ClientDashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [citas, setCitas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      adminService.getCitasByCliente(user.id || 2),
      adminService.getServicios(),
    ])
      .then(([citasRes, servRes]) => {
        setCitas(citasRes);
        setServicios(servRes);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const getServicioById = (id) => servicios.find((s) => s.id === id);

  const proximaCita = citas.find((c) => c.estado === 'confirmada' || c.estado === 'pendiente');
  const citasPasadas = citas.filter((c) => c.estado === 'completada' || c.estado === 'cancelada');

  const completadasCount = citas.filter((c) => c.estado === 'completada').length;
  let vipTier = '🌱 Primera Visita';
  if (completadasCount >= 5) vipTier = '👑 VIP Atelier';
  else if (completadasCount >= 2) vipTier = '⭐ Frecuente';

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh', color: '#0D0D0D' }}>
      {/* Top Header */}
      <header style={{ padding: '20px 40px', borderBottom: '1px solid #EAE5DC', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scissors size={16} color="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>SECRET ATELIER</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/')} className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
            <Home size={14} /> Inicio
          </button>
          <button onClick={logout} className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#9E3A3A' }}>
            <LogOut size={14} /> Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: 880, margin: '40px auto', padding: '0 20px' }}>
        {/* Welcome Card */}
        <div className="card" style={{ padding: 32, background: '#FFFFFF', borderRadius: 16, border: '1px solid #EAE5DC', marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span className="label-upper">PORTAL DE CLIENTAS</span>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', marginTop: 4 }}>
                Bienvenida, <em>{user?.nombre || 'Camila'}</em>
              </h1>
              <p style={{ fontSize: 13, color: '#6B6560', marginTop: 4 }}>
                Revisa el estado de tus citas y gestiona tu experiencia en Secret Atelier.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              <span className="badge badge-concierge" style={{ fontSize: 12, padding: '6px 14px' }}>
                {vipTier}
              </span>
              <span style={{ fontSize: 11, color: '#A39E93' }}>{completadasCount} atenciones realizadas</span>
            </div>
          </div>
        </div>

        {/* Proxima Cita */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 14 }}>
            Tu Próxima Cita
          </h3>

          {proximaCita ? (
            <div className="card" style={{ padding: 28, background: '#FFFFFF', borderRadius: 16, border: '2px solid #0D0D0D' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <StatusBadge estado={proximaCita.estado} />
                  <span className="badge badge-local" style={{ textTransform: 'uppercase', fontSize: 10 }}>
                    {proximaCita.modalidad === 'domicilio' ? 'Concierge A Domicilio' : 'Atelier Desamparados'}
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>
                  ₡{(proximaCita.precioTotal || 18000).toLocaleString('es-CR')}
                </span>
              </div>

              <h4 style={{ fontSize: 16, fontWeight: 600, color: '#0D0D0D', marginBottom: 4 }}>
                {getServicioById(proximaCita.servicioId)?.nombre || 'Tratamiento de Manicura'}
              </h4>

              <div style={{ fontSize: 13, color: '#6B6560', display: 'flex', gap: 20, marginBottom: 16 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={14} color="#A39E93" /> {proximaCita.fecha}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={14} color="#A39E93" /> {proximaCita.hora} hrs</span>
                {proximaCita.direccion && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} color="#A39E93" /> {proximaCita.direccion}</span>
                )}
              </div>

              <div style={{ borderTop: '1px solid #EAE5DC', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#6B6560' }}>¿Deseas modificar o consultar detalles?</span>
                <a
                  href={`https://wa.me/50688888888?text=${encodeURIComponent(`Hola Secret Atelier ✨ Consultar sobre mi cita #${proximaCita.id}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <MessageCircle size={14} color="#25D366" /> Contactar Concierge por WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="card" style={{ padding: 32, background: '#FFFFFF', borderRadius: 16, border: '1px solid #EAE5DC', textAlign: 'center' }}>
              <Sparkles size={28} color="#9A7B38" style={{ margin: '0 auto 10px' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 6 }}>No tienes citas programadas</h4>
              <p style={{ fontSize: 13, color: '#6B6560', marginBottom: 20 }}>Regálate un momento de cuidado artesanal para tus uñas.</p>
              <button onClick={() => navigate('/reservar')} className="btn btn-primary">
                SOLICITAR NUEVA RESERVA ↗
              </button>
            </div>
          )}
        </div>

        {/* Historial de Citas */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>
              Historial de Atenciones
            </h3>

            <button onClick={() => navigate('/reservar')} className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Plus size={14} /> Nueva Cita
            </button>
          </div>

          <div className="card" style={{ padding: 0, background: '#FFFFFF', borderRadius: 16, border: '1px solid #EAE5DC', overflow: 'hidden' }}>
            {citasPasadas.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#FAF8F5', borderBottom: '1px solid #EAE5DC', color: '#A39E93', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    <th style={{ padding: '14px 20px' }}>Fecha</th>
                    <th style={{ padding: '14px 20px' }}>Tratamiento</th>
                    <th style={{ padding: '14px 20px' }}>Modalidad</th>
                    <th style={{ padding: '14px 20px' }}>Precio</th>
                    <th style={{ padding: '14px 20px' }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {citasPasadas.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #F5F2EC' }}>
                      <td style={{ padding: '16px 20px', fontWeight: 600 }}>{c.fecha}</td>
                      <td style={{ padding: '16px 20px' }}>{getServicioById(c.servicioId)?.nombre || 'Manicura Rusa'}</td>
                      <td style={{ padding: '16px 20px', textTransform: 'capitalize' }}>{c.modalidad}</td>
                      <td style={{ padding: '16px 20px', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>₡{(c.precioTotal || 18000).toLocaleString('es-CR')}</td>
                      <td style={{ padding: '16px 20px' }}><StatusBadge estado={c.estado} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: 24, textAlign: 'center', color: '#A39E93', fontSize: 13 }}>
                Aún no registras atenciones completadas en el Atelier.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
