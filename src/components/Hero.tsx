import React from 'react';
import { motion } from 'motion/react';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function Hero() {
  const handleScrollToCollection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector('#coleccion');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col md:flex-row items-center justify-between pt-24 md:pt-0 overflow-hidden bg-brand-ivory">
      {/* Editorial Content - Left Side */}
      <div className="w-full md:w-1/2 px-6 md:px-12 lg:px-20 py-10 md:py-0 flex flex-col justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6"
        >
          <span className="font-mono text-xs tracking-[0.25em] text-brand-brown uppercase block">
            Atelier Contemporáneo · Mendoza
          </span>
          
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-brand-black leading-[1.1]">
            Ivana Racca
          </h1>

          <p className="font-serif text-lg sm:text-xl md:text-2xl italic text-brand-brown font-light">
            Alta Costura · Diseño de Autor · Modista
          </p>

          <div className="border-l border-brand-brown/30 pl-4 py-1 text-brand-black/80 font-serif text-base sm:text-lg italic leading-relaxed space-y-1">
            <p>Diseñar es imaginar una forma.</p>
            <p>Confeccionar es hacerla realidad.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#coleccion"
              onClick={handleScrollToCollection}
              className="px-8 py-4 bg-brand-black text-brand-white hover:bg-brand-brown transition-all font-mono text-xs uppercase tracking-widest text-center"
            >
              VER COLECCIÓN
            </a>
            
            <a
              href={getWhatsAppUrl("Hola Ivana, quiero hablar con vos sobre una prenda o diseño.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white transition-all font-mono text-xs uppercase tracking-widest text-center"
            >
              HABLAR CON IVANA
            </a>
          </div>
        </motion.div>
      </div>

      {/* Editorial Image - Right Side */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="w-full h-full"
        >
          <img
            src="/src/assets/images/designer_portrait_1784177558478.jpg"
            alt="Ivana Racca trabajando en el modelado tridimensional de un diseño de alta costura"
            className="w-full h-full object-cover grayscale brightness-[0.95]"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  );
}
