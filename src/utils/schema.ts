/**
 * Schema.org JSON-LD builders for catalog products.
 * Single source of truth aligned with CATALOG_ITEMS + LocalBusiness NAP.
 */

import type { CatalogItem } from '../data';

export const SITE_ORIGIN = 'https://ivanaracca.vercel.app';

const BUSINESS_ID = `${SITE_ORIGIN}/#business`;
const PERSON_ID = `${SITE_ORIGIN}/#ivana-racca`;

export type ProductSchemaOptions = {
  /** Canonical product page path, e.g. /catalogo/trucadoras */
  pagePath?: string;
  /** Use long description when on product page */
  useLongDescription?: boolean;
};

/**
 * Product + Offer without public price (consulta WhatsApp).
 * availability: LimitedAvailability until a public price exists.
 */
export function buildProductSchema(
  product: CatalogItem,
  options: ProductSchemaOptions = {}
): Record<string, unknown> {
  const pagePath = options.pagePath ?? `/catalogo/${product.slug}`;
  const pageUrl = `${SITE_ORIGIN}${pagePath}`;
  const description = options.useLongDescription
    ? product.longDescription
    : product.description;

  return {
    '@type': 'Product',
    '@id': `${pageUrl}#product`,
    name: product.name,
    description,
    image: [`${SITE_ORIGIN}${product.imageUrl}`],
    url: pageUrl,
    sku: product.id,
    category: 'Apparel & Accessories > Clothing > Underwear & Socks',
    brand: {
      '@type': 'Brand',
      '@id': `${SITE_ORIGIN}/#brand`,
      name: 'Ivana Racca',
    },
    manufacturer: {
      '@id': PERSON_ID,
    },
    offers: {
      '@type': 'Offer',
      '@id': `${pageUrl}#offer`,
      url: pageUrl,
      priceCurrency: 'ARS',
      availability: 'https://schema.org/LimitedAvailability',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@id': BUSINESS_ID,
      },
      // Sin price: cotización por WhatsApp (no e-commerce)
      hasMerchantReturnPolicy: undefined,
    },
  };
}

/** Graph for a product detail page: WebPage + Breadcrumb + Product */
export function buildProductPageGraph(product: CatalogItem): Record<string, unknown> {
  const pagePath = `/catalogo/${product.slug}`;
  const pageUrl = `${SITE_ORIGIN}${pagePath}`;
  const productNode = buildProductSchema(product, {
    pagePath,
    useLongDescription: true,
  });

  // Clean undefined keys from offers
  const offers = productNode.offers as Record<string, unknown>;
  delete offers.hasMerchantReturnPolicy;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: product.seoTitle,
        description: product.seoDescription,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        about: { '@id': `${pageUrl}#product` },
        inLanguage: 'es-AR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: `${SITE_ORIGIN}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Catálogo',
            item: `${SITE_ORIGIN}/#catalogo`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.name,
            item: pageUrl,
          },
        ],
      },
      productNode,
    ],
  };
}
