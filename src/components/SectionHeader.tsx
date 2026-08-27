import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SectionHeaderProps {
  label: string;
  title: string;
  intro?: string;
  light?: boolean;
}

export default function SectionHeader({ label, title, intro, light = false }: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div 
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-4 max-w-3xl"
    >
      <span 
        className={`font-mono text-xs uppercase tracking-[0.25em] ${
          light ? 'text-brand-ivory/90' : 'text-brand-brown'
        }`}
      >
        {label}
      </span>
      <h2 
        className={`font-serif text-4xl md:text-5xl font-light tracking-tight ${
          light ? 'text-brand-white' : 'text-brand-black'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p 
          className={`font-serif text-lg md:text-xl italic font-light leading-relaxed mt-2 ${
            light ? 'text-brand-ivory/90' : 'text-brand-black/75'
          }`}
        >
          {intro}
        </p>
      )}
      <div className={`h-[1px] w-16 mt-4 ${light ? 'bg-brand-brown' : 'bg-brand-brown'}`} />
    </motion.div>
  );
}

