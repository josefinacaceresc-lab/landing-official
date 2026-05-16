/**
 * Single source of truth for the WhatsApp CTA flow.
 *
 * HYBRID LOGIC (May 2026):
 *  - Business hours (Mon-Thu 10-19 + Fri 10-16, America/Santiago)
 *      → open WhatsApp DIRECTLY in a new tab (zero friction)
 *  - Off hours (nights, weekends)
 *      → dispatch event to open the "Serena" off-hours intake modal
 *        which captures name + phone + email so Karina can call back
 */

export const WHATSAPP_NUMBER = '56930550750'

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hola Karina, me interesa agendar una consulta en Instituto DBT Chile.'

export function getWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Returns true when Santiago de Chile local time is within Karina's clinic hours:
 *   - Mon-Thu: 10:00 inclusive — 19:00 exclusive
 *   - Fri:     10:00 inclusive — 16:00 exclusive
 *   - Sat/Sun: closed
 * Uses Intl API which auto-handles Chilean DST (CLT/CLST).
 */
export function isBusinessHoursSantiago() {
  try {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Santiago',
      weekday: 'short',
      hour: 'numeric',
      hour12: false,
    })
    const parts = fmt.formatToParts(new Date())
    const weekday = parts.find((p) => p.type === 'weekday')?.value || ''
    const hourStr = parts.find((p) => p.type === 'hour')?.value || '0'
    const hour = parseInt(hourStr, 10)

    if (['Mon', 'Tue', 'Wed', 'Thu'].includes(weekday)) {
      return hour >= 10 && hour < 19
    }
    if (weekday === 'Fri') {
      return hour >= 10 && hour < 16
    }
    return false // Sat & Sun = always closed
  } catch (_) {
    return true // fail-open to keep conversion flow
  }
}

/**
 * Main CTA handler used by every "Solicitar hora" / "Agendar Consulta" /
 * "WhatsApp" button on the site.
 *
 * - Inside business hours → opens WhatsApp directly.
 * - Outside business hours → dispatches 'open-fast-capture' event so the
 *   FastCaptureModal mounts the Serena intake form.
 */
export function openWhatsAppOrCapture(source = 'general', message = WHATSAPP_DEFAULT_MESSAGE) {
  if (typeof window === 'undefined') return

  if (isBusinessHoursSantiago()) {
    const url = getWhatsAppUrl(message)
    const win = window.open(url, '_blank', 'noopener,noreferrer')
    if (!win) window.location.href = url
    return
  }

  // Off-hours: open Serena intake modal
  window.dispatchEvent(
    new CustomEvent('open-fast-capture', { detail: { source, mode: 'after-hours' } })
  )
}

// Backwards-compat alias used by older imports
export const openWhatsApp = openWhatsAppOrCapture
