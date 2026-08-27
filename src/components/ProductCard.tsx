/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onOpenDetails: (product: Product) => void;
  index: number;
}

export default function ProductCard({ product, onOpenDetails, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Use staggered or different visual ratios based on index for that high-end asymmetric editorial rhythm
  const getAsymmetricClass = (idx: number) => {
    switch (idx % 3) {
      case 0:
        return "col-span-12 md:col-span-6 lg:col-span-5 md:translate-y-8";
      case 1:
        return "col-span-12 md:col-span-6 lg:col-span-7 md:-translate-y-4";
      default:
        return "col-span-12 md:col-span-12 lg:col-span-6 md:translate-y-2";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col space-y-4 ${getAsymmetricClass(index)}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Editorial Image container */}
      <div 
        onClick={() => onOpenDetails(product)}
        className="w-full aspect-[3/4] bg-sand-100 overflow-hidden relative cursor-pointer group-hover:shadow-lg transition-shadow duration-500"
      >
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover origin-center"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          referrerPolicy="no-referrer"
        />

        {/* Delicate Golden Tag for new releases */}
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-luxury-gold/90 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 backdrop-blur-xs">
            Atelier Nuevo
          </div>
        )}

        {/* Hover overlay with action cue */}
        <div className="absolute inset-0 bg-luxury-charcoal/10 group-hover:bg-luxury-charcoal/20 transition-colors duration-500 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white/95 text-luxury-charcoal font-mono text-[11px] uppercase tracking-widest px-4 py-2.5 flex items-center gap-2 shadow-xl backdrop-blur-xs"
          >
            <Eye className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Ver Detalle</span>
          </motion.div>
        </div>
      </div>

      {/* Meta Text details with luxury typography */}
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-center">
          <p className="font-mono text-[10px] tracking-widest text-luxury-gold uppercase">
            {product.category}
          </p>
          <p className="font-mono text-[10px] text-luxury-charcoal/40">
            Disp: {product.stock} u.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline pt-1">
          <h3 
            onClick={() => onOpenDetails(product)}
            className="font-serif text-lg font-medium leading-snug text-luxury-charcoal cursor-pointer group-hover:text-luxury-gold transition-colors"
          >
            {product.name}
          </h3>
          <div className="mt-1 sm:mt-0 sm:pl-4 whitespace-nowrap">
            <span className="font-serif text-base font-semibold text-luxury-charcoal">
              ${product.price.toLocaleString('es-AR')} ARS
            </span>
          </div>
        </div>

        <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start xs:items-center pt-2 gap-1 xs:gap-4">
          <p className="font-sans text-xs italic text-luxury-charcoal/60 line-clamp-2 xs:line-clamp-1 flex-1">
            {product.description}
          </p>
          <span className="font-mono text-[10px] text-luxury-charcoal/40 whitespace-nowrap">
            ~ ${(product.priceUSD).toLocaleString('en-US')} USD
          </span>
        </div>

        {/* Sleek inline CTA */}
        <button
          onClick={() => onOpenDetails(product)}
          className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-luxury-charcoal group-hover:text-luxury-gold pt-3 w-fit transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 group-hover:after:w-full after:h-[1px] after:bg-luxury-gold after:transition-all after:duration-300"
        >
          <span>Examinar Silueta</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
