import React, { useState } from 'react';
import { WhatsAppTemplateModal } from './WhatsAppTemplateModal';
import { Check, X, MessageCircle, MapPin, Plus, Lock, Download } from 'lucide-react';

export function PendingRequestsWidget({ solicitudes = [], onConfirm, onReject, onAddManual, onBlockPersonal, onExportDaily }) {
  const [selectedWA, setSelectedWA] = useState(null);

  const displaySolicitudes = solicitudes.length > 0 ? solicitudes : [
    {
      id: 101,
      source: 'WEB DIRECT',
      timeAgo: 'Hace 12m',
      clienteNombre: 'Elena Vega',
      servicioNombre: 'Soft Gel Largo M',
      precioTotal: 25000,
      modalidad: 'domicilio',
      ubicacion: 'Domicilio (Curridabat)',
      fechaHora: 'Mañana, Jueves • 10:00 AM',
      nota: '“Tengo evento formal el viernes por la noche”',
    },
    {
      id: 102,
      source: 'WHATSAPP BOT',
      timeAgo: 'Hace 34m',
      clienteNombre: 'Andrea Morales',
      servicioNombre: 'Manicura Rusa Express',
      precioTotal: 18000,
      modalidad: 'local',
      ubicacion: 'Local Desamparados',
      fechaHora: 'Jueves 25 • 02:00 PM',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* SECCIÓN INBOX ATELIER */}
      <div className="card" style={{ padding: 24, background: '#FFFFFF', borderRadius: 16, border: '1px solid #EAE5DC' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#A39E93', fontWeight: 600 }}>
              INBOX ATELIER
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 400, marginTop: 2 }}>
              Nuevas Solicitudes
            </h3>
          </div>
          <span style={{ background: '#FDF2E9', color: '#B05B2B', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>
            {displaySolicitudes.length}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {displaySolicitudes.map((req) => (
            <div key={req.id} style={{ background: '#F5F2EC', borderRadius: 12, padding: 16, border: '1px solid #EAE5DC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#A39E93', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 6 }}>
                <span>{req.source}</span>
                <span>{req.timeAgo}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: '#0D0D0D' }}>{req.clienteNombre}</h4>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600 }}>
                  ₡{(req.precioTotal || 25000).toLocaleString('es-CR')}
                </span>
              </div>

              <div style={{ fontSize: 12, color: '#6B6560', marginBottom: 8 }}>
                {req.servicioNombre}
              </div>

              <div style={{ fontSize: 11, color: '#6B6560', display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 10 }}>
                <div>📍 {req.ubicacion}</div>
                <div>📅 {req.fechaHora}</div>
              </div>

              {req.nota && (
                <div style={{ background: '#FFFFFF', padding: '8px 12px', borderRadius: 8, fontSize: 11, fontStyle: 'italic', color: '#6B6560', marginBottom: 12, border: '1px solid #EAE5DC' }}>
                  {req.nota}
                </div>
              )}

              {/* Botones */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => onConfirm && onConfirm(req.id)}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, background: '#0D0D0D', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                >
                  CONFIRMAR CITA
                </button>
                <button
                  onClick={() => onReject && onReject(req.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: 11 }}
                >
                  Rechazar
                </button>
                <button
                  onClick={() => setSelectedWA(req)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <MessageCircle size={12} color="#25D366" /> WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN ACCIONES RÁPIDAS */}
      <div className="card" style={{ padding: 20, background: '#FFFFFF', borderRadius: 16, border: '1px solid #EAE5DC' }}>
        <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#A39E93', fontWeight: 600, display: 'block', marginBottom: 12 }}>
          ACCIONES RÁPIDAS
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={onAddManual}
            className="btn btn-secondary"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', fontSize: 12, width: '100%', background: '#F5F2EC' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Plus size={14} /> Añadir Cita Manual</span>
            <span>➔</span>
          </button>

          <button
            onClick={onBlockPersonal}
            className="btn btn-secondary"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', fontSize: 12, width: '100%', background: '#F5F2EC' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Lock size={14} /> Bloquear Turno Personal</span>
            <span>➔</span>
          </button>

          <button
            onClick={onExportDaily}
            className="btn btn-secondary"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', fontSize: 12, width: '100%', background: '#F5F2EC' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Download size={14} /> Exportar Resumen del Día</span>
            <span>➔</span>
          </button>
        </div>
      </div>

      {/* SECCIÓN UBICACIÓN MAPA */}
      <div className="card" style={{ padding: 18, background: '#FFFFFF', borderRadius: 16, border: '1px solid #EAE5DC' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: '#A39E93', marginBottom: 12 }}>
          <span>UBICACIÓN ATELIER</span>
          <span style={{ color: '#0D0D0D' }}>Desamparados Centro</span>
        </div>

        <div
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            height: 150,
            position: 'relative',
            background: '#E4F0E8',
            border: '1px solid #D1E4D6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Fondo vectorial simulando mapa de San José */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.65 }}>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C4DEC9" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Calles principales */}
            <path d="M -10 30 Q 100 80 280 40" fill="none" stroke="#FFFFFF" strokeWidth="8" />
            <path d="M 120 -10 L 140 180" fill="none" stroke="#FFFFFF" strokeWidth="6" />
            <path d="M -10 110 L 300 90" fill="none" stroke="#FDF6EC" strokeWidth="7" />
            {/* Ruta destacada verde */}
            <path d="M 40 140 C 90 120, 110 80, 140 75" fill="none" stroke="#25D366" strokeWidth="3" strokeDasharray="4 4" />
          </svg>

          {/* Marcador del Atelier (Pin) */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              background: '#0D0D0D',
              color: 'white',
              padding: '6px 12px',
              borderRadius: 20,
              fontSize: 10,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#25D366' }} />
            <span>Quinta Montaña Atelier • Desamparados</span>
          </div>

          {/* Etiqueta flotante inferior derecha */}
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(4px)',
              padding: '2px 8px',
              borderRadius: 6,
              fontSize: 9,
              color: '#6B6560',
              fontWeight: 500,
            }}
          >
            San José, Costa Rica
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
