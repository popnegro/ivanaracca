import React from 'react';
import SectionHeader from './SectionHeader';
import { SERVICES } from '../data';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function Services() {
  return (
    <section id="oficio" className="py-20 md:py-32 bg-brand-white border-b border-brand-brown/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 space-y-16">
        
        {/* Section Header */}
        <SectionHeader
          label="OFICIO"
          title="El trabajo de una modista"
          intro="Cada prenda tiene una necesidad diferente. El oficio está en saber encontrar la forma de resolverla."
        />

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((srv) => (
            <div 
              key={srv.id} 
              className="group border border-brand-brown/10 p-8 flex flex-col justify-between h-[320px] bg-brand-ivory hover:border-brand-brown transition-all duration-300 relative"
            >
              {/* Number and Title */}
              <div className="space-y-4">
                <span className="font-mono text-3xl font-light text-brand-brown/30 group-hover:text-brand-brown transition-colors block">
                  {srv.number}
                </span>
                
                <h4 className="font-serif text-lg tracking-wider font-semibold text-brand-black">
                  {srv.title}
                </h4>
                
                <p className="font-sans text-xs text-brand-black/70 leading-relaxed font-light">
                  {srv.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <a
                  href={getWhatsAppUrl(srv.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full border border-brand-black px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-brand-black hover:bg-brand-black hover:text-brand-white transition-all"
                >
                  <span>CONSULTAR</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
