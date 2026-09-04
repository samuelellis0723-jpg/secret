import { MapPin, Clock } from 'lucide-react';

export function LocationHoursSection() {
  return (
    <section id="ubicacion" className="py-24 bg-transparent">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Info */}
          <div className="flex-1 lg:pr-12">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-12">Ubicación y Horarios</h2>
            
            <div className="space-y-10 font-sans">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-cream/75 mr-4 shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-medium text-cream mb-2">Zona de Servicio</h4>
                  <p className="text-sm text-cream/70">Nuestro local está ubicado en Desamparados, San José.<br/>(Dirección exacta brindada al confirmar cita)</p>
                  <p className="text-sm text-cream/70 mt-2">También ofrecemos servicio a domicilio en toda el Área Metropolitana.</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-cream/75 mr-4 shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-medium text-cream mb-2">Horario de Atención</h4>
                  <table className="text-sm text-cream/70 w-full max-w-xs">
                    <tbody>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Lunes a Viernes</td>
                        <td className="text-right font-medium text-cream">7:00 am - 8:00 pm</td>
                      </tr>
                      <tr>
                        <td className="py-2">Fines de Semana</td>
                        <td className="text-right font-medium text-cream">9:00 am - 3:00 pm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 h-[400px] bg-black/40 border border-white/15 rounded-sm overflow-hidden shadow-2xl">
            <iframe
              title="Mapa de Ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31435.532394747513!2d-84.0725208!3d9.8967406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e300d6de0275%3A0xc3d33db86e4136bc!2sDesamparados%2C%20San%20Jos%C3%A9!5e0!3m2!1sen!2scr!4v1715000000000!5m2!1sen!2scr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale invert opacity-75 contrast-125"
            ></iframe>
          </div>
          
        </div>
      </div>
    </section>
  );
}
