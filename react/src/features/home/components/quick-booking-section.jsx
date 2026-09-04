import { Link } from 'react-router-dom';

export function QuickBookingSection() {
  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Steps */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-12">Agenda en 3 Simples Pasos</h2>
            
            <div className="space-y-10 font-sans">
              <div className="flex items-start">
                <span className="text-3xl font-serif text-cream/40 mr-6">01</span>
                <div>
                  <h4 className="text-lg font-medium text-cream mb-2">Selecciona tu Servicio</h4>
                  <p className="text-sm text-cream/70">Elige entre nuestras manicuras de autor o servicios tradicionales.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-3xl font-serif text-cream/40 mr-6">02</span>
                <div>
                  <h4 className="text-lg font-medium text-cream mb-2">Escoge Modalidad y Fecha</h4>
                  <p className="text-sm text-cream/70">Indica si prefieres venir a nuestro local o que vayamos a tu domicilio.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-3xl font-serif text-cream/40 mr-6">03</span>
                <div>
                  <h4 className="text-lg font-medium text-cream mb-2">Confirma tu Reserva</h4>
                  <p className="text-sm text-cream/70">Recibirás confirmación instantánea con los detalles.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick CTA Form Reminder */}
          <div className="flex-1 w-full max-w-md bg-white/5 backdrop-blur-md p-10 border border-white/15 shadow-2xl">
            <h3 className="text-2xl font-serif text-cream mb-6 text-center">Inicia tu Solicitud</h3>
            <p className="text-sm font-sans text-cream/70 text-center mb-8">Accede a nuestro portal para ver disponibilidad en tiempo real y asegurar tu espacio.</p>
            
            <Link 
              to="/solicitar-cita"
              className="block w-full text-center bg-cream text-dark py-4 font-sans font-medium tracking-wide hover:bg-white transition-colors shadow-lg"
            >
              IR AL AGENDADOR
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
