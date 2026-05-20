'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Loader2, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/googleAdsTracking'

const WHATSAPP_NUMBER = '56930550750' // +56 9 3055 0750 — Karina

/**
 * Serena Permanent Capture Modal — "Cliengo-Style 24/7"
 * ─────────────────────────────────────────────────────────────────────────
 * Dra. Cáceres FINAL mandate (June 2026):
 *
 *   ZERO business-hours branching. ZERO "Karina is online/offline" copy.
 *   100% data capture every click, every hour, every day.
 *
 *   Flow (single, immutable):
 *     1. Any WhatsApp CTA on the site dispatches `open-fast-capture`.
 *     2. Modal opens — OLED luxury (black + emerald, Poppins).
 *     3. Two mandatory fields: Nombre + WhatsApp.
 *     4. On submit:
 *          a. Atomic save → POST /api/leads/fast-capture (keepalive + beacon
 *             fallback) — CRM sovereignty.
 *          b. Google Ads conversion track.
 *          c. Open wa.me/56930550750 with friendly pre-filled message.
 *     5. Success view → fallback button + close.
 *
 *   IP-based geolocation is added silently by the backend on every lead.
 */
export default function FastCaptureModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [source, setSource] = useState('general')
  const [customMessage, setCustomMessage] = useState(null)
  const [view, setView] = useState('form') // form | success
  const [formData, setFormData] = useState({ fullName: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const dialogRef = useRef(null)

  // ── Listen for global open events ─────────────────────────────────────
  useEffect(() => {
    const handleOpen = (e) => {
      const detail = (e && e.detail) || {}
      setSource(detail.source || 'general')
      setCustomMessage(typeof detail.message === 'string' ? detail.message : null)
      setView('form')
      setFormData({ fullName: '', phone: '' })
      setErrors({})
      setSubmitError('')
      setIsOpen(true)
    }
    window.addEventListener('open-fast-capture', handleOpen)
    return () => window.removeEventListener('open-fast-capture', handleOpen)
  }, [])

  // Body scroll lock
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ESC key
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const close = () => setIsOpen(false)

  const formatPhone = (v) => v.replace(/[^\d+\s]/g, '').slice(0, 20)

  const validate = () => {
    const e = {}
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      e.fullName = 'Ingresa tu nombre'
    }
    const digits = formData.phone.replace(/\D/g, '')
    if (digits.length < 8) e.phone = 'Ingresa un WhatsApp válido (+56...)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const buildWAUrl = (name) => {
    const n = (name || '').trim()
    const msg = customMessage
      || `¡Hola! 👋 Soy ${n}. Vi su sitio web y me gustaría recibir información sobre el Programa de Alta Fidelidad en DBT del Instituto. ¿Me podrían ayudar a agendar una hora? Muchas gracias.`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
  }

  const handleSubmit = async (e) => {
    e?.preventDefault?.()
    if (!validate()) return
    setIsSubmitting(true)
    setSubmitError('')

    const name = formData.fullName.trim()
    const phone = formData.phone.trim()
    const waUrl = buildWAUrl(name)

    const payload = {
      fullName: name,
      phone,
      channel: 'whatsapp',
      source: 'serena_modal',
      sourceContext: source,
      mode: 'permanent-capture',
      timestamp: new Date().toISOString(),
    }

    // 1️⃣ Atomic save BEFORE any redirect — CRM sovereignty
    let saved = false
    try {
      const res = await fetch('/api/leads/fast-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) saved = true
      else setSubmitError(data?.error || 'Conexión inestable — igualmente te conectamos con Karina.')
    } catch (_) {
      setSubmitError('Conexión inestable — igualmente te conectamos con Karina.')
    }

    // Defensive sendBeacon if fetch failed (tab navigating / poor mobile network)
    if (!saved && typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      try {
        navigator.sendBeacon(
          '/api/leads/fast-capture',
          new Blob([JSON.stringify({ ...payload, beacon: true })], { type: 'application/json' })
        )
      } catch (_) { /* ignore */ }
    }

    // 2️⃣ Google Ads conversion tracking
    try { trackWhatsAppClick(`serena-modal-${source}`) } catch (_) { /* ignore */ }

    // 3️⃣ Open WhatsApp (24/7, no conditional)
    let win = null
    try { win = window.open(waUrl, '_blank', 'noopener,noreferrer') } catch (_) { /* ignore */ }

    setIsSubmitting(false)
    setView('success')

    // If popup blocked, fall back to top-level redirect after a brief delay
    if (!win) setTimeout(() => { window.location.href = waUrl }, 600)
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="serena-title"
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/80 backdrop-blur-md p-0 md:p-4 animate-in fade-in duration-200"
      onClick={close}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md md:max-w-lg bg-gradient-to-b from-black via-zinc-950 to-black border border-emerald-500/20 rounded-t-3xl md:rounded-3xl shadow-[0_0_80px_-15px_rgba(16,185,129,0.45)] overflow-hidden text-white animate-in slide-in-from-bottom-8 duration-300"
      >
        {/* Emerald glow accents */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-700/15 rounded-full blur-3xl" />

        {/* Close */}
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="relative px-6 pt-7 pb-4 md:px-8 md:pt-8">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Sparkles className="w-6 h-6 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-black animate-pulse" />
            </div>
            <div>
              <h2 id="serena-title" className="text-lg md:text-xl font-semibold tracking-tight">
                Serena · Asistente del Instituto
              </h2>
              <p className="text-xs text-emerald-400/80">
                Atención inmediata por WhatsApp
              </p>
            </div>
          </div>
        </div>

        {/* ─── FORM ────────────────────────────────────────────────────── */}
        {view === 'form' && (
          <div className="relative px-6 pb-6 md:px-8 md:pb-8 space-y-5">
            <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl rounded-tl-md p-4 text-sm leading-relaxed text-zinc-200">
              Hola, soy <span className="text-emerald-400 font-medium">Karina</span>. Déjanos tus datos y te contactaremos lo más pronto posible o si prefiere llámenos directo por favor.
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Nombre */}
              <div>
                <label htmlFor="sd-name" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Tu nombre
                </label>
                <input
                  id="sd-name"
                  type="text"
                  autoComplete="name"
                  autoFocus
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, fullName: e.target.value }))
                    if (errors.fullName) setErrors((p) => ({ ...p, fullName: '' }))
                  }}
                  placeholder="María Fernanda"
                  className={`w-full px-4 py-3 text-base bg-zinc-900/60 border-2 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none transition-colors ${
                    errors.fullName ? 'border-red-500/60 focus:border-red-400' : 'border-zinc-800 focus:border-emerald-500/70'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-red-400 mt-1.5">{errors.fullName}</p>}
              </div>

              {/* WhatsApp */}
              <div>
                <label htmlFor="sd-phone" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Tu WhatsApp
                </label>
                <input
                  id="sd-phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, phone: formatPhone(e.target.value) }))
                    if (errors.phone) setErrors((p) => ({ ...p, phone: '' }))
                  }}
                  placeholder="+56 9 1234 5678"
                  className={`w-full px-4 py-3 text-base bg-zinc-900/60 border-2 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none transition-colors ${
                    errors.phone ? 'border-red-500/60 focus:border-red-400' : 'border-zinc-800 focus:border-emerald-500/70'
                  }`}
                />
                {errors.phone && <p className="text-xs text-red-400 mt-1.5">{errors.phone}</p>}
              </div>

              {submitError && (
                <div className="text-sm text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex items-center justify-center gap-2 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold text-base shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all active:scale-[0.99] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.823 11.823 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.687-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.518 5.273l-.999 3.648 3.97-.62zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01a1.093 1.093 0 0 0-.793.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                    </svg>
                    <span>Continuar por WhatsApp</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-zinc-500 text-center leading-relaxed pt-1">
                🔒 Datos confidenciales · Instituto DBT Chile · Vitacura
              </p>
            </form>
          </div>
        )}

        {/* ─── SUCCESS ─────────────────────────────────────────────────── */}
        {view === 'success' && (
          <div className="relative px-6 pb-7 md:px-8 md:pb-8 text-center space-y-4 pt-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 ring-1 ring-emerald-400/40 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold">Te llevamos a WhatsApp</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Si no se abrió automáticamente, toca el botón:
            </p>
            <a
              href={buildWAUrl(formData.fullName)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`serena-success-${source}`)}
              className="flex items-center justify-center gap-2 h-12 w-full rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold shadow-lg shadow-emerald-500/30 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.823 11.823 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.687-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.518 5.273l-.999 3.648 3.97-.62zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01a1.093 1.093 0 0 0-.793.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              </svg>
              Abrir WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <button onClick={close} className="text-xs text-zinc-500 hover:text-zinc-300 underline-offset-4 hover:underline">
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Helper: open the modal from anywhere on the client.
 *   openFastCapture('hero')
 *   openFastCapture('family-cta', '¡Hola! 👋 Quiero info del Programa Familia...')
 */
export function openFastCapture(source = 'general', message = null) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('open-fast-capture', { detail: { source, message } }))
}
