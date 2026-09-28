import React, { useEffect, useState } from 'react';
import { useReducedMotion, motion } from 'motion/react';
import type { CatalogItem } from '../data';
import { CATALOG_ITEMS } from '../data';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackCatalogInquiry, trackEvent } from '../utils/analytics';
import { applyPageMeta, injectJsonLd, removeJsonLd } from '../utils/seo';
import { buildProductPageGraph } from '../utils/schema';
import { navigate } from '../utils/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

type Props = {
  product: CatalogItem;
};

export default function ProductPage({ product }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState(0);
  const related = CATALOG_ITEMS.filter((p) => p.slug !== product.slug);

  useEffect(() => {
    applyPageMeta({
      title: product.seoTitle,
      description: product.seoDescription,
      canonicalPath: `/catalogo/${product.slug}`,
      imagePath: '/images/og-image.webp',
      imageAlt: `${product.name} — Ivana Racca, Maipú Mendoza`,
    });

    injectJsonLd('product-page-jsonld', buildProductPageGraph(product));

    trackEvent('view_item', {
      item_id: product.id,
      item_name: product.name,
      item_category: 'catalog',
    });

    return () => {
      removeJsonLd('product-page-jsonld');
    };
  }, [product]);

  const handleWhatsApp = () => {
    trackCatalogInquiry(product.name, product.id);
    trackEvent('generate_lead', {
      lead_type: 'whatsapp',
      item_name: product.name,
      page_type: 'product',
    });
  };

  const waHref = getWhatsAppUrl(product.whatsappMessage);

  return (
    <div className="relative min-h-screen bg-brand-ivory text-brand-black selection:bg-brand-brown selection:text-brand-white">
      <Header />

      <main className="pb-24 md:pb-0">
        <nav
          aria-label="Miga de pan"
          className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pt-28 md:pt-32 pb-6"
        >
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-black/50">
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
            <li>
              <a
                href="/#catalogo"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
                className="hover:text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown"
              >
                Catálogo
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-brand-black/80">{product.name}</li>
          </ol>
        </nav>

        <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square w-full overflow-hidden bg-brand-white border border-brand-brown/10"
            >
              <img
                src={product.imageUrl}
                alt={`${product.name} — confección Ivana Racca, Maipú Mendoza`}
                className="w-full h-full object-cover"
                width={896}
                height={896}
                fetchPriority="high"
                decoding="async"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-brand-black/80 text-brand-white font-mono text-[10px] tracking-widest uppercase backdrop-blur-xs">
                Fotos ilustrativas
              </span>
            </motion.div>

            <div className="space-y-8 lg:sticky lg:top-28">
              <div className="space-y-4">
                <p className="font-mono text-xs tracking-widest text-brand-brown uppercase">
                  Catálogo · Maipú, Mendoza
                </p>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-brand-black leading-tight">
                  {product.h1}
                </h1>
                <p className="font-serif text-lg md:text-xl font-light text-brand-black/80 leading-relaxed">
                  {product.intro}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsApp}
                  className="flex-1 text-center px-6 py-4 bg-brand-black text-brand-white hover:bg-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-colors font-mono text-xs uppercase tracking-widest"
                >
                  Consultar por WhatsApp
                </a>
                <a
                  href="/#catalogo"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                    setTimeout(() => {
                      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="flex-1 text-center px-6 py-4 border border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-colors font-mono text-xs uppercase tracking-widest"
                >
                  Ver catálogo
                </a>
              </div>

              <p className="font-sans text-sm text-brand-black/60 leading-relaxed">
                Sin compra online. Precio y plazos se acuerdan en la consulta. Atención con cita
                previa, lunes a viernes de 9 a 17 hs.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-brand-brown/10 bg-brand-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-light">Sobre esta pieza</h2>
              <p className="font-serif text-base md:text-lg font-light leading-relaxed text-brand-black/80">
                {product.longDescription}
              </p>
              <p className="font-sans text-sm text-brand-brown">{product.geoNote}</p>
            </div>
            <div className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl font-light">Por qué encargarla acá</h2>
              <ul className="space-y-4">
                {product.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 font-serif text-base font-light text-brand-black/80 leading-relaxed"
                  >
                    <span className="text-brand-brown mt-1 shrink-0" aria-hidden="true">
                      —
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-16 md:py-24">
          <h2 className="font-serif text-2xl md:text-3xl font-light mb-10">Cómo funciona</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {product.processSteps.map((step, i) => (
              <li key={step} className="space-y-3">
                <span className="font-mono text-xs tracking-widest text-brand-brown">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-serif text-lg font-light leading-snug">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsApp}
              className="inline-block px-8 py-4 bg-brand-black text-brand-white hover:bg-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-colors font-mono text-xs uppercase tracking-widest"
            >
              Empezar por WhatsApp
            </a>
          </div>
        </section>

        <section
          className="border-t border-brand-brown/10 bg-brand-ivory"
          aria-labelledby="product-faq-heading"
        >
          <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
            <h2
              id="product-faq-heading"
              className="font-serif text-2xl md:text-3xl font-light mb-10"
            >
              Preguntas frecuentes
            </h2>
            <div className="divide-y divide-brand-brown/15 border-y border-brand-brown/15">
              {product.faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={f.question}>
                    <h3 className="m-0">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaq(isOpen ? -1 : i)}
                        className="w-full text-left py-5 font-serif text-lg font-normal hover:text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown"
                      >
                        {f.question}
                      </button>
                    </h3>
                    <div hidden={!isOpen} className={isOpen ? 'pb-5' : undefined}>
                      <p className="font-serif text-base font-light text-brand-black/80 leading-relaxed">
                        {f.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-16 md:py-24 border-t border-brand-brown/10">
            <h2 className="font-serif text-2xl md:text-3xl font-light mb-10">También en el catálogo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {related.map((item) => (
                <a
                  key={item.slug}
                  href={`/catalogo/${item.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/catalogo/${item.slug}`);
                  }}
                  className="group flex gap-5 items-center border border-brand-brown/10 bg-brand-white p-4 hover:border-brand-brown/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown"
                >
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="w-20 h-20 object-cover shrink-0"
                    loading="lazy"
                    width={80}
                    height={80}
                  />
                  <div>
                    <p className="font-serif text-xl font-light group-hover:text-brand-brown transition-colors">
                      {item.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-brand-black/50 mt-1">
                      Ver ficha
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-brand-brown/15 bg-brand-ivory/95 backdrop-blur-sm p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsApp}
          className="block w-full text-center px-4 py-3.5 bg-brand-black text-brand-white font-mono text-xs uppercase tracking-widest"
        >
          Consultar por WhatsApp
        </a>
      </div>

      <Footer />
      <div className="hidden md:block">
        <WhatsAppButton />
      </div>
    </div>
  );
}
