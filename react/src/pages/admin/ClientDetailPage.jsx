import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '@components/admin/AdminSidebar';
import { AdminHeader } from '@components/admin/AdminHeader';
import { ClientHistory } from '@components/admin/ClientHistory';
import { Button } from '@components/ui/Button';
import { Loader } from '@components/ui/Loader';
import adminService from '@services/adminService';
import { ArrowLeft } from 'lucide-react';

export default function ClientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    adminService
      .getClienteById(id)
      .then(setCliente)
      .catch((err) => setError(err?.toString() || 'Error al cargar cliente'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <AdminHeader sectionTitle="DETALLE DE CLIENTE" />
        <div className="admin-page-header">
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/admin/clientes')}
            style={{ marginBottom: 12 }}
          >
            Volver a Clientes
          </Button>
          <h1 className="admin-page-title">
            Ficha de <em>Cliente</em>
          </h1>
          <p className="admin-page-subtitle">Información detallada e historial de atención</p>
        </div>

        {loading && <Loader text="Cargando información del cliente..." />}

        {error && (
          <div style={{ padding: 16, color: 'var(--color-cancelled-text)', fontSize: 13 }}>
            Error: {error}
          </div>
        )}

        {cliente && (
          <div className="card" style={{ maxWidth: 700 }}>
            <ClientHistory cliente={cliente} />
          </div>
        )}
      </div>
    </div>
  );
}
