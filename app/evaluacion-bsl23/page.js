'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Phone, CheckCircle, Loader2, Heart, Lock, MessageCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { openWhatsAppOrCapture } from '@/lib/whatsapp' // eslint-disable-line no-unused-vars

const WA_HREF = 'https://wa.me/56930550750?text=' + encodeURIComponent('¡Hola! 👋 Vi su sitio web y me gustaría agendar una consulta. Muchas gracias.')

// BSL-23 Questions - Dr. Martin Bohus
// Borderline Symptom List - 23 items, 0-4 scale
const bsl23Questions = [
  {
    id: 1,
    text: 'Me sentí como si estuviera en pedazos / fragmentado(a)',
    category: 'self_perception',
    subscale: 'Autopercepción'
  },
  {
    id: 2,
    text: 'Sentí asco hacia mí mismo(a)',
    category: 'self_perception',
    subscale: 'Autopercepción'
  },
  {
    id: 3,
    text: 'Quise hacerme daño',
    category: 'self_destruction',
    subscale: 'Autodestrucción',
    safety: true
  },
  {
    id: 4,
    text: 'Sentí que no valía nada',
    category: 'self_perception',
    subscale: 'Autopercepción'
  },
  {
    id: 5,
    text: 'Tuve la sensación de que era malo(a) / malvado(a)',
    category: 'self_perception',
    subscale: 'Autopercepción'
  },
  {
    id: 6,
    text: 'Pensé en hacerme daño',
    category: 'self_destruction',
    subscale: 'Autodestrucción',
    safety: true
  },
  {
    id: 7,
    text: 'Tuve imágenes de cómo me hago daño',
    category: 'intrusions',
    subscale: 'Intrusiones',
    safety: true
  },
  {
    id: 8,
    text: 'No confié en mis propias percepciones / sentimientos',
    category: 'self_perception',
    subscale: 'Autopercepción'
  },
  {
    id: 9,
    text: 'Mi estado de ánimo cambiaba rápidamente',
    category: 'affect_regulation',
    subscale: 'Regulación afectiva'
  },
  {
    id: 10,
    text: 'Me sentí indefenso(a)',
    category: 'dysphoria',
    subscale: 'Disforia'
  },
  {
    id: 11,
    text: 'Me sentí bajo una tensión interna insoportable',
    category: 'affect_regulation',
    subscale: 'Regulación afectiva'
  },
  {
    id: 12,
    text: 'Quise castigarme',
    category: 'self_destruction',
    subscale: 'Autodestrucción'
  },
  {
    id: 13,
    text: 'Me odié a mí mismo(a)',
    category: 'self_perception',
    subscale: 'Autopercepción'
  },
  {
    id: 14,
    text: 'Me sentí solo(a) cuando estaba con otras personas',
    category: 'loneliness',
    subscale: 'Soledad'
  },
  {
    id: 15,
    text: 'Tuve dificultades para concentrarme',
    category: 'affect_regulation',
    subscale: 'Regulación afectiva'
  },
  {
    id: 16,
    text: 'Me sentí vulnerable',
    category: 'dysphoria',
    subscale: 'Disforia'
  },
  {
    id: 17,
    text: 'Sentí vergüenza',
    category: 'self_perception',
    subscale: 'Autopercepción'
  },
  {
    id: 18,
    text: 'Pensé en suicidarme',
    category: 'self_destruction',
    subscale: 'Autodestrucción',
    safety: true,
    critical: true
  },
  {
    id: 19,
    text: 'Perdí el control sobre mi conducta alimentaria',
    category: 'self_destruction',
    subscale: 'Autodestrucción'
  },
  {
    id: 20,
    text: 'Quise estar muerto(a)',
    category: 'self_destruction',
    subscale: 'Autodestrucción',
    safety: true,
    critical: true
  },
  {
    id: 21,
    text: 'Me sentí solo(a)',
    category: 'loneliness',
    subscale: 'Soledad'
  },
  {
    id: 22,
    text: 'Tuve la sensación de que no soy una persona real',
    category: 'self_perception',
    subscale: 'Autopercepción'
  },
  {
    id: 23,
    text: 'Me sentí abandonado(a)',
    category: 'loneliness',
    subscale: 'Soledad'
  }
]

const scaleOptions = [
  { value: 0, label: 'Nada', description: 'No he experimentado esto' },
  { value: 1, label: 'Un poco', description: 'Levemente presente' },
  { value: 2, label: 'Bastante', description: 'Moderadamente presente' },
  { value: 3, label: 'Mucho', description: 'Considerablemente presente' },
  { value: 4, label: 'Muy fuerte', description: 'Extremadamente presente' }
]

