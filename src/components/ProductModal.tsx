/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Ruler, Check, ChevronLeft, ChevronRight, Share2, Info } from 'lucide-react';
import { Product, ColorVariant } from '../types';
import SizeAdvisor from './SizeAdvisor';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: ColorVariant, size: string) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0] || '');
      setCopiedLink(false);
    }
  }, [product]);

  if (!product) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '?product=' + product.slug);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAdd = () => {
    if (!selectedColor) return;
    onAddToCart(product, selectedColor, selectedSize);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-6 lg:p-12">
        {/* Backdrop */}
        <motion.div
          id="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          id="modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="bg-sand-50 w-full max-w-5xl rounded-lg overflow-y-auto md:overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row max-h-[95vh] md:max-h-[85vh] border border-sand-200"
        >
          {/* Close button top right */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-luxury-charcoal shadow-xs hover:scale-105 transition-all interactive-hover"
            aria-label="Cerrar modal de producto"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left: Interactive Image Section */}
          <div className="w-full md:w-1/2 bg-sand-100 flex flex-col justify-between relative min-h-[300px] md:min-h-0">
            {/* Main Image View */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover aspect-[3/4]"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next buttons for multiple images */}
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                    className="absolute left-3 p-1.5 rounded-full bg-white/70 hover:bg-white text-luxury-charcoal transition-all"
                    aria-label="Ver imagen anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-3 p-1.5 rounded-full bg-white/70 hover:bg-white text-luxury-charcoal transition-all"
                    aria-label="Ver imagen siguiente"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation Bar */}
            {product.images.length > 1 && (
              <div className="p-4 bg-white/40 backdrop-blur-xs flex gap-2 justify-center border-t border-sand-200">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-16 border-2 overflow-hidden transition-all ${idx === activeImageIndex ? 'border-luxury-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    aria-label={`Ver imagen ${idx + 1} de ${product.images.length}`}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Custom Purchase, Specs & Copy */}
          <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 md:overflow-y-auto flex flex-col justify-between space-y-6">
            <div>
              {/* Category, release & Share actions */}
              <div className="flex justify-between items-center text-luxury-charcoal/40 font-mono text-[10px] uppercase tracking-widest">
                <span>Colección Permanente</span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 hover:text-luxury-gold transition-colors font-mono uppercase text-[10px]"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copiado' : 'Compartir'}</span>
                </button>
              </div>

              {/* Title & Price markup */}
              <h1 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-luxury-charcoal mt-3">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mt-2">
                <span className="font-serif text-xl font-semibold text-luxury-gold">
                  ${product.price.toLocaleString('es-AR')} ARS
                </span>
                <span className="font-mono text-xs text-luxury-charcoal/40">
                  ~ ${(product.priceUSD).toLocaleString('en-US')} USD
                </span>
              </div>

              {/* Editorial Description */}
              <p className="text-xs text-luxury-charcoal/70 leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Color swatch selection panel */}
              <div className="mt-6 space-y-2.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-luxury-charcoal/60 block">
                  Color Seleccionado: <strong className="text-luxury-charcoal">{selectedColor?.name}</strong>
                </span>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${selectedColor?.hex === color.hex ? 'border-luxury-gold scale-110 ring-4 ring-luxury-gold/10' : 'border-sand-300 hover:scale-105'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor?.hex === color.hex && (
                        <Check className="w-3.5 h-3.5 text-white mix-blend-difference" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizing selection with Modal guide trigger */}
              <div className="mt-6 space-y-2.5">
                <div className="flex justify-between items-center text-luxury-charcoal/60">
                  <span className="font-mono text-[10px] uppercase tracking-widest">
                    Talle: <strong className="text-luxury-charcoal">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="font-mono text-[9px] uppercase tracking-wider text-luxury-gold flex items-center gap-1 hover:text-luxury-bronze transition-colors"
                  >
                    <Ruler className="w-3 h-3" />
                    Guía de Talles
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 font-mono text-xs border rounded-sm transition-all ${selectedSize === size ? 'border-luxury-charcoal bg-luxury-charcoal text-white font-medium' : 'border-sand-300 hover:border-luxury-gold text-luxury-charcoal'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textile Specifications Panel */}
              <div className="mt-8 border-t border-sand-200 pt-6 space-y-3">
                <h3 className="font-serif text-sm font-medium tracking-tight text-luxury-charcoal flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-luxury-gold" />
                  <span>Especificaciones Textiles</span>
                </h3>
                <ul className="space-y-1.5 pl-4 list-disc text-luxury-charcoal/70 text-[11px] leading-relaxed">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sticky Action Cart Button inside modal */}
            <div className="pt-6 border-t border-sand-200 mt-6">
              <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className="w-full py-3.5 bg-luxury-charcoal hover:bg-black disabled:bg-sand-300 text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all interactive-hover"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {product.stock > 0 ? 'Añadir a su bolsa' : 'Sin Stock - Confección Limitada'}
                </span>
              </button>
              <p className="text-[10px] font-mono text-center text-luxury-charcoal/40 mt-3.5">
                Despacho inmediato de cortesía en embalaje de lino sustentable.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Local Inline Size Guide Popover */}
        <AnimatePresence>
          {sizeGuideOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-sand-100/98 backdrop-blur-md z-30 flex flex-col justify-start md:justify-center items-center p-4 md:p-6 text-center overflow-y-auto"
            >
              <div className="my-auto w-full flex justify-center">
                <SizeAdvisor 
                  sizes={product.sizes}
                  onSelectSize={(size) => {
                    setSelectedSize(size);
                    setSizeGuideOpen(false);
                  }}
                  onClose={() => setSizeGuideOpen(false)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
