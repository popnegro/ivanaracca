import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import SectionHeader from './SectionHeader';

export default function Atelier() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="atelier" className="py-20 md:py-32 bg-brand-white border-b border-brand-brown/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* Left Column (Text) on desktop, bottom on mobile */}
          <div className="w-full md:w-1/2 space-y-8 order-2 md:order-1">
            <SectionHeader
              label="ATELIER"
              title="Ivana Racca"
            />

            <motion.div 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 text-brand-black/80 font-serif text-lg leading-relaxed max-w-xl"
            >
              <p className="font-semibold text-brand-brown">
                El oficio empieza mucho antes de la máquina de coser:
                empieza mirando, imaginando y entendiendo cada cuerpo.
              </p>

              <p>
                Ivana Racca es diseñadora y modista en Maipú, Mendoza.
                Su trabajo reúne alta costura, confección, diseño de prendas
                a medida y vestuario.
              </p>

              <p>
                El oficio nace de una relación cercana con los materiales,
                las formas y las personas que llevan cada prenda.
              </p>

              <p>
                Cada pieza parte de una necesidad, una idea o un cuerpo
                diferente, y encuentra su forma en el hacer.
              </p>

              <p className="font-medium">
                Diseño, técnica y oficio para crear prendas con identidad propia.
              </p>
            </motion.div>
          </div>

          {/* Right Column (Image) on desktop, top on mobile */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 order-1 md:order-2"
          >
            <div className="aspect-[3/4] w-full max-w-md mx-auto overflow-hidden bg-brand-ivory border border-brand-brown/10 shadow-xs">
              <img
                src="/images/ivana-racca-atelier.webp"
                alt="Retrato de Ivana Racca en su taller, trabajando en un diseño a medida"
                className="w-full h-full object-cover grayscale transition-transform duration-700 hover:scale-102"
                loading="lazy"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
