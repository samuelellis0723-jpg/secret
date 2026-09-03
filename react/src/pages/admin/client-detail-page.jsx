import { useParams, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '@shared/components/layout/admin-sidebar';
import useClients from '@features/admin/clients/use-clients';
import { ClientHistory } from '@features/admin/clients/components/client-history';
import { Button } from '@shared/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ClientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clientes, loading } = useClients();

  const cliente = clientes.find((c) => c.id === Number(id));

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-page-header">
          <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={() => navigate('/admin/clientes')}>
            Volver
          </Button>
          <h1 className="admin-page-title" style={{ marginTop: 12 }}>
            Perfil de <em>Cliente</em>
          </h1>
          <p className="admin-page-subtitle">
            {loading ? 'Cargando...' : cliente?.nombre || 'Cliente no encontrado'}
          </p>
        </div>

        <div className="layout-two-col" style={{ marginTop: 0, height: 'calc(100vh - 220px)' }}>
          <div className="layout-two-col-list" style={{ border: 'none' }}>
            <div style={{ padding: 28 }}>
              {cliente && (
                <>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'var(--color-linen)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                  }}>
                    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--color-warm-gray)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 8 }}>
                    {cliente.nombre}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <p style={{ fontSize: 13, color: 'var(--color-muted)' }}>{cliente.email}</p>
                    <p style={{ fontSize: 13, color: 'var(--color-muted)' }}>{cliente.telefono}</p>
                    <p style={{ fontSize: 12, color: 'var(--color-light-muted)', marginTop: 8 }}>
                      Cliente desde {new Date(cliente.creadoEn).toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="layout-two-col-detail">
            <ClientHistory cliente={cliente} />
          </div>
        </div>
      </div>
    </div>
  );
}
