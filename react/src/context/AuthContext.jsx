import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '@services/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('secret_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('secret_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    let usuarios = [];
    try {
      usuarios = await apiClient.get('/usuarios');
    } catch (e) {
      // Fallback a datos locales si el servidor json-server no está corriendo en puerto 3001
      usuarios = [
        {
          id: 1,
          nombre: "Valentina Reyes",
          email: "admin@salonsecret.cl",
          telefono: "+56912345678",
          password: "admin123",
          role: "admin",
        },
        {
          id: 2,
          nombre: "Camila Fernández",
          email: "camila.fernandez@gmail.com",
          telefono: "+56987654321",
          password: "client123",
          role: "client",
        }
      ];
    }

    const usuario = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!usuario) {
      throw new Error('Credenciales incorrectas. Verifica el correo y la contraseña.');
    }

    const { password: _, ...userWithoutPassword } = usuario;
    setUser(userWithoutPassword);
    localStorage.setItem('secret_user', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  };


  const register = async (datos) => {
    const usuarios = await apiClient.get('/usuarios');
    const existe = usuarios.some((u) => u.email.toLowerCase() === datos.email.toLowerCase());

    if (existe) {
      throw new Error('El correo electrónico ya está registrado');
    }

    const nuevoUsuario = {
      ...datos,
      role: 'client',
      fechaRegistro: new Date().toISOString().split('T')[0],
    };

    const creado = await apiClient.post('/usuarios', nuevoUsuario);
    const { password: _, ...userWithoutPassword } = creado;
    setUser(userWithoutPassword);
    localStorage.setItem('secret_user', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('secret_user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isClient: user?.role === 'client',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}

export default AuthContext;
