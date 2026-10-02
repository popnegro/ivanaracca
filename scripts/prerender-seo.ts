import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { CATALOG_ITEMS, SERVICES, FAQ_ITEMS, COLLECTION_ITEMS } from '../src/data';
import { EVENT_ITEMS, PRESS_ITEMS } from '../src/data/events';
import { buildHeadHtml, getServerPageSeo } from '../src/utils/serverSeo';

const DIST = path.resolve('dist');

// Five canonical indexable routes plus three payment return routes.
// Payment routes are prerendered only to keep external return URLs functional;
// serverSeo marks them noindex, follow.
const routes = [
  '/',
  '/eventos',
  '/catalogo/trucadoras',
  '/catalogo/suspensores',
  '/catalogo/ropa-interior',
  '/gracias',
  '/pendiente',
  '/error',
];

const paymentFallbacks: Record<string, string> = {
  '/gracias':
    '<main><h1>Pago aprobado</h1><p>Tu pago fue recibido. Cargando el comprobante del Atelier de Ivana Racca…</p></main>',
  '/pendiente':
    '<main><h1>Pago pendiente</h1><p>Tu pago está en proceso de verificación. Cargando el estado de la operación…</p></main>',
  '/error':
    '<main><h1>Pago rechazado o cancelado</h1><p>No pudimos completar la operación. Cargando las opciones de asistencia…</p></main>',
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function homeContentShell(): string {
  const services = SERVICES.map(
    (s) =>
      `<li><strong>${escapeHtml(s.title)}</strong> — ${escapeHtml(s.description)}</li>`,
  ).join('');
  const collection = COLLECTION_ITEMS.map(
    (c) => `<li>${escapeHtml(c.name)} (${escapeHtml(c.category)})</li>`,
  ).join('');
  const catalog = CATALOG_ITEMS.map(
    (c) =>
      `<li><a href="/catalogo/${escapeHtml(c.slug)}">${escapeHtml(c.name)}</a> — ${escapeHtml(c.description)}</li>`,
  ).join('');
  const faqs = FAQ_ITEMS.slice(0, 5)
    .map(
      (f) =>
        `<li><strong>${escapeHtml(f.question)}</strong> ${escapeHtml(f.answer)}</li>`,
    )
    .join('');

  return `<main>
  <h1>Ivana Racca | Alta Costura y Modista en Maipú, Mendoza</h1>
  <p>Ivana Racca, diseñadora y modista en Maipú, Mendoza. Alta costura, confección a medida, ajustes y transformaciones, vestuario y ropa interior en talles exclusivos o especiales. Atelier en Canal de Beagle 2520, Maipú (Mendoza). Atención con cita previa, lunes a viernes de 9 a 17 hs. Consultas por WhatsApp.</p>
  <nav aria-label="Secciones principales">
    <a href="/#atelier">Atelier</a>
    <a href="/#coleccion">Colección</a>
    <a href="/#servicios">Servicios</a>
    <a href="/#catalogo">Catálogo</a>
    <a href="/eventos">Eventos</a>
    <a href="/#contacto">Contacto</a>
  </nav>
  <section aria-labelledby="servicios-heading">
    <h2 id="servicios-heading">Servicios</h2>
    <ul>${services}</ul>
  </section>
  <section aria-labelledby="coleccion-heading">
    <h2 id="coleccion-heading">Colección</h2>
    <ul>${collection}</ul>
  </section>
  <section aria-labelledby="catalogo-heading">
    <h2 id="catalogo-heading">Catálogo</h2>
    <ul>${catalog}</ul>
  </section>
  <section aria-labelledby="faq-heading">
    <h2 id="faq-heading">Preguntas frecuentes</h2>
    <ul>${faqs}</ul>
  </section>
  <section aria-labelledby="contacto-heading">
    <h2 id="contacto-heading">Contacto</h2>
    <p>WhatsApp: +54 9 261 753-0617 · Canal de Beagle 2520, M5514 Maipú, Mendoza, Argentina.</p>
  </section>
</main>`;
}

function eventsContentShell(): string {
  const events = EVENT_ITEMS.map(
    (e) =>
      `<li><strong>${escapeHtml(e.title)}</strong> (${escapeHtml(e.dateLabel)}) — ${escapeHtml(e.summary)} Diseño: ${escapeHtml(e.pieceName)}. En cuerpo: ${escapeHtml(e.featuredPerson)}.</li>`,
  ).join('');
  const press = PRESS_ITEMS.map(
    (p) =>
      `<li><a href="${escapeHtml(p.url)}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.outlet)} (${escapeHtml(p.dateLabel)}). ${escapeHtml(p.excerpt)}</li>`,
  ).join('');

  return `<main>
  <h1>Eventos y prensa | Ivana Racca — Maipú, Mendoza</h1>
  <p>Diseños de Ivana Racca para Ana Laura Nicoletti, archivo de eventos y notas periodísticas. Atelier de alta costura y modistería en Maipú, Mendoza.</p>
  <nav aria-label="Navegación">
    <a href="/">Inicio</a>
    <a href="/#catalogo">Catálogo</a>
    <a href="/#contacto">Contacto</a>
  </nav>
  <section aria-labelledby="eventos-heading">
    <h2 id="eventos-heading">Archivo de diseños para escena</h2>
    <ul>${events}</ul>
  </section>
  <section aria-labelledby="prensa-heading">
    <h2 id="prensa-heading">Notas de prensa</h2>
    <ul>${press}</ul>
  </section>
</main>`;
}

function catalogContentShell(slug: string): string | null {
  const product = CATALOG_ITEMS.find((item) => item.slug === slug);
  if (!product) return null;

  const benefits = product.benefits
    .map((b) => `<li>${escapeHtml(b)}</li>`)
    .join('');
  const steps = product.processSteps
    .map((s, i) => `<li><strong>Paso ${i + 1}.</strong> ${escapeHtml(s)}</li>`)
    .join('');
  const faqs = product.faqs
    .map(
      (f) =>
        `<li><strong>${escapeHtml(f.question)}</strong> ${escapeHtml(f.answer)}</li>`,
    )
    .join('');

  return `<main>
  <h1>${escapeHtml(product.h1)}</h1>
  <p>${escapeHtml(product.intro)}</p>
  <p>${escapeHtml(product.longDescription)}</p>
  <nav aria-label="Navegación">
    <a href="/">Inicio</a>
    <a href="/#catalogo">Catálogo</a>
    <a href="/eventos">Eventos</a>
    <a href="/#contacto">Contacto</a>
  </nav>
  <section aria-labelledby="beneficios-heading">
    <h2 id="beneficios-heading">Beneficios</h2>
    <ul>${benefits}</ul>
  </section>
  <section aria-labelledby="proceso-heading">
    <h2 id="proceso-heading">Cómo encargar</h2>
    <ol>${steps}</ol>
  </section>
  <section aria-labelledby="faq-prod-heading">
    <h2 id="faq-prod-heading">Preguntas frecuentes</h2>
    <ul>${faqs}</ul>
  </section>
  <p>${escapeHtml(product.geoNote)}</p>
  <p>Consultá por WhatsApp: +54 9 261 753-0617.</p>
</main>`;
}

function contentShellForRoute(route: string): string | null {
  if (route === '/') return homeContentShell();
  if (route === '/eventos') return eventsContentShell();
  const catalogMatch = route.match(/^\/catalogo\/([a-z0-9-]+)$/);
  if (catalogMatch) return catalogContentShell(catalogMatch[1]);
  return null;
}

function injectRouteSeo(template: string, route: string): string {
  const seo = getServerPageSeo(route);
  const dynamicHead = buildHeadHtml(seo).replace(
    /\n?  <script type="application\/ld\+json" id="server-seo-jsonld">[\s\S]*?<\/script>/,
    '',
  );
  const schema = `  <script type="application/ld+json">
  ${JSON.stringify(seo.jsonLd, null, 2).replace(/</g, '\\u003c')}
  </script>`;

  const bodyInner =
    paymentFallbacks[route] ?? contentShellForRoute(route) ?? '';

  return template
    .replace(
      /<!-- SEO_DYNAMIC_HEAD_START -->[\s\S]*?<!-- SEO_DYNAMIC_HEAD_END -->/,
      `<!-- SEO_DYNAMIC_HEAD_START -->
  ${dynamicHead}
  <!-- SEO_DYNAMIC_HEAD_END -->`,
    )
    .replace(
      /<!-- SEO_SCHEMA_START -->[\s\S]*?<!-- SEO_SCHEMA_END -->/,
      `<!-- SEO_SCHEMA_START -->
  ${schema}
  <!-- SEO_SCHEMA_END -->`,
    )
    .replace(
      '<div id="root"></div>',
      bodyInner
        ? `<div id="root">${bodyInner}</div>`
        : '<div id="root"></div>',
    );
}

const template = await readFile(path.join(DIST, 'index.html'), 'utf8');

for (const route of routes) {
  const html = injectRouteSeo(template, route);
  if (route === '/') {
    // Overwrite the Vite-built home so crawlers see semantic content on /
    await writeFile(path.join(DIST, 'index.html'), html, 'utf8');
  } else {
    const outputDir = path.join(DIST, route.replace(/^\//, ''));
    await mkdir(outputDir, { recursive: true });
    await writeFile(path.join(outputDir, 'index.html'), html, 'utf8');
  }
}

console.log(
  `SEO prerendered ${routes.length} routes into dist/ (5 indexable with content shells + 3 noindex payment routes).`,
);
