import React from 'react';

const images = [
  { src: '/fotosDeUñas/1.jpg', rotation: '-rotate-3', position: 'top-10 left-10 md:top-20 md:left-24', zIndex: 'z-10' },
  { src: '/fotosDeUñas/8.jpg', rotation: 'rotate-3', position: 'top-32 right-10 md:top-10 md:right-32', zIndex: 'z-20' },
  { src: '/fotosDeUñas/3.jpg', rotation: '-rotate-6', position: 'top-80 left-20 md:top-64 md:left-1/4', zIndex: 'z-30' },
  { src: '/fotosDeUñas/4.jpg', rotation: 'rotate-2', position: 'bottom-20 right-20 md:top-52 md:right-1/4', zIndex: 'z-40' },
  { src: '/fotosDeUñas/5.jpg', rotation: '-rotate-2', position: 'bottom-40 left-10 md:bottom-20 md:left-40', zIndex: 'z-20' },
  { src: '/fotosDeUñas/6.jpg', rotation: 'rotate-6', position: 'bottom-10 right-40 md:bottom-10 md:right-1/3', zIndex: 'z-10' },
  { src: '/fotosDeUñas/7.jpg', rotation: '-rotate-1', position: 'top-1/2 right-1/2 md:top-1/3 md:right-10', zIndex: 'z-30' },
  { src: '/fotosDeUñas/2.jpg', rotation: 'rotate-3', position: 'top-1/4 left-1/2 transform -translate-x-1/2 md:bottom-32 md:right-20', zIndex: 'z-50' },
];

export function CollageGallerySection() {
  return (
    <section id="galeria" className="relative w-full h-[800px] bg-transparent overflow-hidden py-24">
      {/* Contenedor relativo para posicionar absolutamente las imágenes */}
      <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute ${img.position} ${img.zIndex} ${img.rotation} 
              w-40 md:w-64 aspect-[3/4] 
              transition-all duration-500 ease-out 
              hover:z-[99] hover:!rotate-0 hover:scale-[1.15] cursor-pointer group`}
          >
            <div
              className="w-full h-full overflow-hidden border-8 border-white bg-white shadow-xl group-hover:shadow-2xl transition-shadow duration-500"
              style={{
                // Estilo para simular recorte irregular
                borderRadius: '2px 4px 3px 5px',
              }}
            >
              <img
                src={img.src}
                alt={`Nail design ${index + 1}`}
                className="w-full h-full object-cover filter contrast-110"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
