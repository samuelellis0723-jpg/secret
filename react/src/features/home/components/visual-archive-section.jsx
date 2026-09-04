export function VisualArchiveSection() {
  // Simulando imágenes estáticas de acabados
  const images = [
    "https://images.unsplash.com/photo-1519014816548-bf5fe059c98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1595868407421-4f1076f7f3da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <section id="galeria" className="py-24 bg-transparent">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">El Archivo Visual</h2>
          <p className="text-cream/70 font-sans max-w-xl mx-auto">
            Una muestra de nuestros acabados limpios y trabajo de precisión.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((src, idx) => (
            <div key={idx} className="aspect-square overflow-hidden bg-white/5 border border-white/10 rounded-sm">
              <img 
                src={src} 
                alt={`Trabajo de manicura ${idx + 1}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out opacity-90 hover:opacity-100"
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-sm font-sans font-medium border-b border-cream/50 text-cream pb-1 hover:text-white hover:border-white transition-colors">
            Ver más en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
