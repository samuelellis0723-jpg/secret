import { Link } from 'react-router-dom';

export function ServiceCard({ service }) {
  const { name, description, duration, price, modalities } = service;

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 flex flex-col h-full hover:border-white/30 hover:bg-white/10 transition-all duration-300 shadow-xl">
      <div className="flex-grow">
        <h3 className="text-2xl font-serif mb-3 text-cream">{name}</h3>
        <p className="text-sm text-cream/70 font-sans leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {modalities.map(mod => (
            <span key={mod} className="text-[10px] uppercase tracking-wider bg-white/10 px-2.5 py-1 text-cream/90 font-medium rounded-sm border border-white/10">
              {mod}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between font-sans">
        <div>
          <p className="text-xs text-cream/60">Duración: {duration} min</p>
          <p className="text-lg font-medium text-white mt-1">₡{price.toLocaleString('es-CR')}</p>
        </div>
        <Link 
          to={`/solicitar-cita?service=${service.id}`}
          className="text-sm font-medium border border-cream/50 text-cream px-4 py-2 hover:bg-cream hover:text-dark transition-colors"
        >
          Agendar
        </Link>
      </div>
    </div>
  );
}
