import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselImages = [
  {
    src: '/images/ana-laura-turca-nicoletti-plate-dress-up.webp',
    alt: 'Diseño de alta costura por Ivana Racca — vestido de placas',
  },
  {
    src: '/images/ana-laura-turca-nicoletti-black-dress.webp',
    alt: 'Diseño de alta costura por Ivana Racca — detalle y silueta de vestido',
  },
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({ 0: true });
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const totalSlides = carouselImages.length;
  const hasMultiple = totalSlides > 1;

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    },
    [totalSlides]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    },
    [totalSlides]
  );

  const handleGoTo = useCallback((index: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrent(index);
  }, []);

  // Autoplay only when motion is allowed and not paused by user
  useEffect(() => {
    if (isPaused || !hasMultiple || shouldReduceMotion) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, hasMultiple, handleNext, shouldReduceMotion]);

  useEffect(() => {
    if (!hasMultiple) return;
    const nextIdx = (current + 1) % totalSlides;
    const prevIdx = (current - 1 + totalSlides) % totalSlides;

    [nextIdx, prevIdx].forEach((idx) => {
      const imgItem = carouselImages[idx];
      if (imgItem?.src) {
        const img = new Image();
        img.src = imgItem.src;
      }
    });
  }, [current, hasMultiple, totalSlides]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!hasMultiple) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasMultiple) return;
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!hasMultiple) return;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!hasMultiple || touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const activeItem = carouselImages[current];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Galería editorial de Alta Costura — Ivana Racca"
      aria-live="polite"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative aspect-square w-full md:w-4/5 md:max-w-[80%] mx-auto overflow-hidden bg-brand-ivory/60 border-y md:border border-brand-brown/15 shadow-xl select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2"
    >
      {!loadedImages[current] && (
        <div className="absolute inset-0 bg-brand-ivory animate-pulse z-0 flex items-center justify-center">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-brown/40">
            Cargando...
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={activeItem.src}
          alt={activeItem.alt}
          className={`absolute inset-0 w-full h-full object-cover ${shouldReduceMotion ? '' : 'transition-transform duration-700 group-hover:scale-[1.02]'} ${
            loadedImages[current] ? 'opacity-100' : 'opacity-0'
          }`}
          loading={current === 0 ? 'eager' : 'lazy'}
          fetchPriority={current === 0 ? 'high' : 'auto'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => handleImageLoad(current)}
          initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
        />
      </AnimatePresence>

      {hasMultiple && (
        <div className="absolute top-3 right-3 flex items-center pointer-events-none z-10">
          <span className="px-2 py-0.5 bg-brand-black/70 text-brand-white font-mono text-[10px] tracking-wider rounded-xs backdrop-blur-xs">
            {current + 1}/{totalSlides}
          </span>
        </div>
      )}

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Foto anterior del carousel"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-9 md:h-9 bg-brand-black/70 hover:bg-brand-black text-brand-white rounded-full flex items-center justify-center shadow-md backdrop-blur-xs opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 stroke-[2]" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Siguiente foto del carousel"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-9 md:h-9 bg-brand-black/70 hover:bg-brand-black text-brand-white rounded-full flex items-center justify-center shadow-md backdrop-blur-xs opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 stroke-[2]" />
          </button>
        </>
      )}

      {hasMultiple && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-2.5 py-1 bg-brand-black/60 rounded-full flex items-center gap-1.5 backdrop-blur-xs"
          role="tablist"
          aria-label="Indicadores de fotos del carousel"
        >
          {carouselImages.map((_, idx) => {
            const isActive = idx === current;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Ir a foto ${idx + 1} de ${totalSlides}`}
                onClick={(e) => handleGoTo(idx, e)}
                className={`transition-all duration-200 rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-white ${
                  isActive
                    ? 'w-4 h-1.5 bg-brand-white'
                    : 'w-1.5 h-1.5 bg-brand-white/50 hover:bg-brand-white/80'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
