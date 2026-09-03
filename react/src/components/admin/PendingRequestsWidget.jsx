import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/Button';
import { StatusBadge } from './StatusBadge';
import { ArrowRight } from 'lucide-react';

export function PendingRequestsWidget({ pendingCount }) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-subtitle">Acceso Rápido</div>
          <h3 className="card-title">Solicitudes Pendientes</h3>
        </div>
        <StatusBadge estado="pendiente" />
      </div>

      <p style={{ fontSize: 13, color: 'var(--color-muted)', marginBottom: 16 }}>
        {pendingCount === 0
          ? 'No hay solicitudes pendientes por ahora.'
          : `Hay ${pendingCount} solicitud${pendingCount !== 1 ? 'es' : ''} esperando revisión.`}
      </p>

      <Button
        variant="secondary"
        size="sm"
        iconRight={ArrowRight}
        onClick={() => navigate('/admin/reservas')}
      >
        Ver Reservas
      </Button>
    </div>
  );
}

export default PendingRequestsWidget;
