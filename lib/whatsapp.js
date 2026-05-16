/**
 * Single source of truth for the WhatsApp CTA flow.
 *
 * SIMPLIFIED LOGIC (June 2026):
 *  - Every click → opens WhatsApp DIRECTLY in a new tab. 24/7.
 *  - No modal, no friction, no schedule gating.
 *  - Silent click tracking still fires (for ads conversion auditing).
 */

export const WHATSAPP_NUMBER = '56930550750'

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hola Karina, me interesa agendar una consulta en Instituto DBT Chile.'

export function getWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Main CTA handler used by every "Solicitar hora" / "Agendar Consulta" /
 * "WhatsApp" button on the site. Always opens WhatsApp directly.
 */
export function openWhatsAppOrCapture(source = 'general', message = WHATSAPP_DEFAULT_MESSAGE) {
  if (typeof window === 'undefined') return

  // Fire-and-forget silent click tracking (never blocks UX)
  try {
    fetch('/api/whatsapp-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source,
        mode: 'direct',
        clientTimestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        page: typeof location !== 'undefined' ? location.pathname : '',
      }),
      keepalive: true,
    }).catch(() => {})
  } catch (_) {}

  const url = getWhatsAppUrl(message)
  const win = window.open(url, '_blank', 'noopener,noreferrer')
  if (!win) window.location.href = url
}

// Backwards-compat aliases
export const openWhatsApp = openWhatsAppOrCapture

// Stubs kept so any leftover imports don't crash (always returns "open" = true).
export function isBusinessHoursSantiago() { return true }
export function getChileanHolidayToday() { return null }
export function isChileanHolidayToday() { return false }
