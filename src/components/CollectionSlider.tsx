import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface CollectionSliderProps {
  images: string[];
  name: string;
  category: string;
  aspectRatioClass?: string;
}

export default function CollectionSlider({
  images,
  name,
  category,
  aspectRatioClass = 'aspect-[4/5]',
}: CollectionSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Normalize image list (fallback to empty array if undefined)
  const validImages = images && images.length > 0 ? images : [];
  const totalSlides = validImages.length;
  const hasMultiple = totalSlides > 1;

  // Safe navigation handlers
  const handlePrev = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const handleGoTo = useCallback((index: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentIndex(index);
  }, []);

  // Keyboard navigation when slider is focused
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

  // Touch / swipe handlers for mobile
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
    const minSwipeDistance = 40; // minimum px for a swipe

    if (distance > minSwipeDistance) {
      handleNext(); // swiped left -> next
    } else if (distance < -minSwipeDistance) {
      handlePrev(); // swiped right -> prev
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  // Preload adjacent images when slide changes to ensure instant navigation
  useEffect(() => {
    if (!hasMultiple) return;
    const nextIdx = (currentIndex + 1) % totalSlides;
    const prevIdx = (currentIndex - 1 + totalSlides) % totalSlides;
    
    [nextIdx, prevIdx].forEach((idx) => {
      const src = validImages[idx];
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [currentIndex, hasMultiple, totalSlides, validImages]);

  const currentImage = validImages[currentIndex] || '';

  return (
    <div
      ref={sliderRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={`Galería de fotos de ${name}`}
      tabIndex={hasMultiple ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative ${aspectRatioClass} w-full overflow-hidden bg-brand-ivory/50 border border-brand-brown/10 select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2`}
    >
      {/* Loading Skeleton Shimmer */}
      {!loadedImages[currentIndex] && (
        <div className="absolute inset-0 bg-brand-ivory animate-pulse z-0 flex items-center justify-center">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-brown">
            Cargando...
          </span>
        </div>
      )}

      {/* Slide Image with Fade Animation */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={currentImage}
          alt={`${name} — ${category} por Ivana Racca (foto ${currentIndex + 1} de ${totalSlides})`}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
            loadedImages[currentIndex] ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => handleImageLoad(currentIndex)}
          initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
          animate={{ opacity: loadedImages[currentIndex] ? 1 : 0 }}
          exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
        />
      </AnimatePresence>

      {/* Top badge: Slide Counter (shown only if > 1 photo) */}
      {hasMultiple && (
        <div className="absolute top-3 right-3 flex items-center pointer-events-none z-10">
          <span className="px-2 py-0.5 bg-brand-black/70 text-brand-white font-mono text-[10px] tracking-wider rounded-xs backdrop-blur-xs">
            {currentIndex + 1}/{totalSlides}
          </span>
        </div>
      )}

      {/* Navigation Arrows (Rendered ONLY if hasMultiple > 1) */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label={`Foto anterior de ${name}`}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-9 md:h-9 bg-brand-black/70 hover:bg-brand-black text-brand-white rounded-full flex items-center justify-center shadow-md backdrop-blur-xs opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 hover:scale-105 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 stroke-[2]" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label={`Siguiente foto de ${name}`}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-9 md:h-9 bg-brand-black/70 hover:bg-brand-black text-brand-white rounded-full flex items-center justify-center shadow-md backdrop-blur-xs opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 hover:scale-105 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 stroke-[2]" />
          </button>
        </>
      )}

      {/* Bottom Dot Indicators (Rendered ONLY if hasMultiple > 1) */}
      {hasMultiple && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-2.5 py-1 bg-brand-black/60 rounded-full flex items-center gap-1.5 backdrop-blur-xs"
          role="tablist"
          aria-label={`Indicadores de fotos para ${name}`}
        >
          {validImages.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Ir a foto ${idx + 1} de ${totalSlides}`}
                onClick={(e) => handleGoTo(idx, e)}
                className={`transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-white ${
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
