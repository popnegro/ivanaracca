import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import SectionHeader from './SectionHeader';
import { EVENT_ITEMS, EVENT_TYPE_LABEL } from '../data/events';
import { navigate } from '../utils/navigation';

/** Home preview — full archive lives on /eventos */
export default function Events() {
  const shouldReduceMotion = useReducedMotion();
  const preview = EVENT_ITEMS.slice(0, 2);

  return (
    <section
      id="eventos"
      className="py-20 md:py-32 bg-brand-white border-b border-brand-brown/10"
      aria-labelledby="eventos-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 space-y-12 md:space-y-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <SectionHeader
              label="EVENTOS"
              title="Diseños para Ana Laura Nicoletti"
              intro="Piezas de autor creadas para escena y producciones. El archivo completo y las notas de prensa están en la página de Eventos."
            />
            <h2 id="eventos-heading" className="sr-only">
              Eventos — diseños para Ana Laura Nicoletti
            </h2>
          </div>
          <a
            href="/eventos"
            onClick={(e) => {
              e.preventDefault();
              navigate('/eventos');
            }}
            className="shrink-0 self-start md:self-auto px-6 py-3 border border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-colors font-mono text-xs uppercase tracking-widest"
          >
            Ver archivo
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {preview.map((item, index) => (
            <motion.article
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.1,
              }}
              className="group space-y-4"
            >
              <a
                href="/eventos"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/eventos');
                }}
                className="block aspect-[4/5] overflow-hidden border border-brand-brown/10 bg-brand-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown"
              >
                <img
                  src={item.images[0]}
                  alt={`${item.pieceName} — diseño de Ivana Racca para ${item.featuredPerson}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                  width={640}
                  height={800}
                />
              </a>
              <div className="space-y-2">
                <p className="font-mono text-[10px] tracking-widest text-brand-brown uppercase">
                  {item.dateLabel} · {EVENT_TYPE_LABEL[item.type]}
                </p>
                <h3 className="font-serif text-2xl font-light">{item.title}</h3>
                <p className="font-serif text-sm font-light text-brand-black/70 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
