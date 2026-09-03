import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { Loader } from '@components/ui/Loader';

export function AdminRoute() {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <Loader text="Verificando permisos de administración..." />;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
