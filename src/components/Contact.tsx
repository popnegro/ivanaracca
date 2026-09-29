import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import SectionHeader from './SectionHeader';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackEvent, trackWhatsAppClick, trackInstagramClick } from '../utils/analytics';

const MAPS_URL =
  'https://maps.google.com/?q=Canal+de+Beagle+2520,+Maip%C3%BA,+Mendoza';

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  const handleWhatsAppClick = () => {
    trackEvent('click_cta', { button_name: 'contact_hablar_con_ivana' });
    trackWhatsAppClick(
      'contact_section',
      'Hola Ivana, tengo una idea para una prenda y me gustaría que hablemos.'
    );
  };

  const handleInstagramClick = () => {
    trackEvent('click_cta', { button_name: 'contact_instagram' });
    trackInstagramClick('contact_section');
  };

  const handleMapsClick = () => {
    trackEvent('click_cta', { button_name: 'contact_maps_address' });
    trackEvent('social_click', { network: 'google_maps', event_label: 'contact_section' });
  };

  return (
    <section id="contacto" className="py-20 md:py-32 bg-brand-white border-b border-brand-brown/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8 flex flex-col justify-center">
            <SectionHeader
              label="CONTACTO"
              title="¿Tenés una idea?"
              intro="Hablemos de cómo hacerla realidad."
            />

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: shouldReduceMotion ? 0 : 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a
                href={getWhatsAppUrl(
                  'Hola Ivana, tengo una idea para una prenda y me gustaría que hablemos.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="px-8 py-4 bg-brand-black text-brand-white hover:bg-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-all font-mono text-xs uppercase tracking-widest text-center"
              >
                HABLAR CON IVANA
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.6,
              delay: shouldReduceMotion ? 0 : 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center md:justify-end"
          >
            <div className="border-l-2 border-brand-brown/20 pl-8 py-6 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs tracking-widest text-brand-brown uppercase block">
                  Especialidades
                </span>
                <ul className="font-serif text-xl font-light text-brand-black space-y-1.5">
                  <li>Alta Costura</li>
                  <li>Diseño de Autor</li>
                  <li>Confección</li>
                  <li>Vestuario</li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs tracking-widest text-brand-brown uppercase block">
                  Ubicación
                </span>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleMapsClick}
                  className="block font-serif text-xl font-light text-brand-black hover:text-brand-brown underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-colors"
                  title="Abrir en Google Maps"
                  aria-label="Abrir ubicación en Google Maps: Canal de Beagle 2520, Maipú, Mendoza"
                >
                  <span className="block">Canal de Beagle 2520</span>
                  <span className="block text-lg text-brand-black/80">
                    M5514 Maipú, Mendoza
                  </span>
                </a>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs tracking-widest text-brand-brown uppercase block">
                  Horarios
                </span>
                <p className="font-serif text-xl font-light text-brand-black">
                  Lunes a viernes
                  <span className="block text-lg text-brand-black/80">9 a 17 hs</span>
                </p>
                <p className="font-serif text-sm font-light text-brand-black/70">
                  Atención con cita previa por WhatsApp.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
