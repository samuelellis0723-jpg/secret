import React, { useState, useEffect } from 'react';
import { Bell, Search, User, ChevronRight } from 'lucide-react';
import { NotificationsModal } from './NotificationsModal';
import { GlobalSearchModal } from './GlobalSearchModal';
import adminService from '@services/adminService';

export function AdminHeader({ sectionTitle = 'ADMINISTRACIÓN', onRefreshData, onSelectReservation }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

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

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 28,
          borderBottom: '1px solid #EAE5DC',
          paddingBottom: 16,
          width: '100%',
        }}
      >
        {/* Breadcrumb / Left Title */}
        <div
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#8C857B',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            minWidth: 200,
          }}
        >
          <span style={{ color: '#A39E93' }}>SECRET ATELIER</span>
          <ChevronRight size={13} color="#C4BFB5" />
          <span style={{ color: '#2B2623', fontWeight: 700 }}>{sectionTitle}</span>
        </div>

        {/* Action Controls & Profile Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Bell Icon Button */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            title="Notificaciones del Atelier"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: '1px solid #EAE5DC',
              background: isNotificationsOpen ? '#F2EFE9' : '#FFFFFF',
              color: '#2B2623',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#F7F5F0')}
            onMouseLeave={(e) => (e.currentTarget.style.background = isNotificationsOpen ? '#F2EFE9' : '#FFFFFF')}
          >
            <Bell size={17} color="#4A4540" />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 7,
                  right: 7,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#B05B2B',
                  boxShadow: '0 0 0 2px #FFFFFF',
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
              border: '1px solid #EAE5DC',
              background: isSearchOpen ? '#F2EFE9' : '#FFFFFF',
              color: '#2B2623',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#F7F5F0')}
            onMouseLeave={(e) => (e.currentTarget.style.background = isSearchOpen ? '#F2EFE9' : '#FFFFFF')}
          >
            <Search size={17} color="#4A4540" />
          </button>

          {/* User Profile Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#FFFFFF',
              padding: '4px 14px 4px 5px',
              borderRadius: 24,
              border: '1px solid #EAE5DC',
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
                background: '#1A1817',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <User size={15} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1A1817', lineHeight: 1.2 }}>
                Directora Atelier
              </div>
              <div style={{ fontSize: 9, color: '#8C857B', lineHeight: 1.2 }}>
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
