import { Check } from 'lucide-react';

export function DualModalitySection() {
  return (
    <section id="modalidad" className="py-24 bg-transparent">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Modalidad Dual</h2>
          <p className="text-cream/70 font-sans max-w-xl mx-auto">
            Elige la experiencia que mejor se adapte a tu estilo de vida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Local Card */}
          <div className="bg-white/5 backdrop-blur-md p-10 lg:p-14 border border-white/15 shadow-xl">
            <h3 className="text-3xl font-serif mb-6 text-cream">En Nuestro local</h3>
            <ul className="space-y-4 font-sans text-cream/80 text-sm">
              <li className="flex items-start"><Check className="w-5 h-5 text-cream/50 mr-3 shrink-0" /> Ambiente relajado y exclusivo.</li>
              <li className="flex items-start"><Check className="w-5 h-5 text-cream/50 mr-3 shrink-0" /> Menú de bebidas de cortesía.</li>
              <li className="flex items-start"><Check className="w-5 h-5 text-cream/50 mr-3 shrink-0" /> Acceso a todos los colores y diseños.</li>
            </ul>
          </div>

          {/* Domicilio Card */}
          <div className="bg-black/60 backdrop-blur-md text-cream p-10 lg:p-14 border border-white/20 shadow-xl relative overflow-hidden">
            <h3 className="text-3xl font-serif mb-6 text-cream">Servicio a Domicilio</h3>
            <ul className="space-y-4 font-sans text-cream/80 text-sm">
              <li className="flex items-start"><Check className="w-5 h-5 text-cream/50 mr-3 shrink-0" /> La experiencia del salón en la comodidad de tu hogar.</li>
              <li className="flex items-start"><Check className="w-5 h-5 text-cream/50 mr-3 shrink-0" /> Estación de trabajo portátil y esterilización.</li>
              <li className="flex items-start"><Check className="w-5 h-5 text-cream/50 mr-3 shrink-0" /> Acceso a todos los colores y diseños.</li>
              <li className="flex items-start"><Check className="w-5 h-5 text-cream/50 mr-3 shrink-0" /> Ahorro de tiempo en traslados.</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
