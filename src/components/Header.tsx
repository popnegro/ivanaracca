import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackWhatsAppClick } from '../utils/analytics';
import { PRIMARY_NAV } from '../nav';
import { goNav, navigate } from '../utils/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-ivory/95 border-b border-brand-brown/10 py-4 shadow-xs backdrop-blur-md'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 flex justify-between items-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname !== '/') navigate('/');
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-serif text-xl md:text-2xl font-bold tracking-[0.2em] text-brand-black hover:text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-colors"
          >
            IVANA RACCA
          </a>

          <nav
            className="hidden lg:flex items-center space-x-5 xl:space-x-7"
            aria-label="Principal"
          >
            {PRIMARY_NAV.map((link) => (
              <a
                key={link.label}
                href={link.kind === 'route' ? link.href : `/${link.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  goNav(link.href, link.kind);
                }}
                className="font-sans text-xs font-medium tracking-[0.12em] text-brand-black/80 hover:text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-brown hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href={getWhatsAppUrl('Hola Ivana, me gustaría hablar sobre un diseño o prenda.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick(
                  'header_nav',
                  'Hola Ivana, me gustaría hablar sobre un diseño o prenda.'
                )
              }
              className="px-5 py-2.5 border border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-all font-mono text-xs uppercase tracking-widest"
            >
              Hablar
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden p-2 text-brand-black hover:text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 rounded-xs transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
