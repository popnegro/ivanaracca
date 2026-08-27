/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Leaf, Award, Recycle, Sparkles } from 'lucide-react';
import { BRAND_STORY } from '../data';

export default function BespokeBanner() {
  const pillars = [
    {
      icon: <Leaf className="w-5 h-5 text-luxury-gold" />,
      title: "Materia Noble Certificada",
      desc: BRAND_STORY.materials
    },
    {
      icon: <Award className="w-5 h-5 text-luxury-gold" />,
      title: "Oficio y Paciencia",
      desc: BRAND_STORY.atelier
    },
    {
      icon: <Recycle className="w-5 h-5 text-luxury-gold" />,
      title: "Moda Consciente y Sostenible",
      desc: "Creemos en el residuo mínimo. Confeccionamos sobre pedido o en lotes minúsculos para asegurar que ningún material termine en desuso. Todo descarte textil del atelier se transforma en forros, apliques o empaques secundarios."
    }
  ];

  return (
    <section id="sostenibilidad" className="py-20 md:py-28 bg-luxury-ivory relative overflow-hidden border-t border-sand-200">
      
      {/* Decorative vertical thread lines representing loom threads */}
      <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-sand-200/50 hidden md:block" />
      <div className="absolute left-2/4 top-0 bottom-0 w-[1px] bg-sand-200/50 hidden md:block" />
      <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-sand-200/50 hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: Philosophy statement */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-widest text-luxury-gold uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Manifiesto de Lujo</span>
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-luxury-charcoal leading-tight">
              {BRAND_STORY.philosophy.split('.')[0]}.
            </h2>
          </div>
          <p className="text-xs text-luxury-charcoal/70 leading-relaxed font-sans font-light">
            En un mundo de velocidad desmedida, elegimos habitar la calma. La moda no debe ser desechable; es una extensión espacial y escultórica que atesora memorias en la urdimbre de sus telas.
          </p>

          <div className="pt-6">
            <span className="font-mono text-[10px] text-luxury-charcoal/40 uppercase block">
              — IVANA RACCA, Directora Creativa
            </span>
          </div>
        </div>

        {/* Right column: Asymmetric grid of sustainable pillars */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white p-6 md:p-8 border border-sand-200 hover:border-luxury-gold hover:shadow-lg transition-all duration-300 flex flex-col justify-between group h-full"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center group-hover:bg-luxury-gold/10 transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-lg font-medium text-luxury-charcoal">
                  {pillar.title}
                </h3>
                <p className="text-[11px] text-luxury-charcoal/70 leading-relaxed font-sans font-light">
                  {pillar.desc}
                </p>
              </div>

              <div className="font-mono text-[10px] text-luxury-gold pt-6 uppercase tracking-wider block font-semibold">
                Cert. Atelier 0{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
