import { AdminSidebar } from '@shared/components/layout/admin-sidebar';
import { Card, CardHeader, CardTitle } from '@shared/components/ui/card';
import { Button } from '@shared/components/ui/button';
import { Settings, Bell, Shield, Clock } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div className="admin-page-header">
          <h1 className="admin-page-title">
            <em>Ajustes</em> del Salón
          </h1>
          <p className="admin-page-subtitle">Configuración general del sistema</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Settings size={18} color="var(--color-warm-gray)" />
                <div>
                  <CardTitle>General</CardTitle>
                  <p style={{ fontSize: 12, color: 'var(--color-light-muted)' }}>
                    Nombre del salón, contacto, dirección
                  </p>
                </div>
              </div>
            </CardHeader>
            <Button variant="secondary" size="sm">Configurar</Button>
          </Card>

          <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Clock size={18} color="var(--color-warm-gray)" />
                <div>
                  <CardTitle>Horarios</CardTitle>
                  <p style={{ fontSize: 12, color: 'var(--color-light-muted)' }}>
                    Disponibilidad semanal y días libres
                  </p>
                </div>
              </div>
            </CardHeader>
            <Button variant="secondary" size="sm">Configurar</Button>
          </Card>

          <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Bell size={18} color="var(--color-warm-gray)" />
                <div>
                  <CardTitle>Notificaciones</CardTitle>
                  <p style={{ fontSize: 12, color: 'var(--color-light-muted)' }}>
                    Recordatorios WhatsApp, email
                  </p>
                </div>
              </div>
            </CardHeader>
            <Button variant="secondary" size="sm">Configurar</Button>
          </Card>

          <Card>
            <CardHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Shield size={18} color="var(--color-warm-gray)" />
                <div>
                  <CardTitle>Seguridad</CardTitle>
                  <p style={{ fontSize: 12, color: 'var(--color-light-muted)' }}>
                    Contraseña y permisos de acceso
                  </p>
                </div>
              </div>
            </CardHeader>
            <Button variant="secondary" size="sm">Configurar</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
