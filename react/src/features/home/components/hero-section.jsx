import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] bg-transparent flex items-center justify-center py-20 px-6">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center z-10">
        <span className="text-xs tracking-[0.25em] font-sans text-cream/70 uppercase mb-6 block">
          ATELIER DE MANICURA EN SAN JOSÉ
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight mb-8">
          El arte de la manicura elevada a su <em className="italic font-light text-cream">máxima</em> expresión.
        </h1>
        <p className="text-lg md:text-xl text-cream/80 font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
          Manicura profesional a domicilio o en salón, en Desamparados.
        </p>

        <div className="flex justify-center items-center">
          <Link
            to="/request-appointment"
            className="bg-cream text-dark px-10 py-4 font-sans font-medium tracking-wide hover:bg-white transition-all duration-300 flex items-center shadow-lg hover:scale-105"
          >
            SOLICITAR CITA <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
