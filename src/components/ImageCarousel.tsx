import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getResponsiveImageProps } from '../utils/responsiveImages';

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
      {/*
        LCP: todas las slides como <img> nativas apiladas.
        La slide 0 no usa Motion ni opacity:0 inicial → menos element render delay.
      */}
      {carouselImages.map((item, idx) => {
        const isActive = idx === current;
        const isLcp = idx === 0;

        return (
          <img
            key={item.src}
            src={item.src}
            {...getResponsiveImageProps(item.src, "(max-width: 767px) 100vw, 40vw")}
            alt={item.alt}
            className={`absolute inset-0 w-full h-full object-cover ${
              shouldReduceMotion ? '' : 'transition-opacity duration-300'
            } ${
              isActive && loadedImages[idx] ? 'opacity-100' : 'opacity-0'
            } ${!shouldReduceMotion && isActive ? 'group-hover:scale-[1.02] transition-transform duration-700' : ''}`}
            style={isLcp && isActive ? { opacity: 1 } : undefined}
            loading={isLcp ? 'eager' : 'lazy'}
            fetchPriority={isLcp ? 'high' : 'auto'}
            decoding={isLcp ? 'sync' : 'async'}
            referrerPolicy="no-referrer"
            width={896}
            height={892}
            onLoad={() => handleImageLoad(idx)}
            aria-hidden={!isActive}
          />
        );
      })}

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
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-10 md:h-10 bg-brand-black/70 hover:bg-brand-black text-brand-white rounded-full flex items-center justify-center shadow-md backdrop-blur-xs opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2]" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Siguiente foto del carousel"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-10 md:h-10 bg-brand-black/70 hover:bg-brand-black text-brand-white rounded-full flex items-center justify-center shadow-md backdrop-blur-xs opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
          >
            <ChevronRight className="w-5 h-5 stroke-[2]" />
          </button>
        </>
      )}

      {hasMultiple && (
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-0 backdrop-blur-xs bg-brand-black/50 rounded-full px-1"
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
                className="min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-white rounded-full"
              >
                <span
                  className={`block rounded-full transition-all duration-200 ${
                    isActive
                      ? 'w-4 h-1.5 bg-brand-white'
                      : 'w-1.5 h-1.5 bg-brand-white/50'
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
