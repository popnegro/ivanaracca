/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { LOOKBOOK_SLIDES } from '../data';

export default function LookbookSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleNext = () => {
    setCurrentSlide(prev => (prev === LOOKBOOK_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev === 0 ? LOOKBOOK_SLIDES.length - 1 : prev - 1));
  };

  // Touch Swipe Handlers for Mobile Ergonomics
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50; // threshold in pixels

    if (distance > minSwipeDistance) {
      handleNext(); // swipe left, next slide
    } else if (distance < -minSwipeDistance) {
      handlePrev(); // swipe right, prev slide
    }
  };

  return (
    <section id="lookbook" className="relative w-full min-h-[80vh] bg-luxury-charcoal flex flex-col justify-center overflow-hidden py-16 md:py-24">
      {/* Dynamic Background Image layer with slow pan zoom */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full bg-cover bg-center origin-center"
            style={{ backgroundImage: `url(${LOOKBOOK_SLIDES[currentSlide].url})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-20 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left: Campaign Photo Card Panel */}
        <div className="col-span-12 md:col-span-6 flex justify-center">
          <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full max-w-md aspect-[3/4] bg-sand-900 overflow-hidden relative shadow-2xl border border-white/10 group cursor-grab active:cursor-grabbing"
            title="Deslice horizontalmente para explorar"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                src={LOOKBOOK_SLIDES[currentSlide].url}
                alt={LOOKBOOK_SLIDES[currentSlide].title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Narrative Editorial Info */}
        <div className="col-span-12 md:col-span-6 text-white flex flex-col justify-center space-y-6 md:pl-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-luxury-gold font-mono text-[10px] uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlide}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  {LOOKBOOK_SLIDES[currentSlide].tag}
                </motion.span>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.h2
                key={currentSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight"
              >
                {LOOKBOOK_SLIDES[currentSlide].title}
              </motion.h2>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-white/70 text-xs md:text-sm leading-relaxed max-w-md font-sans font-light"
            >
              {LOOKBOOK_SLIDES[currentSlide].desc}
            </motion.p>
          </AnimatePresence>

          {/* Action Slide Controls */}
          <div className="flex items-center space-x-6 pt-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-white/20 hover:border-white/50 text-white/70 hover:text-white transition-all interactive-hover"
                aria-label="Look previo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border border-white/20 hover:border-white/50 text-white/70 hover:text-white transition-all interactive-hover"
                aria-label="Siguiente look"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slide counts */}
            <div className="font-mono text-xs text-white/40 flex items-baseline gap-1">
              <span className="text-luxury-gold font-semibold">0{currentSlide + 1}</span>
              <span>/</span>
              <span>0{LOOKBOOK_SLIDES.length}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Slide pagination tracker dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-15">
        {LOOKBOOK_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1 rounded-full transition-all ${idx === currentSlide ? 'w-8 bg-luxury-gold' : 'w-2 bg-white/30'}`}
            aria-label={`Ir al look ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
