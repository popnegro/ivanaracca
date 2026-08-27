import React from 'react';
import SectionHeader from './SectionHeader';
import { COLLECTION_ITEMS } from '../data';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function Collection() {
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

            return (
              <div 
                key={item.id} 
                className={`${colSpan} ${alignmentClass} group space-y-4`}
              >
                {/* Image Wrapper */}
                <div className="aspect-[4/5] w-full overflow-hidden bg-brand-white border border-brand-brown/10">
                  <img
                    src={item.imageUrl}
                    alt={`${item.name} - Alta Costura por Ivana Racca`}
                    className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-[1.03] group-hover:grayscale-0"
                    loading="lazy"
                  />
                </div>

                {/* Info and CTA */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pt-2">
                  <div>
                    <h4 className="font-serif text-xl font-light text-brand-black">
                      {item.name}
                    </h4>
                    <p className="font-sans text-xs tracking-wider text-brand-brown uppercase">
                      {item.category}
                    </p>
                  </div>
                  
                  <a
                    href={getWhatsAppUrl(item.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block self-start font-mono text-[10px] uppercase tracking-widest text-brand-black hover:text-brand-brown border-b border-brand-black hover:border-brand-brown pb-0.5 transition-all"
                  >
                    CONSULTAR DISEÑO
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
