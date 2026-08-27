/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  HelpCircle, 
  Tag, 
  Check, 
  Sparkles,
  Loader2 
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, colorHex: string, size: string, q: number) => void;
  onRemoveItem: (productId: string, colorHex: string, size: string) => void;
  onCheckout: (customer: { name: string; email: string }, discountPercent?: number) => Promise<void>;
  isCheckoutLoading: boolean;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isCheckoutLoading,
}: CartDrawerProps) {
  // --- UI Steps ---
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  
  // --- Form & Promo States ---
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [formError, setFormError] = useState('');
  
  const [promoInput, setPromoInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // --- Handoff Loading Substates ---
  const [handoffMessageIndex, setHandoffMessageIndex] = useState(0);
  const handoffMessages = [
    'Verificando stock del lote numerado...',
    'Reservando sus hilados orgánicos...',
    'Preparando embalaje de lino sustentable...',
    'Abriendo pasarela de pago segura...'
  ];

  // Rotate messages while loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCheckoutLoading) {
      setHandoffMessageIndex(0);
      interval = setInterval(() => {
        setHandoffMessageIndex(prev => (prev < handoffMessages.length - 1 ? prev + 1 : prev));
      }, 1600);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCheckoutLoading]);

  // Reset steps and messages on open
  useEffect(() => {
    if (isOpen) {
      setStep('cart');
      setPromoError('');
      setPromoSuccess('');
      setFormError('');
    }
  }, [isOpen]);

  // Pricing math
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const subtotalUSD = cartItems.reduce((acc, item) => acc + (item.product.priceUSD * item.quantity), 0);

  const discountAmount = subtotal * (discountPercent / 100);
  const discountAmountUSD = subtotalUSD * (discountPercent / 100);

  const finalTotal = subtotal - discountAmount;
  const finalTotalUSD = subtotalUSD - discountAmountUSD;

  // Coupon handling
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'ATELIER10') {
      setDiscountPercent(10);
      setAppliedCoupon('ATELIER10');
      setPromoSuccess('¡Cupón ATELIER10 aplicado! 10% de cortesía sastre.');
    } else if (code === 'IVANAPURAS') {
      setDiscountPercent(15);
      setAppliedCoupon('IVANAPURAS');
      setPromoSuccess('¡Cupón IVANAPURAS aplicado! 15% de cortesía textil.');
    } else if (code === 'LENTITUD') {
      setDiscountPercent(20);
      setAppliedCoupon('LENTITUD');
      setPromoSuccess('¡Cupón LENTITUD aplicado! 20% de cortesía sustentable.');
    } else {
      setPromoError('Este código de cortesía no es válido en el atelier.');
    }
    setPromoInput('');
  };

  const handleRemoveCoupon = () => {
    setDiscountPercent(0);
    setAppliedCoupon('');
    setPromoSuccess('');
    setPromoError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim()) {
      setFormError('Por favor complete su nombre y correo electrónico para proceder.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(customerEmail)) {
      setFormError('Por favor introduzca un correo electrónico válido.');
      return;
    }
    setFormError('');
    onCheckout({ name: customerName, email: customerEmail }, discountPercent);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-xs"
          />

          {/* Drawer Container */}
          <motion.div
            id="cart-drawer-container"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-sand-50 shadow-2xl z-50 flex flex-col h-full border-l border-sand-200"
          >
            {/* Header with Step Breadcrumbs */}
            <div className="p-6 border-b border-sand-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-luxury-charcoal" />
                  <h2 className="font-serif text-xl font-medium tracking-tight">Su Bolsa</h2>
                  <span className="font-mono text-xs bg-sand-200 text-luxury-charcoal px-2 py-0.5 rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-sand-150 transition-colors text-luxury-charcoal/70 hover:text-luxury-charcoal"
                  aria-label="Cerrar bolsa"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Steps Indicator */}
              {cartItems.length > 0 && (
                <div className="flex items-center gap-4 mt-5 pt-4 border-t border-sand-100 font-mono text-[9px] uppercase tracking-widest">
                  <button 
                    onClick={() => setStep('cart')}
                    className={`flex items-center gap-2 transition-colors ${step === 'cart' ? 'text-luxury-gold font-bold' : 'text-luxury-charcoal/40'}`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] border ${step === 'cart' ? 'border-luxury-gold bg-luxury-gold text-white' : 'border-sand-300'}`}>1</span>
                    <span>01 Bolsa</span>
                  </button>
                  <div className="h-[1px] flex-1 bg-sand-200" />
                  <button 
                    disabled={cartItems.length === 0}
                    onClick={() => setStep('checkout')}
                    className={`flex items-center gap-2 transition-colors ${step === 'checkout' ? 'text-luxury-gold font-bold' : 'text-luxury-charcoal/40'}`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] border ${step === 'checkout' ? 'border-luxury-gold bg-luxury-gold text-white' : 'border-sand-300'}`}>2</span>
                    <span>02 Entrega</span>
                  </button>
                </div>
              )}
            </div>

            {/* Immersive Loading Overlay when Redirecting to Mercado Pago */}
            <AnimatePresence>
              {isCheckoutLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="relative mb-6">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                      className="w-16 h-16 rounded-full border-3 border-sand-200 border-t-luxury-gold"
                    />
                    <Sparkles className="w-6 h-6 text-luxury-gold absolute inset-0 m-auto animate-pulse" />
                  </div>
                  
                  <motion.div
                    key={handoffMessageIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-2 max-w-xs"
                  >
                    <h3 className="font-serif text-base font-medium text-luxury-charcoal">
                      Creando Orden Sastre
                    </h3>
                    <p className="text-xs text-luxury-charcoal/60 leading-relaxed font-light">
                      {handoffMessages[handoffMessageIndex]}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cart Items or Step Panel Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <ShoppingBag className="w-12 h-12 text-sand-300 stroke-[1]" />
                  <p className="font-serif text-lg italic text-luxury-charcoal/60">Su bolsa de compras está vacía.</p>
                  <button
                    onClick={onClose}
                    className="font-mono text-xs tracking-widest text-luxury-gold uppercase border-b border-luxury-gold pb-1 hover:text-luxury-bronze hover:border-luxury-bronze transition-colors"
                  >
                    Explorar Colección
                  </button>
                </div>
              ) : step === 'cart' ? (
                /* STEP 1: Bolsa de compras */
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-[10px] font-mono text-luxury-charcoal/40 uppercase tracking-widest pb-2 border-b border-sand-100">
                    <span>Artículo</span>
                    <span>Subtotal</span>
                  </div>
                  
                  {cartItems.map((item, idx) => (
                    <motion.div
                      key={`${item.product.id}-${item.selectedColor.hex}-${item.selectedSize}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-4 pb-6 border-b border-sand-100 last:border-b-0"
                    >
                      <div className="w-16 h-20 bg-sand-100 flex-shrink-0 relative overflow-hidden rounded-sm">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-serif text-sm font-medium leading-tight text-luxury-charcoal">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedColor.hex, item.selectedSize)}
                              className="text-[10px] text-luxury-charcoal/40 hover:text-red-600 font-mono"
                            >
                              Quitar
                            </button>
                          </div>
                          <p className="font-mono text-[10px] text-luxury-charcoal/60 mt-1 flex items-center gap-2">
                            <span>Talle: {item.selectedSize}</span>
                            <span className="w-1 h-1 rounded-full bg-sand-300" />
                            <span className="flex items-center gap-1">
                              Color: 
                              <span 
                                className="w-1.5 h-1.5 rounded-full inline-block border border-black/10" 
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              {item.selectedColor.name}
                            </span>
                          </p>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-sand-300 rounded-sm bg-white overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedColor.hex, item.selectedSize, item.quantity - 1)}
                              className="px-2 py-0.5 hover:bg-sand-100 text-luxury-charcoal/70 hover:text-luxury-charcoal transition-colors"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="px-2.5 py-0.5 font-mono text-xs text-luxury-charcoal min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedColor.hex, item.selectedSize, item.quantity + 1)}
                              className="px-2 py-0.5 hover:bg-sand-100 text-luxury-charcoal/70 hover:text-luxury-charcoal transition-colors"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="font-serif text-xs font-semibold text-luxury-charcoal">
                              ${(item.product.price * item.quantity).toLocaleString('es-AR')}
                            </div>
                            <div className="font-mono text-[9px] text-luxury-charcoal/40">
                              ~ ${(item.product.priceUSD * item.quantity).toLocaleString('en-US')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Elegant Courtesy Code (Coupons) field inside STEP 1 */}
                  <div className="pt-4 border-t border-sand-200">
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-luxury-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          id="checkout-coupon"
                          aria-label="Código de cortesía"
                          placeholder="CÓDIGO DE CORTESÍA (ej. LENTITUD)"
                          value={promoInput}
                          onChange={(e) => {
                            setPromoInput(e.target.value);
                            setPromoError('');
                          }}
                          className="w-full bg-white text-[10px] font-mono tracking-wider border border-sand-300 rounded px-3 py-2 pl-9 text-luxury-charcoal focus:outline-hidden focus:border-luxury-gold transition-colors uppercase placeholder:text-luxury-charcoal/30"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 bg-luxury-charcoal hover:bg-black text-white font-mono text-[9px] uppercase tracking-widest rounded transition-colors"
                      >
                        Aplicar
                      </button>
                    </form>
                    
                    {/* Coupon Success/Error status */}
                    <AnimatePresence mode="wait">
                      {promoError && (
                        <motion.p 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[10px] text-red-600 font-mono mt-2 flex items-center gap-1.5"
                        >
                          <X className="w-3 h-3 text-red-500" />
                          <span>{promoError}</span>
                        </motion.p>
                      )}
                      {promoSuccess && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[10px] text-luxury-gold font-mono mt-2 flex items-center justify-between bg-luxury-gold/5 border border-luxury-gold/20 p-2 rounded-xs"
                        >
                          <span className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-luxury-gold" />
                            <span>{promoSuccess}</span>
                          </span>
                          <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="text-[9px] underline text-luxury-charcoal/50 hover:text-luxury-charcoal uppercase ml-2"
                          >
                            Remover
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                /* STEP 2: Delivery & Billing Info Form */
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <button
                    onClick={() => setStep('cart')}
                    className="flex items-center gap-1.5 text-luxury-charcoal/50 hover:text-luxury-charcoal font-mono text-[10px] uppercase tracking-widest transition-colors mb-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Volver a la Bolsa</span>
                  </button>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-medium text-luxury-charcoal">Datos de su Envío</h3>
                      <p className="text-[11px] text-luxury-charcoal/60 leading-relaxed font-light">
                        Las piezas del atelier se envían de cortesía en embalaje ecológico numerado. Complete sus datos para la reserva sastre.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="checkout-customer-name" className="font-mono text-[9px] uppercase tracking-wider text-luxury-charcoal/50 block mb-1">Nombre Completo <span className="text-luxury-gold">*</span></label>
                          <input
                            type="text"
                            id="checkout-customer-name"
                            placeholder="Ej. Sofía Rodríguez"
                            value={customerName}
                            onChange={(e) => {
                              setCustomerName(e.target.value);
                              if (formError) setFormError('');
                            }}
                            className="w-full bg-white text-xs border border-sand-300 rounded px-3 py-2.5 text-luxury-charcoal focus:outline-hidden focus:border-luxury-gold transition-colors font-sans"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="checkout-customer-email" className="font-mono text-[9px] uppercase tracking-wider text-luxury-charcoal/50 block mb-1">Correo Electrónico <span className="text-luxury-gold">*</span></label>
                          <input
                            type="email"
                            id="checkout-customer-email"
                            placeholder="Ej. sofia@ejemplo.com"
                            value={customerEmail}
                            onChange={(e) => {
                              setCustomerEmail(e.target.value);
                              if (formError) setFormError('');
                            }}
                            className="w-full bg-white text-xs border border-sand-300 rounded px-3 py-2.5 text-luxury-charcoal focus:outline-hidden focus:border-luxury-gold transition-colors font-sans"
                            required
                          />
                        </div>
                      </div>

                      {formError && (
                        <p className="text-[10px] text-red-600 font-mono leading-tight">{formError}</p>
                      )}

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-3.5 bg-luxury-charcoal hover:bg-black text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-sm shadow-md hover:text-luxury-gold"
                        >
                          <span>Ir a Pagar con Mercado Pago</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sticky Order Information / Checkout Panel */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-sand-200 bg-sand-100/70 space-y-4">
                {/* Pricing summary */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-luxury-charcoal/60 font-mono">
                    <span>Subtotal de Compra</span>
                    <span>${subtotal.toLocaleString('es-AR')} ARS</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-xs text-luxury-gold font-mono">
                      <span>Descuento de Cortesía ({discountPercent}%)</span>
                      <span>-${discountAmount.toLocaleString('es-AR')} ARS</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xs text-luxury-charcoal/60 font-mono">
                    <span>Envío</span>
                    <span className="text-luxury-gold uppercase tracking-wider font-semibold text-[9px]">
                      Cortesía del Atelier
                    </span>
                  </div>

                  <div className="pt-2 border-t border-sand-200 flex justify-between items-baseline">
                    <span className="font-serif text-base font-medium">Total Estimado</span>
                    <div className="text-right">
                      <div className="font-serif text-lg font-semibold text-luxury-charcoal">
                        ${finalTotal.toLocaleString('es-AR')} ARS
                      </div>
                      <div className="font-mono text-xs text-luxury-charcoal/50">
                        ~ ${finalTotalUSD.toLocaleString('en-US')} USD
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Action CTAs based on current Step */}
                {step === 'cart' && (
                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full py-3.5 bg-luxury-charcoal hover:bg-black text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all rounded-sm shadow-md hover:text-luxury-gold interactive-hover"
                  >
                    <span>Proceder a sus Datos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Security and confidence metrics */}
                <div className="flex items-center justify-center gap-4 text-[9px] text-luxury-charcoal/40 font-mono pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
                    Pago Encriptado MP
                  </span>
                  <span className="flex items-center gap-1 cursor-help" title="Confección lenta bajo pedido para evitar descarte.">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Slow Fashion Ético
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
