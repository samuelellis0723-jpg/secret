import React, { useState } from 'react';
import { WhatsAppTemplateModal } from './WhatsAppTemplateModal';
import { Check, X, MessageCircle, MapPin, Plus, Lock, Download, ChevronRight } from 'lucide-react';
import { useTheme } from '@context/ThemeContext';

export function PendingRequestsWidget({ solicitudes = [], onConfirm, onReject, onAddManual, onBlockPersonal, onExportDaily }) {
  const [selectedWA, setSelectedWA] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cardBg = isDark ? '#191622' : '#FFFFFF';
  const cardBorder = isDark ? '#292336' : '#EAE5DC';
  const titleColor = isDark ? '#FAF5EF' : '#0D0D0D';
  const subtitleColor = isDark ? '#8F869A' : '#A39E93';
  const itemBg = isDark ? '#231F2E' : '#F5F2EC';
  const itemBorder = isDark ? '#382F48' : '#EAE5DC';

  const displaySolicitudes = solicitudes.length > 0 ? solicitudes : [
    {
      id: 101,
      source: 'WEB DIRECT',
      timeAgo: 'Hace 12m',
      clienteNombre: 'Elena Vega',
      servicioNombre: 'Soft Gel Largo M • Domicilio ($20.000)',
      precioTotal: 25000,
      modalidad: 'domicilio',
      ubicacion: 'Domicilio (Curridabat)',
      fechaHora: 'Mañana, Jueves • 10:00 AM',
      nota: '“Tengo una gala el viernes 26 a las 7 PM, necesito un diseño sobrio que combine con vestido borgoña.”',
    },
    {
      id: 102,
      source: 'WHATSAPP BOT',
      timeAgo: 'Hace 34m',
      clienteNombre: 'Andrea Morales',
      servicioNombre: 'Manicura Rusa Express • Sala Atelier',
      precioTotal: 18000,
      modalidad: 'local',
      ubicacion: 'Local Desamparados',
      fechaHora: 'Jueves 25 • 02:00 PM',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* SECCIÓN INBOX ATELIER */}
      <div className="card" style={{ padding: 24, background: cardBg, borderRadius: 16, border: `1px solid ${cardBorder}`, transition: 'all 0.2s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: subtitleColor, fontWeight: 600 }}>
              INBOX ATELIER
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 400, marginTop: 2, color: titleColor }}>
              Inbox Atelier
            </h3>
          </div>
          <span
            style={{
              background: isDark ? '#471D2B' : '#FDF2E9',
              color: isDark ? '#F4B8CB' : '#B05B2B',
              border: `1px solid ${isDark ? '#66263A' : '#F7D8C5'}`,
              borderRadius: 12,
              padding: '2px 8px',
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            {displaySolicitudes.length} NUEVAS
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {displaySolicitudes.map((req) => (
            <div key={req.id} style={{ background: itemBg, borderRadius: 12, padding: 16, border: `1px solid ${itemBorder}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: subtitleColor, letterSpacing: '0.1em', fontWeight: 600, marginBottom: 6 }}>
                <span>{req.clienteNombre} <span style={{ fontSize: 9, opacity: 0.8, textTransform: 'uppercase', padding: '1px 5px', borderRadius: 4, background: isDark ? '#191522' : '#EAE5DC' }}>{req.source}</span></span>
                <span>{req.timeAgo}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: titleColor }}>
                  {req.servicioNombre}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: isDark ? '#F4A5BE' : '#0D0D0D' }}>
                  ₡{(req.precioTotal || 18000).toLocaleString('es-CR')}
                </div>
              </div>

              {req.nota && (
                <div
                  style={{
                    fontSize: 11,
                    fontStyle: 'italic',
                    color: isDark ? '#C7BECF' : '#6B6560',
                    background: isDark ? '#1C1825' : '#FFFFFF',
                    padding: '8px 10px',
                    borderRadius: 8,
                    margin: '8px 0',
                    border: `1px solid ${isDark ? '#2E273A' : '#EAE5DC'}`,
                  }}
                >
                  {req.nota}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: subtitleColor }}>
                  <MapPin size={12} />
                  <span>{req.ubicacion}</span>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => setSelectedWA(req)}
                    style={{
                      border: `1px solid ${isDark ? '#382F48' : '#EAE5DC'}`,
                      background: isDark ? '#2B2438' : '#FFFFFF',
                      color: isDark ? '#E5DFD7' : '#0D0D0D',
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    CHAT
                  </button>
                  <button
                    onClick={() => onConfirm && onConfirm(req.id)}
                    style={{
                      border: 'none',
                      background: isDark ? '#832F46' : '#0D0D0D',
                      color: '#FFFFFF',
                      padding: '4px 12px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    CONFIRMAR CITA
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACCIONES RÁPIDAS */}
      <div className="card" style={{ padding: 24, background: cardBg, borderRadius: 16, border: `1px solid ${cardBorder}`, transition: 'all 0.2s ease' }}>
        <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: subtitleColor, fontWeight: 600, display: 'block', marginBottom: 12 }}>
          ACCIONES RÁPIDAS
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            onClick={onAddManual}
            style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              padding: '12px 14px',
              borderRadius: 12,
              background: itemBg,
              border: `1px solid ${itemBorder}`,
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: isDark ? '#382F48' : '#EAE5DC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={16} color={titleColor} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: titleColor }}>+ Añadir Cita Manual</div>
                <div style={{ fontSize: 10, color: subtitleColor }}>Cliente presencial o telefónico</div>
              </div>
            </div>
            <ChevronRight size={14} color={subtitleColor} />
          </div>

          <div
            onClick={onBlockPersonal}
            style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              padding: '12px 14px',
              borderRadius: 12,
              background: itemBg,
              border: `1px solid ${itemBorder}`,
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: isDark ? '#382F48' : '#EAE5DC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lock size={16} color={titleColor} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: titleColor }}>Bloquear Turno Personal</div>
                <div style={{ fontSize: 10, color: subtitleColor }}>Formación, descanso o insumos</div>
              </div>
            </div>
            <ChevronRight size={14} color={subtitleColor} />
          </div>

          <div
            onClick={onExportDaily}
            style={{
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              padding: '12px 14px',
              borderRadius: 12,
              background: itemBg,
              border: `1px solid ${itemBorder}`,
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: isDark ? '#382F48' : '#EAE5DC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Download size={16} color={titleColor} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: titleColor }}>Exportar Resumen del Día</div>
                <div style={{ fontSize: 10, color: subtitleColor }}>Cierre de caja en PDF para contabilidad</div>
              </div>
            </div>
            <ChevronRight size={14} color={subtitleColor} />
          </div>
        </div>
      </div>

      {selectedWA && (
        <WhatsAppTemplateModal
          cita={selectedWA}
          onClose={() => setSelectedWA(null)}
        />
      )}
    </div>
  );
}

export default PendingRequestsWidget;
