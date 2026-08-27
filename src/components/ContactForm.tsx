/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Instagram, MessageCircle, Pin, Sparkles } from 'lucide-react';
import { ContactFormData } from '../types';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }
    setIsSubmitting(true);

    // Simulate luxury API form delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Auto close success notification after 5s
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-sand-100 flex flex-col justify-center border-t border-sand-200">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Left column: brand metadata contacts */}
        <div className="col-span-12 md:col-span-5 space-y-6 md:pr-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-widest text-luxury-gold uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke & Consultas</span>
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-luxury-charcoal">
              Conversar con el Taller
            </h2>
          </div>
          
          <p className="text-xs text-luxury-charcoal/70 leading-relaxed font-sans font-light max-w-sm">
            Para proyectos a medida, consultas de talle especiales o asesoría de indumentaria para eventos, nuestra diseñadora le responderá personalmente en un plazo de 24 horas hábiles.
          </p>

          <div className="pt-6 border-t border-sand-300 space-y-4">
            {/* Atelier hours */}
            <div className="font-mono text-[10px] space-y-1">
              <span className="text-luxury-gold uppercase tracking-wider block font-semibold">Atelier Físico</span>
              <span className="text-luxury-charcoal/60 block">Palermo Chico, Buenos Aires (Con Cita Previa)</span>
              <span className="text-luxury-charcoal/40 block">Lunes a Viernes — 10:00 a 19:00</span>
            </div>

            {/* Social linkages */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white text-luxury-charcoal hover:bg-luxury-gold hover:text-white flex items-center justify-center shadow-xs hover:scale-105 transition-all"
                aria-label="Seguir en Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5491100000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white text-luxury-charcoal hover:bg-luxury-gold hover:text-white flex items-center justify-center shadow-xs hover:scale-105 transition-all"
                aria-label="Mensaje directo vía WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white text-luxury-charcoal hover:bg-luxury-gold hover:text-white flex items-center justify-center shadow-xs hover:scale-105 transition-all"
                aria-label="Inspiración Pinterest"
              >
                <Pin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right column: Interactive form */}
        <div className="col-span-12 md:col-span-7 bg-white p-6 md:p-8 border border-sand-200 shadow-xs relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {submitSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 flex flex-col items-center text-center space-y-4"
              >
                <CheckCircle2 className="w-12 h-12 text-luxury-gold animate-pulse" />
                <h3 className="font-serif text-xl font-medium text-luxury-charcoal">
                  Consulta Recibida con Éxito
                </h3>
                <p className="text-xs text-luxury-charcoal/70 max-w-sm leading-relaxed">
                  Agradecemos su interés en el atelier de <strong>Ivana Racca</strong>. Su mensaje ha sido enviado directamente a nuestro canal prioritario. Nos comunicaremos a la brevedad.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 px-5 py-2 border border-sand-300 font-mono text-[10px] uppercase tracking-widest text-luxury-charcoal hover:bg-luxury-charcoal hover:text-white transition-all"
                >
                  Enviar otra consulta
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nombre completo"
                    aria-label="Nombre completo"
                    className="w-full bg-transparent border-b border-sand-300 focus:border-luxury-gold py-3 text-xs text-luxury-charcoal focus:outline-hidden transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                    aria-label="Correo electrónico"
                    className="w-full bg-transparent border-b border-sand-300 focus:border-luxury-gold py-3 text-xs text-luxury-charcoal focus:outline-hidden transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    name="message"
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Su consulta (especifique prenda, talle o evento de ser necesario)"
                    aria-label="Su consulta"
                    className="w-full bg-transparent border-b border-sand-300 focus:border-luxury-gold py-3 text-xs text-luxury-charcoal focus:outline-hidden resize-none transition-colors"
                  />
                </div>

                {/* Form submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3.5 bg-luxury-charcoal hover:bg-black text-white font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 interactive-hover"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitiendo...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar Mensaje</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
