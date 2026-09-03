import React from 'react';
import { Calendar, Inbox, Wallet, Coffee } from 'lucide-react';
import { useTheme } from '@context/ThemeContext';

export function TodaySummary({ data }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!data) return null;

  const cardBg = isDark ? '#191622' : '#FFFFFF';
  const cardBorder = isDark ? '#292336' : '#EAE5DC';
  const labelColor = isDark ? '#8F869A' : '#A39E93';
  const valueColor = isDark ? '#FAF5EF' : '#0D0D0D';
  const subtextColor = isDark ? '#A39BB0' : '#6B6560';
  const dividerColor = isDark ? '#272133' : '#F5F2EC';
  const iconBoxBg = isDark ? '#231E2F' : '#FAF8F5';
  const iconColor = isDark ? '#F4A5BE' : '#6B6560';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
      {/* CARD 1: CITAS DE HOY */}
      <div className="card" style={{ padding: 20, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, transition: 'all 0.2s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: labelColor, fontWeight: 600 }}>
            CITAS DE HOY
          </span>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: iconBoxBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar size={15} color={iconColor} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500, lineHeight: 1, color: valueColor }}>
            {data.totalCitasHoy || 4}
          </span>
          <span style={{ fontSize: 12, color: labelColor }}>servicios</span>
        </div>
        <div style={{ borderTop: `1px solid ${dividerColor}`, paddingTop: 10, fontSize: 11, color: subtextColor, display: 'flex', gap: 8 }}>
          <span><strong style={{ color: isDark ? '#F4A5BE' : '#B05B2B' }}>1</strong> En Curso</span> • <span><strong>1</strong> Lista</span> • <span><strong>2</strong> Pendientes</span>
        </div>
      </div>

      {/* CARD 2: SOLICITUDES PRIVÉ */}
      <div className="card" style={{ padding: 20, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, transition: 'all 0.2s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: labelColor, fontWeight: 600 }}>
            SOLICITUDES PRIVÉ
          </span>
          <span
            style={{
              fontSize: 9,
              padding: '3px 8px',
              borderRadius: 12,
              fontWeight: 700,
              background: isDark ? '#471D2B' : '#FDF8EC',
              color: isDark ? '#F4B8CB' : '#9A7B38',
              border: `1px solid ${isDark ? '#66263A' : '#EEDC9A'}`,
            }}
          >
            {data.solicitudesPendientes || 3} NUEVAS
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500, lineHeight: 1, color: valueColor }}>
            {data.solicitudesPendientes || 3}
          </span>
          <span style={{ fontSize: 12, color: labelColor }}>por validar</span>
        </div>
        <div style={{ borderTop: `1px solid ${dividerColor}`, paddingTop: 10, fontSize: 11, color: subtextColor }}>
          Tiempo resp. medio: <strong style={{ color: isDark ? '#FAF5EF' : '#0D0D0D' }}>18m</strong>
        </div>
      </div>

      {/* CARD 3: INGRESOS ESTIMADOS */}
      <div className="card" style={{ padding: 20, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, transition: 'all 0.2s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: labelColor, fontWeight: 600 }}>
            INGRESOS ESTIMADOS
          </span>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: iconBoxBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Wallet size={15} color={iconColor} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 500, lineHeight: 1, color: isDark ? '#F4A5BE' : valueColor }}>
            ₡{(data.ingresosHoy || 82000).toLocaleString('es-CR')}
          </span>
        </div>
        <div style={{ borderTop: `1px solid ${dividerColor}`, paddingTop: 10, fontSize: 11, color: subtextColor, display: 'flex', gap: 6 }}>
          <span><strong>100%</strong> verificado vía SINPE Móvil & Efectivo</span>
        </div>
      </div>

      {/* CARD 4: PRÓXIMO BLOQUE LIBRE */}
      <div className="card" style={{ padding: 20, background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, transition: 'all 0.2s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: labelColor, fontWeight: 600 }}>
            PRÓXIMO BLOQUE LIBRE
          </span>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: iconBoxBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Coffee size={15} color={iconColor} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', fontWeight: 500, lineHeight: 1, color: valueColor }}>
            03:30 <span style={{ fontSize: '1rem', color: labelColor }}>PM</span>
          </span>
        </div>
        <div style={{ borderTop: `1px solid ${dividerColor}`, paddingTop: 10, fontSize: 11, color: subtextColor }}>
          Ventana de 50 min para sanitización y pausa técnica
        </div>
      </div>
    </div>
  );
}

export default TodaySummary;
