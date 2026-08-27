import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import SectionHeader from './SectionHeader';
import CollectionSlider from './CollectionSlider';
import { COLLECTION_ITEMS } from '../data';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackCollectionInquiry } from '../utils/analytics';

export default function Collection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="coleccion" className="py-20 md:py-32 bg-brand-ivory border-b border-brand-brown/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 space-y-16">

        {/* Section Header */}
        <SectionHeader
          label="COLECCIÓN"
          title="Diseños de Alta Costura"
          intro="Piezas pensadas para ser vistas, sentidas y habitadas."
        />

        {/* Asymmetrical Editorial Gallery */}
        <div className="grid grid-cols-12 gap-y-16 md:gap-x-12 lg:gap-x-20 items-start">
          {COLLECTION_ITEMS.map((item, index) => {
            // Determine column span pattern to match the requested design:
            // Item 0: narrow (5 cols) | Item 1: wide (7 cols)
            // Item 2: wide (7 cols)    | Item 3: narrow (5 cols)
            const isEvenPair = Math.floor(index / 2) % 2 === 0;
            const isLeft = index % 2 === 0;

            let colSpan = "col-span-12 ";
            if (isEvenPair) {
              colSpan += isLeft ? "md:col-span-5" : "md:col-span-7";
            } else {
              colSpan += isLeft ? "md:col-span-7" : "md:col-span-5";
            }

            // Add margin-top for asymmetric alignment
            const alignmentClass = isLeft ? "md:mt-0" : "md:mt-12";

            // Support either item.images array or single item.imageUrl
            const itemImages = item.images && item.images.length > 0 
              ? item.images 
              : (item.imageUrl ? [item.imageUrl] : []);

            return (
              <motion.div
                key={item.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : (index % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`${colSpan} ${alignmentClass} group space-y-4`}
              >
                {/* Image Slider Container with 1 to 3 photos support */}
                <CollectionSlider
                  images={itemImages}
                  name={item.name}
                  category={item.category}
                  aspectRatioClass="aspect-[4/5]"
                />

                {/* Info and CTA */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pt-2">
                  <div>
                    <h3 className="font-serif text-xl font-light text-brand-black">
                      {item.name}
                    </h3>
                    <p className="font-sans text-xs tracking-wider text-brand-brown uppercase">
                      {item.category}
                    </p>
                  </div>

                  <a
                    href={getWhatsAppUrl(item.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCollectionInquiry(item.name, item.category)}
                    className="inline-block self-start font-mono text-xs uppercase tracking-widest text-brand-black hover:text-brand-brown border-b border-brand-black hover:border-brand-brown pb-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-all"
                  >
                    CONSULTAR DISEÑO
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
