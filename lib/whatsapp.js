/**
 * Direct WhatsApp opener — simple, no modal dispatch, no synthetic events.
 *
 * This file is kept ONLY for the (very few) legacy programmatic call sites
 * that need to open WhatsApp directly (e.g. admin tools, debug pages).
 *
 * The user-facing capture flow happens via real <a href="wa.me/..."> tags
 * embedded in the page; those are intercepted by the FastCaptureModal's
 * own document-level click listener. We DO NOT replicate that interception
 * here — doing so produces an infinite loop when the modal's auto-redirect
 * uses this function (anchor click → interceptor → modal → anchor click → ...).
 */

export const WHATSAPP_NUMBER = '56930550750'

/** Phone numbers for the Instituto clinic — visible in header / footer / Schema. */
export const CLINIC_PHONE_DISPLAY = '+56 2 2848 0652'
export const CLINIC_PHONE_TEL = '+56228480652'

export const WHATSAPP_DEFAULT_MESSAGE =
  '¡Hola! 👋 Vi su sitio web y me gustaría recibir información sobre el Programa de Alta Fidelidad en DBT del Instituto. ¿Me podrían ayudar a agendar una hora? Muchas gracias.'

/** Build a wa.me URL with optional pre-filled message. */
export function getWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Open WhatsApp directly in a new tab — bypasses the FastCaptureModal.
 * Use this ONLY from admin tools or debug pages. Public-facing pages
 * should use a <a href={getWhatsAppUrl()}> tag instead so the global
 * interceptor can show the lead-capture modal.
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

export const openWhatsApp = openWhatsAppOrCapture
