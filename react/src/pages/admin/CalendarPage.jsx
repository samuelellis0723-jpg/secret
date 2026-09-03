import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@components/admin/AdminSidebar';
import { MonthView } from '@components/admin/MonthView';
import { WeekView } from '@components/admin/WeekView';
import { BlockUnavailableModal } from '@components/admin/BlockUnavailableModal';
import { Button } from '@components/ui/Button';
import { Loader } from '@components/ui/Loader';
import adminService from '@services/adminService';
import { Plus, CalendarDays, Rows3 } from 'lucide-react';

export default function CalendarPage() {
  const [citas, setCitas] = useState([]);
  const [bloqueos, setBloqueos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState('month');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const loadCalendarData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [citasRes, bloqueosRes] = await Promise.all([
        adminService.getCitas(),
        adminService.getBloqueos(),
      ]);
      setCitas(citasRes);
      setBloqueos(bloqueosRes);
    } catch (err) {
      setError(err?.toString() || 'Error al cargar calendario');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalendarData();
  }, []);

  const siguienteMes = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const mesAnterior = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleBlock = async (datos) => {
    try {
      await adminService.createBloqueo(datos);
      loadCalendarData();
    } catch (err) {
      alert('Error al crear bloqueo: ' + err);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <div
          className="admin-page-header"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}
        >
          <div>
            <h1 className="admin-page-title">
              <em>Calendario</em> y Disponibilidad
            </h1>
            <p className="admin-page-subtitle">Gestiona horarios, turnos y bloqueos</p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              variant={view === 'month' ? 'primary' : 'secondary'}
              size="sm"
              icon={CalendarDays}
              onClick={() => setView('month')}
            >
              Mes
            </Button>
            <Button
              variant={view === 'week' ? 'primary' : 'secondary'}
              size="sm"
              icon={Rows3}
              onClick={() => setView('week')}
            >
              Semana
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setIsModalOpen(true)}
            >
              Bloquear Horario
            </Button>
          </div>
        </div>

        {loading && <Loader text="Cargando calendario..." />}

        {error && (
          <div style={{ padding: 16, color: 'var(--color-cancelled-text)', fontSize: 13 }}>
            Error: {error}
          </div>
        )}

        {!loading && view === 'month' && (
          <MonthView
            currentMonth={currentMonth}
            citas={citas}
            bloqueos={bloqueos}
            onNextMonth={siguienteMes}
            onPrevMonth={mesAnterior}
            onSelectDate={(fecha) => {
              setSelectedDate(fecha);
              setIsModalOpen(true);
            }}
          />
        )}

        {!loading && view === 'week' && (
          <WeekView
            currentMonth={currentMonth}
            citas={citas}
            bloqueos={bloqueos}
          />
        )}

        <BlockUnavailableModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setSelectedDate(''); }}
          onBlock={handleBlock}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}
