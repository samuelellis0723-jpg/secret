import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@components/admin/AdminSidebar';
import { AdminHeader } from '@components/admin/AdminHeader';
import { ClientSearch } from '@components/admin/ClientSearch';
import { ClientList } from '@components/admin/ClientList';
import { ClientHistory } from '@components/admin/ClientHistory';
import { Loader } from '@components/ui/Loader';
import adminService from '@services/adminService';

export default function ClientsPage() {
  const [clientes, setClientes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminService.searchClientes(searchQuery);
      setClientes(res);
    } catch (err) {
      setError(err?.toString() || 'Error al buscar clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, [searchQuery]);

  const selectedCliente = clientes.find((c) => c.id === selectedId);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <AdminHeader sectionTitle="DIRECTORIO DE CLIENTES" />
        <div className="admin-page-header">
          <h1 className="admin-page-title">
            Registro de <em>Clientes</em>
          </h1>
          <p className="admin-page-subtitle">Historial de visitas y preferencias</p>
        </div>

        <ClientSearch value={searchQuery} onChange={setSearchQuery} />

        {loading && <Loader text="Cargando clientes..." />}

        {error && (
          <div style={{ padding: 16, color: 'var(--color-cancelled-text)', fontSize: 13 }}>
            Error: {error}
          </div>
        )}

        {!loading && (
          <div className="layout-two-col" style={{ marginTop: 0 }}>
            <div className="layout-two-col-list">
              <ClientList
                clientes={clientes}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>

            <div className="layout-two-col-detail">
              <ClientHistory cliente={selectedCliente} onUpdateCliente={fetchClientes} />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
