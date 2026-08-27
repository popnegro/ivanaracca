/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set' | 'js',
      action: string | Date,
      params?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Utility function to track events in Google Analytics (GA4) via window.gtag.
 * Safely checks if window and window.gtag are defined before dispatching.
 *
 * @param eventName Name of the event (e.g., 'click_cta', 'generate_lead')
 * @param params Optional key-value parameters passed with the event (e.g., { button_name: 'whatsapp_floating' })
 */
export function trackEvent(eventName: string, params?: Record<string, any>): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

/**
 * Helper to track CTA clicks with standard 'click_cta' and 'button_name' parameter.
 */
export function trackCtaClick(
  buttonName: string,
  locationOrParams?: string | Record<string, any>,
  extraParams?: Record<string, any>
): void {
  const params: Record<string, any> = {
    button_name: buttonName,
  };

  if (typeof locationOrParams === 'string') {
    params.cta_location = locationOrParams;
    if (extraParams) {
      Object.assign(params, extraParams);
    }
  } else if (typeof locationOrParams === 'object' && locationOrParams !== null) {
    Object.assign(params, locationOrParams);
  }

  trackEvent('click_cta', params);
}

/**
 * Tracks WhatsApp CTA clicks across the site (Lead generation & engagement).
 */
export function trackWhatsAppClick(
  location: string,
  message?: string,
  extraParams?: Record<string, any>
): void {
  trackEvent('click_cta', {
    button_name: `whatsapp_${location}`,
    cta_location: location,
    message_preview: message ? message.slice(0, 100) : undefined,
    method: 'whatsapp',
    ...extraParams,
  });

  trackEvent('contact_whatsapp', {
    event_category: 'engagement',
    event_label: location,
    cta_location: location,
    message_preview: message ? message.slice(0, 100) : undefined,
    method: 'whatsapp',
    ...extraParams,
  });

  trackEvent('generate_lead', {
    event_category: 'leads',
    event_label: location,
    lead_type: 'whatsapp',
    cta_location: location,
    ...extraParams,
  });
}

/**
 * Tracks Instagram outbound link clicks.
 */
export function trackInstagramClick(location: string): void {
  trackEvent('click_cta', {
    button_name: `instagram_${location}`,
    cta_location: location,
    network: 'instagram',
  });

  trackEvent('social_click', {
    event_category: 'social',
    network: 'instagram',
    event_label: location,
    cta_location: location,
  });
}

/**
 * Tracks inquiries on haute couture collection pieces.
 */
export function trackCollectionInquiry(itemName: string, category: string): void {
  trackWhatsAppClick('collection', `Consulta por pieza: ${itemName}`, {
    item_name: itemName,
    item_category: category,
  });
}

/**
 * Tracks inquiries on catalog products (Trucadoras, Suspensores, etc.).
 */
export function trackCatalogInquiry(productName: string, productId?: string): void {
  trackEvent('click_cta', {
    button_name: `catalog_item_${productId || productName.toLowerCase().replace(/\s+/g, '_')}`,
    item_name: productName,
  });

  trackWhatsAppClick('catalog', `Consulta por producto: ${productName}`, {
    item_name: productName,
    item_id: productId,
  });
}

/**
 * Tracks inquiries on custom services (Alta costura, confección, vestuario).
 */
export function trackServiceInquiry(serviceTitle: string, serviceNumber: string): void {
  trackEvent('click_cta', {
    button_name: `service_${serviceNumber}_${serviceTitle.toLowerCase().replace(/\s+/g, '_')}`,
    service_title: serviceTitle,
    service_number: serviceNumber,
  });

  trackWhatsAppClick('services', `Consulta por servicio: ${serviceTitle}`, {
    service_title: serviceTitle,
    service_number: serviceNumber,
  });
}

/**
 * Tracks successful purchase/order conversion on GraciasView.
 */
export function trackPurchaseConversion(details: {
  paymentId?: string | null;
  preferenceId?: string | null;
  externalReference?: string | null;
}): void {
  trackEvent('purchase', {
    transaction_id: details.paymentId || details.externalReference || details.preferenceId || 'order_completed',
    payment_type: 'mercadopago',
    currency: 'ARS',
  });
}
