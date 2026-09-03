import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Páginas Públicas
import HomePage from '@pages/public/home-page';
import LoginPage from '@pages/public/login-page';
import RegisterPage from '@pages/public/register-page';
import RequestAppointmentPage from '@pages/public/request-appointment-page';

// Páginas Cliente
import ClientDashboardPage from '@pages/client/client-dashboard-page';
import MyAppointmentsPage from '@pages/client/my-appointments-page';
import AppointmentHistoryPage from '@pages/client/appointment-history-page';
import ClientProfilePage from '@pages/client/client-profile-page';

// Páginas Admin
import AdminDashboardPage from '@pages/admin/admin-dashboard-page';
import ReservationsPage from '@pages/admin/reservations-page';
import ClientsPage from '@pages/admin/clients-page';
import ClientDetailPage from '@pages/admin/client-detail-page';
import CalendarPage from '@pages/admin/calendar-page';
import ReportsPage from '@pages/admin/reports-page';
import SettingsPage from '@pages/admin/settings-page';

// Guardias de ruta
import PrivateRoute from './private-route';
import AdminRoute from './admin-route';

export function AppRouter() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/solicitar-cita" element={<RequestAppointmentPage />} />

      {/* Rutas Cliente Protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/cliente/dashboard" element={<ClientDashboardPage />} />
        <Route path="/cliente/mis-citas" element={<MyAppointmentsPage />} />
        <Route path="/cliente/historial" element={<AppointmentHistoryPage />} />
        <Route path="/cliente/perfil" element={<ClientProfilePage />} />
      </Route>

      {/* Rutas Admin Protegidas */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/reservas" element={<ReservationsPage />} />
        <Route path="/admin/clientes" element={<ClientsPage />} />
        <Route path="/admin/clientes/:id" element={<ClientDetailPage />} />
        <Route path="/admin/calendario" element={<CalendarPage />} />
        <Route path="/admin/reportes" element={<ReportsPage />} />
        <Route path="/admin/ajustes" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
