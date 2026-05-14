'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, MessageCircle, Loader2, CheckCircle, Phone, Clock, Mail } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/googleAdsTracking'

const WHATSAPP_NUMBER = '56930550750' // +56 9 3055 0750 — Karina

/**
 * Returns true when Santiago de Chile local time is Mon-Fri 10:00-19:00.
 * Uses Intl API which automatically handles DST (CLT/CLST).
 */
function isBusinessHoursSantiago() {
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

    const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday)
    const inWindow = hour >= 10 && hour < 19 // 10:00 inclusive, 19:00 exclusive
    return isWeekday && inWindow
  } catch (_) {
    return true // fail-open to keep conversion flow
  }
}

export default function FastCaptureModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [source, setSource] = useState('general')
  const [businessHours, setBusinessHours] = useState(true)
  const [step, setStep] = useState('form') // form | success | afterhours-success
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Listen for global open events from anywhere in the app
  useEffect(() => {
    const handleOpen = (e) => {
      const src = (e && e.detail && e.detail.source) || 'general'
      setSource(src)
      setBusinessHours(isBusinessHoursSantiago())
      setStep('form')
      setFormData({ fullName: '', phone: '', email: '' })
      setErrors({})
      setSubmitError('')
      setIsOpen(true)
    }
    window.addEventListener('open-fast-capture', handleOpen)
    return () => window.removeEventListener('open-fast-capture', handleOpen)
  }, [])

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const close = () => setIsOpen(false)

  const formatPhone = (value) => {
    let v = value.replace(/[^\d+]/g, '')
    if (v.length > 18) v = v.slice(0, 18)
    return v
  }

  const buildWhatsAppUrl = (name) => {
    const fullName = (name || '').trim()
    const message = `Me gustaría poder contactarme con ustedes, mi nombre es ${fullName}`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  // ── BUSINESS HOURS FLOW ─────────────────────────────────────────────────
  const handleSubmitBusinessHours = async (e) => {
    e.preventDefault()
    const name = formData.fullName.trim()
    if (name.length < 2) {
      setErrors({ fullName: 'Ingresa tu nombre' })
      return
    }
    setErrors({})
    setIsSubmitting(true)
    setSubmitError('')

    // Open WhatsApp synchronously to bypass mobile popup blockers
    const waUrl = buildWhatsAppUrl(name)
    let waWindow = null
    try {
      waWindow = window.open(waUrl, '_blank', 'noopener,noreferrer')
    } catch (_) { /* ignore */ }

    try { trackWhatsAppClick(`fast-capture-${source}`) } catch (_) { /* ignore */ }

    try {
      const res = await fetch('/api/leads/fast-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          source,
          mode: 'business-hours',
          timestamp: new Date().toISOString(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setSubmitError(data?.error || 'No pudimos guardar tus datos, pero te redirigimos a WhatsApp.')
      }
    } catch (_) {
      setSubmitError('Conexión inestable. Igualmente te llevamos a WhatsApp.')
    } finally {
      setIsSubmitting(false)
      setStep('success')
      if (!waWindow) {
        setTimeout(() => { window.location.href = waUrl }, 600)
      }
    }
  }

  // ── AFTER-HOURS FLOW ────────────────────────────────────────────────────
  const validateAfterHours = () => {
    const e = {}
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) e.fullName = 'Ingresa tu nombre completo'
    const digits = formData.phone.replace(/\D/g, '')
    if (digits.length < 8) e.phone = 'Ingresa un teléfono válido'
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Ingresa un email válido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmitAfterHours = async (e) => {
    e.preventDefault()
    if (!validateAfterHours()) return
    setIsSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/leads/fast-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          source,
          mode: 'after-hours',
          timestamp: new Date().toISOString(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setSubmitError(data?.error || 'No pudimos guardar tus datos. Intenta nuevamente.')
        return
      }
      setStep('afterhours-success')
    } catch (_) {
      setSubmitError('Conexión inestable. Intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="fast-capture-title"
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4"
      onClick={close}
    >
      <Card
        className="w-full max-w-lg border-0 shadow-2xl rounded-t-2xl md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-0">
          {/* Header */}
          <div className={`relative text-white p-6 rounded-t-2xl ${
            businessHours
              ? 'bg-gradient-to-br from-primary to-primary/80'
              : 'bg-gradient-to-br from-gray-800 to-gray-700'
          }`}>
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
                {businessHours ? <MessageCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
              </div>
              <div>
                <h2 id="fast-capture-title" className="text-xl font-semibold">
                  {businessHours ? 'Conectar con Karina' : 'Fuera de horario clínico'}
                </h2>
                <p className="text-white/90 text-sm">
                  {businessHours
                    ? 'Te abrimos WhatsApp en un toque'
                    : 'Lun a Vie · 10:00–19:00 hrs (Santiago)'}
                </p>
              </div>
            </div>
          </div>

          {/* ──────────── BUSINESS HOURS: 1 field + Conectar con Karina ──────────── */}
          {businessHours && step === 'form' && (
            <form onSubmit={handleSubmitBusinessHours} className="p-6 space-y-4">
              <div>
                <label htmlFor="fc-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  id="fc-name"
                  type="text"
                  autoComplete="name"
                  autoFocus
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, fullName: e.target.value }))
                    if (errors.fullName) setErrors((p) => ({ ...p, fullName: '' }))
                  }}
                  placeholder="Tu nombre"
                  className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                    errors.fullName ? 'border-red-400' : 'border-gray-200 focus:border-primary'
                  }`}
                  inputMode="text"
                />
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              {submitError && (
                <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
                  {submitError}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold min-h-[52px]"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Conectando…</>
                ) : (
                  <><MessageCircle className="w-5 h-5 mr-2" /> Conectar con Karina</>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Abriremos WhatsApp con un mensaje pre‑escrito. Datos confidenciales — Instituto DBT Chile.
              </p>
            </form>
          )}

          {businessHours && step === 'success' && (
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-9 h-9 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">¡Listo! Te llevamos a WhatsApp</h3>
              <p className="text-gray-600">Si no se abrió automáticamente, toca el botón:</p>
              <Button
                asChild
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold min-h-[52px]"
              >
                <a
                  href={buildWhatsAppUrl(formData.fullName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`fast-capture-success-${source}`)}
                >
                  <MessageCircle className="w-5 h-5 mr-2" /> Abrir WhatsApp
                </a>
              </Button>
              {submitError && <p className="text-xs text-amber-700">{submitError}</p>}
              <button
                type="button"
                onClick={close}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* ──────────── AFTER HOURS: Name + Phone + Email ──────────── */}
          {!businessHours && step === 'form' && (
            <form onSubmit={handleSubmitAfterHours} className="p-6 space-y-4">
              <div className="text-sm text-gray-700 bg-amber-50 border-l-4 border-amber-400 rounded-md p-4 leading-relaxed">
                Karina está fuera de su horario clínico. <strong>Déjanos tus datos y te contactaremos mañana.</strong>
              </div>

              <div>
                <label htmlFor="ah-name" className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                <input
                  id="ah-name"
                  type="text"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, fullName: e.target.value }))
                    if (errors.fullName) setErrors((p) => ({ ...p, fullName: '' }))
                  }}
                  placeholder="Tu nombre"
                  className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                    errors.fullName ? 'border-red-400' : 'border-gray-200 focus:border-primary'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="ah-phone" className="block text-sm font-medium text-gray-700 mb-2">Teléfono / WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="ah-phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, phone: formatPhone(e.target.value) }))
                      if (errors.phone) setErrors((p) => ({ ...p, phone: '' }))
                    }}
                    placeholder="+56 9 1234 5678"
                    className={`w-full pl-10 pr-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                      errors.phone ? 'border-red-400' : 'border-gray-200 focus:border-primary'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="ah-email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="ah-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData((p) => ({ ...p, email: e.target.value }))
                      if (errors.email) setErrors((p) => ({ ...p, email: '' }))
                    }}
                    placeholder="tu@correo.cl"
                    className={`w-full pl-10 pr-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                      errors.email ? 'border-red-400' : 'border-gray-200 focus:border-primary'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              {submitError && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
                  {submitError}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold min-h-[52px]"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Enviando…</>
                ) : (
                  'Enviar mis datos'
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Karina te contactará el próximo día hábil. Datos confidenciales — Instituto DBT Chile.
              </p>
            </form>
          )}

          {!businessHours && step === 'afterhours-success' && (
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-9 h-9 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">¡Recibimos tus datos!</h3>
              <p className="text-gray-600 leading-relaxed">
                Karina te contactará el próximo día hábil (Lun a Vie · 10:00–19:00 hrs).
              </p>
              <Button
                type="button"
                onClick={close}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold min-h-[52px]"
              >
                Cerrar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Helper: open the modal from anywhere on the client.
 *   onClick={() => openFastCapture('hero')}
 */
export function openFastCapture(source = 'general') {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('open-fast-capture', { detail: { source } }))
}
