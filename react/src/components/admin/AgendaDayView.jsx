import React, { useState } from 'react';
import { StatusBadge } from './StatusBadge';
import { WhatsAppTemplateModal } from './WhatsAppTemplateModal';
import { MapPin, Navigation, MessageCircle, SlidersHorizontal, Check } from 'lucide-react';
import { useTheme } from '@context/ThemeContext';

export function AgendaDayView({ citasHoy = [], onConfirm, onReject, onFinish }) {
  const [selectedCitaForWA, setSelectedCitaForWA] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cardBg = isDark ? '#191622' : '#FFFFFF';
  const cardBorder = isDark ? '#292336' : '#EAE5DC';
  const titleColor = isDark ? '#FAF5EF' : '#0D0D0D';
  const subtitleColor = isDark ? '#8F869A' : '#A39E93';

  // Mock citas si viene vacío para asegurar la vista impecable
  const displayCitas = citasHoy.length > 0 ? citasHoy : [
    {
      id: 1,
      hora: '08:00 AM – 10:00 AM',
      estado: 'completada',
      precioTotal: 20000,
      clienteNombre: 'Sofía Esquivel',
      servicioNombre: 'Manicura Rusa Combinada • Tono Nude Silk #04 con Baño de Keratina',
      modalidad: 'local',
      direccion: 'Local Desamparados (Mesa 1)',
    },
    {
      id: 2,
      hora: '10:30 AM – 12:30 PM',
      estado: 'en_curso',
      precioTotal: 22000,
      clienteNombre: 'Mariana Solano',
      servicioNombre: 'Kapping Gel / Nivelación Estructural • Esmaltado Semipermanente',
      modalidad: 'local',
      direccion: 'Local Desamparados (Mesa 1)',
      tag: 'Nota técnica: Uñas frágiles, prefiere base rubber espesa. No recortar cutícula lateral izquierdo en exceso.',
      tiempoRestante: '~45 min',
    },
    {
      id: 3,
      hora: '01:30 PM – 03:30 PM',
      estado: 'proxima',
      precioTotal: 26000,
      clienteNombre: 'Camila Montero',
      servicioNombre: 'Soft Gel & Extensiones Almendra • Nail Art Minimalist en Acentos de Oro Rosa',
      modalidad: 'domicilio',
      direccion: 'Escazú Village, Torre Este, Residencia Privada 502',
    },
    {
      id: 4,
      hora: '04:30 PM – 06:30 PM',
      estado: 'confirmada',
      precioTotal: 14000,
      clienteNombre: 'Daniela Brenes',
      servicioNombre: 'Spa Clásico & Hidratación Profunda con Parafina • Retiro de Acrílico Previo',
      modalidad: 'local',
      direccion: 'Local Desamparados (Mesa 1)',
    },
  ];

  return (
    <div className="card" style={{ padding: 24, background: cardBg, borderRadius: 16, border: `1px solid ${cardBorder}`, transition: 'all 0.2s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: subtitleColor, fontWeight: 600 }}>
            CRONOGRAMA PRIVÉ
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 400, marginTop: 2, color: titleColor }}>
            Agenda de Hoy
          </h3>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          <button
            className="btn btn-secondary btn-sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              background: isDark ? '#231E2E' : '#F5F2EC',
              borderColor: isDark ? '#382F48' : '#EAE5DC',
              color: isDark ? '#E5DFD7' : '#6B6560',
            }}
          >
            <SlidersHorizontal size={13} /> Filtros
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}>
        {displayCitas.map((cita, index) => {
          const isCompletada = cita.estado === 'completada';
          const isEnCurso = cita.estado === 'en_curso';
          const isProxima = cita.estado === 'proxima';
          const isDomicilio = cita.modalidad === 'domicilio';

          const dotColor = isCompletada
            ? (isDark ? '#4ADE80' : '#2D5A3F')
            : isEnCurso
            ? (isDark ? '#F4A5BE' : '#B05B2B')
            : isProxima
            ? (isDark ? '#FBBF24' : '#9A7B38')
            : (isDark ? '#8F869A' : '#A39E93');

          const innerCardBg = isEnCurso
            ? (isDark ? '#351824' : '#FDF8F3')
            : (isDark ? '#211C2B' : '#F5F2EC');

          const innerCardBorder = isEnCurso
            ? (isDark ? '#66263A' : '#F7D8C5')
            : (isDark ? '#2F273D' : '#EAE5DC');

          return (
            <div key={cita.id || index} style={{ display: 'flex', gap: 16, position: 'relative' }}>
              {/* Linea conectora timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotColor, marginTop: 14 }} />
                {index < displayCitas.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: isDark ? '#292336' : '#EAE5DC', marginTop: 4, marginBottom: 4 }} />
                )}
              </div>

              {/* Card Cita */}
              <div
                style={{
                  flex: 1,
                  background: innerCardBg,
                  borderRadius: 14,
                  padding: 20,
                  border: `1px solid ${innerCardBorder}`,
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, color: titleColor }}>
                      {cita.hora}
                    </span>
                    <StatusBadge estado={cita.estado} />
                    {isDomicilio && (
                      <span className="badge badge-concierge" style={{ fontSize: 9 }}>
                        CONCIERGE DOMICILIO
                      </span>
                    )}
                  </div>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, color: isDark ? '#F4A5BE' : titleColor }}>
                    ₡{(cita.precioTotal || 20000).toLocaleString('es-CR')}
                  </span>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: titleColor }}>
                    {cita.clienteNombre || cita.cliente?.nombre}
                  </div>
                  <div style={{ fontSize: 13, color: isDark ? '#A39BB0' : '#6B6560', marginTop: 2 }}>
                    {cita.servicioNombre || cita.servicio?.nombre}
                  </div>
                </div>

                {cita.tag && (
                  <div
                    style={{
                      background: isDark ? '#191522' : '#FFFFFF',
                      padding: '8px 12px',
                      borderRadius: 8,
                      fontSize: 11,
                      color: isDark ? '#D9D2E2' : '#6B6560',
                      border: `1px solid ${isDark ? '#382F48' : '#EAE5DC'}`,
                      fontStyle: 'italic',
                      marginBottom: 12,
                    }}
                  >
                    {cita.tag}
                  </div>
                )}

                {/* Subinfo & Badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: isDark ? '#8F869A' : '#6B6560' }}>
                    <MapPin size={14} color={isDark ? '#8F869A' : '#A39E93'} />
                    <span>{cita.direccion || (isDomicilio ? 'Domicilio Cliente' : 'Local Desamparados (Mesa 1)')}</span>
                  </div>

                  {/* Acciones por estado */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {isEnCurso && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 11, color: isDark ? '#F4A5BE' : '#B05B2B' }}>
                          Tiempo restante: <strong>{cita.tiempoRestante || '~45 min'}</strong>
                        </span>
                        <button
                          onClick={() => onFinish && onFinish(cita.id)}
                          className="btn btn-sm"
                          style={{
                            background: isDark ? '#832F46' : '#0D0D0D',
                            color: '#FFFFFF',
                            fontSize: 11,
                            borderRadius: 8,
                            padding: '6px 14px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          Finalizar Servicio
                        </button>
                      </div>
                    )}

                    {isProxima && (
                      <>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 11,
                            background: isDark ? '#231E2E' : '#FFFFFF',
                            borderColor: isDark ? '#382F48' : '#EAE5DC',
                            color: isDark ? '#E5DFD7' : '#0D0D0D',
                          }}
                        >
                          <Navigation size={12} /> Waze
                        </button>
                        <button
                          onClick={() => setSelectedCitaForWA(cita)}
                          className="btn btn-secondary btn-sm"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 11,
                            background: isDark ? '#231E2E' : '#FFFFFF',
                            borderColor: isDark ? '#382F48' : '#EAE5DC',
                            color: isDark ? '#E5DFD7' : '#0D0D0D',
                          }}
                        >
                          <MessageCircle size={12} color="#25D366" /> WhatsApp
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCitaForWA && (
        <WhatsAppTemplateModal
          cita={selectedCitaForWA}
          onClose={() => setSelectedCitaForWA(null)}
        />
      )}
    </div>
  );
}

export default AgendaDayView;
