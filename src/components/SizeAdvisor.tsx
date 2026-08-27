/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sliders, Ruler, Check, Sparkles, X, ChevronRight } from 'lucide-react';

interface SizeAdvisorProps {
  sizes: string[];
  onSelectSize: (size: string) => void;
  onClose: () => void;
}

export default function SizeAdvisor({ sizes, onSelectSize, onClose }: SizeAdvisorProps) {
  const [activeTab, setActiveTab] = useState<'table' | 'advisor'>('advisor');
  
  // Interactive user measurements
  const [busto, setBusto] = useState(90); // default S/M border
  const [cintura, setCintura] = useState(70);
  const [cadera, setCadera] = useState(98);

  // Dynamic calculations for size
  const computedSelection = useMemo(() => {
    // 1. Calculate base size recommendation based on metrics
    let baseSize = 'M';
    if (busto <= 84 && cintura <= 64 && cadera <= 92) {
      baseSize = 'XS';
    } else if (busto <= 89 && cintura <= 69 && cadera <= 97) {
      baseSize = 'S';
    } else if (busto <= 94 && cintura <= 74 && cadera <= 102) {
      baseSize = 'M';
    } else if (busto <= 99 && cintura <= 79 && cadera <= 107) {
      baseSize = 'L';
    } else {
      baseSize = 'XL';
    }

    // 2. Map calculated base size to what is ACTUALLY available in this specific product
    // Standard scale order
    const standardOrder = ['XS', 'S', 'M', 'L', 'XL'];
    
    // Check if there are exact matches
    if (sizes.includes(baseSize)) {
      return baseSize;
    }

    // Handle compound/special sizing in available sizes (e.g. "XS/S" or "M/L" or numbers "36", "38")
    // Convert available sizes into standard references
    const mappedSizes = sizes.map(size => {
      const lower = size.toLowerCase();
      if (lower.includes('xs') || lower === '34') return { original: size, standard: 'XS' };
      if (lower.includes('s') || lower === '36') return { original: size, standard: 'S' };
      if (lower.includes('m') || lower === '38') return { original: size, standard: 'M' };
      if (lower.includes('l') || lower === '40') return { original: size, standard: 'L' };
      if (lower.includes('xl') || lower === '42') return { original: size, standard: 'XL' };
      return { original: size, standard: 'M' }; // fallback
    });

    // Find the standard mapped item that is closest to our baseSize
    const baseIndex = standardOrder.indexOf(baseSize);
    let bestMatch = mappedSizes[0]?.original || sizes[0];
    let minDistance = 999;

    mappedSizes.forEach(mapped => {
      const itemIndex = standardOrder.indexOf(mapped.standard);
      const dist = Math.abs(itemIndex - baseIndex);
      if (dist < minDistance) {
        minDistance = dist;
        bestMatch = mapped.original;
      }
    });

    return bestMatch;
  }, [busto, cintura, cadera, sizes]);

  // Determine estimated fit description
  const fitType = useMemo(() => {
    // Ivana Racca designs are relaxed. If measurements are well within recommended boundaries, it's Oversized/Fluid.
    const sum = busto + cintura + cadera;
    if (sum < 245) return { label: 'Fluido / Oversized', desc: 'Caída deconstruida con abundante holgura, fiel a la impronta del atelier.' };
    if (sum > 275) return { label: 'Estructurado / Entallado', desc: 'Silueta sastre precisa que abraza suavemente la forma natural.' };
    return { label: 'Silueta Clásica', desc: 'Calce perfecto y equilibrado con el movimiento natural del textil.' };
  }, [busto, cintura, cadera]);

  return (
    <div className="max-w-md w-full bg-white p-5 md:p-6 rounded-lg border border-sand-300 shadow-xl space-y-5 text-left relative">
      {/* Header and dismiss button */}
      <div className="flex justify-between items-start border-b border-sand-200 pb-3">
        <div className="space-y-1">
          <span className="font-mono text-[9px] uppercase tracking-widest text-luxury-gold block">Bespoke Fitting</span>
          <h3 className="font-serif text-lg font-medium text-luxury-charcoal flex items-center gap-2">
            <Ruler className="w-4 h-4 text-luxury-gold" />
            <span>Guía de Talles y Medidas</span>
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-luxury-charcoal/40 hover:text-luxury-charcoal p-1 rounded-full hover:bg-sand-100 transition-all"
          aria-label="Cerrar asesor de talles"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Elegant tab selectors */}
      <div className="flex border-b border-sand-200 p-0.5 bg-sand-50 rounded-sm">
        <button
          onClick={() => setActiveTab('advisor')}
          className={`flex-1 py-1.5 font-mono text-[10px] uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'advisor'
              ? 'bg-white text-luxury-charcoal font-semibold shadow-xs border border-sand-200/55 rounded-sm'
              : 'text-luxury-charcoal/50 hover:text-luxury-charcoal'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-luxury-gold" />
          <span>Asesor Inteligente</span>
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`flex-1 py-1.5 font-mono text-[10px] uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'table'
              ? 'bg-white text-luxury-charcoal font-semibold shadow-xs border border-sand-200/55 rounded-sm'
              : 'text-luxury-charcoal/50 hover:text-luxury-charcoal'
          }`}
        >
          <Ruler className="w-3.5 h-3.5 text-luxury-gold" />
          <span>Tabla de Equivalencias</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'advisor' ? (
        <div className="space-y-5">
          <p className="text-[11px] text-luxury-charcoal/60 leading-relaxed font-light">
            Mueva los selectores para ingresar sus medidas en centímetros. Calcularemos el talle ideal según las caídas de las telas de esta colección.
          </p>

          {/* Sizing sliders pack */}
          <div className="space-y-3.5 bg-sand-50 p-4 rounded-xs border border-sand-200/50">
            {/* 1. Busto */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-mono text-[10px] uppercase text-luxury-charcoal/70">Busto</span>
                <span className="font-serif font-semibold text-luxury-gold">{busto} cm</span>
              </div>
              <input
                type="range"
                min="75"
                max="115"
                value={busto}
                onChange={(e) => setBusto(Number(e.target.value))}
                className="w-full accent-luxury-gold cursor-ew-resize bg-sand-200 h-1 rounded-lg appearance-none"
              />
            </div>

            {/* 2. Cintura */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-mono text-[10px] uppercase text-luxury-charcoal/70">Cintura</span>
                <span className="font-serif font-semibold text-luxury-gold">{cintura} cm</span>
              </div>
              <input
                type="range"
                min="55"
                max="95"
                value={cintura}
                onChange={(e) => setCintura(Number(e.target.value))}
                className="w-full accent-luxury-gold cursor-ew-resize bg-sand-200 h-1 rounded-lg appearance-none"
              />
            </div>

            {/* 3. Cadera */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-mono text-[10px] uppercase text-luxury-charcoal/70">Cadera</span>
                <span className="font-serif font-semibold text-luxury-gold">{cadera} cm</span>
              </div>
              <input
                type="range"
                min="80"
                max="120"
                value={cadera}
                onChange={(e) => setCadera(Number(e.target.value))}
                className="w-full accent-luxury-gold cursor-ew-resize bg-sand-200 h-1 rounded-lg appearance-none"
              />
            </div>
          </div>

          {/* Live Advisor Results */}
          <div className="border border-luxury-gold/30 bg-luxury-gold/5 p-4 rounded-xs flex flex-col md:flex-row items-center gap-4">
            <div className="text-center shrink-0 border-r border-luxury-gold/20 pr-4">
              <span className="font-mono text-[8px] uppercase tracking-widest text-luxury-charcoal/50 block leading-none mb-1">Talle Recomendado</span>
              <div className="w-16 h-16 rounded-sm bg-luxury-charcoal text-luxury-gold flex items-center justify-center font-serif text-2xl font-bold shadow-md">
                {computedSelection}
              </div>
            </div>
            <div className="space-y-1 flex-1 text-center md:text-left">
              <span className="font-mono text-[9px] uppercase tracking-wider text-luxury-gold font-bold flex items-center justify-center md:justify-start gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Calce {fitType.label}</span>
              </span>
              <p className="text-[11px] text-luxury-charcoal/70 leading-relaxed font-light">
                {fitType.desc}
              </p>
            </div>
          </div>

          {/* Quick Apply Action Button */}
          <button
            onClick={() => onSelectSize(computedSelection)}
            className="w-full py-3 bg-luxury-charcoal hover:bg-black text-white font-mono text-[10px] uppercase tracking-widest transition-all hover:text-luxury-gold flex items-center justify-center gap-2 rounded-xs"
          >
            <span>Aplicar Talle Recomendado ({computedSelection})</span>
            <ChevronRight className="w-3.5 h-3.5 text-luxury-gold" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-[11px] text-luxury-charcoal/60 leading-relaxed font-light">
            Métricas de moldería base para prendas confeccionadas en plano. Nuestros diseños favorecen caídas fluidas con espacio para la holgura noble.
          </p>
          <div className="overflow-x-auto border border-sand-200 rounded-sm">
            <table className="w-full font-mono text-[10px] text-left border-collapse bg-white">
              <thead>
                <tr className="border-b border-sand-300 bg-sand-50 text-luxury-gold uppercase text-[9px] tracking-wider">
                  <th className="py-2.5 px-3">Talle</th>
                  <th className="py-2.5 px-2">Busto (cm)</th>
                  <th className="py-2.5 px-2">Cintura (cm)</th>
                  <th className="py-2.5 px-2">Cadera (cm)</th>
                  <th className="py-2.5 px-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100 text-luxury-charcoal/80">
                {[
                  { label: 'XS / 34', code: 'XS', b: '80-84', w: '60-64', h: '88-92' },
                  { label: 'S / 36', code: 'S', b: '85-89', w: '65-69', h: '93-97' },
                  { label: 'M / 38', code: 'M', b: '90-94', w: '70-74', h: '98-102' },
                  { label: 'L / 40', code: 'L', b: '95-99', w: '75-79', h: '103-107' },
                  { label: 'XL / 42', code: 'XL', b: '100-104', w: '80-84', h: '108-112' }
                ].map((item) => {
                  const isAvailable = sizes.includes(item.code) || sizes.some(s => s.toLowerCase().includes(item.code.toLowerCase()));
                  return (
                    <tr key={item.label} className={`hover:bg-sand-50/50 ${!isAvailable ? 'opacity-40' : ''}`}>
                      <td className="py-2.5 px-3 font-semibold">{item.label}</td>
                      <td className="py-2.5 px-2">{item.b}</td>
                      <td className="py-2.5 px-2">{item.w}</td>
                      <td className="py-2.5 px-2">{item.h}</td>
                      <td className="py-2.5 px-3 text-right">
                        {isAvailable ? (
                          <button
                            onClick={() => {
                              // Find exact original size label in parent's sizes array
                              const matchedSize = sizes.find(s => s.toLowerCase().includes(item.code.toLowerCase())) || sizes[0];
                              onSelectSize(matchedSize);
                            }}
                            className="font-mono text-[9px] uppercase font-bold text-luxury-gold hover:text-luxury-charcoal transition-colors underline"
                          >
                            Elegir
                          </button>
                        ) : (
                          <span className="font-mono text-[9px] text-luxury-charcoal/30 block">Agotado</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[9px] font-mono text-center text-luxury-charcoal/40 pt-1">
            Si sus medidas están entre dos talles, le sugerimos optar por el de mayor tamaño para conservar la silueta holgada característica del atelier.
          </p>
        </div>
      )}
    </div>
  );
}
