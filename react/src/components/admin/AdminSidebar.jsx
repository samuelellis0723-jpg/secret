import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  BarChart3,
  Settings,
  Scissors,
  LogOut,
  ExternalLink,
  Circle,
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard Hoy', icon: LayoutDashboard },
  { to: '/admin/reservas', label: 'Reservas & Solicitudes', icon: CalendarDays },
  { to: '/admin/calendario', label: 'Calendario', icon: CalendarDays },
  { to: '/admin/clientes', label: 'Clientes', icon: Users },
  { to: '/admin/reportes', label: 'Reportes', icon: BarChart3 },
  { to: '/admin/configuracion', label: 'Ajustes', icon: Settings },
];

const sidebarStyle = {
  width: 250,
  minHeight: '100vh',
  alignSelf: 'stretch',
  background: '#FAF8F5',
  borderRight: '1px solid #EAE5DC',
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 0',
  flexShrink: 0,
};

const logoArea = {
  padding: '0 24px 20px',
  marginBottom: 16,
};

const navListStyle = {
  listStyle: 'none',
  padding: '0 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
};

const linkBase = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px 18px',
  borderRadius: 12,
  fontSize: 13,
  fontWeight: 500,
  color: '#6B6560',
  textDecoration: 'none',
  transition: 'all 150ms ease',
};

const linkActive = {
  ...linkBase,
  background: '#0D0D0D',
  color: '#FFFFFF',
  fontWeight: 600,
};

export function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside style={sidebarStyle}>
      <div style={logoArea}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
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
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600, color: '#0D0D0D', lineHeight: 1 }}>
              SECRET
            </div>
            <div style={{ fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#A39E93', fontWeight: 600 }}>
              MANAGEMENT PRIVÉ
            </div>
          </div>
        </div>

        {/* Badge status */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#FFFFFF',
            border: '1px solid #EAE5DC',
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 10,
            fontWeight: 600,
            color: '#2D5A3F',
            letterSpacing: '0.05em',
            marginTop: 8,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2D5A3F' }} />
          ATELIER ABIERTO
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={navListStyle}>
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                style={({ isActive }) => (isActive ? linkActive : linkBase)}
              >
                <Icon size={18} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ padding: '16px 16px 0', borderTop: '1px solid #EAE5DC', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          style={{ ...linkBase, padding: '10px 14px', fontSize: 12, color: '#6B6560' }}
        >
          <ExternalLink size={15} />
          VER SITIO CLIENTE
        </a>

        <button
          onClick={handleLogout}
          style={{
            ...linkBase,
            width: '100%',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '10px 14px',
            fontSize: 12,
            color: '#9E3A3A',
          }}
        >
          <LogOut size={15} />
          Cerrar Sesión
        </button>

        <div style={{ fontSize: 10, color: '#A39E93', padding: '6px 14px 0', letterSpacing: '0.05em' }}>
          v2.0 · Secret Management Privé
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
