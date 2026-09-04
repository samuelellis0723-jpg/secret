import React, { useState, useEffect } from 'react';
import { Bell, Search, User, ChevronRight, Moon, Sun } from 'lucide-react';
import { NotificationsModal } from './NotificationsModal';
import { GlobalSearchModal } from './GlobalSearchModal';
import { useTheme } from '@context/ThemeContext';
import { useAtelier } from '@context/AtelierContext';
import adminService from '@services/adminService';

export function AdminHeader({ sectionTitle = 'ADMINISTRACIÓN', onRefreshData, onSelectReservation }) {
  const { theme, toggleTheme } = useTheme();
  const { salonActive, toggleSalonActive } = useAtelier();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const isDark = theme === 'dark';

  useEffect(() => {
    loadUnreadCount();
  }, []);

  const loadUnreadCount = async () => {
    try {
      const citas = await adminService.getCitas();
      const pendientes = citas.filter((c) => c.estado === 'pendiente');
      setUnreadCount(pendientes.length);
    } catch (err) {
      console.error("Error al obtener notificaciones sin leer", err);
    }
  };

  // Keyboard shortcut Ctrl+K or Cmd+K to open Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const borderBottomColor = isDark ? '#292336' : '#EAE5DC';
  const iconBtnBg = isDark ? '#1C1926' : '#FFFFFF';
  const iconBtnBorder = isDark ? '#2E273A' : '#EAE5DC';
  const iconColor = isDark ? '#E5DFD7' : '#4A4540';

  return (
    <>
      <div
        style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 28,
          borderBottom: `1px solid ${borderBottomColor}`,
          paddingBottom: 16,
          width: '100%',
        }}
      >
        {/* Breadcrumb / Left Title - Consistent layout structure in both modes */}
        <div
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: isDark ? '#8F869A' : '#8C857B',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ color: isDark ? '#8F869A' : '#A39E93' }}>SECRET ATELIER</span>
          <ChevronRight size={12} color={isDark ? '#4D435C' : '#C4BFB5'} />
          <span style={{ color: isDark ? '#FAF5EF' : '#2B2623', fontWeight: 700 }}>{sectionTitle}</span>
        </div>

        {/* Action Controls & Profile Pill - Consistent structure in both modes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Status Pill Badge - Styled appropriately per theme and state */}
          <div
            onClick={toggleSalonActive}
            title="Haz clic para cambiar el estado del atelier"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: salonActive
                ? (isDark ? '#471D2B' : '#FDF2E9')
                : (isDark ? '#26212B' : '#F3F0EA'),
              border: `1px solid ${
                salonActive
                  ? (isDark ? '#66263A' : '#F7D8C5')
                  : (isDark ? '#3D3547' : '#E2DDD3')
              }`,
              borderRadius: 20,
              padding: '4px 12px',
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: salonActive
                ? (isDark ? '#F4B8CB' : '#B05B2B')
                : (isDark ? '#9D95A8' : '#78726A'),
              marginRight: 6,
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: salonActive
                  ? (isDark ? '#F4A5BE' : '#B05B2B')
                  : (isDark ? '#6E6578' : '#9E978F'),
              }}
            />
            {salonActive ? 'ACTIVO • ATENDIENDO EN SALÓN | Suite 01' : 'DESCONECTADO | Suite 01'}
          </div>

          {/* Theme Toggle Icon Button */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: `1px solid ${iconBtnBorder}`,
              background: iconBtnBg,
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.15s ease',
            }}
          >
            {isDark ? <Sun size={17} color="#FBBF24" /> : <Moon size={17} color="#6B6560" />}
          </button>

          {/* Bell Icon Button */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            title="Notificaciones del Atelier"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: `1px solid ${iconBtnBorder}`,
              background: isNotificationsOpen ? (isDark ? '#2B2338' : '#F2EFE9') : iconBtnBg,
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.15s ease',
            }}
          >
            <Bell size={17} color={isDark ? '#E5DFD7' : '#4A4540'} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 7,
                  right: 7,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: isDark ? '#F4A5BE' : '#B05B2B',
                  boxShadow: `0 0 0 2px ${isDark ? '#1C1926' : '#FFFFFF'}`,
                }}
              />
            )}
          </button>

          {/* Search Icon Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            title="Búsqueda global (Ctrl + K)"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: `1px solid ${iconBtnBorder}`,
              background: isSearchOpen ? (isDark ? '#2B2338' : '#F2EFE9') : iconBtnBg,
              color: iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.15s ease',
            }}
          >
            <Search size={17} color={isDark ? '#E5DFD7' : '#4A4540'} />
          </button>

          {/* User Profile Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: isDark ? '#1C1926' : '#FFFFFF',
              padding: '4px 14px 4px 5px',
              borderRadius: 24,
              border: `1px solid ${iconBtnBorder}`,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              height: 38,
              marginLeft: 4,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: isDark ? '#832F46' : '#1A1817',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <User size={15} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: isDark ? '#FAF5EF' : '#1A1817', lineHeight: 1.2 }}>
                Directora Atelier
              </div>
              <div style={{ fontSize: 9, color: isDark ? '#8F869A' : '#8C857B', lineHeight: 1.2 }}>
                Sede Salamanca
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Modal / Drawer */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => {
          setIsNotificationsOpen(false);
          loadUnreadCount();
        }}
        onRefreshData={() => {
          loadUnreadCount();
          if (onRefreshData) onRefreshData();
        }}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectReservation={onSelectReservation}
      />
    </>
  );
}

export default AdminHeader;
