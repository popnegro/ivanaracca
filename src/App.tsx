/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Mail, Heart, Sparkles, ChevronRight, Check } from 'lucide-react';

import { Product, CartItem, ColorVariant } from './types';
import { BRAND_NAME, PRODUCTS, GALLERY_IMAGES, TESTIMONIALS } from './data';

// Component imports
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import BespokeBanner from './components/BespokeBanner';
import LookbookSlider from './components/LookbookSlider';
import VideoPresentation from './components/VideoPresentation';
import FAQAccordion from './components/FAQAccordion';
import ContactForm from './components/ContactForm';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { GraciasView, PendienteView, ErrorView } from './components/OrderReceipts';

export default function App() {
  // --- Cart State & Persistence ---
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mf_atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('mf_atelier_cart', JSON.stringify(cart));
  }, [cart]);

  // --- UI Interactivity States ---
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  /**
   * Triggers an elegant visual notification that disappears after 5 seconds.
   */
  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  // --- Client-Side SPA Routing ---
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
    // Navigate home smoothly
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    setSearchParams(new URLSearchParams());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Shopping Cart Action Hooks ---
  const handleAddToCart = (product: Product, color: ColorVariant, size: string) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedColor.hex === color.hex && 
        item.selectedSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { product, selectedColor: color, selectedSize: size, quantity: 1 }];
      }
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, colorHex: string, size: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, colorHex, size);
      return;
    }
    setCart(prev => prev.map(item => 
      (item.product.id === productId && item.selectedColor.hex === colorHex && item.selectedSize === size)
        ? { ...item, quantity: newQty }
        : item
    ));
  };

  const handleRemoveItem = (productId: string, colorHex: string, size: string) => {
    setCart(prev => prev.filter(item => 
      !(item.product.id === productId && item.selectedColor.hex === colorHex && item.selectedSize === size)
    ));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // --- Mercado Pago Preference integration API proxy caller ---
  const handleCheckout = async (customer: { name: string; email: string }, discountPercent: number = 0) => {
    setCheckoutLoading(true);
    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          customer,
          selectedColor: cart[0]?.selectedColor,
          selectedSize: cart[0]?.selectedSize,
          discountPercent
        })
      });

      if (!response.ok) {
        throw new Error('No se pudo establecer conexión con el taller de Mercado Pago.');
      }

      const data = await response.json();
      
      // If payment is simulation, clean checkout bag first to mimic actual sales
      if (data.isMock) {
        handleClearCart();
      }

      // Secure redirection to Mercado Pago Gateway / checkout page
      window.location.href = data.initPoint;

    } catch (error: any) {
      console.error("Error starting checkout:", error);
      triggerToast(error.message || "Lo sentimos, hubo un inconveniente al conectar con Mercado Pago. Reintente en unos instantes.", 'error');
    } finally {
      setCheckoutLoading(false);
    }
  };

  // --- Newsletter sign-up ---
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  // ==========================================
  // RENDER DYNAMIC SUB-VIEW ROUTES
  // ==========================================
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

  // ==========================================
  // RENDER MAIN ONE-PAGE PREMIUM WEBSITE
  // ==========================================
  return (
    <div className="relative min-h-screen text-luxury-charcoal selection:bg-luxury-gold selection:text-white bg-luxury-ivory overflow-hidden">
      
      {/* Luxury dynamic components */}
      <CustomCursor />
      <FloatingWhatsApp />

      {/* Persistent responsive Navbar */}
      <Navbar 
        onOpenCart={() => setCartOpen(true)} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        isCheckoutLoading={checkoutLoading}
      />

      {/* Product Quick-View Details Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* ==========================================
          SECTION 1: HERO
          ========================================== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Editorial Parallax background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80"
            alt="Ivana Racca Colección Editorial"
            className="w-full h-full object-cover grayscale brightness-[0.85] origin-center scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-luxury-ivory via-transparent to-black/30" />
        </div>

        {/* Brand typographic claim */}
        <div className="relative z-10 text-center space-y-6 max-w-4xl px-6 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-3"
          >
            <span className="font-mono text-xs tracking-[0.4em] text-luxury-gold uppercase block">
              Atelier Buenos Aires
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white select-none">
              Ivana Racca
            </h1>
            <p className="font-serif text-lg md:text-xl italic text-white/90 tracking-wide font-light">
              — El lujo de la lentitud
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <a
              href="#coleccion"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-luxury-charcoal hover:bg-luxury-gold hover:text-white transition-all font-mono text-xs uppercase tracking-widest text-center"
            >
              Ver Colección
            </a>
            <button
              onClick={() => {
                const firstProd = PRODUCTS[0];
                if (firstProd) setSelectedProduct(firstProd);
              }}
              className="w-full sm:w-auto px-8 py-3.5 border border-white/80 text-white hover:bg-white/10 transition-all font-mono text-xs uppercase tracking-widest"
            >
              Comprar Pieza
            </button>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-1.5 opacity-75 animate-bounce">
          <span className="font-mono text-[9px] uppercase tracking-widest text-luxury-charcoal">Scroll</span>
          <ArrowDown className="w-4 h-4 text-luxury-charcoal stroke-[1.5]" />
        </div>
      </section>

      {/* ==========================================
          SECTION 2: SOBRE LA DISEÑADORA
          ========================================== */}
      <section id="sobre-la-disenadora" className="py-24 md:py-32 bg-sand-50 relative overflow-hidden">
        {/* Frame borders to resemble a high fashion printed magazine */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Small Editorial Picture */}
          <div className="col-span-12 md:col-span-5 relative">
            <div className="aspect-[3/4] w-full max-w-sm mx-auto bg-sand-200 overflow-hidden relative shadow-lg group">
              <img
                src="/src/assets/images/designer_portrait_3_4_1784177751103.jpg"
                alt="Ivana Racca - Diseñadora Creativa"
                className="w-full h-full object-cover grayscale group-hover:scale-102 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 text-luxury-charcoal font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 backdrop-blur-xs">
                I.R. / Retrato de Estudio
              </div>
            </div>
          </div>

          {/* Column 2: Rich text narrative */}
          <div className="col-span-12 md:col-span-7 space-y-6 md:pl-6">
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-widest text-luxury-gold uppercase block">
                La Autora
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-luxury-charcoal">
                Ivana Racca
              </h2>
              <div className="h-[1px] w-12 bg-luxury-gold" />
            </div>

            <p className="font-serif text-lg text-luxury-charcoal/80 leading-relaxed italic">
              "El diseño no nace para encajar, nace para sostenerse en el espacio."
            </p>

            <div className="space-y-4 text-xs text-luxury-charcoal/70 leading-relaxed font-sans font-light">
              <p>
                Nacida entre hilanderías y formaciones textiles arquitectónicas, Ivana concibe la indumentaria como una estructura habitable. Su trabajo se aleja de la pirotecnia visual para centrarse en la pureza tridimensional del tejido, el equilibrio asimétrico de los pesos y la longevidad táctil.
              </p>
              <p>
                Cada patrón se traza directamente en papel pesado, permitiendo que la fibra se exprese con naturalidad en caídas sin forzar. La marca rechaza el calendario industrial: confeccionamos únicamente lo necesario, rindiendo tributo al oficio pausado del sastre y al cuidado del suelo donde crecen nuestras fibras.
              </p>
            </div>

            {/* Atelier credentials metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-sand-300">
              <div>
                <span className="font-serif text-2xl font-medium text-luxury-gold block">100%</span>
                <span className="font-mono text-[9px] text-luxury-charcoal/50 uppercase tracking-wider block">Fibras Nobles</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-medium text-luxury-gold block">Limitada</span>
                <span className="font-mono text-[9px] text-luxury-charcoal/50 uppercase tracking-wider block">Producción Anual</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-medium text-luxury-gold block">Bespoke</span>
                <span className="font-mono text-[9px] text-luxury-charcoal/50 uppercase tracking-wider block">Servicio a Medida</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 3: COLECCIÓN DESTACADA (Asymmetric Store)
          ========================================== */}
      <section id="coleccion" className="py-24 bg-luxury-ivory border-t border-sand-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 space-y-16">
          
          {/* Title Header */}
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-sand-200 pb-8">
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-widest text-luxury-gold uppercase block">
                Catálogo de Atelier
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-luxury-charcoal">
                Volumen Permanente I
              </h2>
            </div>
            <p className="font-mono text-xs text-luxury-charcoal/60 uppercase tracking-widest">
              — Ediciones Limitadas Numeradas
            </p>
          </div>

          {/* Asymmetric grid layout */}
          <div className="grid grid-cols-12 gap-y-16 md:gap-x-12 lg:gap-x-16 items-start">
            {PRODUCTS.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={(p) => setSelectedProduct(p)}
                index={idx}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 4: PHILOSOPHY (Conscient / Sustainability)
          ========================================== */}
      <BespokeBanner />

      {/* ==========================================
          SECTION 5: EDITORIAL GALLERY (Masonry grid)
          ========================================== */}
      <section className="py-24 bg-sand-50 border-t border-sand-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="font-mono text-[10px] tracking-widest text-luxury-gold uppercase block">
              Atelier Close-ups
            </span>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-luxury-charcoal">
              La Bitácora de la Hebra
            </h2>
            <div className="h-[1px] w-12 bg-luxury-gold mx-auto" />
          </div>

          {/* Masonry-like asymmetrical grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group relative aspect-square bg-sand-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover origin-center transition-transform duration-700 group-hover:scale-103 grayscale"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Label hover cards */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-luxury-gold">
                    {img.subtitle}
                  </span>
                  <h3 className="font-serif text-white text-base font-medium mt-1">
                    {img.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 6: LOOKBOOK HORIZONTAL SLIDER
          ========================================== */}
      <LookbookSlider />

      {/* ==========================================
          SECTION 7: VIDEO SHOWCASE
          ========================================== */}
      <VideoPresentation />

      {/* ==========================================
          SECTION 8: EDITORIAL REVIEWS & TESTIMONIALS
          ========================================== */}
      <section className="py-24 bg-luxury-ivory border-t border-sand-200">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-widest text-luxury-gold uppercase block">
              La Crítica Editorial
            </span>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-luxury-charcoal">
              Ecos en el Entorno
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {TESTIMONIALS.map((test, idx) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-sand-50 p-6 border border-sand-200 space-y-4 flex flex-col justify-between"
              >
                <p className="font-serif text-xs italic text-luxury-charcoal/80 leading-relaxed">
                  "{test.quote}"
                </p>
                <div>
                  <h4 className="font-serif text-xs font-semibold text-luxury-charcoal">
                    {test.author}
                  </h4>
                  <span className="font-mono text-[9px] text-luxury-gold uppercase tracking-wider block mt-0.5">
                    {test.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          SECTION 9: FAQ ACCORDION (With JSON-LD Schema)
          ========================================== */}
      <FAQAccordion />

      {/* ==========================================
          SECTION 10: CONTACT FORM
          ========================================== */}
      <ContactForm />

      {/* ==========================================
          FOOTER & NEWSLETTER SIGNUP
          ========================================== */}
      <footer className="bg-luxury-charcoal text-white pt-16 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5 pb-16">
          
          {/* Brand Manifesto block */}
          <div className="col-span-12 md:col-span-4 space-y-4">
            <h3 className="font-serif text-xl tracking-wider font-semibold">
              {BRAND_NAME}
            </h3>
            <p className="text-white/60 text-xs leading-relaxed max-w-xs font-light">
              Un universo de sastrería tridimensional y tejidos de memoria. Confeccionamos despacio, preservando el pulso humano en cada puntada.
            </p>
          </div>

          {/* Quick links indexes */}
          <div className="col-span-12 sm:col-span-6 md:col-span-3 space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-luxury-gold font-bold">
              Estudio
            </h4>
            <ul className="space-y-2 text-white/50 text-xs font-mono uppercase tracking-widest">
              <li>
                <a href="#sobre-la-disenadora" className="hover:text-white transition-colors">La Diseñadora</a>
              </li>
              <li>
                <a href="#coleccion" className="hover:text-white transition-colors">La Colección</a>
              </li>
              <li>
                <a href="#sostenibilidad" className="hover:text-white transition-colors">Sostenibilidad</a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white transition-colors">Citas Atelier</a>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription form */}
          <div className="col-span-12 sm:col-span-6 md:col-span-5 space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-luxury-gold font-bold flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-luxury-gold" />
              <span>Suscripción Bitácora</span>
            </h4>
            <p className="text-white/60 text-xs leading-relaxed font-light">
              Reciba las novedades exclusivas sobre nuevos despachos textiles y el lanzamiento de nuestras cápsulas limitadas.
            </p>

            <AnimatePresence mode="wait">
              {newsletterSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/5 border border-luxury-gold/50 p-4 rounded flex items-center gap-3 text-xs"
                >
                  <div className="w-6 h-6 bg-luxury-gold/20 text-luxury-gold rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Inscripción confirmada. Bienvenido a la bitácora.</span>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleNewsletterSubmit}
                  className="flex border-b border-white/20 focus-within:border-luxury-gold transition-colors py-1"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Su correo electrónico"
                    className="flex-1 bg-transparent border-0 text-white placeholder-white/30 text-xs focus:ring-0 focus:outline-hidden py-2"
                  />
                  <button
                    type="submit"
                    className="p-2 text-luxury-gold hover:text-white transition-colors"
                    aria-label="Suscribirse al newsletter"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Lower footer note */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-white/30">
          <p>© {new Date().getFullYear()} {BRAND_NAME} Atelier. Todos los derechos reservados.</p>
          <div className="flex gap-4 items-center">
            <a href="#faq" className="hover:text-white transition-colors">Términos de Confección</a>
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <span className="flex items-center gap-1">
              Hecho con <Heart className="w-3 h-3 text-red-500 fill-current" /> en Buenos Aires
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification System */}
      <AnimatePresence>
        {toast && (
          <motion.div
            id="app-toast-notification"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 shadow-2xl border ${
              toast.type === 'error'
                ? 'bg-[#121212]/95 border-red-500/40 text-red-100'
                : 'bg-white/95 border-luxury-gold/40 text-luxury-charcoal'
            } backdrop-blur-md max-w-sm w-[90%] text-xs font-mono`}
          >
            <div className={`w-2 h-2 rounded-full ${toast.type === 'error' ? 'bg-red-500 animate-pulse' : 'bg-luxury-gold'}`} />
            <div className="flex-1">{toast.message}</div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
