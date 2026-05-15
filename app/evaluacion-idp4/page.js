'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, CheckCircle, Loader2, Brain, Clock, Shield, Lock, Phone, X } from 'lucide-react'

// IDP-4: Inventario Dimensional de Personalidad (4 dominios)
// Dra. Josefina Cáceres, 2026 - InstitutoDBT.cl
const idp4Questions = [
  // DOMAIN 1: Desregulación Emocional (DE) - 8 items
  { id: 1, domain: 'DE', text: 'Mis emociones cambian rápida e intensamente sin razón aparente', reverse: false },
  { id: 2, domain: 'DE', text: 'Tengo dificultad para calmarme una vez que me altero emocionalmente', reverse: false },
  { id: 3, domain: 'DE', text: 'Experimento ráfagas de ira que no puedo controlar', reverse: false },
  { id: 4, domain: 'DE', text: 'Mis estados de ánimo son impredecibles para mí y para otros', reverse: false },
  { id: 5, domain: 'DE', text: 'Siento que mis emociones me dominan en lugar de yo dominarlas', reverse: false },
  { id: 6, domain: 'DE', text: 'Puedo pasar de la calma a la angustia en cuestión de minutos', reverse: false },
  { id: 7, domain: 'DE', text: 'Me cuesta identificar qué emoción estoy sintiendo exactamente', reverse: false },
  { id: 8, domain: 'DE', text: 'Reacciono emocionalmente de forma desproporcionada ante eventos menores', reverse: false },
  
  // DOMAIN 2: Sensación de Vacío (SV) - 6 items
  { id: 9, domain: 'SV', text: 'Siento un vacío interno crónico que nada parece llenar', reverse: false },
  { id: 10, domain: 'SV', text: 'Me siento "hueco(a)" o sin identidad propia', reverse: false },
  { id: 11, domain: 'SV', text: 'Experimento aburrimiento extremo que me resulta insoportable', reverse: false },
  { id: 12, domain: 'SV', text: 'Necesito estimulación constante para no sentirme vacío(a)', reverse: false },
  { id: 13, domain: 'SV', text: 'Siento que no tengo un "yo" coherente o estable', reverse: false },
  { id: 14, domain: 'SV', text: 'El vacío que siento es más profundo que simple tristeza', reverse: false },
  
  // DOMAIN 3: Conductas Autolesivas (CA) - 7 items
  { id: 15, domain: 'CA', text: 'He pensado en hacerme daño físico para lidiar con emociones intensas', reverse: false, safety: true },
  { id: 16, domain: 'CA', text: 'Me autolesiono o tengo impulsos fuertes de hacerlo', reverse: false, safety: true, critical: true },
  { id: 17, domain: 'CA', text: 'Tengo conductas autodestructivas (abuso de sustancias, riesgos innecesarios)', reverse: false, safety: true },
  { id: 18, domain: 'CA', text: 'He tenido pensamientos suicidas recurrentes', reverse: false, safety: true, critical: true },
  { id: 19, domain: 'CA', text: 'Uso el dolor físico para "sentir algo" cuando estoy desconectado(a)', reverse: false, safety: true },
  { id: 20, domain: 'CA', text: 'Tengo un plan específico de cómo lastimarme o terminar mi vida', reverse: false, safety: true, critical: true },
  { id: 21, domain: 'CA', text: 'Me castigo físicamente cuando me siento culpable o avergonzado(a)', reverse: false, safety: true },
  
  // DOMAIN 4: Inestabilidad Interpersonal (II) - 7 items
  { id: 22, domain: 'II', text: 'Mis relaciones son intensas, caóticas y de corta duración', reverse: false },
  { id: 23, domain: 'II', text: 'Tengo miedo extremo al abandono o rechazo', reverse: false },
  { id: 24, domain: 'II', text: 'Idealizo a las personas rápidamente y luego las desvalorizo con la misma rapidez', reverse: false },
  { id: 25, domain: 'II', text: 'Hago esfuerzos frenéticos para evitar que me abandonen', reverse: false },
  { id: 26, domain: 'II', text: 'No confío en nadie y siento que todos me van a traicionar', reverse: false },
  { id: 27, domain: 'II', text: 'Mis relaciones se caracterizan por extremos: amor intenso o rechazo total', reverse: false },
  { id: 28, domain: 'II', text: 'Dependo excesivamente de los demás para mi estabilidad emocional', reverse: false }
]

