/**
 * Server-side SEO metadata for the initial HTML response.
 * Keeps the SPA client metadata helpers, while giving crawlers and social
 * previews route-specific title, canonical, OG/Twitter and JSON-LD immediately.
 */
import type { CatalogItem } from '../data';
import { getCatalogBySlug } from '../data';
import { EVENT_ITEMS, PRESS_ITEMS } from '../data/events';
import { buildProductPageGraph } from './schema';

export const SITE_ORIGIN = 'https://ivanaracca.vercel.app';
const PERSON_ID = `${SITE_ORIGIN}/#ivana-racca`;
const BUSINESS_ID = `${SITE_ORIGIN}/#business`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
const DEFAULT_OG_IMAGE = '/images/og-image.webp';

export type ServerPageSeo = {
  title: string;
  description: string;
  canonicalPath: string;
  imagePath: string;
  imageAlt: string;
  robots?: string;
  jsonLd: Record<string, unknown>;
};

function personNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Ivana Racca',
    jobTitle: 'Diseñadora de indumentaria y modista',
    image: `${SITE_ORIGIN}/images/ivana-racca-atelier.webp`,
    description:
      'Diseñadora de indumentaria y modista especializada en alta costura, confección a medida y vestuario escénico en Maipú, Mendoza.',
    url: `${SITE_ORIGIN}/`,
    sameAs: ['https://www.instagram.com/ivanaracca/'],
    knowsAbout: [
      'Alta costura',
      'Diseño de indumentaria',
      'Confección a medida',
      'Modistería artesanal',
      'Vestuario escénico',
      'Transformación de prendas',
      'Ropa interior inclusiva',
    ],
  };
}

function businessNode() {
  return {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': BUSINESS_ID,
    name: 'Ivana Racca — Atelier de Alta Costura y Modistería',
    description:
      'Atelier de alta costura, diseño a medida, ajustes y transformaciones de prendas, vestuario escénico y corsetería en Maipú, Mendoza.',
    url: `${SITE_ORIGIN}/`,
    telephone: '+5492617530617',
    image: `${SITE_ORIGIN}/images/ivana-racca-atelier.webp`,
    priceRange: '$$',
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Maipú, Mendoza, Argentina' },
      { '@type': 'AdministrativeArea', name: 'Gran Mendoza, Argentina' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Canal de Beagle 2520',
      addressLocality: 'Maipú',
      addressRegion: 'Mendoza',
      postalCode: '5514',
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -32.9778,
      longitude: -68.7833,
    },
    hasMap: 'https://maps.google.com/?q=Canal+de+Beagle+2520,+Maip%C3%BA,+Mendoza',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    provider: { '@id': PERSON_ID },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Confección y Diseño',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Alta Costura', description: 'Vestidos de fiesta, novias, madrinas y ocasiones especiales diseñados y confeccionados a mano.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Confección a Medida', description: 'Prendas pensadas desde cero para cada persona, con moldería personalizada y pruebas individuales.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ajustes y Transformaciones', description: 'Adaptación, entalle y modernización de prendas existentes con técnicas de modistería tradicional.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vestuario Escénico', description: 'Diseño y realización de vestuario para espectáculos, teatro, danza y puestas en escena.' } },
      ],
    },
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_ORIGIN}/`,
    name: 'Ivana Racca | Alta Costura y Modista en Maipú, Mendoza',
    description:
      'Sitio oficial de Ivana Racca: alta costura, diseño a medida, transformaciones, vestuario y catálogo de prendas interiores.',
    publisher: { '@id': PERSON_ID },
    inLanguage: 'es-AR',
  };
}

function homeGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode(),
      businessNode(),
      websiteNode(),
      {
        '@type': 'WebPage',
        '@id': `${SITE_ORIGIN}/#webpage`,
        url: `${SITE_ORIGIN}/`,
        name: 'Ivana Racca | Alta Costura y Modista en Maipú, Mendoza',
        description:
          'Ivana Racca, diseñadora y modista en Maipú, Mendoza. Alta costura, confección a medida, ajustes, transformaciones, vestuario y ropa interior en talles exclusivos o especiales.',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        provider: { '@id': BUSINESS_ID },
        inLanguage: 'es-AR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_ORIGIN}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_ORIGIN}/` },
        ],
      },
    ],
  };
}

