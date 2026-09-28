import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import SectionHeader from './SectionHeader';
import { CATALOG_ITEMS } from '../data';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackEvent, trackCatalogInquiry } from '../utils/analytics';
import { navigate } from '../utils/navigation';

export default function Catalog() {
  const shouldReduceMotion = useReducedMotion();

  const handleItemClick = (itemName: string, itemId: string) => {
    trackEvent('click_cta', {
      button_name: `comprar_${itemId}`,
      item_name: itemName,
      item_id: itemId,
    });
    trackCatalogInquiry(itemName, itemId);
  };

  return (
    <section id="catalogo" className="py-20 md:py-32 bg-brand-ivory border-b border-brand-brown/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 space-y-16">
        <SectionHeader
          label="CATÁLOGO"
          title="Tres piezas creadas para necesidades reales."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {CATALOG_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <a
                  href={`/catalogo/${item.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/catalogo/${item.slug}`);
                  }}
                  className="block aspect-square w-full overflow-hidden bg-brand-white border border-brand-brown/10 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2"
                  aria-label={`Ver ficha de ${item.name}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={`${item.name} - Confección Ivana Racca, Maipú Mendoza`}
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-102 group-hover:grayscale-0"
                    loading="lazy"
                    width={600}
                    height={600}
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-brand-black/80 text-brand-white font-mono text-[10px] tracking-widest uppercase pointer-events-none backdrop-blur-xs">
                    Fotos ilustrativas
                  </span>
                </a>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-light text-brand-black uppercase tracking-wider">
                    <a
                      href={`/catalogo/${item.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/catalogo/${item.slug}`);
                      }}
                      className="hover:text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown"
                    >
                      {item.name}
                    </a>
                  </h3>
                  <p className="font-sans text-xs text-brand-black/70 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href={getWhatsAppUrl(item.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleItemClick(item.name, item.id)}
                  className="block w-full text-center px-4 py-3 bg-brand-black text-brand-white hover:bg-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-all font-mono text-xs uppercase tracking-widest"
                >
                  Consultar este producto
                </a>
                <a
                  href={`/catalogo/${item.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/catalogo/${item.slug}`);
                  }}
                  className="block w-full text-center px-4 py-2.5 border border-brand-black/20 text-brand-black/80 hover:border-brand-black hover:text-brand-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-all font-mono text-[10px] uppercase tracking-widest"
                >
                  Ver ficha completa
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
