import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import {
  EVENT_ITEMS,
  EVENT_TYPE_LABEL,
  PRESS_ITEMS,
} from '../data/events';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackWhatsAppClick, trackEvent } from '../utils/analytics';
import { applyPageMeta, injectJsonLd, removeJsonLd } from '../utils/seo';
import { navigate } from '../utils/navigation';

const SITE = 'https://ivanaracca.vercel.app';
const WA_VESTUARIO =
  'Hola Ivana, quiero consultar por un diseño o vestuario para escena o evento.';

export default function EventsPage() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    applyPageMeta({
      title: 'Eventos y prensa | Ivana Racca — Maipú, Mendoza',
      description:
        'Diseños de Ivana Racca para Ana Laura Nicoletti, archivo de eventos y notas periodísticas. Atelier en Maipú, Mendoza.',
      canonicalPath: '/eventos',
      imagePath: EVENT_ITEMS[0]?.images[0] || '/images/og-image.webp',
      imageAlt: 'Eventos — diseños Ivana Racca',
    });

    const eventWorks = EVENT_ITEMS.map((item, index) => ({
      '@type': 'CreativeWork',
      '@id': `${SITE}/eventos#${item.id}`,
      name: item.title,
      description: item.summary,
      creator: { '@id': `${SITE}/#ivana-racca` },
      contributor: { '@type': 'Person', name: item.featuredPerson },
      image: item.images.map((image) => `${SITE}${image}`),
      dateCreated: item.date,
      creditText: item.credits,
      about: ['vestuario escénico', item.pieceName, item.featuredPerson],
      position: index + 1,
    }));

    injectJsonLd('eventos-page-jsonld', {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${SITE}/eventos#webpage`,
          url: `${SITE}/eventos`,
          name: 'Eventos y prensa — Ivana Racca',
          description:
            'Diseños para Ana Laura Nicoletti y notas periodísticas sobre Ivana Racca, atelier en Maipú, Mendoza.',
          isPartOf: { '@id': `${SITE}/#website` },
          about: { '@id': `${SITE}/#ivana-racca` },
          author: { '@id': `${SITE}/#ivana-racca` },
          inLanguage: 'es-AR',
          mainEntity: {
            '@type': 'ItemList',
            '@id': `${SITE}/eventos#archivo`,
            name: 'Archivo de diseños para escena',
            numberOfItems: eventWorks.length,
            itemListElement: eventWorks.map((work, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: { '@id': work['@id'] },
            })),
          },
          citation: PRESS_ITEMS.map((note) => note.url),
        },
        ...eventWorks,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: `${SITE}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Eventos',
              item: `${SITE}/eventos`,
            },
          ],
        },
      ],
    });

    trackEvent('page_view', { page_title: 'eventos', page_path: '/eventos' });

    return () => removeJsonLd('eventos-page-jsonld');
  }, []);

  const handleWa = () => {
    trackWhatsAppClick('eventos_page', WA_VESTUARIO);
  };

  return (
    <div className="relative min-h-screen bg-brand-ivory text-brand-black selection:bg-brand-brown selection:text-brand-white">
      <Header />

      <main className="pt-28 md:pt-32">
        <header className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-12 md:pb-16 border-b border-brand-brown/10">
          <nav aria-label="Miga de pan" className="mb-8">
            <ol className="flex gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-black/50">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                  }}
                  className="hover:text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown"
                >
                  Inicio
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-brand-black/80">Eventos</li>
            </ol>
          </nav>
          <p className="font-mono text-xs tracking-widest text-brand-brown uppercase mb-3">
            Eventos · Escena
          </p>
          <h1 className="font-serif text-3xl md:text-5xl font-light leading-tight max-w-3xl">
            Diseños para Ana Laura Nicoletti
          </h1>
          <p className="mt-6 font-serif text-lg font-light text-brand-black/75 leading-relaxed max-w-2xl">
            Archivo de piezas de autor creadas por Ivana Racca para Ana Laura Nicoletti —
            producciones y escena — desde el atelier de Maipú, Mendoza. Se actualiza con cada
            nuevo trabajo.
          </p>
        </header>

        {/* Episodes */}
        <section
          className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-16 md:py-24 space-y-20"
          aria-labelledby="archivo-heading"
        >
          <h2 id="archivo-heading" className="font-serif text-2xl md:text-3xl font-light">
            Archivo
          </h2>

          {EVENT_ITEMS.map((item, index) => (
            <motion.article
              key={item.id}
              id={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.05 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t border-brand-brown/10 pt-12"
            >
              <div className="lg:col-span-5 space-y-4">
                <p className="font-mono text-[10px] tracking-widest text-brand-brown uppercase">
                  {item.dateLabel} · {EVENT_TYPE_LABEL[item.type]}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-light">{item.title}</h3>
                <p className="font-sans text-xs uppercase tracking-wider text-brand-black/50">
                  {item.pieceName} · {item.featuredPerson}
                </p>
                <p className="font-serif text-base font-light text-brand-black/80 leading-relaxed">
                  {item.summary}
                </p>
                {item.credits && (
                  <p className="font-mono text-[10px] tracking-wide text-brand-black/45 leading-relaxed">
                    {item.credits}
                  </p>
                )}
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.images.map((src, i) => (
                  <div
                    key={src}
                    className={`overflow-hidden border border-brand-brown/10 bg-brand-white ${
                      item.images.length === 1
                        ? 'sm:col-span-2 aspect-[4/5]'
                        : i === 0
                          ? 'sm:col-span-2 aspect-[16/10]'
                          : 'aspect-square'
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${item.pieceName} — Ivana Racca para ${item.featuredPerson}`}
                      className="w-full h-full object-cover"
                      loading={index === 0 && i === 0 ? 'eager' : 'lazy'}
                      width={800}
                      height={i === 0 ? 500 : 800}
                    />
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </section>

        {/* Press */}
        <section
          id="prensa"
          className="border-t border-brand-brown/10 bg-brand-white"
          aria-labelledby="prensa-heading"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-16 md:py-24">
            <h2 id="prensa-heading" className="font-serif text-2xl md:text-3xl font-light mb-4">
              En la prensa
            </h2>
            <p className="font-serif text-base font-light text-brand-black/70 max-w-xl mb-12">
              Notas y perfiles publicados sobre el oficio de Ivana Racca.
            </p>
            <ul className="space-y-0 divide-y divide-brand-brown/15 border-y border-brand-brown/15">
              {PRESS_ITEMS.map((note) => (
                <li key={note.id}>
                  <a
                    href={note.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('click_cta', {
                        button_name: 'press_outbound',
                        outlet: note.outlet,
                      })
                    }
                    className="block py-8 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2"
                  >
                    <p className="font-mono text-[10px] tracking-widest text-brand-brown uppercase mb-2">
                      {note.outlet} · {note.dateLabel}
                    </p>
                    <p className="font-serif text-xl md:text-2xl font-light group-hover:text-brand-brown transition-colors leading-snug">
                      {note.title}
                    </p>
                    <p className="mt-3 font-serif text-sm font-light text-brand-black/65 leading-relaxed max-w-2xl">
                      {note.excerpt}
                    </p>
                    <span className="inline-block mt-4 font-mono text-[10px] uppercase tracking-widest text-brand-black/50 group-hover:text-brand-brown">
                      Leer nota ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-16 md:py-24">
          <div className="border border-brand-brown/15 bg-brand-white p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <h2 className="font-serif text-2xl font-light">¿Vestuario o pieza para escena?</h2>
              <p className="font-serif text-base font-light text-brand-black/70">
                Consultá por WhatsApp. Atelier en Maipú, Mendoza — cita previa de lunes a viernes,
                9 a 17 hs.
              </p>
            </div>
            <a
              href={getWhatsAppUrl(WA_VESTUARIO)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWa}
              className="shrink-0 text-center px-8 py-4 bg-brand-black text-brand-white hover:bg-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-colors font-mono text-xs uppercase tracking-widest"
            >
              Hablar con Ivana
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
