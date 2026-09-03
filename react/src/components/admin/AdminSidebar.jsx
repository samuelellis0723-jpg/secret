import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  BarChart3,
  Settings,
  Scissors,
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/reservas', label: 'Reservas', icon: CalendarDays },
  { to: '/admin/clientes', label: 'Clientes', icon: Users },
  { to: '/admin/calendario', label: 'Calendario', icon: CalendarDays },
  { to: '/admin/reportes', label: 'Reportes', icon: BarChart3 },
  { to: '/admin/configuracion', label: 'Ajustes', icon: Settings },
];

const sidebarStyle = {
  width: 220,
  minHeight: 'calc(100vh - 60px)',
  background: '#0D0D0D',
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 0',
  flexShrink: 0,
};

const logoArea = {
  padding: '0 24px 28px',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  marginBottom: 16,
};

const logoText = {
  fontFamily: 'var(--font-serif)',
  fontSize: '1.25rem',
  color: 'white',
  fontWeight: 400,
  letterSpacing: '-0.01em',
};

const logoSubtext = {
  fontSize: 9,
  textTransform: 'uppercase',
  letterSpacing: '0.25em',
  color: 'rgba(255,255,255,0.35)',
  marginTop: 4,
  fontWeight: 500,
};

const navListStyle = {
  listStyle: 'none',
  padding: '0 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const linkBase = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '10px 14px',
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 400,
  color: 'rgba(255,255,255,0.5)',
  textDecoration: 'none',
  transition: 'all 150ms ease',
  letterSpacing: '0.01em',
};

const linkActive = {
  ...linkBase,
  background: 'rgba(255,255,255,0.08)',
  color: 'white',
  fontWeight: 500,
};

export function AdminSidebar() {
  return (
    <aside style={sidebarStyle}>
      <div style={logoArea}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Scissors size={18} color="white" style={{ opacity: 0.7 }} />
          <span style={logoText}>Secret</span>
        </div>
        <div style={logoSubtext}>Panel de Administración</div>
      </div>

      <nav>
        <ul style={navListStyle}>
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                style={({ isActive }) => (isActive ? linkActive : linkBase)}
              >
                <Icon size={17} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ marginTop: 'auto', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
          v1.0 · Secret Nails
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
