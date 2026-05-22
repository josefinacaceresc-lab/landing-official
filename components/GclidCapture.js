'use client'

/**
 * ───────────────────────────────────────────────────────────────────────────
 *  GclidCapture — Captura automática de identificadores de Google Ads.
 * ───────────────────────────────────────────────────────────────────────────
 *
 *  Qué hace:
 *  - Lee parámetros de URL al cargar la página (gclid, gbraid, wbraid, utm_*)
 *  - Los guarda en cookie de 90 días + localStorage
 *  - Si ya existe un valor previo, NO lo sobrescribe (preserva la primera
 *    fuente de atribución).
 *
 *  Qué NO hace:
 *  - NO toca window.gtag
 *  - NO toca dataLayer
 *  - NO toca el script de Google Ads (AW-18117776220)
 *  - NO dispara eventos de conversión
 *
 *  Uso: montar una vez en el árbol (typically en layout.js como hijo de body)
 *  ───────────────────────────────────────────────────────────────────────────
 */

import { useEffect } from 'react'

const COOKIE_DAYS = 90
const STORAGE_KEY = 'idbt_ads_attribution'

const PARAM_KEYS = [
  'gclid', 'gbraid', 'wbraid', 'gclsrc',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'fbclid', 'msclkid',
]

function setCookie(name, value, days) {
  if (typeof document === 'undefined') return
  try {
    const maxAge = days * 24 * 60 * 60
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`
  } catch (_) {
    /* no-op: cookie write may fail in private browsing */
  }
}

function getCookie(name) {
  if (typeof document === 'undefined') return null
  try {
    const value = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1]
    return value ? decodeURIComponent(value) : null
  } catch (_) {
    return null
  }
}

function safeStorageGet() {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (_) {
    return {}
  }
}

function safeStorageSet(obj) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
  } catch (_) {
    /* localStorage may be blocked */
  }
}

export default function GclidCapture() {
  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      if (!url.search) return

      const params = url.searchParams
      const existing = safeStorageGet()
      const incoming = {}

      for (const key of PARAM_KEYS) {
        const val = params.get(key)
        if (val) incoming[key] = val
      }

      if (Object.keys(incoming).length === 0) return

      // Preserve first-touch attribution: solo grabar lo que no existía antes
      const merged = { ...existing }
      let changed = false
      for (const [k, v] of Object.entries(incoming)) {
        if (!merged[k]) {
          merged[k] = v
          changed = true
        }
      }
      if (changed) {
        merged._first_capture_at = merged._first_capture_at || new Date().toISOString()
        merged._referrer = merged._referrer || (document.referrer || 'direct')
        safeStorageSet(merged)

        // Cookie individual para cada identificador (lectura rápida desde forms)
        for (const [k, v] of Object.entries(incoming)) {
          if (!getCookie(k)) {
            setCookie(k, v, COOKIE_DAYS)
          }
        }
      }
    } catch (_) {
      /* silent: capture is best-effort, must never break the page */
    }
  }, [])

  return null
}

// ─── Helper público para que cualquier formulario lea la atribución ─────────
export function getAdsAttribution() {
  if (typeof window === 'undefined') return {}
  try {
    const fromStorage = safeStorageGet()
    if (Object.keys(fromStorage).length > 0) return fromStorage
    // Fallback: leer cookies individuales
    const obj = {}
    for (const key of PARAM_KEYS) {
      const v = getCookie(key)
      if (v) obj[key] = v
    }
    return obj
  } catch (_) {
    return {}
  }
}
