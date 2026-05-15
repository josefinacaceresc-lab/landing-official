/**
 * Single source of truth for the WhatsApp CTA URL used across the site.
 *
 * EMERGENCY FLOW (May 2026): All WhatsApp buttons now redirect IMMEDIATELY
 * to wa.me — no modal, no name capture, no friction.
 * One click = One WhatsApp message.
 */

export const WHATSAPP_NUMBER = '56930550750' // Karina · +56 9 3055 0750

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hola Karina, me interesa agendar una consulta en Instituto DBT Chile.'

export function getWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Imperative helper for onClick handlers — opens WhatsApp immediately.
 * Works around mobile popup blockers by using window.open in the same tick.
 */
export function openWhatsApp(_source = 'general', message = WHATSAPP_DEFAULT_MESSAGE) {
  if (typeof window === 'undefined') return
  const url = getWhatsAppUrl(message)
  // Try synchronous popup first (preserves mobile gesture)
  const win = window.open(url, '_blank', 'noopener,noreferrer')
  if (!win) {
    // Popup blocked — fall back to top-level navigation
    window.location.href = url
  }
}
