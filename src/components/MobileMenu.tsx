import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackWhatsAppClick } from '../utils/analytics';
import { PRIMARY_NAV, SECONDARY_NAV } from '../nav';
import { goNav } from '../utils/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      previousActiveElementRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleNav = (href: string, kind: 'hash' | 'route') => {
    onClose();
    setTimeout(() => goNav(href, kind), 50);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 bg-brand-black z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={drawerRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={{ x: shouldReduceMotion ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: shouldReduceMotion ? 0 : '100%' }}
            transition={{
              type: 'tween',
              ease: 'easeInOut',
              duration: shouldReduceMotion ? 0 : 0.3,
            }}
            className="fixed top-0 right-0 h-full w-[280px] bg-brand-ivory z-50 shadow-2xl flex flex-col p-6 border-l border-brand-brown/10"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="font-serif text-lg tracking-wider font-semibold text-brand-black">
                IVANA RACCA
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className="p-2 text-brand-black hover:text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 rounded-xs transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col flex-1 divide-y divide-brand-brown/10 py-2" aria-label="Principal">
              {PRIMARY_NAV.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.kind === 'route' ? link.href : '/' + link.href}
                  onClick={(e) => {
                    if (link.kind === 'hash') {
                      e.preventDefault();
                      handleNav(link.href, link.kind);
                    } else {
                      onClose();
                    }
                  }}
                  className="group flex items-baseline justify-between text-left py-4 text-brand-black hover:text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-all duration-200"
                >
                  <span className="font-serif text-2xl font-normal tracking-wide group-hover:translate-x-1.5 transition-transform duration-200">
                    {link.label.charAt(0) + link.label.slice(1).toLowerCase()}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-brand-brown/60 group-hover:text-brand-brown font-light tracking-widest"
                  >
                    0{idx + 1}
                  </span>
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-brand-brown/15 space-y-1">
              <p className="font-mono text-[10px] tracking-widest text-brand-black/40 uppercase mb-2">
                Más
              </p>
              {SECONDARY_NAV.map((link) => (
                <a
                  key={link.label}
                  href={link.kind === 'route' ? link.href : '/' + link.href}
                  onClick={(e) => {
                    if (link.kind === 'hash') {
                      e.preventDefault();
                      handleNav(link.href, link.kind);
                    } else {
                      onClose();
                    }
                  }}
                  className="block w-full text-left py-2 font-serif text-base text-brand-black/70 hover:text-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown"
                >
                  {link.label}
                </a>
              ))}
          </div>

            <div className="pt-6 border-t border-brand-brown/20 mt-4">
              <a
                href={getWhatsAppUrl(
                  'Hola Ivana, me gustaría hablar con vos sobre tu taller y diseños.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWhatsAppClick(
                    'mobile_menu',
                    'Hola Ivana, me gustaría hablar con vos sobre tu taller y diseños.'
                  );
                  onClose();
                }}
                className="block w-full text-center px-4 py-3 bg-brand-black text-brand-white hover:bg-brand-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 transition-colors font-mono text-xs uppercase tracking-widest"
              >
                Reservar Cita
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
