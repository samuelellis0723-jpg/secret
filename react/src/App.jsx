import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@shared/context/auth-context';
import { Navbar } from '@shared/components/layout/navbar';
import { Footer } from '@shared/components/layout/footer';
import { AppRouter } from '@shared/routing/app-router';
import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <AppRouter />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
