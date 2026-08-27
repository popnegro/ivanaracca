import React from 'react';
import { MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl("Hola Ivana, me contacto desde tu web.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a Ivana Racca por WhatsApp"
      className="fixed bottom-6 right-6 z-40 p-4 bg-brand-black text-brand-white hover:bg-brand-brown hover:text-brand-white rounded-full shadow-lg border border-brand-brown/10 transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-brand-brown focus:ring-offset-2 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] md:pb-4"
    >
      <MessageSquare className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-[10px] tracking-wider uppercase transition-all duration-500 ease-in-out group-hover:max-w-xs group-hover:ml-2">
        Hablar con Ivana
      </span>
    </a>
  );
}
