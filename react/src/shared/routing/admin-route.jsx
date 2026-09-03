import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

export function AdminRoute() {
  const { user } = useAuth();
  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
}

export default AdminRoute;
