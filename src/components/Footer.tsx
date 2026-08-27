import React from 'react';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white py-16 border-t border-brand-brown/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 pb-12 border-b border-brand-white/10">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <span className="font-serif text-2xl tracking-[0.25em] font-light text-brand-white block">
              IVANA RACCA
            </span>
            <span className="font-serif text-sm italic text-brand-ivory/60 tracking-wider block">
              Alta Costura · Diseño de Autor · Modista
            </span>
          </div>

          {/* Contact & Navigation links */}
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div className="space-y-3">
              <span className="font-mono text-[10px] tracking-widest text-brand-brown uppercase block">
                Canales
              </span>
              <ul className="space-y-2 text-xs font-mono tracking-widest uppercase">
                <li>
                  <a 
                    href="https://www.instagram.com/ivanaracca/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-ivory/60 hover:text-brand-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a 
                    href={getWhatsAppUrl("Hola Ivana, quiero hablar con vos.")} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-ivory/60 hover:text-brand-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-[10px] tracking-widest text-brand-brown uppercase block">
                Estudio
              </span>
              <p className="text-xs font-serif italic text-brand-ivory/60">
                Maipú, Mendoza, Argentina
              </p>
            </div>
          </div>
        </div>

        {/* Lower footer copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-brand-white/40 tracking-wider uppercase">
          <p>© 2026 Ivana Racca. Todos los derechos reservados.</p>
          <p className="font-serif italic lowercase tracking-normal text-brand-white/30">
            hecho en mendoza, argentina
          </p>
        </div>

      </div>
    </footer>
  );
}
