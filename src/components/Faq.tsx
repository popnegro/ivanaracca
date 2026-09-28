import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { FAQ_ITEMS } from '../data';

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-20 md:py-32 bg-brand-ivory border-b border-brand-brown/10"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        <div className="max-w-3xl mb-12 md:mb-16">
          <SectionHeader
            label="PREGUNTAS FRECUENTES"
            title="Antes de escribir"
            intro="Respuestas claras sobre el atelier, plazos y cómo empezar."
          />
          <h2 id="faq-heading" className="sr-only">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="max-w-3xl space-y-0 divide-y divide-brand-brown/15 border-y border-brand-brown/15">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <motion.div
                key={item.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h3 className="font-serif text-lg md:text-xl font-normal text-brand-black m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-start justify-between gap-4 py-5 md:py-6 text-left hover:text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-colors"
                  >
                    <span className="flex-1">{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 mt-1 text-brand-brown transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={isOpen ? 'pb-5 md:pb-6' : undefined}
                >
                  {isOpen && (
                    <p className="font-serif text-base md:text-lg font-light leading-relaxed text-brand-black/80 pr-8">
                      {item.answer}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
