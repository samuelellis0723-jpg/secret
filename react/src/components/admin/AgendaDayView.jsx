import React, { useState } from 'react';
import { StatusBadge } from './StatusBadge';
import { WhatsAppTemplateModal } from './WhatsAppTemplateModal';
import { MapPin, Navigation, MessageCircle, SlidersHorizontal, Check } from 'lucide-react';

export function AgendaDayView({ citasHoy = [], onConfirm, onReject, onFinish }) {
  const [selectedCitaForWA, setSelectedCitaForWA] = useState(null);

  // Mock citas si viene vacío para asegurar la vista impecable
  const displayCitas = citasHoy.length > 0 ? citasHoy : [
    {
      id: 1,
      hora: '08:00 AM – 10:00 AM',
      estado: 'completada',
      precioTotal: 20000,
      clienteNombre: 'Sofía Esquivel',
      servicioNombre: 'Manicura Rusa Combinada • Tono Nude Silk #04',
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
      tag: '🏷️ Uñas frágiles, prefiere base rubber espesa',
      tiempoRestante: '~45 min',
    },
    {
      id: 3,
      hora: '01:30 PM – 03:30 PM',
      estado: 'proxima',
      precioTotal: 26000,
      clienteNombre: 'Camila Montero',
      servicioNombre: 'Soft Gel & Extensiones Almendra • Nail Art Minimalist',
      modalidad: 'domicilio',
      direccion: 'Escazú Village, Torre A, Apto 402',
    },
    {
      id: 4,
      hora: '04:30 PM – 06:30 PM',
      estado: 'confirmada',
      precioTotal: 14000,
      clienteNombre: 'Daniela Brenes',
      servicioNombre: 'Spa Clásico & Hidratación Profunda con Parafina',
      modalidad: 'local',
      direccion: 'Local Desamparados (Mesa 1)',
    },
  ];

  return (
    <div className="card" style={{ padding: 24, background: '#FFFFFF', borderRadius: 16, border: '1px solid #EAE5DC' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#A39E93', fontWeight: 600 }}>
            CRONOGRAMA PRIVÉ
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 400, marginTop: 2 }}>
            Agenda de Hoy
          </h3>
        </div>

        <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
          <SlidersHorizontal size={13} /> Filtros
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}>
        {displayCitas.map((cita, index) => {
          const isCompletada = cita.estado === 'completada';
          const isEnCurso = cita.estado === 'en_curso';
          const isProxima = cita.estado === 'proxima';
          const isDomicilio = cita.modalidad === 'domicilio';

          const dotColor = isCompletada ? '#2D5A3F' : isEnCurso ? '#B05B2B' : isProxima ? '#9A7B38' : '#A39E93';

          return (
            <div key={cita.id || index} style={{ display: 'flex', gap: 16, position: 'relative' }}>
              {/* Linea conectora timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotColor, marginTop: 14 }} />
                {index < displayCitas.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: '#EAE5DC', marginTop: 4, marginBottom: 4 }} />
                )}
              </div>

              {/* Card Cita */}
              <div
                style={{
                  flex: 1,
                  background: isEnCurso ? '#FDF8F3' : '#F5F2EC',
                  borderRadius: 14,
                  padding: 20,
                  border: isEnCurso ? '1px solid #F7D8C5' : '1px solid #EAE5DC',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>
                      {cita.hora}
                    </span>
                    <StatusBadge estado={cita.estado} />
                    {isDomicilio && (
                      <span className="badge badge-concierge" style={{ fontSize: 9 }}>
                        CONCIERGE DOMICILIO
                      </span>
                    )}
                  </div>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>
                    ₡{(cita.precioTotal || 20000).toLocaleString('es-CR')}
                  </span>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: '#0D0D0D' }}>
                    {cita.clienteNombre || cita.cliente?.nombre}
                  </div>
                  <div style={{ fontSize: 13, color: '#6B6560', marginTop: 2 }}>
                    {cita.servicioNombre || cita.servicio?.nombre}
                  </div>
                </div>

                {/* Subinfo & Badges */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B6560' }}>
                    <MapPin size={14} color="#A39E93" />
                    <span>{cita.direccion || (isDomicilio ? 'Domicilio Cliente' : 'Local Desamparados (Mesa 1)')}</span>
                  </div>

                  {/* Acciones por estado */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {cita.tag && (
                      <span style={{ background: '#FFFFFF', padding: '4px 10px', borderRadius: 8, fontSize: 11, color: '#6B6560', border: '1px solid #EAE5DC' }}>
                        {cita.tag}
                      </span>
                    )}

                    {isEnCurso && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 11, color: '#B05B2B' }}>Tiempo restante: <strong>{cita.tiempoRestante || '~45 min'}</strong></span>
                        <button
                          onClick={() => onFinish && onFinish(cita.id)}
                          className="btn btn-primary btn-sm"
                          style={{ background: '#0D0D0D', fontSize: 11 }}
                        >
                          Finalizar Servicio
                        </button>
                      </div>
                    )}

                    {isProxima && (
                      <>
                        <button className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
                          <Navigation size={12} /> Waze
                        </button>
                        <button
                          onClick={() => setSelectedCitaForWA(cita)}
                          className="btn btn-secondary btn-sm"
                          style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}
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
