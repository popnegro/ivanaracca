/**
 * Client-side SEO helpers for SPA product pages.
 * Updates document head so rendered routes expose correct title/meta/canonical.
 */

export type PageMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  imagePath?: string;
  imageAlt?: string;
};

const SITE = 'https://ivanaracca.vercel.app';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

export function applyPageMeta(meta: PageMeta): void {
  if (typeof document === 'undefined') return;

  const url = `${SITE}${meta.canonicalPath}`;
  const image = `${SITE}${meta.imagePath || '/images/og-image.webp'}`;

  document.title = meta.title;
  setMeta('name', 'description', meta.description);
  setCanonical(url);

  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', meta.description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', image);
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');
  setMeta('property', 'og:image:type', 'image/webp');
  if (meta.imageAlt) setMeta('property', 'og:image:alt', meta.imageAlt);

  setMeta('name', 'twitter:title', meta.title);
  setMeta('name', 'twitter:description', meta.description);
  setMeta('name', 'twitter:image', image);
}

export function injectJsonLd(id: string, data: Record<string, unknown>): void {
  if (typeof document === 'undefined') return;
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function removeJsonLd(id: string): void {
  document.getElementById(id)?.remove();
}
