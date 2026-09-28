import React, { useState, useEffect, Suspense, lazy } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Atelier from './components/Atelier';
import Collection from './components/Collection';
import Services from './components/Services';
import Catalog from './components/Catalog';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { getCatalogBySlug } from './data';
import { applyPageMeta } from './utils/seo';

const GraciasView = lazy(() =>
  import('./components/OrderReceipts').then((module) => ({ default: module.GraciasView }))
);
const PendienteView = lazy(() =>
  import('./components/OrderReceipts').then((module) => ({ default: module.PendienteView }))
);
const ErrorView = lazy(() =>
  import('./components/OrderReceipts').then((module) => ({ default: module.ErrorView }))
);
const ProductPage = lazy(() => import('./components/ProductPage'));

function HomePage() {
  useEffect(() => {
    applyPageMeta({
      title: 'Ivana Racca | Alta Costura y Modista en Maipú, Mendoza',
      description:
        'Ivana Racca, diseñadora y modista en Maipú, Mendoza. Alta costura, confección a medida, ajustes, transformaciones, vestuario y ropa interior en talles exclusivos o especiales.',
      canonicalPath: '/',
      imagePath: '/images/og-image.webp',
      imageAlt: 'Ivana Racca — Alta Costura y Diseño de Autor en Mendoza',
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-ivory text-brand-black selection:bg-brand-brown selection:text-brand-white overflow-hidden">
      <Header />
      <main>
        <Hero />
        <Atelier />
        <Collection />
        <Services />
        <Catalog />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <SpeedInsights />
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleGoHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    setSearchParams(new URLSearchParams());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isGraciasPage = currentPath === '/gracias' || searchParams.get('status') === 'approved';
  const isPendingPage = currentPath === '/pendiente' || searchParams.get('status') === 'pending';
  const isErrorPage = currentPath === '/error' || searchParams.get('status') === 'rejected';

  const catalogMatch = currentPath.match(/^\/catalogo\/([a-z0-9-]+)\/?$/);
  const catalogProduct = catalogMatch ? getCatalogBySlug(catalogMatch[1]) : undefined;

  if (isGraciasPage) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-brand-ivory" />}>
        <GraciasView
          paymentId={searchParams.get('payment_id')}
          preferenceId={searchParams.get('preference_id')}
          externalReference={searchParams.get('external_reference')}
          onGoHome={handleGoHome}
        />
        <SpeedInsights />
      </Suspense>
    );
  }

  if (isPendingPage) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-brand-ivory" />}>
        <PendienteView onGoHome={handleGoHome} />
        <SpeedInsights />
      </Suspense>
    );
  }

  if (isErrorPage) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-brand-ivory" />}>
        <ErrorView onGoHome={handleGoHome} />
        <SpeedInsights />
      </Suspense>
    );
  }

  if (catalogMatch) {
    if (!catalogProduct) {
      return (
        <div className="min-h-screen bg-brand-ivory flex flex-col items-center justify-center gap-6 px-6">
          <p className="font-serif text-2xl font-light">Producto no encontrado</p>
          <button
            type="button"
            onClick={handleGoHome}
            className="px-6 py-3 bg-brand-black text-brand-white font-mono text-xs uppercase tracking-widest"
          >
            Volver al inicio
          </button>
          <SpeedInsights />
        </div>
      );
    }

    return (
      <Suspense fallback={<div className="min-h-screen bg-brand-ivory" />}>
        <ProductPage product={catalogProduct} />
        <SpeedInsights />
      </Suspense>
    );
  }

  return <HomePage />;
}
