'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, MessageCircle, Loader2, CheckCircle, Phone } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/googleAdsTracking'

const WHATSAPP_NUMBER = '56930550750' // +56 9 3055 0750 — Karina

export default function FastCaptureModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [source, setSource] = useState('general')
  const [step, setStep] = useState('form') // form | success
  const [formData, setFormData] = useState({ fullName: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Listen for global open events from anywhere in the app
  useEffect(() => {
    const handleOpen = (e) => {
      const src = (e && e.detail && e.detail.source) || 'general'
      setSource(src)
      setStep('form')
      setFormData({ fullName: '', phone: '' })
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
    // Keep digits and a leading +
    let v = value.replace(/[^\d+]/g, '')
    if (v.length > 18) v = v.slice(0, 18)
    return v
  }

  const validate = () => {
    const e = {}
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      e.fullName = 'Ingresa tu nombre completo'
    }
    const digits = formData.phone.replace(/\D/g, '')
    if (digits.length < 8) {
      e.phone = 'Ingresa un teléfono válido'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const buildWhatsAppUrl = (name) => {
    const firstName = (name || '').trim().split(/\s+/)[0] || ''
    const message = `Hola, soy ${firstName}. Me gustaría agendar una consulta en Instituto DBT Chile.`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError('')

    // Open WhatsApp window SYNCHRONOUSLY first to bypass mobile popup blockers.
    // Many mobile browsers block window.open() if invoked inside an async callback.
    const waUrl = buildWhatsAppUrl(formData.fullName)
    let waWindow = null
    try {
      waWindow = window.open(waUrl, '_blank', 'noopener,noreferrer')
    } catch (_) { /* ignore */ }

    // Fire conversion tracking
    try { trackWhatsAppClick(`fast-capture-${source}`) } catch (_) { /* ignore */ }

    // Save lead in background. If save fails we still let the user reach WhatsApp.
    try {
      const res = await fetch('/api/leads/fast-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          source,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        // Non-blocking: keep the WhatsApp redirect alive but show a soft error
        setSubmitError(data?.error || 'No pudimos guardar tus datos, pero te redirigimos a WhatsApp.')
      }
    } catch (err) {
      setSubmitError('Conexión inestable. Igualmente te llevamos a WhatsApp.')
    } finally {
      setIsSubmitting(false)
      setStep('success')

      // Fallback: if window.open got blocked (waWindow null), navigate the current tab
      // after a short delay so the user has time to read the success state.
      if (!waWindow) {
        setTimeout(() => {
          window.location.href = waUrl
        }, 800)
      }
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
          <div className="relative bg-gradient-to-br from-primary to-primary/80 text-white p-6 rounded-t-2xl">
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
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 id="fast-capture-title" className="text-xl font-semibold">Agendar Consulta</h2>
                <p className="text-white/90 text-sm">Te conectamos por WhatsApp · Respuesta &lt; 24 h hábiles</p>
              </div>
            </div>
          </div>

          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="fc-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  id="fc-name"
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
                  inputMode="text"
                />
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="fc-phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="fc-phone"
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
                  <><MessageCircle className="w-5 h-5 mr-2" /> Abrir WhatsApp ahora</>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Al continuar abriremos WhatsApp con un mensaje pre‑escrito. Tus datos quedan registrados de forma confidencial en Instituto DBT Chile.
              </p>
            </form>
          ) : (
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-9 h-9 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">¡Listo! Te llevamos a WhatsApp</h3>
              <p className="text-gray-600">
                Si no se abrió automáticamente, toca el botón:
              </p>
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
              {submitError && (
                <p className="text-xs text-amber-700">{submitError}</p>
              )}
              <button
                type="button"
                onClick={close}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Cerrar
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Helper hook-free trigger you can call from anywhere on the client.
 * Usage: <button onClick={() => openFastCapture('hero')}>
 */
export function openFastCapture(source = 'general') {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('open-fast-capture', { detail: { source } }))
}
