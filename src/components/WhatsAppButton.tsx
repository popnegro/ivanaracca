import React from 'react';
import { MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackEvent, trackWhatsAppClick } from '../utils/analytics';

export default function WhatsAppButton() {
  const handleClick = () => {
    trackEvent('click_cta', { button_name: 'whatsapp_floating_button' });
    trackWhatsAppClick('floating_button', 'Hola Ivana, me contacto desde tu web.');
  };

  return (
    <a
      href={getWhatsAppUrl('Hola Ivana, me contacto desde tu web.')}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Contactar a Ivana Racca por WhatsApp"
      title="Hablar con Ivana por WhatsApp"
      className="fixed bottom-6 right-6 z-40 p-4 bg-brand-black text-brand-white hover:bg-brand-brown rounded-full shadow-lg border border-brand-brown/10 transition-colors duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] md:pb-4"
    >
      <MessageSquare className="w-5 h-5" aria-hidden="true" />
    </a>
  );
}
