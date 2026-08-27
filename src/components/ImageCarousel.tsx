import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Paths served from /public/images/ — accessible via absolute URL in production
const images = [
  '/images/ana-laura-turca-nicoletti-plate-dress-up.webp',
  '/images/ana-laura-turca-nicoletti-black-dress.webp',
];

/**
 * Simple carousel component for the Hero section.
 * Shows two images with an automatic fade transition every 5 seconds.
 * No navigation indicators or controls are rendered, keeping the design minimal.
 *
 * LCP optimization: the first image uses eager loading + fetchpriority=high
 * to avoid delaying the Largest Contentful Paint.
 */
export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={current === 0
            ? 'Diseño de alta costura por Ivana Racca — vestido de placa'
            : 'Diseño de alta costura por Ivana Racca — vestido negro'}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          // LCP image must not be lazy — first image loads eagerly with high priority
          loading={current === 0 ? 'eager' : 'lazy'}
          fetchPriority={current === 0 ? 'high' : 'auto'}
          decoding="async"
        />
      </AnimatePresence>
    </div>
  );
}
