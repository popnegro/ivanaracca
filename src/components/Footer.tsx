import React from 'react';
import { Instagram, MessageCircle, MapPin } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackWhatsAppClick, trackInstagramClick, trackEvent } from '../utils/analytics';

export default function Footer() {
  const handleGoogleBusinessClick = () => {
    trackEvent('click_cta', { button_name: 'google_my_business_footer' });
    trackEvent('social_click', { network: 'google_my_business', event_label: 'footer' });
  };

  return (
    <footer className="bg-brand-black text-brand-white py-16 border-t border-brand-brown/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 pb-12 border-b border-brand-white/10">
          {/* 3 Icons (Instagram, WhatsApp, Google My Business) & High-Contrast Tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <a 
                href="https://www.instagram.com/ivanaracca/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackInstagramClick('footer_icons')}
                aria-label="Instagram de Ivana Racca"
                title="Instagram — @ivanaracca"
                className="p-2.5 rounded-full border border-brand-white/20 text-brand-ivory hover:text-brand-white hover:border-brand-white hover:bg-brand-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a 
                href={getWhatsAppUrl("Hola Ivana, quiero hablar con vos.")} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('footer_icons', 'Hola Ivana, quiero hablar con vos.')}
                aria-label="WhatsApp directo con Ivana Racca"
                title="WhatsApp — Contacto directo"
                className="p-2.5 rounded-full border border-brand-white/20 text-brand-ivory hover:text-brand-white hover:border-brand-white hover:bg-brand-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              <a 
                href="https://maps.google.com/?q=Ivana+Racca+Maipu+Mendoza" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleGoogleBusinessClick}
                aria-label="Google My Business y ubicación en Maipú, Mendoza"
                title="Google My Business — Maipú, Mendoza"
                className="p-2.5 rounded-full border border-brand-white/20 text-brand-ivory hover:text-brand-white hover:border-brand-white hover:bg-brand-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown transition-all duration-300"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact & Navigation links */}
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div className="space-y-3">
               <span className="font-serif text-base font-normal text-brand-white/95 tracking-wide block">
              Alta Costura · Diseño de Autor · Modista
            </span>              
            </div>
          </div>
        </div>

        {/* Lower footer copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-brand-ivory/85 tracking-wider uppercase text-left">
          <p className="text-left">© 2026 Ivana Racca. Todos los derechos reservados.</p>
          <p className="font-serif italic lowercase tracking-normal text-brand-ivory/75 flex items-center justify-start gap-1 text-left">
            <span>creada con</span>
            <span className="text-red-400 not-italic text-md inline-block leading-none" aria-label="amor">❤️</span>
            <span>por</span>
            <a
              href="https://wa.me/5492616706710"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-ivory hover:text-brand-white underline underline-offset-2 transition-colors not-italic font-medium"
              title="Contactar a SmartWeb por WhatsApp"
            >
              smartweb
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}

