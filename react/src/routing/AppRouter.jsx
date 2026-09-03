import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminRoute } from './AdminRoute';
import { PrivateRoute } from './PrivateRoute';

import HomePage from '@pages/public/home-page';
import LoginPage from '@pages/public/login-page';
import RegisterPage from '@pages/public/register-page';
import RequestAppointmentPage from '@pages/public/request-appointment-page';

import ClientDashboardPage from '@pages/client/client-dashboard-page';
import MyAppointmentsPage from '@pages/client/my-appointments-page';
import ClientProfilePage from '@pages/client/client-profile-page';

import AdminDashboardPage from '@pages/admin/AdminDashboardPage';
import ReservationsPage from '@pages/admin/ReservationsPage';
import ClientsPage from '@pages/admin/ClientsPage';
import ClientDetailPage from '@pages/admin/ClientDetailPage';
import CalendarPage from '@pages/admin/CalendarPage';
import ReportsPage from '@pages/admin/ReportsPage';
import SettingsPage from '@pages/admin/SettingsPage';

export function AppRouter() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/reservar" element={<RequestAppointmentPage />} />

      {/* Rutas Privadas Cliente */}
      <Route element={<PrivateRoute />}>
        <Route path="/mi-cuenta" element={<ClientDashboardPage />} />
        <Route path="/mis-citas" element={<MyAppointmentsPage />} />
        <Route path="/perfil" element={<ClientProfilePage />} />
      </Route>

      {/* Rutas Privadas Admin */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/reservas" element={<ReservationsPage />} />
        <Route path="/admin/clientes" element={<ClientsPage />} />
        <Route path="/admin/clientes/:id" element={<ClientDetailPage />} />
        <Route path="/admin/calendario" element={<CalendarPage />} />
        <Route path="/admin/reportes" element={<ReportsPage />} />
        <Route path="/admin/configuracion" element={<SettingsPage />} />
      </Route>

      {/* 404 Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
