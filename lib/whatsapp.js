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
 * Returns { dayOfWeek, hour, month, dayOfMonth } for America/Santiago.
 *
 * dayOfWeek: 0=Sun, 1=Mon, ..., 6=Sat (matches JS Date.getDay())
 * month: 1-12 (1=January)
 * dayOfMonth: 1-31
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
    month: santiagoDate.getMonth() + 1,
    dayOfMonth: santiagoDate.getDate(),
    year: santiagoDate.getFullYear(),
    raw: santiagoString,
  }
}

/**
 * Computes Easter Sunday date for a given year using the Anonymous Gregorian
 * algorithm (Meeus/Jones/Butcher). Used to derive Good Friday & Holy Saturday.
 * Returns { month: 1-12, day: 1-31 }.
 */
function easterSunday(year) {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const L = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * L) / 451)
  const month = Math.floor((h + L - 7 * m + 114) / 31)
  const day = ((h + L - 7 * m + 114) % 31) + 1
  return { month, day }
}

/**
 * Adds N days to a {month, day, year} record, returning a normalised {month, day}.
 * Handles month overflow via JS Date.
 */
function shiftDate(year, month, day, deltaDays) {
  const d = new Date(year, month - 1, day + deltaDays)
  return { month: d.getMonth() + 1, day: d.getDate() }
}

/**
 * Computes the full list of Chilean public holidays ("feriados legales")
 * for the given year. Auto-renews every year — no manual maintenance.
 *
 * Sources: Ley 19.668, Ley 20.629, Ley 20.299 ("Iglesias Evangélicas"),
 *          Ley 20.148, Ley 20.768, Ley 21.357.
 *
 * Returns an array of { month, day, label }.
 */
function chileanHolidays(year) {
  const easter = easterSunday(year)
  const goodFriday = shiftDate(year, easter.month, easter.day, -2)
  const holySaturday = shiftDate(year, easter.month, easter.day, -1)

  // Día de las Iglesias Evangélicas: 31 oct, pero si cae martes se mueve al
  // viernes anterior; si cae miércoles se mueve al viernes siguiente.
  const oct31 = new Date(year, 9, 31)
  let evangelicalDay = { month: 10, day: 31 }
  const oct31Dow = oct31.getDay()
  if (oct31Dow === 2) evangelicalDay = { month: 10, day: 28 } // martes → viernes anterior
  else if (oct31Dow === 3) evangelicalDay = { month: 11, day: 2 } // miércoles → viernes siguiente

  return [
    { month: 1,  day: 1,                       label: 'Año Nuevo' },
    { month: goodFriday.month,    day: goodFriday.day,    label: 'Viernes Santo' },
    { month: holySaturday.month,  day: holySaturday.day,  label: 'Sábado Santo' },
    { month: 5,  day: 1,                       label: 'Día del Trabajo' },
    { month: 5,  day: 21,                      label: 'Glorias Navales' },
    { month: 6,  day: 20,                      label: 'Día de los Pueblos Indígenas' },
    { month: 6,  day: 29,                      label: 'San Pedro y San Pablo' },
    { month: 7,  day: 16,                      label: 'Virgen del Carmen' },
    { month: 8,  day: 15,                      label: 'Asunción de la Virgen' },
    { month: 9,  day: 18,                      label: 'Independencia Nacional' },
    { month: 9,  day: 19,                      label: 'Glorias del Ejército' },
    { month: 10, day: 12,                      label: 'Encuentro de Dos Mundos' },
    { month: evangelicalDay.month, day: evangelicalDay.day, label: 'Iglesias Evangélicas' },
    { month: 11, day: 1,                       label: 'Día de Todos los Santos' },
    { month: 12, day: 8,                       label: 'Inmaculada Concepción' },
    { month: 12, day: 25,                      label: 'Navidad' },
  ]
}

/**
 * Returns the holiday object {month, day, label} if today (America/Santiago)
 * is a Chilean public holiday, otherwise null.
 *
 * Exported so it can be reused for stats / debugging / admin panel.
 */
export function getChileanHolidayToday() {
  try {
    const { year, month, dayOfMonth } = getSantiagoNow()
    const holidays = chileanHolidays(year)
    return holidays.find((h) => h.month === month && h.day === dayOfMonth) || null
  } catch (_) {
    return null
  }
}

export function isChileanHolidayToday() {
  return getChileanHolidayToday() !== null
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
 *   - Chilean public holidays: ALWAYS closed (auto-detected per year)
 *
 * Returns true ONLY if BOTH independent timezone checks agree AND today is
 * not a Chilean holiday.
 */
export function isBusinessHoursSantiago() {
  try {
    const { dayOfWeek, hour } = getSantiagoNow()

    // HARD FORCE — Saturday (6) and Sunday (0) are ALWAYS closed
    if (dayOfWeek === 0 || dayOfWeek === 6) return false

    // HARD FORCE — Chilean public holiday → ALWAYS closed
    if (isChileanHolidayToday()) return false

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
