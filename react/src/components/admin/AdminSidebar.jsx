import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  BarChart3,
  Settings,
  Scissors,
  LogOut,
  ExternalLink,
  Sun,
  Moon,
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard Hoy', icon: LayoutDashboard },
  { to: '/admin/reservas', label: 'Reservas & Solicitudes', icon: CalendarDays },
  { to: '/admin/calendario', label: 'Calendario', icon: CalendarDays },
  { to: '/admin/clientes', label: 'Clientes', icon: Users },
  { to: '/admin/reportes', label: 'Reportes', icon: BarChart3 },
  { to: '/admin/configuracion', label: 'Ajustes', icon: Settings },
];

export function AdminSidebar() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const isDark = theme === 'dark';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarBg = isDark ? '#14121A' : '#FAF8F5';
  const sidebarBorder = isDark ? '#292336' : '#EAE5DC';
  const textPrimary = isDark ? '#F5F0E8' : '#0D0D0D';
  const textMuted = isDark ? '#9D95A8' : '#A39E93';
  const linkColor = isDark ? '#9D95A8' : '#6B6560';

  const activeLinkBg = isDark ? '#541E31' : '#0D0D0D';
  const activeLinkText = isDark ? '#FCE8EF' : '#FFFFFF';
  const activeLinkBorder = isDark ? '#9C3855' : 'transparent';

  return (
    <aside
      style={{
        width: 250,
        minHeight: '100vh',
        alignSelf: 'stretch',
        background: sidebarBg,
        borderRight: `1px solid ${sidebarBorder}`,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0',
        flexShrink: 0,
        transition: 'all 0.2s ease',
      }}
    >
      {/* Logo & Brand Header */}
      <div style={{ padding: '0 24px 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: isDark ? 'linear-gradient(135deg, #832F46, #3B1B26)' : '#0D0D0D',
              border: isDark ? '1px solid #9C3855' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isDark ? '0 2px 8px rgba(131, 47, 70, 0.4)' : 'none',
            }}
          >
            <Scissors size={18} color="white" />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: textPrimary,
                lineHeight: 1,
                letterSpacing: '0.04em',
              }}
            >
              SECRET
            </div>
            <div
              style={{
                fontSize: 8,
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: textMuted,
                fontWeight: 600,
                marginTop: 3,
              }}
            >
              MANAGEMENT PRIVÉ
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: isDark ? '#143527' : '#FFFFFF',
            border: `1px solid ${isDark ? '#22573F' : '#EAE5DC'}`,
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 10,
            fontWeight: 600,
            color: isDark ? '#4ADE80' : '#2D5A3F',
            letterSpacing: '0.05em',
            marginTop: 4,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: isDark ? '#4ADE80' : '#2D5A3F',
              boxShadow: isDark ? '0 0 6px #4ADE80' : 'none',
            }}
          />
          ATELIER ABIERTO
        </div>
      </div>

      {/* Nav List */}
      <nav style={{ flex: 1 }}>
        <ul
          style={{
            listStyle: 'none',
            padding: '0 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 18px',
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? activeLinkText : linkColor,
                  background: isActive ? activeLinkBg : 'transparent',
                  border: isActive ? `1px solid ${activeLinkBorder}` : '1px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 150ms ease',
                  boxShadow: isActive && isDark ? '0 4px 12px rgba(84, 30, 49, 0.4)' : 'none',
                })}
              >
                <Icon size={18} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Area */}
      <div
        style={{
          padding: '16px 16px 0',
          borderTop: `1px solid ${sidebarBorder}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 14px',
            borderRadius: 12,
            fontSize: 12,
            color: linkColor,
            textDecoration: 'none',
          }}
        >
          <ExternalLink size={15} />
          VER SITIO CLIENTE
        </a>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            width: '100%',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '10px 14px',
            fontSize: 12,
            color: isDark ? '#F87171' : '#9E3A3A',
          }}
        >
          <LogOut size={15} />
          Cerrar Sesión
        </button>

        <div style={{ fontSize: 10, color: textMuted, padding: '4px 14px 0', letterSpacing: '0.05em' }}>
          v2.0 · Secret Management Privé
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
