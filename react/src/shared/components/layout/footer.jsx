import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-black/70 backdrop-blur-md text-cream py-16 font-sans border-t border-white/10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h2 className="text-3xl font-serif tracking-widest mb-2 text-white">SECRET</h2>
          <p className="text-sm text-cream/70 max-w-xs leading-relaxed">
            El arte de la manicura elevada a su máxima expresión. Servicios en Desamparados y a domicilio.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-lg font-serif mb-2 text-white">Enlaces Rápidos</h3>
          <a href="#servicios" className="text-sm text-cream/70 hover:text-white transition-colors">Servicios</a>
          <a href="#modalidad" className="text-sm text-cream/70 hover:text-white transition-colors">Modalidad</a>
          <a href="#galeria" className="text-sm text-cream/70 hover:text-white transition-colors">Galería</a>
          <Link to="/login" className="text-sm text-cream/70 hover:text-white transition-colors">Portal de Cliente</Link>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-lg font-serif mb-2 text-white">Contacto</h3>
          <a href="mailto:hola@secretnails.cr" className="text-sm text-cream/70 hover:text-white transition-colors">hola@secretnails.cr</a>
          <a href="https://wa.me/50680000000" target="_blank" rel="noreferrer" className="text-sm text-cream/70 hover:text-white transition-colors">
            WhatsApp: +506 8000 0000
          </a>
          <div className="pt-4">
            <Link 
              to="/solicitar-cita" 
              className="inline-block bg-cream text-dark px-6 py-3 text-sm font-medium hover:bg-white transition-colors shadow-lg"
            >
              Solicitar Cita
            </Link>
          </div>
        </div>

      </div>
      
      <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-cream/40">
        &copy; {new Date().getFullYear()} Secret Nails Atelier. Todos los derechos reservados.
      </div>
    </footer>
  );
}
