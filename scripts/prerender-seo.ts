import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
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
  '/gracias': '<main><h1>Pago aprobado</h1><p>Tu pago fue recibido. Cargando el comprobante del Atelier de Ivana Racca…</p></main>',
  '/pendiente': '<main><h1>Pago pendiente</h1><p>Tu pago está en proceso de verificación. Cargando el estado de la operación…</p></main>',
  '/error': '<main><h1>Pago rechazado o cancelado</h1><p>No pudimos completar la operación. Cargando las opciones de asistencia…</p></main>',
};

function injectRouteSeo(template: string, route: string): string {
  const seo = getServerPageSeo(route);
  const dynamicHead = buildHeadHtml(seo).replace(
    /\n?  <script type="application\/ld\+json" id="server-seo-jsonld">[\s\S]*?<\/script>/,
    '',
  );
  const schema = `  <script type="application/ld+json">
  ${JSON.stringify(seo.jsonLd, null, 2).replace(/</g, '\\u003c')}
  </script>`;

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
      paymentFallbacks[route]
        ? `<div id="root">${paymentFallbacks[route]}</div>`
        : '<div id="root"></div>',
    );
}

const template = await readFile(path.join(DIST, 'index.html'), 'utf8');

for (const route of routes) {
  if (route === '/') continue;
  const html = injectRouteSeo(template, route);
  const outputDir = path.join(DIST, route.replace(/^\//, ''));
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), html, 'utf8');
}

console.log(`SEO prerendered ${routes.length} routes into dist/ (5 indexable + 3 noindex payment routes).`);