export default function BSL23Page() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState('introduction')
  const [responses, setResponses] = useState({})
  const [showSafetyIntervention, setShowSafetyIntervention] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    rut: '',
    email: '',
    phone: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({ ...prev, [questionId]: value }))
    
    const question = bsl23Questions.find(q => q.id === questionId)
    if (question?.safety && value >= 2) {
      setShowSafetyIntervention(true)
    }
  }

  const calculateScores = () => {
    const total = Object.values(responses).reduce((sum, val) => sum + val, 0)
    const mean = total / 23
    
    const subscales = {
      self_perception: 0,
      affect_regulation: 0,
      self_destruction: 0,
      dysphoria: 0,
      loneliness: 0,
      intrusions: 0
    }
    
    bsl23Questions.forEach(q => {
      if (responses[q.id] !== undefined) {
        subscales[q.category] += responses[q.id]
      }
    })
    
    return { total, mean, subscales }
  }

  const formatRUT = (value) => {
    let rut = value.replace(/[^0-9kK]/g, '')
    if (rut.length <= 1) return rut
    const body = rut.slice(0, -1)
    const dv = rut.slice(-1)
    let formatted = body.replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, '$1.')
    return formatted + '-' + dv
  }

  const handleRUTChange = (e) => {
    const formatted = formatRUT(e.target.value)
    setFormData(prev => ({ ...prev, rut: formatted }))
    if (errors.rut) setErrors(prev => ({ ...prev, rut: '' }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Nombre completo es requerido'
    if (!formData.rut.trim()) newErrors.rut = 'RUT es requerido'
    if (!formData.email.trim()) {
      newErrors.email = 'Email es requerido'
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Teléfono es requerido'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAssessmentComplete = () => {
    const allAnswered = bsl23Questions.every(q => responses[q.id] !== undefined)
    
    if (!allAnswered) {
      alert('Por favor responde todas las preguntas antes de continuar')
      return
    }
    
    setCurrentStep('form')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      const scores = calculateScores()
      
      const response = await fetch('/api/leads/bsl23', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          totalScore: scores.total,
          meanScore: scores.mean,
          subscaleScores: scores.subscales,
          responses: Object.entries(responses).map(([id, value]) => ({
            questionId: parseInt(id),
            value
          }))
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar la evaluación')
      }
      
      router.push(`/evaluacion-bsl23/resultados?token=${data.lakairaToken}&score=${Math.round(scores.mean * 10) / 10}`)
      
    } catch (error) {
      setSubmitError(error.message)
      setIsSubmitting(false)
    }
  }

  const allQuestionsAnswered = bsl23Questions.every(q => responses[q.id] !== undefined)
  const progress = (Object.keys(responses).length / bsl23Questions.length) * 100

  // Safety Intervention Screen
  if (showSafetyIntervention) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-0 shadow-2xl bg-white">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Heart className="w-12 h-12" />
                  <div>
                    <CardTitle className="text-3xl font-serif">Tu seguridad es lo más importante</CardTitle>
                    <p className="text-red-100 mt-2">Protocolo de Intervención en Crisis</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Has indicado pensamientos de autolesión o ideación suicida
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Reconocer y expresar estos pensamientos es un acto de valentía. <strong>No estás solo(a)</strong> y hay ayuda profesional disponible inmediatamente.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Si estás en crisis o peligro inmediato, por favor contacta a los servicios de emergencia ahora.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <Card className="border-2 border-red-500 bg-red-50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Phone className="w-8 h-8 text-red-600" />
                        <div>
                          <h4 className="text-xl font-semibold text-red-900">SAMU</h4>
                          <p className="text-sm text-red-700">Emergencia Médica</p>
                        </div>
                      </div>
                      <a href="tel:131" className="block w-full">
                        <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white text-2xl font-bold py-6">
                          131
                        </Button>
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-emerald-500 bg-emerald-50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Phone className="w-8 h-8 text-emerald-600" />
                        <div>
                          <h4 className="text-xl font-semibold text-emerald-900">Salud Responde</h4>
                          <p className="text-sm text-emerald-700">Orientación 24/7</p>
                        </div>
                      </div>
                      <a href="tel:600360777" className="block w-full">
                        <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-2xl font-bold py-6">
                          600 360 777
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6 mb-8">
                  <h4 className="text-lg font-semibold text-amber-900 mb-3">Instituto DBT - Atención de Emergencia</h4>
                  <p className="text-amber-800 mb-4">
                    Nuestro equipo especializado en crisis puede atenderte de inmediato:
                  </p>
                  <div className="space-y-3">
                    <a href="https://wa.me/56930550750?text=EMERGENCIA%20-%20Necesito%20atención%20inmediata" target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                        WhatsApp Emergencia: +56 9 3055 0750
                      </Button>
                    </a>
                    <a href="tel:228480652">
                      <Button size="lg" variant="outline" className="w-full border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold">
                        Llamar: 22 848 0652
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    Puedes continuar con la evaluación si lo deseas, pero te recomendamos encarecidamente contactar primero con ayuda profesional.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setShowSafetyIntervention(false)}
                      variant="outline"
                      className="flex-1 border-2 border-gray-300"
                    >
                      Volver a la Evaluación
                    </Button>
                    <Button
                      onClick={() => router.push('/')}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Salir de forma Segura
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Form step (data collection)
  if (currentStep === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-0 shadow-2xl bg-white">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
                <CardTitle className="text-3xl font-light">Tus datos de contacto</CardTitle>
                <p className="text-white/90 mt-2">Para enviarte los resultados de tu evaluación BSL-23</p>
              </CardHeader>
              <CardContent className="p-8">
                {submitError && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
                    {submitError}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">RUT</label>
                    <input
                      type="text"
                      value={formData.rut}
                      onChange={handleRUTChange}
                      placeholder="12.345.678-9"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.rut && <p className="text-red-600 text-sm mt-1">{errors.rut}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+56 9 1234 5678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Procesando...</>
                    ) : (
                      <><CheckCircle className="w-5 h-5 mr-2" /> Ver mis resultados</>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Assessment step (questions) — only shown after introduction screen
  if (currentStep === 'assessment') {
    return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white">
            <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
              <CardTitle className="text-3xl font-light">Evaluación BSL-23</CardTitle>
              <p className="text-white/90 mt-2">Borderline Symptom List — Dr. Martin Bohus (23 ítems · 0–4)</p>
            </CardHeader>
            <CardContent className="p-8">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progreso</span>
                  <span>{Object.keys(responses).length} / {bsl23Questions.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <p className="text-gray-600 mb-6 italic">Durante la <strong>última semana</strong>, ¿con qué intensidad has experimentado lo siguiente?</p>

              <div className="space-y-6 mb-8">
                {bsl23Questions.map((q) => (
                  <div key={q.id} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-primary font-semibold">{q.id}.</span>
                      <div className="flex-1">
                        <p className="text-gray-900">{q.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{q.subscale}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {scaleOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleResponseChange(q.id, opt.value)}
                          className={`py-2 px-1 rounded-md border-2 text-xs font-medium transition-colors ${
                            responses[q.id] === opt.value
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-300 text-gray-600 hover:border-primary/50'
                          }`}
                          title={opt.description}
                        >
                          <div className="font-bold">{opt.value}</div>
                          <div className="text-[10px] mt-1">{opt.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleAssessmentComplete}
                disabled={!allQuestionsAnswered}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                {allQuestionsAnswered ? 'Continuar a mis datos' : `Faltan ${bsl23Questions.length - Object.keys(responses).length} respuestas`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    )
  }

  // ── Introduction screen (default) — credits + internal-use disclaimer ─────
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white">
            <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
              <CardTitle className="text-3xl font-serif">BSL-23 · Borderline Symptom List</CardTitle>
              <p className="text-white/90 mt-2">23 ítems · Escala 0–4 · Última semana</p>
            </CardHeader>
            <CardContent className="p-8">
              {/* ── Authorship & Validation ───────────────────────── */}
              <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-r-lg p-5 mb-6">
                <h3 className="text-base font-semibold text-emerald-900 mb-3">Acerca de este instrumento</h3>
                <ul className="space-y-2 text-sm text-gray-800 leading-relaxed">
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Test desarrollado por <strong>Dr. Martin Bohus</strong> (Central Institute of Mental Health, Mannheim).</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Validado al español por <strong>Dr. Joaquín Soler</strong> (Hospital de la Santa Creu i Sant Pau, Barcelona).</span>
                  </li>
                </ul>
              </div>

              {/* ── Internal-use disclaimer ──────────────────────── */}
              <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-5 mb-6">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-semibold text-amber-900 mb-1">Uso clínico restringido</h4>
                    <p className="text-sm text-amber-900 leading-relaxed">
                      Este instrumento es <strong>eminentemente para uso interno</strong> de consultantes de
                      <strong> Instituto DBT Chile</strong>. Los resultados son orientativos y deben ser
                      interpretados por un profesional clínico entrenado del equipo.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                A continuación responderás 23 preguntas sobre tu experiencia emocional durante la
                <strong> última semana</strong>. Cada ítem se responde en una escala de
                <strong> 0 (Nada)</strong> a <strong>4 (Muy fuerte)</strong>.
              </p>

              {/* ── Locked CTA ─ test cannot be initiated publicly ───────── */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-1">Acceso clínico</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Este test está <strong>reservado para consultantes del Instituto DBT Chile</strong>.
                      Tu psicólogo/a tratante te indicará cuándo realizarlo en el contexto del proceso terapéutico.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <Link href="/">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Volver al inicio
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-semibold"
                  >
                    <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" /> Agendar consulta
                    </a>
                  </Button>
                </div>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
                Cáceres, J. & equipo Instituto DBT Chile · Aplicación clínica supervisada · Ley 19.628 / 21.331 / 20.584.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
