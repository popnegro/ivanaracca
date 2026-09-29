const RESPONSIVE_IMAGE_SOURCES = new Set([
  '/images/ivana-racca-atelier.webp',
  '/images/ana-laura-turca-nicoletti-plate-dress-up.webp',
  '/images/ana-laura-turca-nicoletti-black-dress.webp',
  '/images/brown-dress.webp',
  '/images/rainbow-dress.webp',
]);

export function getResponsiveImageProps(
  src: string,
  sizes = '(max-width: 767px) 100vw, 50vw',
) {
  if (!RESPONSIVE_IMAGE_SOURCES.has(src)) {
    return {};
  }

  const base = src.replace(/\.webp$/, '');

  return {
    srcSet: [
      `${base}-320.webp 320w`,
      `${base}-480.webp 480w`,
      `${base}-768.webp 768w`,
    ].join(', '),
    sizes,
  };
}
