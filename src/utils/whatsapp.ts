/**
 * Reusable utility to generate WhatsApp URLs with encoded messages
 * for Ivana Racca.
 */

const WHATSAPP_NUMBER = "5492617530617";

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