const scaleOptions = [
  { value: 0, label: 'Totalmente en desacuerdo' },
  { value: 1, label: 'En desacuerdo' },
  { value: 2, label: 'Neutral' },
  { value: 3, label: 'De acuerdo' },
  { value: 4, label: 'Totalmente de acuerdo' }
]

// Bayesian weights for personality profiles (simplified)
const bayesianWeights = {
  TLP: { DE: 0.35, SV: 0.25, CA: 0.30, II: 0.10 },
  TPH: { DE: 0.20, SV: 0.10, CA: 0.05, II: 0.65 },
  TNP: { DE: 0.15, SV: 0.20, CA: 0.10, II: 0.55 },
  TEV: { DE: 0.25, SV: 0.30, CA: 0.15, II: 0.30 },
  TPAN: { DE: 0.30, SV: 0.15, CA: 0.40, II: 0.15 }
}

export default function IDP4Page() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState('introduction')
  const [responses, setResponses] = useState({})
  const [responseTimes, setResponseTimes] = useState({})
  const [questionStartTime, setQuestionStartTime] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [showSafety, setShowSafety] = useState(false)
  const [formData, setFormData] = useState({ fullName: '', gender: '', age: '', comuna: '', rut: '' })
  const [showConsent, setShowConsent] = useState(false)
  const [consentTimestamp, setConsentTimestamp] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    // Initialize start time for first question
    if (currentStep === 'assessment' && Object.keys(questionStartTime).length === 0) {
      const initialTimes = {}
      idp4Questions.forEach(q => {
        initialTimes[q.id] = Date.now()
      })
      setQuestionStartTime(initialTimes)
    }
  }, [currentStep])

  // Always show informed-consent modal on first mount of /evaluacion-idp4
  // Legal requirement: every "Test" entry must trigger explicit consent (Ley 19.628 / 21.331 / 20.584)
  useEffect(() => {
    setShowConsent(true)
  }, [])

  const handleResponseChange = (questionId, value) => {
    // Digital Phenotyping: Record response time
    const responseTime = Date.now() - (questionStartTime[questionId] || Date.now())
    setResponseTimes(prev => ({ ...prev, [questionId]: responseTime }))
    setResponses(prev => ({ ...prev, [questionId]: value }))
    
    // Reset timer for this question
    setQuestionStartTime(prev => ({ ...prev, [questionId]: Date.now() }))
    
    // Safety check
    const question = idp4Questions.find(q => q.id === questionId)
    if (question?.safety && value >= 3) {
      setShowSafety(true)
    }
  }

  const calculateDomainScores = () => {
    const domains = { DE: 0, SV: 0, CA: 0, II: 0 }
    const domainCounts = { DE: 0, SV: 0, CA: 0, II: 0 }
    
    idp4Questions.forEach(q => {
      if (responses[q.id] !== undefined) {
        domains[q.domain] += responses[q.id]
        domainCounts[q.domain]++
      }
    })
    
    // Normalize to 0-4 scale
    Object.keys(domains).forEach(domain => {
      if (domainCounts[domain] > 0) {
        domains[domain] = domains[domain] / domainCounts[domain]
      }
    })
    
    return domains
  }

  const calculateBayesianProfiles = (domainScores) => {
    const profiles = {}
    let totalScore = 0
    
    Object.keys(bayesianWeights).forEach(profile => {
      let score = 0
      Object.keys(domainScores).forEach(domain => {
        score += domainScores[domain] * bayesianWeights[profile][domain]
      })
      profiles[profile] = score
      totalScore += score
    })
    
    // Convert to percentages
    Object.keys(profiles).forEach(profile => {
      profiles[profile] = totalScore > 0 ? (profiles[profile] / totalScore) * 100 : 0
    })
    
    return profiles
  }

  const analyzeMotorImpulsivity = () => {
    const times = Object.values(responseTimes)
    if (times.length === 0) return { detected: false, score: 0 }
    
    const ultraFast = times.filter(t => t < 1500).length
    const mean = times.reduce((a, b) => a + b, 0) / times.length
    const variance = times.reduce((sum, t) => sum + Math.pow(t - mean, 2), 0) / times.length
    const stdDev = Math.sqrt(variance)
    const cv = stdDev / mean // Coefficient of variation
    
    return {
      detected: ultraFast > 5 || cv > 0.8,
      ultraFastCount: ultraFast,
      meanTime: Math.round(mean),
      cv: cv.toFixed(2),
      score: Math.min(10, ultraFast + (cv > 0.8 ? 3 : 0))
    }
  }

  const formatRUT = (value) => {
    let rut = value.replace(/[^0-9kK]/g, '')
    if (rut.length <= 1) return rut
    const body = rut.slice(0, -1)
    const dv = rut.slice(-1)
    let formatted = body.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    return formatted + '-' + dv
  }

  const handleRUTChange = (e) => {
    const formatted = formatRUT(e.target.value)
    setFormData(prev => ({ ...prev, rut: formatted }))
    if (errors.rut) setErrors(prev => ({ ...prev, rut: '' }))
  }

  // Chilean RUT validation (Modulo 11 algorithm)
  const validateRUT = (rut) => {
    if (!rut) return false
    const clean = rut.replace(/[^0-9kK]/g, '').toUpperCase()
    if (clean.length < 8 || clean.length > 9) return false
    const body = clean.slice(0, -1)
    const dv = clean.slice(-1)
    let sum = 0
    let mul = 2
    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i], 10) * mul
      mul = mul === 7 ? 2 : mul + 1
    }
    const mod = 11 - (sum % 11)
    const expected = mod === 11 ? '0' : mod === 10 ? 'K' : String(mod)
    return expected === dv
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Ingresa tu nombre completo'
    }
    if (!formData.gender) newErrors.gender = 'Selecciona tu género'
    const ageNum = parseInt(formData.age, 10)
    if (!formData.age || isNaN(ageNum) || ageNum < 18 || ageNum > 99) {
      newErrors.age = 'Edad debe estar entre 18 y 99'
    }
    if (!formData.comuna.trim() || formData.comuna.trim().length < 2) {
      newErrors.comuna = 'Ingresa tu comuna'
    }
    if (!formData.rut.trim()) {
      newErrors.rut = 'RUT es requerido'
    } else if (!validateRUT(formData.rut)) {
      newErrors.rut = 'RUT inválido (revisa dígito verificador)'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Save intake (gate the test) — sends initial lead with personal data; full results sent at end
  const handleIntakeSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/leads/idp4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          gender: formData.gender,
          age: parseInt(formData.age, 10),
          comuna: formData.comuna.trim(),
          rut: formData.rut.trim(),
          stage: 'intake',
          source: 'evaluacion-idp4',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setSubmitError(data?.error || 'No pudimos registrar tus datos. Intenta nuevamente.')
        setIsSubmitting(false)
        return
      }
      // Persist lead reference for the assessment submission later
      try { sessionStorage.setItem('idp4LeadId', data.leadId || '') } catch (_) {}
      setCurrentStep('assessment')
    } catch (_) {
      setSubmitError('Conexión inestable. Intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      const domainScores = calculateDomainScores()
      const profiles = calculateBayesianProfiles(domainScores)
      const motorImpulsivity = analyzeMotorImpulsivity()
      
      const response = await fetch('/api/leads/idp4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          domainScores,
          profileProbabilities: profiles,
          motorImpulsivity,
          responseTimes,
          responses: Object.entries(responses).map(([id, value]) => ({
            questionId: parseInt(id),
            value,
            responseTime: responseTimes[id] || 0
          }))
        }),
      })
      
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Error')
      
      router.push(`/evaluacion-idp4/resultados?token=${data.lakairaToken}`)
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const allAnswered = idp4Questions.every(q => responses[q.id] !== undefined)
  const progress = (Object.keys(responses).length / idp4Questions.length) * 100

  if (showSafety) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
              <CardTitle className="text-3xl font-serif">🛡️ Tu seguridad es prioritaria</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg mb-6">Has indicado conductas autolesivas o ideación suicida. <strong>No estás solo(a)</strong>.</p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <a href="tel:131"><Button size="lg" className="w-full bg-red-600 text-2xl py-6">SAMU 131</Button></a>
                <a href="tel:4141"><Button size="lg" className="w-full bg-emerald-600 text-2xl py-6">Salud Responde *4141</Button></a>
              </div>
              <a href="https://wa.me/56930550750?text=EMERGENCIA" target="_blank">
                <Button size="lg" className="w-full bg-amber-600 mb-4">WhatsApp Instituto DBT: +56 9 3055 0750</Button>
              </a>
              <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setShowSafety(false)} className="flex-1">Continuar Evaluación</Button>
                <Button onClick={() => router.push('/')} className="flex-1 bg-emerald-600">Salir con Seguridad</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // ── Informed Consent (Chilean Law 19.628 / 21.331 / 20.584) ────────────
  const handleAcceptConsent = async () => {
    const ts = new Date().toISOString()
    setConsentTimestamp(ts)
    // Fire-and-forget: register consent event server-side
    try {
      fetch('/api/leads/idp4-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consentAccepted: true,
          consentedAt: ts,
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          legalFramework: ['Ley 19.628', 'Ley 21.331', 'Ley 20.584'],
        }),
      }).catch(() => {})
    } catch (_) {}
    try { sessionStorage.setItem('idp4Consent', ts) } catch (_) {}
    setShowConsent(false)
    setCurrentStep('intake')
  }

  const handleRejectConsent = () => {
    setShowConsent(false)
    // Redirect back to home on rejection
    try { router.push('/') } catch (_) {}
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50 py-12">
      {/* ── INFORMED CONSENT MODAL ────────────────────────────────────────── */}
      {showConsent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-title"
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/70 backdrop-blur-sm p-0 md:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleRejectConsent() }}
        >
          <Card className="w-full max-w-xl border-0 shadow-2xl rounded-t-2xl md:rounded-2xl max-h-[90vh] flex flex-col">
            <CardHeader className="bg-gradient-to-br from-primary to-primary/85 text-white rounded-t-2xl">
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-lg p-2 flex-shrink-0 shadow-md">
                  <img
                    src="https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/508ec6e06fbe47fd935a5e124ba0eae3_logodbt_vertical%2050-50.jpg"
                    alt="Instituto DBT Chile"
                    width="64"
                    height="64"
                    draggable="false"
                    className="h-14 w-14 object-contain select-none"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle id="consent-title" className="text-xl md:text-2xl font-semibold leading-tight">
                    Instituto DBT Chile · Investigación IDP-4
                  </CardTitle>
                  <p className="text-white/90 text-sm mt-1 leading-relaxed">
                    Antes de comenzar. Lee esto — toma menos de 30 segundos
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 overflow-y-auto flex-1">
              <ul className="space-y-3 text-sm text-gray-800 leading-relaxed">
                <li className="flex gap-3">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Este test evalúa tus emociones. <strong>No es un diagnóstico clínico.</strong></span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Tus datos (edad, género, comuna) se usan solo para <strong>investigación anónima</strong>.</span>
                </li>
                <li className="flex gap-3">
                  <Lock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Tu <strong>RUT se guarda encriptado</strong> — nadie puede recuperarlo, ni nosotros.</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Si aparecen pensamientos de daño, el sistema te conecta al <strong>1414</strong> <span className="text-gray-500">(gratis, 24/7)</span>.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Participación voluntaria</strong> — puedes salir en cualquier momento.</span>
                </li>
                <li className="flex gap-3">
                  <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Datos protegidos bajo <strong>Ley 19.628 · Ley 21.331 · Ley 20.584</strong>.</span>
                </li>
              </ul>
            </CardContent>

            <div className="p-6 pt-2 border-t border-gray-100 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRejectConsent}
                  className="min-h-[52px] border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold"
                >
                  No acepto
                </Button>
                <Button
                  type="button"
                  onClick={handleAcceptConsent}
                  className="min-h-[52px] bg-primary hover:bg-primary/90 text-white font-semibold shadow-md shadow-primary/20"
                >
                  Acepto y comienzo →
                </Button>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed text-center">
                Al aceptar confirmas tener 18 años o más y haber leído lo anterior. Consentimiento registrado con fecha y hora (Ley 19.628 Art. 4).
              </p>
            </div>
          </Card>
        </div>
      )}
      <div className="container mx-auto px-4 max-w-4xl">
        {currentStep === 'introduction' && (
          <Card className="border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-amber-50">
              <CardTitle className="text-3xl font-serif text-gray-900">IDP-4: Inventario Dimensional de Personalidad</CardTitle>
              <p className="text-gray-600 mt-2">Evaluación con Digital Phenotyping · Dra. Josefina Cáceres, 2026</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  El <strong>IDP-4</strong> es un instrumento desarrollado por la <strong>Dra. Josefina Cáceres</strong> 
                  (InstitutoDBT.cl, 2026) bajo estándares APA y WDBTA. Mide 4 dimensiones de personalidad:
                </p>
                <ul className="space-y-2 mb-6">
                  <li><strong>Desregulación Emocional (DE)</strong> - 8 ítems</li>
                  <li><strong>Sensación de Vacío (SV)</strong> - 6 ítems</li>
                  <li><strong>Conductas Autolesivas (CA)</strong> - 7 ítems</li>
                  <li><strong>Inestabilidad Interpersonal (II)</strong> - 7 ítems</li>
                </ul>
                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 mb-4">
                  <p className="text-sm"><strong>Innovación:</strong> Incluye <em>Digital Phenotyping</em> - medición de tiempos de respuesta para detectar impulsividad motora.</p>
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                  <p className="text-sm text-gray-800">
                    <strong className="text-amber-700">Estado del instrumento:</strong> Test en <strong>proceso de validación</strong> + Reporte personalizado inmediato. Los resultados son orientativos y deben ser interpretados por un profesional clínico entrenado.
                  </p>
                </div>
                <Button size="lg" onClick={() => setShowConsent(true)} className="w-full bg-primary hover:bg-primary/90 py-6 text-lg text-white font-semibold">Comenzar IDP-4 (28 preguntas)</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 'intake' && (
          <Card className="border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white">
              <CardTitle className="text-3xl font-light">Acceso al test IDP-4</CardTitle>
              <p className="text-white/90 mt-2">Completa tus datos para abrir el cuestionario de 28 preguntas</p>
            </CardHeader>
            <CardContent className="p-8">
              {submitError && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {submitError}
                </div>
              )}
              <form onSubmit={handleIntakeSubmit} className="space-y-5" autoComplete="on">
                <div>
                  <label htmlFor="ipd-name" className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo</label>
                  <input
                    id="ipd-name"
                    type="text"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={(e) => { setFormData(p => ({ ...p, fullName: e.target.value })); if (errors.fullName) setErrors(p => ({ ...p, fullName: '' })) }}
                    placeholder="Tu nombre completo"
                    className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 ${errors.fullName ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                  />
                  {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ipd-gender" className="block text-sm font-semibold text-gray-700 mb-2">Género</label>
                    <select
                      id="ipd-gender"
                      value={formData.gender}
                      onChange={(e) => { setFormData(p => ({ ...p, gender: e.target.value })); if (errors.gender) setErrors(p => ({ ...p, gender: '' })) }}
                      className={`w-full px-4 py-3 text-base bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 ${errors.gender ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                    >
                      <option value="">Selecciona</option>
                      <option value="femenino">Femenino</option>
                      <option value="masculino">Masculino</option>
                      <option value="no-binario">No binario</option>
                      <option value="prefiero-no-decir">Prefiero no decir</option>
                    </select>
                    {errors.gender && <p className="text-xs text-red-600 mt-1">{errors.gender}</p>}
                  </div>
                  <div>
                    <label htmlFor="ipd-age" className="block text-sm font-semibold text-gray-700 mb-2">Edad</label>
                    <input
                      id="ipd-age"
                      type="number"
                      inputMode="numeric"
                      min="18"
                      max="99"
                      value={formData.age}
                      onChange={(e) => { setFormData(p => ({ ...p, age: e.target.value })); if (errors.age) setErrors(p => ({ ...p, age: '' })) }}
                      placeholder="Ej: 28"
                      className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 ${errors.age ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                    />
                    {errors.age && <p className="text-xs text-red-600 mt-1">{errors.age}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="ipd-comuna" className="block text-sm font-semibold text-gray-700 mb-2">Comuna</label>
                  <input
                    id="ipd-comuna"
                    type="text"
                    list="comunas-cl"
                    autoComplete="address-level2"
                    value={formData.comuna}
                    onChange={(e) => { setFormData(p => ({ ...p, comuna: e.target.value })); if (errors.comuna) setErrors(p => ({ ...p, comuna: '' })) }}
                    placeholder="Ej: Providencia"
                    className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 ${errors.comuna ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                  />
                  <datalist id="comunas-cl">
                    <option value="Las Condes" />
                    <option value="Providencia" />
                    <option value="Vitacura" />
                    <option value="Lo Barnechea" />
                    <option value="Ñuñoa" />
                    <option value="Santiago" />
                    <option value="La Reina" />
                    <option value="Peñalolén" />
                    <option value="Macul" />
                    <option value="Maipú" />
                    <option value="La Florida" />
                    <option value="Puente Alto" />
                    <option value="San Bernardo" />
                    <option value="Colina" />
                    <option value="Huechuraba" />
                    <option value="Quilicura" />
                    <option value="Recoleta" />
                    <option value="Independencia" />
                    <option value="Estación Central" />
                    <option value="Pudahuel" />
                    <option value="Cerrillos" />
                    <option value="Renca" />
                    <option value="Conchalí" />
                    <option value="San Miguel" />
                    <option value="San Joaquín" />
                    <option value="La Cisterna" />
                    <option value="El Bosque" />
                    <option value="La Granja" />
                    <option value="La Pintana" />
                    <option value="Pedro Aguirre Cerda" />
                    <option value="Lo Espejo" />
                    <option value="Lo Prado" />
                    <option value="Cerro Navia" />
                    <option value="Quinta Normal" />
                    <option value="Buin" />
                    <option value="Pirque" />
                    <option value="San José de Maipo" />
                    <option value="Calera de Tango" />
                    <option value="Padre Hurtado" />
                    <option value="Talagante" />
                    <option value="Melipilla" />
                    <option value="Valparaíso" />
                    <option value="Viña del Mar" />
                    <option value="Concón" />
                    <option value="Concepción" />
                    <option value="Talcahuano" />
                    <option value="Antofagasta" />
                    <option value="La Serena" />
                    <option value="Coquimbo" />
                    <option value="Rancagua" />
                    <option value="Talca" />
                    <option value="Chillán" />
                    <option value="Temuco" />
                    <option value="Valdivia" />
                    <option value="Puerto Montt" />
                    <option value="Punta Arenas" />
                    <option value="Iquique" />
                    <option value="Arica" />
                  </datalist>
                  {errors.comuna && <p className="text-xs text-red-600 mt-1">{errors.comuna}</p>}
                </div>

                <div>
                  <label htmlFor="ipd-rut" className="block text-sm font-semibold text-gray-700 mb-2">RUT</label>
                  <input
                    id="ipd-rut"
                    type="text"
                    inputMode="text"
                    value={formData.rut}
                    onChange={handleRUTChange}
                    maxLength={12}
                    placeholder="12.345.678-9"
                    className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 ${errors.rut ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                  />
                  {errors.rut && <p className="text-xs text-red-600 mt-1">{errors.rut}</p>}
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                  <p className="text-xs text-gray-800 leading-relaxed">
                    <strong className="text-amber-700">Test en proceso de validación.</strong> Los resultados son orientativos y deben ser interpretados por un profesional clínico entrenado. Datos protegidos · uso exclusivo InstitutoDBT.cl
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep('introduction')} className="flex-1 min-h-[52px]">Atrás</Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold min-h-[52px]"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Procesando…</>
                    ) : (
                      'Acceder al test'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {currentStep === 'assessment' && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-light mb-2">IDP-4 <span className="font-serif font-semibold text-emerald-700">Assessment</span></h1>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progreso</span><span>{Object.keys(responses).length} / 28</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full"><div className="h-full bg-emerald-600 rounded-full transition-all" style={{width: `${progress}%`}} /></div>
            </div>
            
            <div className="space-y-6">
              {idp4Questions.map((q, idx) => (
                <Card key={q.id} className={`border-0 shadow-lg ${q.safety ? 'border-l-4 border-red-500' : ''}`}>
                  <CardHeader>
                    <CardTitle className="text-lg"><span className="text-emerald-600 mr-2">{idx+1}.</span>{q.text}</CardTitle>
                    <p className="text-xs text-gray-500">{q.domain === 'DE' ? 'Desregulación Emocional' : q.domain === 'SV' ? 'Vacío' : q.domain === 'CA' ? 'Autolesión' : 'Inestabilidad'}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {scaleOptions.map(opt => (
                        <label key={opt.value} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer ${
                          responses[q.id] === opt.value ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'
                        }`}>
                          <input type="radio" name={`q${q.id}`} value={opt.value} checked={responses[q.id] === opt.value} onChange={() => handleResponseChange(q.id, opt.value)} className="w-5 h-5 text-emerald-600" />
                          <span className="ml-3">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button size="lg" onClick={() => setShowModal(true)} disabled={!allAnswered} className="bg-emerald-600 px-12 py-6 text-lg">
                {allAnswered ? 'Ver Perfil Dimensional' : `Completa las 28 preguntas (${Object.keys(responses).length}/28)`}
              </Button>
            </div>
          </>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full border-0 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-amber-50">
                <CardTitle className="text-2xl font-serif">Acceder a tu Perfil Dimensional Completo</CardTitle>
                <p className="text-gray-600 mt-2">Completa tus datos para generar tu reporte clínico IDP-4</p>
              </CardHeader>
              <CardContent className="p-6">
                {submitError && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">{submitError}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Nombre Completo *</label>
                    <input type="text" value={formData.fullName} onChange={(e) => setFormData(p => ({...p, fullName: e.target.value}))} className={`w-full px-4 py-2 border-2 rounded-lg ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">RUT *</label>
                    <input type="text" value={formData.rut} onChange={handleRUTChange} maxLength={12} placeholder="12.345.678-9" className={`w-full px-4 py-2 border-2 rounded-lg ${errors.rut ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.rut && <p className="text-xs text-red-600 mt-1">{errors.rut}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Email *</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData(p => ({...p, email: e.target.value}))} className={`w-full px-4 py-2 border-2 rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Edad *</label>
                    <input type="number" min="18" max="99" value={formData.age} onChange={(e) => setFormData(p => ({...p, age: e.target.value}))} placeholder="Ej: 28" className={`w-full px-4 py-2 border-2 rounded-lg ${errors.age ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.age && <p className="text-xs text-red-600 mt-1">{errors.age}</p>}
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                    <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" /><p className="text-xs text-gray-700">Datos protegidos. Uso exclusivo para tu evaluación clínica en InstitutoDBT.cl</p></div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">Cancelar</Button>
                    <Button type="submit" disabled={isSubmitting} className="flex-1 bg-emerald-600">
                      {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Procesando...</> : 'Generar Perfil Clínico IDP-4'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
