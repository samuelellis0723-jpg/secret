import React from 'react';
import { Calendar, Inbox, Wallet, Coffee } from 'lucide-react';

export function TodaySummary({ data }) {
  if (!data) return null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
      {/* CARD 1: CITAS DE HOY */}
      <div className="card" style={{ padding: 20, background: '#FFFFFF', border: '1px solid #EAE5DC', borderRadius: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#A39E93', fontWeight: 600 }}>
            CITAS DE HOY
          </span>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={15} color="#6B6560" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500, lineHeight: 1 }}>
            {data.totalCitasHoy || 4}
          </span>
          <span style={{ fontSize: 12, color: '#A39E93' }}>programadas</span>
        </div>
        <div style={{ borderTop: '1px solid #F5F2EC', paddingTop: 10, fontSize: 11, color: '#6B6560', display: 'flex', gap: 8 }}>
          <span><strong>1</strong> en curso</span> • <span><strong>1</strong> lista</span> • <span><strong>2</strong> pendientes</span>
        </div>
      </div>

      {/* CARD 2: SOLICITUDES */}
      <div className="card" style={{ padding: 20, background: '#FFFFFF', border: '1px solid #EAE5DC', borderRadius: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#A39E93', fontWeight: 600 }}>
            SOLICITUDES
          </span>
          <span className="badge badge-concierge" style={{ fontSize: 9, padding: '2px 8px' }}>
            {data.solicitudesPendientes || 3} NUEVAS
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500, lineHeight: 1 }}>
            {data.solicitudesPendientes || 3}
          </span>
          <span style={{ fontSize: 12, color: '#A39E93' }}>por revisar</span>
        </div>
        <div style={{ borderTop: '1px solid #F5F2EC', paddingTop: 10, fontSize: 11, color: '#6B6560' }}>
          Tiempo prom. respuesta: <strong>18m ➔</strong>
        </div>
      </div>

      {/* CARD 3: INGRESOS ESTIMADOS */}
      <div className="card" style={{ padding: 20, background: '#FFFFFF', border: '1px solid #EAE5DC', borderRadius: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#A39E93', fontWeight: 600 }}>
            INGRESOS ESTIMADOS
          </span>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Wallet size={15} color="#6B6560" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 500, lineHeight: 1 }}>
            ₡{(data.ingresosHoy || 82000).toLocaleString('es-CR')}
          </span>
        </div>
        <div style={{ borderTop: '1px solid #F5F2EC', paddingTop: 10, fontSize: 11, color: '#6B6560', display: 'flex', gap: 8 }}>
          <span><strong>100%</strong> verificado</span> • <span>SINPE Móvil & Efectivo</span>
        </div>
      </div>

      {/* CARD 4: PRÓXIMO BLOQUE LIBRE */}
      <div className="card" style={{ padding: 20, background: '#FFFFFF', border: '1px solid #EAE5DC', borderRadius: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#A39E93', fontWeight: 600 }}>
            PRÓXIMO BLOQUE LIBRE
          </span>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Coffee size={15} color="#6B6560" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 500, lineHeight: 1 }}>
            03:30 <span style={{ fontSize: '1rem', color: '#A39E93' }}>PM</span>
          </span>
        </div>
        <div style={{ borderTop: '1px solid #F5F2EC', paddingTop: 10, fontSize: 11, color: '#6B6560' }}>
          Ventana de 60 min (Desinfección y descanso)
        </div>
      </div>
    </div>
  );
}

export default TodaySummary;
