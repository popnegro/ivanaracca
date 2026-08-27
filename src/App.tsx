import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Atelier from './components/Atelier';
import Collection from './components/Collection';
import Services from './components/Services';
import Catalog from './components/Catalog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { GraciasView, PendienteView, ErrorView } from './components/OrderReceipts';

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

  if (isGraciasPage) {
    return (
      <GraciasView
        paymentId={searchParams.get('payment_id')}
        preferenceId={searchParams.get('preference_id')}
        externalReference={searchParams.get('external_reference')}
        onGoHome={handleGoHome}
      />
    );
  }

  if (isPendingPage) {
    return <PendienteView onGoHome={handleGoHome} />;
  }

  if (isErrorPage) {
    return <ErrorView onGoHome={handleGoHome} />;
  }

  return (
    <div className="relative min-h-screen bg-brand-ivory text-brand-black selection:bg-brand-brown selection:text-brand-white overflow-hidden">
      {/* Sticky Header Navigation */}
      <Header />

      {/* Main Content Layout */}
      <main>
        {/* HERO Section */}
        <Hero />

        {/* ATELIER Section */}
        <Atelier />

        {/* COLECCIÓN Section */}
        <Collection />

        {/* OFICIO Section */}
        <Services />

        {/* CATÁLOGO Section */}
        <Catalog />

        {/* CONTACTO Section */}
        <Contact />
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Elegant Mobile Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
