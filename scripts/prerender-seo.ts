import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { buildHeadHtml, getServerPageSeo } from '../src/utils/serverSeo';

const DIST = path.resolve('dist');
const routes = [
  '/',
  '/eventos',
  '/catalogo/trucadoras',
  '/catalogo/suspensores',
  '/catalogo/ropa-interior',
];

function injectRouteSeo(template: string, route: string): string {
  const seo = getServerPageSeo(route);
  const dynamicHead = buildHeadHtml(seo).replace(
    /\n?  <script type="application\/ld\+json" id="server-seo-jsonld">[\s\S]*?<\/script>/,
    '',
  );
  const schema = `  <script type="application/ld+json">\n  ${JSON.stringify(seo.jsonLd, null, 2).replace(/</g, '\\u003c')}\n  </script>`;

  return template
    .replace(
      /<!-- SEO_DYNAMIC_HEAD_START -->[\s\S]*?<!-- SEO_DYNAMIC_HEAD_END -->/,
      `<!-- SEO_DYNAMIC_HEAD_START -->\n  ${dynamicHead}\n  <!-- SEO_DYNAMIC_HEAD_END -->`,
    )
    .replace(
      /<!-- SEO_SCHEMA_START -->[\s\S]*?<!-- SEO_SCHEMA_END -->/,
      `<!-- SEO_SCHEMA_START -->\n  ${schema}\n  <!-- SEO_SCHEMA_END -->`,
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

console.log(`SEO prerendered ${routes.length} indexable routes into dist/.`);
