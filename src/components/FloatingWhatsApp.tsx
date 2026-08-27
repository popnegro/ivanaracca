/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Clock, Sparkles } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappUrl = "https://wa.me/5491100000000?text=Hola%20Atelier%20Ivana%20Racca.%20Quisiera%20recibir%20asesoramiento%20personalizado%20sobre%20las%20telas%20y%20talles%20de%20la%20colección.";

  return (
    <div className="fixed bottom-6 right-6 z-35 flex flex-col items-end gap-3">
      {/* Interactive Contact & Availability Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-72 bg-white border border-luxury-gold/30 shadow-2xl p-5 font-sans text-luxury-charcoal backdrop-blur-md rounded-sm flex flex-col gap-4 relative"
          >
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-sand-200 pb-3">
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-luxury-gold block">Atelier Asistencia</span>
                <h4 className="font-serif text-sm font-semibold text-luxury-charcoal">Ivana Racca</h4>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-luxury-charcoal/40 hover:text-luxury-charcoal transition-colors p-1"
                aria-label="Cerrar detalles de contacto"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Availability hours and descriptions */}
            <div className="space-y-3 text-xs">
              <p className="text-luxury-charcoal/70 leading-relaxed font-light">
                Conéctese directamente con nuestro equipo técnico para consultas personalizadas sobre confección, moldería a medida o selección de hilados nobles.
              </p>
              
              <div className="bg-sand-50 p-2.5 border border-sand-200/60 rounded-xs flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-luxury-gold mt-0.5 shrink-0" />
                <div className="space-y-1 font-mono text-[10px] text-luxury-charcoal/80 leading-none">
                  <span className="font-semibold block uppercase text-[8px] text-luxury-charcoal/50 tracking-wider">Horario de Consultas</span>
                  <span>Lun a Vie: 10:00 — 19:00</span>
                  <span className="block">Sábados: 10:00 — 14:00</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp initiation action link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full py-2 bg-luxury-charcoal hover:bg-black text-white text-center font-mono text-[10px] uppercase tracking-widest transition-all hover:text-luxury-gold flex items-center justify-center gap-2 rounded-xs"
            >
              <Sparkles className="w-3 h-3 text-luxury-gold" />
              <span>Iniciar Consulta</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Activator Toggle Trigger */}
      <motion.button
        id="whatsapp-floating-button"
        onClick={() => setIsOpen(prev => !prev)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, delay: 1 }}
        className={`relative w-12 h-12 rounded-full shadow-xl flex items-center justify-center border transition-all duration-300 group interactive-hover ${
          isOpen 
            ? 'bg-white text-luxury-charcoal border-luxury-gold' 
            : 'bg-luxury-charcoal hover:bg-black text-white border-luxury-gold/50'
        }`}
        title="Asistencia Directa Atelier"
      >
        {/* Pulsating decorative golden halo when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-luxury-gold/20 animate-ping pointer-events-none" />
        )}
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 text-luxury-gold" />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform text-white group-hover:text-luxury-gold" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Hover caption bubble (only visible if popover is closed) */}
        {!isOpen && (
          <span className="absolute right-14 bg-white border border-sand-200 text-luxury-charcoal text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm hidden md:inline">
            Asesoría en Talles
          </span>
        )}
      </motion.button>
    </div>
  );
}

