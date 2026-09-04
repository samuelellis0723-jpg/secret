import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@shared/context/auth-context';
import { Navbar } from '@shared/components/layout/navbar';
import { Footer } from '@shared/components/layout/footer';
import { AppRouter } from '@shared/routing/app-router';
import { StarfieldBackground } from '@shared/components/ui/starfield-background';
import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container relative min-h-screen text-cream">
          <StarfieldBackground />
          <Navbar />
          <main className="main-content relative z-10">
            <AppRouter />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
