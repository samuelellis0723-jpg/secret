import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@context/AuthContext';
import { ThemeProvider } from '@context/ThemeContext';
import { AtelierProvider } from '@context/AtelierContext';
import { AppRouter } from '@routing/AppRouter';
import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AtelierProvider>
            <div className="app-container">
              <main className="main-content">
                <AppRouter />
              </main>
            </div>
          </AtelierProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

