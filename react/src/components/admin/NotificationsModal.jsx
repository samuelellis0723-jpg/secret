import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Check, X, Calendar, Clock, Sparkles, CheckCheck, ChevronRight } from 'lucide-react';
import { useTheme } from '@context/ThemeContext';
import adminService from '@services/adminService';

export function NotificationsModal({ isOpen, onClose, onRefreshData }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [citas, setCitas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterTab, setFilterTab] = useState('todas');
  const [readIds, setReadIds] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetchNotificationsData();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const fetchNotificationsData = async () => {
    setLoading(true);
    try {
      const [cRes, uRes, sRes] = await Promise.all([
        adminService.getCitas(),
        adminService.getUsuarios(),
        adminService.getServicios(),
      ]);
      setCitas(cRes);
      setUsuarios(uRes);
      setServicios(sRes);
    } catch (err) {
      console.error("Error al cargar notificaciones", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEstado = async (citaId, nuevoEstado, e) => {
    e?.stopPropagation();
    try {
      await adminService.updateCitaEstado(citaId, nuevoEstado);
      fetchNotificationsData();
      if (onRefreshData) onRefreshData();
    } catch (err) {
      console.error("Error al actualizar cita", err);
    }
  };

  const handleMarkAllRead = () => {
    const allIds = citas.map((c) => c.id);
    setReadIds(new Set([...allIds, 'whatsapp-notice', 'daily-notice']));
  };

  const markSingleRead = (id) => {
    setReadIds((prev) => new Set([...prev, id]));
  };

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const pendingNotifs = citas
    .filter((c) => c.estado === 'pendiente')
    .map((c) => {
      const cliente = usuarios.find((u) => u.id === c.clienteId);
      const servicio = servicios.find((s) => s.id === c.servicioId);
      return {
        id: `cita-${c.id}`,
        citaId: c.id,
        type: 'pending_request',
        title: 'Solicitud de Reserva Pendiente',
        description: `${cliente?.nombre || 'Clienta'} ha solicitado ${servicio?.nombre || 'Servicio'} para el ${c.fecha} a las ${c.hora} hrs.`,
        date: c.fecha,
        time: c.hora,
        estado: c.estado,
        isRead: readIds.has(`cita-${c.id}`),
        clienteNombre: cliente?.nombre,
        servicioNombre: servicio?.nombre,
      };
    });

  const todayNotifs = citas
    .filter((c) => c.fecha === todayStr && c.estado === 'confirmada')
    .map((c) => {
      const cliente = usuarios.find((u) => u.id === c.clienteId);
      const servicio = servicios.find((s) => s.id === c.servicioId);
      return {
        id: `today-${c.id}`,
        citaId: c.id,
        type: 'today_appointment',
        title: 'Cita programada para hoy',
        description: `${cliente?.nombre || 'Clienta'} — ${servicio?.nombre || 'Servicio'} a las ${c.hora} hrs.`,
        date: c.fecha,
        time: c.hora,
        estado: c.estado,
        isRead: readIds.has(`today-${c.id}`),
      };
    });

  const systemNotifs = [
    {
      id: 'whatsapp-notice',
      type: 'system',
      title: 'Recordatorio WhatsApp Pendiente',
      description: 'Recuerda enviar las plantillas de confirmación para las citas de mañana.',
      isRead: readIds.has('whatsapp-notice'),
    },
  ];

  let allNotifs = [...pendingNotifs, ...todayNotifs, ...systemNotifs];

  if (filterTab === 'pendientes') {
    allNotifs = allNotifs.filter((n) => n.type === 'pending_request');
  }

  const unreadCount = allNotifs.filter((n) => !n.isRead).length;

  const cardBg = isDark ? '#191622' : '#FFFFFF';
  const cardBorder = isDark ? '#292336' : '#EAE5DC';
  const headerBg = isDark ? '#15121E' : '#FAF8F5';
  const textPrimary = isDark ? '#FAF5EF' : '#0D0D0D';
  const textMuted = isDark ? '#8F869A' : '#8C857B';
  const subtextColor = isDark ? '#A39BB0' : '#6B6560';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isDark ? 'rgba(5, 4, 8, 0.75)' : 'rgba(13, 13, 13, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '70px 40px 20px 20px',
        animation: 'fadeIn 0.15s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: cardBg,
          borderRadius: '16px',
          boxShadow: isDark ? '0 16px 40px rgba(0, 0, 0, 0.6)' : '0 16px 36px rgba(0, 0, 0, 0.16)',
          border: `1px solid ${cardBorder}`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 100px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: `1px solid ${cardBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: headerBg,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <Bell size={18} color={isDark ? '#F4A5BE' : '#2B2623'} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: isDark ? '#F4A5BE' : '#B05B2B',
                  }}
                />
              )}
            </div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: textPrimary, fontFamily: 'var(--font-serif)' }}>
              Notificaciones del Atelier
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
          >
            <X size={16} color={textMuted} />
          </button>
        </div>

        {/* Tabs & Quick Action Bar */}
        <div
          style={{
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${cardBorder}`,
            fontSize: '12px',
            background: isDark ? '#171421' : '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setFilterTab('todas')}
              style={{
                border: 'none',
                background: filterTab === 'todas' ? (isDark ? '#832F46' : '#1A1817') : 'transparent',
                color: filterTab === 'todas' ? '#FFFFFF' : textMuted,
                padding: '4px 10px',
                borderRadius: '14px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Todas ({allNotifs.length})
            </button>
            <button
              onClick={() => setFilterTab('pendientes')}
              style={{
                border: 'none',
                background: filterTab === 'pendientes' ? (isDark ? '#832F46' : '#1A1817') : 'transparent',
                color: filterTab === 'pendientes' ? '#FFFFFF' : textMuted,
                padding: '4px 10px',
                borderRadius: '14px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Pendientes ({pendingNotifs.length})
            </button>
          </div>

          <button
            onClick={handleMarkAllRead}
            style={{
              border: 'none',
              background: 'transparent',
              color: isDark ? '#F4A5BE' : '#B05B2B',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <CheckCheck size={14} /> Leídas
          </button>
        </div>

        {/* Notification List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
          {loading && (
            <div style={{ padding: '24px', textAlign: 'center', color: textMuted, fontSize: '13px' }}>
              Cargando notificaciones...
            </div>
          )}

          {!loading && allNotifs.length === 0 && (
            <div style={{ padding: '36px 20px', textAlign: 'center' }}>
              <Bell size={28} color={isDark ? '#4D435C' : '#C4BFB5'} style={{ marginBottom: 8 }} />
              <div style={{ fontSize: '13px', color: textMuted }}>No tienes notificaciones pendientes</div>
            </div>
          )}

          {!loading &&
            allNotifs.map((notif) => {
              const itemBg = notif.isRead
                ? (isDark ? '#181423' : '#FAF8F5')
                : (isDark ? '#231E2E' : '#FFFFFF');

              const itemBorderColor = notif.isRead
                ? (isDark ? '#262035' : '#EAE5DC')
                : (isDark ? '#3E2E44' : '#E5D5C5');

              return (
                <div
                  key={notif.id}
                  onClick={() => {
                    markSingleRead(notif.id);
                    if (notif.citaId) navigate('/admin/reservas');
                    onClose();
                  }}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    marginBottom: '8px',
                    background: itemBg,
                    border: `1px solid ${itemBorderColor}`,
                    cursor: 'pointer',
                    boxShadow: notif.isRead ? 'none' : (isDark ? '0 4px 12px rgba(131, 47, 70, 0.15)' : '0 2px 8px rgba(176, 91, 43, 0.06)'),
                    transition: 'all 0.15s ease',
                    position: 'relative',
                  }}
                >
                  {!notif.isRead && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: isDark ? '#F4A5BE' : '#B05B2B',
                      }}
                    />
                  )}

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: notif.type === 'pending_request'
                          ? (isDark ? '#3D1C28' : '#FFF5EE')
                          : (isDark ? '#262133' : '#F4F4F0'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {notif.type === 'pending_request' ? (
                        <Clock size={16} color={isDark ? '#F4A5BE' : '#B05B2B'} />
                      ) : notif.type === 'today_appointment' ? (
                        <Calendar size={16} color={textPrimary} />
                      ) : (
                        <Sparkles size={16} color={textMuted} />
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: textPrimary, marginBottom: 2 }}>
                        {notif.title}
                      </div>
                      <div style={{ fontSize: '11px', color: subtextColor, lineHeight: 1.4 }}>
                        {notif.description}
                      </div>

                      {/* Action buttons for pending request */}
                      {notif.type === 'pending_request' && notif.estado === 'pendiente' && (
                        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                          <button
                            onClick={(e) => handleUpdateEstado(notif.citaId, 'confirmada', e)}
                            style={{
                              border: 'none',
                              background: isDark ? '#832F46' : '#1A1817',
                              color: '#FFFFFF',
                              padding: '4px 12px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4,
                            }}
                          >
                            <Check size={12} /> Confirmar
                          </button>
                          <button
                            onClick={(e) => handleUpdateEstado(notif.citaId, 'cancelada', e)}
                            style={{
                              border: `1px solid ${isDark ? '#382F48' : '#EAE5DC'}`,
                              background: isDark ? '#231F2E' : '#FFFFFF',
                              color: isDark ? '#A39BB0' : '#7A756D',
                              padding: '4px 12px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: 500,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4,
                            }}
                          >
                            <X size={12} /> Rechazar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Footer */}
        <div
          onClick={() => {
            navigate('/admin/reservas');
            onClose();
          }}
          style={{
            padding: '12px 20px',
            background: headerBg,
            borderTop: `1px solid ${cardBorder}`,
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: 600,
            color: isDark ? '#F4A5BE' : '#B05B2B',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <span>Ver todas las reservas en gestión</span>
          <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
}

export default NotificationsModal;
