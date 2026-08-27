/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FAQ_ITEMS } from '../data';

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  // TECHNICAL SEO: Inject Schema.org FAQPage Structured Data on mount
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_ITEMS.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    const scriptId = 'faq-structured-data';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    scriptElement.textContent = JSON.stringify(faqSchema);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) {
        el.remove();
      }
    };
  }, []);

  return (
    <section id="faq" className="py-16 md:py-24 bg-luxury-ivory border-t border-sand-200">
      <div className="max-w-4xl mx-auto px-6 md:px-10 flex flex-col space-y-12">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <span className="font-mono text-[10px] tracking-widest text-luxury-gold uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Consultas Frecuentes</span>
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-luxury-charcoal">
            La Sombra del Oficio
          </h2>
          <p className="text-xs text-luxury-charcoal/60 max-w-sm mx-auto font-sans">
            Detalles sobre nuestra confección consciente, tiempos de espera, talles y envíos.
          </p>
        </div>

        {/* Accordion List container */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;
            
            return (
              <div 
                key={item.id}
                className={`border rounded-sm transition-all duration-300 ${isOpen ? 'border-luxury-gold bg-sand-100/40' : 'border-sand-200 bg-white hover:border-sand-300'}`}
              >
                {/* Accordion header button */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-hidden interactive-hover"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center space-x-3.5">
                    <span className="font-mono text-[10px] text-luxury-gold tracking-widest">
                      0{index + 1}
                    </span>
                    <span className="font-serif text-base font-medium text-luxury-charcoal pr-4">
                      {item.question}
                    </span>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-luxury-gold flex-shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Collapsible panel answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs text-luxury-charcoal/70 leading-relaxed max-w-2xl font-sans font-light pl-11">
                        <p>{item.answer}</p>
                        
                        <div className="mt-3.5 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-luxury-gold">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Categoría: {item.category}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
