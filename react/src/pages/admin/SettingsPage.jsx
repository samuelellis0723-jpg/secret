import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@components/admin/AdminSidebar';
import { AdminHeader } from '@components/admin/AdminHeader';
import { Button } from '@components/ui/Button';
import { Loader } from '@components/ui/Loader';
import { Toast } from '@components/ui/Toast';
import { useTheme } from '@context/ThemeContext';
import adminService from '@services/adminService';
import { Edit2, Save, Scissors, MapPin } from 'lucide-react';

export default function SettingsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editDuration, setEditDuration] = useState('');

  const [toast, setToast] = useState({ message: '', type: 'success' });

  const cardBg = isDark ? '#191622' : '#FFFFFF';
  const cardBorder = isDark ? '#292336' : '#EAE5DC';
  const titleColor = isDark ? '#FAF5EF' : '#0D0D0D';
  const subtitleColor = isDark ? '#8F869A' : '#6B6560';
  const headerBg = isDark ? '#15121E' : '#FAF8F5';
  const tableBorder = isDark ? '#292336' : '#EAE5DC';
  const rowBorder = isDark ? '#262035' : '#F5F2EC';

  const loadServicios = async () => {
    try {
      setLoading(true);
      const res = await adminService.getServicios();
      setServicios(res);
    } catch (err) {
      setToast({ message: 'Error al cargar servicios: ' + err, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServicios();
  }, []);

  const handleStartEdit = (s) => {
    setEditingId(s.id);
    setEditPrice(s.precio);
    setEditDuration(s.duracion);
  };

  const handleSaveEdit = (s) => {
    const updated = servicios.map((item) =>
      item.id === s.id
        ? { ...item, precio: Number(editPrice), duracion: Number(editDuration) }
        : item
    );
    setServicios(updated);
    setEditingId(null);
    setToast({ message: `Servicio "${s.nombre}" actualizado con éxito`, type: 'success' });
  };

  return (
    <div className="admin-layout" style={{ background: isDark ? '#0E0D12' : '#FAF8F5' }}>
      <AdminSidebar />
      <div className="admin-content" style={{ padding: '24px 40px 60px' }}>
        <AdminHeader sectionTitle="CONFIGURACIÓN DEL ATELIER" />
        <div className="admin-page-header">
          <h1 className="admin-page-title">
            <em>Ajustes</em> del Atelier
          </h1>
          <p className="admin-page-subtitle">Gestión de catálogo, precios en Colones (₡) y parámetros operativos</p>
        </div>

        {loading && <Loader text="Cargando configuración del Atelier..." />}

        {!loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Gestión del Catálogo de Servicios */}
            <div className="card" style={{ padding: 28, background: cardBg, borderRadius: 16, border: `1px solid ${cardBorder}`, transition: 'all 0.2s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: titleColor }}>
                    Catálogo de Tratamientos ({servicios.length})
                  </h3>
                  <p style={{ fontSize: 12, color: subtitleColor, marginTop: 2 }}>Edita precios y duraciones en tiempo real para las reservas en línea.</p>
                </div>
              </div>

              <div className="table-container" style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${tableBorder}` }}>
                <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: headerBg, borderBottom: `1px solid ${tableBorder}`, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: subtitleColor }}>
                      <th style={{ padding: '14px 20px', textAlign: 'left' }}>Tratamiento</th>
                      <th style={{ padding: '14px 20px', textAlign: 'left' }}>Duración</th>
                      <th style={{ padding: '14px 20px', textAlign: 'left' }}>Precio (CRC)</th>
                      <th style={{ padding: '14px 20px', textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicios.map((s) => {
                      const isEditing = editingId === s.id;
                      return (
                        <tr key={s.id} style={{ borderBottom: `1px solid ${rowBorder}`, background: isEditing ? (isDark ? '#231E2E' : '#FDF8F3') : 'transparent' }}>
                          <td style={{ padding: '16px 20px', fontWeight: 600, color: titleColor }}>
                            {s.nombre}
                          </td>
                          <td style={{ padding: '16px 20px', color: isDark ? '#FAF5EF' : '#2B2623' }}>
                            {isEditing ? (
                              <input
                                type="number"
                                className="input"
                                style={{ width: 80, padding: '4px 8px' }}
                                value={editDuration}
                                onChange={(e) => setEditDuration(e.target.value)}
                              />
                            ) : (
                              `${s.duracion} min`
                            )}
                          </td>
                          <td style={{ padding: '16px 20px', fontFamily: 'var(--font-serif)', fontWeight: 600, color: isDark ? '#F4A5BE' : titleColor }}>
                            {isEditing ? (
                              <input
                                type="number"
                                className="input"
                                style={{ width: 110, padding: '4px 8px' }}
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                              />
                            ) : (
                              `₡${s.precio.toLocaleString('es-CR')}`
                            )}
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                            {isEditing ? (
                              <Button variant="primary" size="sm" icon={Save} onClick={() => handleSaveEdit(s)}>
                                Guardar
                              </Button>
                            ) : (
                              <Button variant="secondary" size="sm" icon={Edit2} onClick={() => handleStartEdit(s)}>
                                Editar
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Configuración de Sede & Horarios */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              <div className="card" style={{ padding: 24, background: cardBg, borderRadius: 16, border: `1px solid ${cardBorder}` }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 12, color: titleColor }}>
                  Ubicación Principal Sede
                </h4>
                <div style={{ fontSize: 13, color: subtitleColor, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MapPin size={16} color={isDark ? '#F4A5BE' : '#0D0D0D'} /> <strong style={{ color: titleColor }}>Dirección:</strong> Desamparados Centro, San José
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Scissors size={16} color={isDark ? '#F4A5BE' : '#0D0D0D'} /> <strong style={{ color: titleColor }}>Atención:</strong> Exclusiva con cita previa
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: 24, background: cardBg, borderRadius: 16, border: `1px solid ${cardBorder}` }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 12, color: titleColor }}>
                  Horarios de Atención
                </h4>
                <div style={{ fontSize: 13, color: subtitleColor, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div>• <strong style={{ color: titleColor }}>Lunes a Viernes:</strong> 09:00 AM – 18:00 PM</div>
                  <div>• <strong style={{ color: titleColor }}>Sábados:</strong> 10:00 AM – 15:00 PM</div>
                  <div>• <strong style={{ color: titleColor }}>Domingos:</strong> Cerrado (Día de descanso)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'success' })}
        />
      </div>
    </div>
  );
}
