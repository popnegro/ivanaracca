/**
 * Navegación principal sintética.
 * Oficio y FAQ viven en home y se enlazan desde el pie / menú móvil secundario.
 */

export type NavLink = {
  label: string;
  /** Hash on home (#atelier) or absolute path (/eventos) */
  href: string;
  kind: 'hash' | 'route';
};

/** Primary chrome — desktop + mobile */
export const PRIMARY_NAV: NavLink[] = [
  { label: 'ATELIER', href: '#atelier', kind: 'hash' },
  { label: 'COLECCIÓN', href: '#coleccion', kind: 'hash' },
  { label: 'EVENTOS', href: '/eventos', kind: 'route' },
  { label: 'CATÁLOGO', href: '#catalogo', kind: 'hash' },
  { label: 'CONTACTO', href: '#contacto', kind: 'hash' },
];

/** Secondary links (footer / mobile extra) — no pierden UX */
export const SECONDARY_NAV: NavLink[] = [
  { label: 'Oficio', href: '#oficio', kind: 'hash' },
  { label: 'FAQ', href: '#faq', kind: 'hash' },
];
