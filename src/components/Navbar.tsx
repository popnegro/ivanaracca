/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Instagram, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BRAND_NAME } from '../data';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
}

export default function Navbar({ onOpenCart, cartCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Colección', href: '#coleccion' },
    { label: 'Sobre Nosotros', href: '#sobre-la-disenadora' },
    { label: 'Sostenibilidad', href: '#sostenibilidad' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Estudio', href: '#video-studio' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        mobileMenuOpen
          ? 'bg-luxury-ivory border-sand-200 py-4'
          : isScrolled
          ? 'bg-luxury-ivory/90 backdrop-blur-md py-4 border-sand-200 shadow-xs'
          : 'bg-transparent py-6 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Mobile menu toggle (Left on mobile) */}
        <button
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="md:hidden p-1 text-luxury-charcoal hover:text-luxury-gold transition-colors z-50"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
        </button>

        {/* Elegant Serif Brand Logo (Center on mobile, Left on desktop) */}
        <a
          href="#"
          onClick={() => setMobileMenuOpen(false)}
          className="font-serif text-lg md:text-xl lg:text-2xl font-semibold tracking-wider text-luxury-charcoal hover:opacity-80 transition-opacity z-50"
        >
          {BRAND_NAME}
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {menuItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-[10px] uppercase tracking-widest text-luxury-charcoal/80 hover:text-luxury-gold transition-colors relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-luxury-gold after:transition-all after:duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action icons (Right) */}
        <div className="flex items-center space-x-4 md:space-x-6 z-50">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block text-luxury-charcoal/60 hover:text-luxury-gold transition-colors"
            aria-label="Siga nuestra bitácora en Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Checkout Bag button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCart();
            }}
            className="relative p-1.5 rounded-full hover:bg-sand-150 transition-colors flex items-center justify-center interactive-hover"
            aria-label="Ver bolsa de compras"
          >
            <ShoppingBag className="w-5 h-5 text-luxury-charcoal hover:text-luxury-gold transition-colors" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-luxury-gold text-white font-mono text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Full-Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 z-40 bg-luxury-ivory w-full h-screen flex flex-col justify-between px-8 pb-10 pt-28 border-b border-sand-200"
          >
            {/* Navigation links stack */}
            <div className="flex flex-col space-y-6">
              <span className="font-mono text-[9px] uppercase tracking-widest text-luxury-gold">Menú de Navegación</span>
              <nav className="flex flex-col space-y-3">
                {menuItems.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                    className="font-serif text-2xl text-luxury-charcoal hover:text-luxury-gold tracking-wide py-1.5 border-b border-sand-200/50 block"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Footer details */}
            <div className="space-y-4 border-t border-sand-200/60 pt-6">
              <div className="flex justify-between items-center text-luxury-charcoal/60">
                <div className="flex items-center gap-3">
                  <a href="https://instagram.com" className="hover:text-luxury-gold transition-colors p-2 -ml-2">
                    <Instagram className="w-5 h-5 text-luxury-charcoal" />
                  </a>
                  <span className="text-[10px] font-mono tracking-widest uppercase">Atelier Buenos Aires</span>
                </div>
                <span className="text-[10px] font-mono text-luxury-gold tracking-widest uppercase">© 2026</span>
              </div>
              <p className="text-[9px] font-mono text-luxury-charcoal/40 uppercase tracking-widest leading-relaxed">
                Cada pieza es una silueta sutilmente esculpida a mano en materiales orgánicos y fibras puras de procedencia sustentable.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
