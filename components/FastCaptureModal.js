'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Loader2, CheckCircle2, ArrowRight } from 'lucide-react'

/**
 * Karina WhatsApp Capture Modal — OLED Ultra-Luxury
 * ─────────────────────────────────────────────────────────────────────────
 * Design: pure black gradient + emerald, Poppins. Minimal 2-field form.
 *
 * Strategy: GLOBAL CLICK INTERCEPTOR.
 *   This component listens for any click on `<a href="https://wa.me/...">`
 *   anywhere on the site, prevents the default navigation, and opens this
 *   modal. After the consultante leaves their data, we save it atomically
 *   to /api/leads/fast-capture and THEN open the original wa.me URL.
 *
 * Zero-risk guarantees:
 *   - If JavaScript fails to load, every <a href> is a normal direct link.
 *   - If the modal save fails, we still open WhatsApp (no leads dropped).
 *   - Atomic save uses `keepalive: true` + sendBeacon fallback.
 *   - "Saltar" option lets the consultante bypass the form (still tracked
 *     anonymously as a skip event).
 *   - /admin and /lakaira-ai routes are excluded from interception.
 */
export default function FastCaptureModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [originalHref, setOriginalHref] = useState('')
  const [source, setSource] = useState('site')
  const [view, setView] = useState('form') // form | success
  const [formData, setFormData] = useState({ fullName: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const dialogRef = useRef(null)

  // ── Global click interceptor ──────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      // Bail if modifier keys (user wants new tab via Cmd/Ctrl+click)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const a = e.target.closest && e.target.closest('a[href*="wa.me"]')
      if (!a) return

      // Don't intercept inside /admin (Dra. opening WA with a lead)
      const path = window.location.pathname || ''
      if (path.startsWith('/admin') || path.startsWith('/lakaira-ai')) return

      e.preventDefault()
      e.stopPropagation()

      setOriginalHref(a.href)
      // Source: use data-source if present, else infer from a class/aria
      const ds = a.dataset?.source
        || a.getAttribute('aria-label')?.slice(0, 40)
        || (path === '/' ? 'home' : path.replace(/^\//, '').slice(0, 40))
        || 'site'
      setSource(ds)
      setView('form')
      setFormData({ fullName: '', phone: '' })
      setErrors({})
      setSubmitError('')
      setIsOpen(true)
    }
    document.addEventListener('click', handler, true) // capture phase
    return () => document.removeEventListener('click', handler, true)
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

  // ── Save lead and redirect ────────────────────────────────────────────
  const saveAndRedirect = async ({ skip = false } = {}) => {
    if (!skip && !validate()) return
    setIsSubmitting(true)
    setSubmitError('')

    const payload = {
      fullName: skip ? 'Anónimo (saltó captura)' : formData.fullName.trim(),
      phone: skip ? '' : formData.phone.trim(),
      channel: 'whatsapp',
      source: 'karina_modal',
      sourceContext: source,
      mode: skip ? 'skip-capture' : 'karina-capture',
      timestamp: new Date().toISOString(),
    }

    // 1️⃣ Atomic save (non-blocking — failure does NOT prevent WA redirect)
    try {
      await fetch('/api/leads/fast-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      })
    } catch (_) {
      // Defensive sendBeacon for poor mobile connections
      try {
        if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
          navigator.sendBeacon(
            '/api/leads/fast-capture',
            new Blob([JSON.stringify({ ...payload, beacon: true })], { type: 'application/json' })
          )
        }
      } catch (_) { /* ignore */ }
    }

    setIsSubmitting(false)

    // 2️⃣ Open WhatsApp (always, regardless of save outcome)
    let win = null
    try { win = window.open(originalHref, '_blank', 'noopener,noreferrer') } catch (_) { /* ignore */ }

    setView('success')
    if (!win) setTimeout(() => { window.location.href = originalHref }, 600)
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="karina-title"
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

        {/* Header — Karina avatar */}
        <div className="relative px-6 pt-7 pb-4 md:px-8 md:pt-8">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white font-semibold text-lg">
              K
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-black animate-pulse" />
            </div>
            <div>
              <h2 id="karina-title" className="text-lg md:text-xl font-semibold tracking-tight">
                Soy Karina
              </h2>
              <p className="text-xs text-emerald-400/80">
                Instituto DBT Chile · En línea
              </p>
            </div>
          </div>
        </div>

        {/* ─── FORM ────────────────────────────────────────────────────── */}
        {view === 'form' && (
          <div className="relative px-6 pb-6 md:px-8 md:pb-8 space-y-5">
            <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl rounded-tl-md p-4 text-sm leading-relaxed text-zinc-200">
              Deja tu <span className="text-emerald-400 font-medium">nombre</span> y <span className="text-emerald-400 font-medium">WhatsApp</span> y te responderé lo más pronto posible.
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); saveAndRedirect() }}
              className="space-y-4"
              noValidate
            >
              {/* Nombre */}
              <div>
                <label htmlFor="kr-name" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Tu nombre
                </label>
                <input
                  id="kr-name"
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
                <label htmlFor="kr-phone" className="block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider">
                  Tu WhatsApp
                </label>
                <input
                  id="kr-phone"
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
                    <span>Enviar a WhatsApp</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>

              {/* Skip option */}
              <button
                type="button"
                onClick={() => saveAndRedirect({ skip: true })}
                disabled={isSubmitting}
                className="block w-full text-center text-xs text-zinc-500 hover:text-zinc-300 underline-offset-4 hover:underline transition-colors"
              >
                Saltar y abrir WhatsApp directo
              </button>

              <p className="text-[11px] text-zinc-600 text-center leading-relaxed pt-1">
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
              href={originalHref}
              target="_blank"
              rel="noopener noreferrer"
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

/** No-op kept for backwards compatibility with old imports. */
export function openFastCapture() {
  // intentionally empty — modal now opens via the global click interceptor
}
