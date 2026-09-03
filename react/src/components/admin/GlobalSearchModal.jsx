import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, Calendar, Settings, FileText, LayoutDashboard, ChevronRight, X, Clock, ArrowRight } from 'lucide-react';
import { useTheme } from '@context/ThemeContext';
import adminService from '@services/adminService';

const ADMIN_SECTIONS = [
  { name: 'Dashboard Principal', path: '/admin/dashboard', icon: LayoutDashboard, category: 'Navegación' },
  { name: 'Gestión de Reservas', path: '/admin/reservas', icon: Calendar, category: 'Navegación' },
  { name: 'Directorio de Clientes', path: '/admin/clientes', icon: User, category: 'Navegación' },
  { name: 'Calendario y Agenda', path: '/admin/calendario', icon: Clock, category: 'Navegación' },
  { name: 'Reportes y Métricas', path: '/admin/reportes', icon: FileText, category: 'Navegación' },
  { name: 'Configuración del Atelier', path: '/admin/configuracion', icon: Settings, category: 'Navegación' },
];

export function GlobalSearchModal({ isOpen, onClose, onSelectReservation }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [query, setQuery] = useState('');
  const [clientes, setClientes] = useState([]);
  const [citas, setCitas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      loadSearchData();
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const loadSearchData = async () => {
    setLoading(true);
    try {
      const [uRes, cRes, sRes] = await Promise.all([
        adminService.getUsuarios(),
        adminService.getCitas(),
        adminService.getServicios(),
      ]);
      setClientes(uRes.filter(u => u.role === 'client'));
      setCitas(cRes);
      setServicios(sRes);
    } catch (err) {
      console.error("Error cargando datos de búsqueda", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const lowerQuery = query.trim().toLowerCase();

  const filteredSections = ADMIN_SECTIONS.filter(s =>
    s.name.toLowerCase().includes(lowerQuery)
  );

  const filteredClientes = lowerQuery
    ? clientes.filter(c =>
        (c.nombre && c.nombre.toLowerCase().includes(lowerQuery)) ||
        (c.email && c.email.toLowerCase().includes(lowerQuery)) ||
        (c.telefono && c.telefono.includes(lowerQuery))
      ).slice(0, 5)
    : [];

  const filteredCitas = lowerQuery
    ? citas.filter(c => {
        const cliente = clientes.find(u => u.id === c.clienteId);
        const servicio = servicios.find(s => s.id === c.servicioId);
        const cNombre = cliente?.nombre?.toLowerCase() || '';
        const sNombre = servicio?.nombre?.toLowerCase() || '';
        const fecha = c.fecha || '';
        const estado = c.estado || '';
        return cNombre.includes(lowerQuery) || sNombre.includes(lowerQuery) || fecha.includes(lowerQuery) || estado.includes(lowerQuery);
      }).slice(0, 5)
    : [];

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleSelectClient = (clientId) => {
    navigate(`/admin/clientes/${clientId}`);
    onClose();
  };

  const handleSelectCita = (citaId) => {
    if (onSelectReservation) {
      onSelectReservation(citaId);
    } else {
      navigate('/admin/reservas');
    }
    onClose();
  };

  const hasResults = filteredSections.length > 0 || filteredClientes.length > 0 || filteredCitas.length > 0;

  const cardBg = isDark ? '#191622' : '#FFFFFF';
  const cardBorder = isDark ? '#292336' : '#EAE5DC';
  const textPrimary = isDark ? '#FAF5EF' : '#0D0D0D';
  const textMuted = isDark ? '#8F869A' : '#8C857B';
  const hoverBg = isDark ? '#262035' : '#F9F7F2';
  const iconBoxBg = isDark ? '#231E2E' : '#F2EFE9';
  const iconColor = isDark ? '#F4A5BE' : '#6B6560';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isDark ? 'rgba(5, 4, 8, 0.75)' : 'rgba(13, 13, 13, 0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '80px',
        animation: 'fadeIn 0.15s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          background: cardBg,
          borderRadius: '16px',
          boxShadow: isDark ? '0 20px 50px rgba(0, 0, 0, 0.7)' : '0 20px 40px rgba(0, 0, 0, 0.18)',
          border: `1px solid ${cardBorder}`,
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${cardBorder}`, gap: 12 }}>
          <Search size={20} color={textMuted} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar clientes, reservas, servicios o secciones..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              fontFamily: 'var(--font-sans)',
              color: textPrimary,
              background: 'transparent',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
            >
              <X size={16} color={textMuted} />
            </button>
          )}
          <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', background: isDark ? '#231E2E' : '#F5F2EC', color: textMuted, border: `1px solid ${cardBorder}` }}>
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '12px 16px' }}>
          {loading && (
            <div style={{ padding: '24px', textAlign: 'center', color: textMuted, fontSize: '13px' }}>
              Buscando en el atelier...
            </div>
          )}

          {!loading && !query && (
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: isDark ? '#F4A5BE' : '#A39E93', fontWeight: 700, padding: '8px 12px' }}>
                Acceso Rápido a Secciones
              </div>
              {ADMIN_SECTIONS.map((sec) => {
                const IconComponent = sec.icon;
                return (
                  <div
                    key={sec.path}
                    onClick={() => handleNavigate(sec.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = hoverBg)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '8px', background: iconBoxBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconComponent size={16} color={iconColor} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{sec.name}</span>
                    </div>
                    <ArrowRight size={14} color={textMuted} />
                  </div>
                );
              })}
            </div>
          )}

          {!loading && query && !hasResults && (
            <div style={{ padding: '36px 20px', textAlign: 'center' }}>
              <Search size={32} color={isDark ? '#4D435C' : '#C4BFB5'} style={{ marginBottom: 12 }} />
              <div style={{ fontSize: '14px', fontWeight: 500, color: textPrimary }}>Sin resultados encontrados</div>
              <div style={{ fontSize: '12px', color: textMuted, marginTop: 4 }}>
                No encontramos coincidencias para "{query}"
              </div>
            </div>
          )}

          {!loading && query && hasResults && (
            <>
              {/* Clientes */}
              {filteredClientes.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: isDark ? '#F4A5BE' : '#B05B2B', fontWeight: 700, padding: '6px 12px' }}>
                    Clientes ({filteredClientes.length})
                  </div>
                  {filteredClientes.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => handleSelectClient(c.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = hoverBg)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: isDark ? '#832F46' : '#1A1817', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>
                          {c.nombre?.charAt(0) || 'C'}
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>{c.nombre}</div>
                          <div style={{ fontSize: '11px', color: textMuted }}>{c.telefono} • {c.email}</div>
                        </div>
                      </div>
                      <span className="badge badge-concierge" style={{ fontSize: '10px' }}>Cliente</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Reservas */}
              {filteredCitas.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: isDark ? '#F4A5BE' : '#B05B2B', fontWeight: 700, padding: '6px 12px' }}>
                    Reservas ({filteredCitas.length})
                  </div>
                  {filteredCitas.map((cita) => {
                    const cliente = clientes.find(u => u.id === cita.clienteId);
                    const servicio = servicios.find(s => s.id === cita.servicioId);
                    return (
                      <div
                        key={cita.id}
                        onClick={() => handleSelectCita(cita.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = hoverBg)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 32, height: 32, borderRadius: '8px', background: iconBoxBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Calendar size={16} color={iconColor} />
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: textPrimary }}>
                              {cliente?.nombre || 'Clienta'} — {servicio?.nombre || 'Servicio'}
                            </div>
                            <div style={{ fontSize: '11px', color: textMuted }}>
                              Fecha: {cita.fecha} • {cita.hora} hrs
                            </div>
                          </div>
                        </div>
                        <span className={`badge badge-${cita.estado}`} style={{ fontSize: '10px' }}>
                          {cita.estado}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Secciones */}
              {filteredSections.length > 0 && (
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: isDark ? '#F4A5BE' : '#B05B2B', fontWeight: 700, padding: '6px 12px' }}>
                    Secciones del Admin
                  </div>
                  {filteredSections.map((sec) => {
                    const IconComponent = sec.icon;
                    return (
                      <div
                        key={sec.path}
                        onClick={() => handleNavigate(sec.path)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = hoverBg)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 32, height: 32, borderRadius: '8px', background: iconBoxBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconComponent size={16} color={iconColor} />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: 500, color: textPrimary }}>{sec.name}</span>
                        </div>
                        <ChevronRight size={14} color={textMuted} />
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '10px 20px', background: isDark ? '#15121E' : '#FAF8F5', borderTop: `1px solid ${cardBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: textMuted }}>
          <span>Usa los resultados para ir directamente a clientes, reservas o configuración</span>
          <span>Secret Atelier</span>
        </div>
      </div>
    </div>
  );
}

export default GlobalSearchModal;
