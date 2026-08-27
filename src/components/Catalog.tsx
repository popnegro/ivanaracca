import React from 'react';
import SectionHeader from './SectionHeader';
import { CATALOG_ITEMS } from '../data';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function Catalog() {
  return (
    <section id="catalogo" className="py-20 md:py-32 bg-brand-ivory border-b border-brand-brown/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 space-y-16">
        
        {/* Section Header */}
        <SectionHeader
          label="CATÁLOGO"
          title="Tres piezas creadas para necesidades reales."
        />

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {CATALOG_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="group space-y-6 flex flex-col justify-between"
            >
              {/* Content and Image */}
              <div className="space-y-4">
                {/* Product Image */}
                <div className="aspect-square w-full overflow-hidden bg-brand-white border border-brand-brown/10 relative">
                  <img
                    src={item.imageUrl}
                    alt={`${item.name} - Confección Ivana Racca`}
                    className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-102 group-hover:grayscale-0"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h4 className="font-serif text-2xl font-light text-brand-black uppercase tracking-wider">
                    {item.name}
                  </h4>
                  <p className="font-sans text-xs text-brand-black/70 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <a
                  href={getWhatsAppUrl(item.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-3 bg-brand-black text-brand-white hover:bg-brand-brown transition-all font-mono text-xs uppercase tracking-widest"
                >
                  CONSULTAR ESTE PRODUCTO
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
