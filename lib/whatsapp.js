/**
 * Single source of truth for the WhatsApp CTA flow.
 *
 * HYBRID LOGIC (June 2026 — rev. URGENT FIX):
 *  - Business hours (Mon-Thu 10-19 + Fri 10-16, America/Santiago)
 *      → open WhatsApp DIRECTLY in a new tab (zero friction)
 *  - Off hours (nights, weekends, holidays)
 *      → dispatch event to open the "Serena" off-hours intake modal
 *        which captures name + phone + email so Karina can call back
 *
 * Robustness: we use TWO independent timezone checks (Intl.DateTimeFormat
 * + Date.toLocaleString) and HARD-FORCE weekend closure. If anything goes
 * wrong we now fail-CLOSED (modal) — the Dra. would rather lose a click
 * than send a Saturday user to an empty inbox.
 */

export const WHATSAPP_NUMBER = '56930550750'

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hola Karina, me interesa agendar una consulta en Instituto DBT Chile.'

export function getWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Returns { dayOfWeek, hour } for America/Santiago, using the
 * toLocaleString → new Date round-trip, which is the most browser-portable
 * approach to read wall-clock time in a specific timezone.
 *
 * dayOfWeek: 0=Sun, 1=Mon, ..., 6=Sat (matches JS Date.getDay())
 */
function getSantiagoNow() {
  // "6/14/2026, 15:42:11" style — locale en-US gives MM/DD/YYYY, HH:MM:SS
  const santiagoString = new Date().toLocaleString('en-US', {
    timeZone: 'America/Santiago',
    hour12: false,
  })
  const santiagoDate = new Date(santiagoString)
  return {
    dayOfWeek: santiagoDate.getDay(),
    hour: santiagoDate.getHours(),
    raw: santiagoString,
  }
}

/**
 * Cross-check using Intl.DateTimeFormat (different code path).
 * Both checks must AGREE that it's business hours, otherwise we go to modal.
 */
function isBusinessHoursIntlCheck() {
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
    // Edge case: some browsers return "24" for midnight in hour12:false
    let hour = parseInt(hourStr, 10)
    if (hour === 24) hour = 0

    // HARD FORCE — weekends are ALWAYS closed
    if (weekday === 'Sat' || weekday === 'Sun') return false

    if (['Mon', 'Tue', 'Wed', 'Thu'].includes(weekday)) {
      return hour >= 10 && hour < 19
    }
    if (weekday === 'Fri') {
      return hour >= 10 && hour < 16
    }
    return false
  } catch (_) {
    return false // fail-closed
  }
}

/**
 * Main business-hours check (Santiago de Chile):
 *   - Mon-Thu: 10:00 inclusive — 19:00 exclusive
 *   - Fri:     10:00 inclusive — 16:00 exclusive
 *   - Sat/Sun: ALWAYS closed (hard-forced)
 *
 * Returns true ONLY if BOTH independent timezone checks agree.
 */
export function isBusinessHoursSantiago() {
  try {
    const { dayOfWeek, hour } = getSantiagoNow()

    // HARD FORCE — Saturday (6) and Sunday (0) are ALWAYS closed
    if (dayOfWeek === 0 || dayOfWeek === 6) return false

    let inHours = false
    // Mon (1), Tue (2), Wed (3), Thu (4): 10–19
    if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      inHours = hour >= 10 && hour < 19
    }
    // Fri (5): 10–16
    if (dayOfWeek === 5) {
      inHours = hour >= 10 && hour < 16
    }

    // Cross-validate with the Intl check — both must agree
    return inHours && isBusinessHoursIntlCheck()
  } catch (_) {
    // fail-CLOSED — modal is safer than dropping a Saturday lead into nothing
    return false
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

  // Fire-and-forget click tracking (does NOT block UX)
  try {
    const open = isBusinessHoursSantiago()
    fetch('/api/whatsapp-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source,
        mode: open ? 'direct' : 'after-hours',
        clientTimestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        page: typeof location !== 'undefined' ? location.pathname : '',
      }),
      keepalive: true,
    }).catch(() => {})
  } catch (_) {}

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