function eventsGraph() {
  const works = EVENT_ITEMS.map((item, index) => ({
    '@type': 'CreativeWork',
    '@id': `${SITE_ORIGIN}/eventos#${item.id}`,
    name: item.title,
    description: item.summary,
    creator: { '@id': PERSON_ID },
    contributor: { '@type': 'Person', name: item.featuredPerson },
    image: item.images.map((image) => `${SITE_ORIGIN}${image}`),
    dateCreated: item.date,
    creditText: item.credits,
    about: ['vestuario escénico', item.pieceName, item.featuredPerson],
    position: index + 1,
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode(),
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_ORIGIN}/eventos#webpage`,
        url: `${SITE_ORIGIN}/eventos`,
        name: 'Eventos y prensa — Ivana Racca',
        description:
          'Diseños para Ana Laura Nicoletti y notas periodísticas sobre Ivana Racca, atelier en Maipú, Mendoza.',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PERSON_ID },
        author: { '@id': PERSON_ID },
        inLanguage: 'es-AR',
        mainEntity: {
          '@type': 'ItemList',
          '@id': `${SITE_ORIGIN}/eventos#archivo`,
          name: 'Archivo de diseños para escena',
          numberOfItems: works.length,
          itemListElement: works.map((work, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: { '@id': work['@id'] },
          })),
        },
        citation: PRESS_ITEMS.map((note) => note.url),
      },
      ...works,
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_ORIGIN}/eventos#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Eventos', item: `${SITE_ORIGIN}/eventos` },
        ],
      },
    ],
  };
}

function productSeo(product: CatalogItem): ServerPageSeo {
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    canonicalPath: `/catalogo/${product.slug}`,
    imagePath: DEFAULT_OG_IMAGE,
    imageAlt: `${product.name} — Ivana Racca, Maipú Mendoza`,
    jsonLd: buildProductPageGraph(product),
  };
}

export function getServerPageSeo(pathname: string): ServerPageSeo {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';

  if (normalized === '/') {
    return {
      title: 'Ivana Racca | Alta Costura y Modista en Maipú, Mendoza',
      description:
        'Ivana Racca, diseñadora y modista en Maipú, Mendoza. Alta costura, confección a medida, ajustes, transformaciones, vestuario y ropa interior en talles exclusivos o especiales.',
      canonicalPath: '/',
      imagePath: DEFAULT_OG_IMAGE,
      imageAlt: 'Ivana Racca — Alta Costura y Diseño de Autor en Mendoza',
      jsonLd: homeGraph(),
    };
  }

  if (normalized === '/gracias' || normalized === '/pendiente' || normalized === '/error') {
    const paymentSeo = {
      '/gracias': {
        title: 'Pago aprobado | Ivana Racca',
        description: 'Tu pago fue recibido. Estamos preparando el comprobante de tu operación con Ivana Racca.',
      },
      '/pendiente': {
        title: 'Pago pendiente | Ivana Racca',
        description: 'Tu pago está en proceso de verificación. Consultá el estado de tu operación con Ivana Racca.',
      },
      '/error': {
        title: 'Pago rechazado o cancelado | Ivana Racca',
        description: 'No pudimos completar la operación. Podés volver a intentarlo o solicitar asistencia a Ivana Racca.',
      },
    }[normalized];

    return {
      title: paymentSeo.title,
      description: paymentSeo.description,
      canonicalPath: normalized,
      imagePath: DEFAULT_OG_IMAGE,
      imageAlt: 'Ivana Racca — Alta Costura y Diseño de Autor',
      robots: 'noindex, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: paymentSeo.title,
        description: paymentSeo.description,
        url: `${SITE_ORIGIN}${normalized}`,
        isPartOf: { '@id': WEBSITE_ID },
      },
    };
  }

  if (normalized === '/eventos') {
    return {
      title: 'Eventos y prensa | Ivana Racca — Maipú, Mendoza',
      description:
        'Diseños de Ivana Racca para Ana Laura Nicoletti, archivo de eventos y notas periodísticas. Atelier en Maipú, Mendoza.',
      canonicalPath: '/eventos',
      imagePath: DEFAULT_OG_IMAGE,
      imageAlt: 'Eventos — diseños Ivana Racca',
      jsonLd: eventsGraph(),
    };
  }

  const match = normalized.match(/^\/catalogo\/([a-z0-9-]+)$/);
  const product = match ? getCatalogBySlug(match[1]) : undefined;
  if (product) return productSeo(product);

  return {
    title: 'Página no encontrada | Ivana Racca',
    description: 'La página solicitada no existe.',
    canonicalPath: normalized,
    imagePath: DEFAULT_OG_IMAGE,
    imageAlt: 'Ivana Racca — Alta Costura y Diseño de Autor',
    robots: 'noindex, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Página no encontrada | Ivana Racca',
      url: `${SITE_ORIGIN}${normalized}`,
      isPartOf: { '@id': WEBSITE_ID },
    },
  };
}

export function buildHeadHtml(seo: ServerPageSeo): string {
  const url = `${SITE_ORIGIN}${seo.canonicalPath}`;
  const image = `${SITE_ORIGIN}${seo.imagePath}`;
  const robots =
    seo.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const jsonLd = JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c');

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    '<meta property="og:locale" content="es_AR" />',
    '<meta property="og:site_name" content="Ivana Racca" />',
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${escapeHtml(seo.imageAlt)}" />`,
    '<meta property="og:image:type" content="image/webp" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(seo.imageAlt)}" />`,
    `<script type="application/ld+json" id="server-seo-jsonld">${jsonLd}</script>`,
  ].join('\n  ');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
