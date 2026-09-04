import { useEffect, useState } from 'react';
import { ServiceCard } from '../../../shared/components/ui/service-card';
import apiClient from '../../../shared/services/api-client';

export function AuthorServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carga de servicios desde db.json simulado
    apiClient.get('/servicios')
      .then(res => {
        setServices(res.data || []);
      })
      .catch(err => console.error("Error al cargar servicios:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="servicios" className="py-24 bg-transparent">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-white">Servicios</h2>
        </div>

        {loading ? (
          <div className="text-center py-12 font-sans text-cream/50">Cargando servicios...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
