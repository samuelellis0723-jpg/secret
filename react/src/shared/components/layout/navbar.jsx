import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="w-full bg-black/60 backdrop-blur-md sticky top-0 z-50 border-b border-white/10 text-cream">
      {/* Top Notification Bar */}
      <div className="bg-black/80 text-cream/90 text-xs text-center py-2 tracking-widest font-sans border-b border-white/5">
        AGENDA ABIERTA PARA ESTA SEMANA — ESPACIOS LIMITADOS
      </div>
      
      {/* Main Navbar */}
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-serif font-semibold tracking-wide text-cream">
          SECRET
        </Link>
        
        <ul className="hidden md:flex space-x-8 font-sans text-sm tracking-wide text-cream/75">
          <li><a href="#servicios" className="hover:text-white transition-colors">Servicios</a></li>
          <li><a href="#modalidad" className="hover:text-white transition-colors">Modalidad</a></li>
          <li><a href="#galeria" className="hover:text-white transition-colors">Archivo Visual</a></li>
          <li><a href="#ubicacion" className="hover:text-white transition-colors">Ubicación</a></li>
        </ul>
        
        <div>
          <Link 
            to="/login" 
            className="text-sm font-sans font-medium border border-cream/50 text-cream px-5 py-2 hover:bg-cream hover:text-dark transition-colors"
          >
            INICIAR SESIÓN
          </Link>
        </div>
      </nav>
    </header>
  );
}
