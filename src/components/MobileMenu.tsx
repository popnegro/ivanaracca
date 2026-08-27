import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ label: string; href: string }>;
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and accessibility
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Put focus on the close button when opened
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 80);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = (href: string) => {
    onClose();
    // Smooth scroll to the target
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-black z-40"
            onClick={onClose}
          />

          {/* Drawer Menu */}
          <motion.div
            id="mobile-menu-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de Navegación"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[280px] bg-brand-ivory z-50 shadow-2xl flex flex-col p-6 border-l border-brand-brown/10"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="font-serif text-lg tracking-wider font-semibold text-brand-black">
                IVANA RACCA
              </span>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Cerrar menú"
                className="p-2 text-brand-black hover:text-brand-brown focus:outline-none focus:ring-1 focus:ring-brand-brown"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 flex-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-left font-serif text-xl tracking-wider text-brand-black hover:text-brand-brown focus:outline-none focus:underline py-1 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="pt-6 border-t border-brand-brown/20 mt-auto">
              <a
                href={getWhatsAppUrl("Hola Ivana, me gustaría hablar con vos sobre tu taller y diseños.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="block w-full text-center px-4 py-3 bg-brand-black text-brand-white hover:bg-brand-brown focus:outline-none focus:ring-1 focus:ring-brand-brown transition-colors font-mono text-xs uppercase tracking-widest"
              >
                HABLAR CON IVANA
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
