import React from 'react';
import SectionHeader from './SectionHeader';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function Contact() {
  return (
    <section id="contacto" className="py-20 md:py-32 bg-brand-white border-b border-brand-brown/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Heading and CTAs */}
          <div className="space-y-8 flex flex-col justify-center">
            <SectionHeader
              label="CONTACTO"
              title="¿Tenés una idea?"
              intro="Hablemos de cómo hacerla realidad."
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={getWhatsAppUrl("Hola Ivana, tengo una idea para una prenda y me gustaría que hablemos.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-brand-black text-brand-white hover:bg-brand-brown transition-all font-mono text-xs uppercase tracking-widest text-center"
              >
                HABLAR CON IVANA
              </a>
              
              <a
                href="https://www.instagram.com/ivanaracca/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white transition-all font-mono text-xs uppercase tracking-widest text-center"
              >
                SEGUIR EN INSTAGRAM
              </a>
            </div>
          </div>

          {/* Right Column: Studio Credentials and Info */}
          <div className="flex items-center md:justify-end">
            <div className="border-l-2 border-brand-brown/20 pl-8 py-6 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-[10px] tracking-widest text-brand-brown uppercase block">
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
                <span className="font-mono text-[10px] tracking-widest text-brand-brown uppercase block">
                  Ubicación
                </span>
                <p className="font-serif text-xl font-light text-brand-black">
                  Maipú, Mendoza, Argentina
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
