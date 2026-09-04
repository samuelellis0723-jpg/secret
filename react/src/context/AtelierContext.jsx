import React, { createContext, useContext, useState, useEffect } from 'react';

const AtelierContext = createContext();

export function AtelierProvider({ children }) {
  const [salonActive, setSalonActive] = useState(() => {
    const saved = localStorage.getItem('atelier_salon_active');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('atelier_salon_active', JSON.stringify(salonActive));
  }, [salonActive]);

  const toggleSalonActive = () => {
    setSalonActive((prev) => !prev);
  };

  return (
    <AtelierContext.Provider value={{ salonActive, setSalonActive, toggleSalonActive }}>
      {children}
    </AtelierContext.Provider>
  );
}

export function useAtelier() {
  const context = useContext(AtelierContext);
  if (!context) {
    throw new Error('useAtelier debe ser usado dentro de un AtelierProvider');
  }
  return context;
}

export default AtelierContext;
