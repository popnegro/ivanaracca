import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Paths to existing images in the project assets
const images = [
  '/src/assets/images/hero.jpeg',
  '/src/assets/images/designer_portrait_3_4_1784177751103.jpg',
];

/**
 * Simple carousel component for the Hero section.
 * Shows two images with an automatic fade transition every 5 seconds.
 * No navigation indicators or controls are rendered, keeping the design minimal.
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
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt="Hero carousel image"
          className="absolute inset-0 w-full h-full object-cover grayscale"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          loading="lazy"
        />
      </AnimatePresence>
    </div>
  );
}
