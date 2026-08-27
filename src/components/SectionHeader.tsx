import React from 'react';

interface SectionHeaderProps {
  label: string;
  title: string;
  intro?: string;
  light?: boolean;
}

export default function SectionHeader({ label, title, intro, light = false }: SectionHeaderProps) {
  return (
    <div className="space-y-4 max-w-3xl">
      <span 
        className={`font-mono text-xs uppercase tracking-[0.25em] ${
          light ? 'text-brand-ivory/60' : 'text-brand-brown'
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
            light ? 'text-brand-ivory/80' : 'text-brand-black/70'
          }`}
        >
          {intro}
        </p>
      )}
      <div className={`h-[1px] w-16 mt-4 ${light ? 'bg-brand-brown' : 'bg-brand-brown'}`} />
    </div>
  );
}
