/**
 * Serena v2 — Centralized WhatsApp/Contact CTA handler.
 *
 * GLOBAL TERMINAL RULE (Dra. Cáceres mandate, June 2026):
 *   100% of contact entry points on the site (WhatsApp buttons, floating
 *   icon, contact links, service cards) MUST trigger the Serena Dual Modal.
 *   ZERO direct wa.me redirects. NO exceptions for business hours.
 *
 * Rationale: data sovereignty. Every consultante must enter Nombre +
 * WhatsApp BEFORE being presented with the choice (WhatsApp vs Correo),
 * guaranteeing 100% CRM capture in the Admin Tactical OPS panel.
 *
 * The business-hours helpers (isBusinessHoursSantiago, getChileanHolidayToday)
 * are PRESERVED for analytics/display purposes (e.g., showing "En horario"
 * vs "Off-hours" badges in /admin and tagging leads by mode), but they no
 * longer affect the routing decision.
 */

export const WHATSAPP_NUMBER = '56930550750'

export const WHATSAPP_DEFAULT_MESSAGE =
  '¡Hola! 👋 Vi su sitio web y me gustaría recibir información sobre el Programa de Alta Fidelidad en DBT del Instituto. ¿Me podrían ayudar a agendar una hora? Muchas gracias.'

export function getWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// ─── Santiago timezone helpers (kept for analytics tagging) ─────────────
function getSantiagoNow() {
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

function shiftDate(year, month, day, deltaDays) {
  const d = new Date(year, month - 1, day + deltaDays)
  return { month: d.getMonth() + 1, day: d.getDate() }
}

function chileanHolidays(year) {
  const easter = easterSunday(year)
  const goodFriday = shiftDate(year, easter.month, easter.day, -2)
  const holySaturday = shiftDate(year, easter.month, easter.day, -1)
  const oct31 = new Date(year, 9, 31)
  let evangelicalDay = { month: 10, day: 31 }
  const oct31Dow = oct31.getDay()
  if (oct31Dow === 2) evangelicalDay = { month: 10, day: 28 }
  else if (oct31Dow === 3) evangelicalDay = { month: 11, day: 2 }
  return [
    { month: 1,  day: 1,  label: 'Año Nuevo' },
    { month: goodFriday.month,    day: goodFriday.day,    label: 'Viernes Santo' },
    { month: holySaturday.month,  day: holySaturday.day,  label: 'Sábado Santo' },
    { month: 5,  day: 1,  label: 'Día del Trabajo' },
    { month: 5,  day: 21, label: 'Glorias Navales' },
    { month: 6,  day: 20, label: 'Día de los Pueblos Indígenas' },
    { month: 6,  day: 29, label: 'San Pedro y San Pablo' },
    { month: 7,  day: 16, label: 'Virgen del Carmen' },
    { month: 8,  day: 15, label: 'Asunción de la Virgen' },
    { month: 9,  day: 18, label: 'Independencia Nacional' },
    { month: 9,  day: 19, label: 'Glorias del Ejército' },
    { month: 10, day: 12, label: 'Encuentro de Dos Mundos' },
    { month: evangelicalDay.month, day: evangelicalDay.day, label: 'Iglesias Evangélicas' },
    { month: 11, day: 1,  label: 'Día de Todos los Santos' },
    { month: 12, day: 8,  label: 'Inmaculada Concepción' },
    { month: 12, day: 25, label: 'Navidad' },
  ]
}

export function getChileanHolidayToday() {
  try {
    const { year, month, dayOfMonth } = getSantiagoNow()
    return chileanHolidays(year).find((h) => h.month === month && h.day === dayOfMonth) || null
  } catch (_) {
    return null
  }
}

export function isChileanHolidayToday() {
  return getChileanHolidayToday() !== null
}

export function isBusinessHoursSantiago() {
  try {
    const { dayOfWeek, hour } = getSantiagoNow()
    if (dayOfWeek === 0 || dayOfWeek === 6) return false
    if (isChileanHolidayToday()) return false
    if (dayOfWeek >= 1 && dayOfWeek <= 4) return hour >= 10 && hour < 19
    if (dayOfWeek === 5) return hour >= 10 && hour < 16
    return false
  } catch (_) {
    return false
  }
}

/**
 * Main CTA handler — Serena v2.
 *
 * ALWAYS dispatches the `open-fast-capture` event so the FastCaptureModal
 * (Serena Dual) is presented. The optional `message` is passed in detail.message
 * so each entry point can customize the WhatsApp pre-fill (e.g. Family CTA).
 *
 * The fire-and-forget /api/whatsapp-click tracking is preserved (tagged with
 * mode='direct' when in business hours, 'after-hours' otherwise) so the
 * existing analytics dashboard keeps working unchanged.
 */
export function openWhatsAppOrCapture(source = 'general', message = WHATSAPP_DEFAULT_MESSAGE) {
  if (typeof window === 'undefined') return

  // Silent click tracking (no blocking)
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
        via: 'serena-v2',
      }),
      keepalive: true,
    }).catch(() => {})
  } catch (_) { /* ignore */ }

  // 100% RULE — always open Serena Dual Modal
  window.dispatchEvent(
    new CustomEvent('open-fast-capture', { detail: { source, message } })
  )
}

export const openWhatsApp = openWhatsAppOrCapture
