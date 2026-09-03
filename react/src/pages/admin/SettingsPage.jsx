import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@components/admin/AdminSidebar';
import { Loader } from '@components/ui/Loader';
import adminService from '@services/adminService';

export default function SettingsPage() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService
      .getServicios()
      .then(setServicios)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-page-header">
          <h1 className="admin-page-title">
            <em>Ajustes</em> del Atelier
          </h1>
          <p className="admin-page-subtitle">Configuración de catálogo y parámetros generales</p>
        </div>

        {loading && <Loader text="Cargando ajustes..." />}

        {!loading && (
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: 16 }}>Servicios Ofrecidos ({servicios.length})</h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tratamiento</th>
                    <th>Duración</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {servicios.map((s) => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: 500 }}>{s.nombre}</td>
                      <td>{s.duracion} min</td>
                      <td>${(s.precio || 0).toLocaleString('es-CL')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
