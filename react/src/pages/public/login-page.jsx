import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { Button } from '@components/ui/Button';
import { Scissors, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@salonsecret.cl');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!email || !password) return;

    try {
      setLoading(true);
      setError(null);
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/mi-cuenta');
      }
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdminLogin = () => {
    setEmail('admin@salonsecret.cl');
    setPassword('admin123');
    setTimeout(() => {
      login('admin@salonsecret.cl', 'admin123')
        .then(() => navigate('/admin/dashboard'))
        .catch((err) => setError(err.message));
    }, 100);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-ivory)',
        padding: 24,
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: 440,
          padding: 36,
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-sand)',
        }}
      >
        <div style={{ textAlignment: 'center', textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'var(--color-charcoal)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <Scissors size={24} color="white" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-charcoal)' }}>
            Secret <em>Manicure Atelier</em>
          </h1>
          <p className="label-upper" style={{ marginTop: 6 }}>
            Acceso al Sistema de Gestión
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-cancelled-bg)',
              color: 'var(--color-cancelled-text)',
              fontSize: 13,
              marginBottom: 20,
              border: '1px solid var(--color-cancelled-border)',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="input-group">
            <label className="input-label">Correo Electrónico</label>
            <input
              type="email"
              className="input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@salonsecret.cl"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Contraseña</label>
            <input
              type="password"
              className="input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            iconRight={ArrowRight}
            style={{ width: '100%', marginTop: 6, padding: '12px 20px', fontSize: 14 }}
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <div
          style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop: '1px solid var(--color-linen)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 12, color: 'var(--color-warm-gray)', marginBottom: 12 }}>
            Demostración rápida de auditoría:
          </p>
          <Button
            variant="secondary"
            size="sm"
            icon={Sparkles}
            onClick={handleQuickAdminLogin}
            style={{ width: '100%', background: 'var(--color-cream)' }}
          >
            Acceso Directo Administradora (Valentina)
          </Button>
        </div>
      </div>
    </div>
  );
}
