import React from 'react';
import { CalendarCheck, Clock, TrendingUp, Users } from 'lucide-react';

export function TodaySummary({ data }) {
  if (!data) return null;

  const stats = [
    {
      label: 'Citas Hoy',
      value: data.totalCitasHoy,
      detail: `${data.confirmadasHoy} confirmadas`,
      icon: CalendarCheck,
    },
    {
      label: 'Pendientes',
      value: data.solicitudesPendientes,
      detail: 'esperando confirmación',
      icon: Clock,
    },
    {
      label: 'Ingresos Hoy',
      value: `$${(data.ingresosHoy || 0).toLocaleString('es-CL')}`,
      detail: 'estimado hoy',
      icon: TrendingUp,
    },
    {
      label: 'Clientes',
      value: data.totalClientes,
      detail: 'registrados',
      icon: Users,
    },
  ];

  return (
    <div className="summary-grid">
      {stats.map((stat) => (
        <div className="summary-card" key={stat.label}>
          <div className="summary-card-label">{stat.label}</div>
          <div className="summary-card-value">{stat.value}</div>
          <div className="summary-card-detail">{stat.detail}</div>
        </div>
      ))}
    </div>
  );
}

export default TodaySummary;
