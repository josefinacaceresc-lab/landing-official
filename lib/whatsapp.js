/**
 * Direct WhatsApp utility — "strip-down" mode (June 2026 final order).
 *
 * Removed:
 *   - Serena modal trigger
 *   - /api/leads atomic save
 *   - /api/whatsapp-click tracking
 *   - business-hours conditional branching
 *   - holiday detection / timezone helpers (no longer needed for UI)
 *
 * Every entry point on the site is now a direct redirect to wa.me/56930550750
 * with an optional pre-filled message. Most call sites are <a> tags; for the
 * few legacy <button onClick>...</button> components we keep `openWhatsApp()`
 * as a thin wrapper around window.open.
 */

export const WHATSAPP_NUMBER = '56930550750'

export const WHATSAPP_DEFAULT_MESSAGE =
  '¡Hola! 👋 Vi su sitio web y me gustaría recibir información sobre el Programa de Alta Fidelidad en DBT del Instituto. ¿Me podrían ayudar a agendar una hora? Muchas gracias.'

/** Build a wa.me URL with optional pre-filled message. */
export function getWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Open WhatsApp directly. Kept for backwards compatibility with the few
 * <button onClick={() => openWhatsAppOrCapture(...)}> call sites in pages.
 * No modal, no API calls — pure window.open.
 */
export function openWhatsAppOrCapture(_source = 'general', message = WHATSAPP_DEFAULT_MESSAGE) {
  if (typeof window === 'undefined') return
  const url = getWhatsAppUrl(message)
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer')
    if (!win) window.location.href = url
  } catch (_) {
    window.location.href = url
  }
}

// Alias kept for any imports using the older name.
export const openWhatsApp = openWhatsAppOrCapture
