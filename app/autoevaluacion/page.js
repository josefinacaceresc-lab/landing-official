'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

const questions = [
  {
    id: 1,
    text: '¿Con qué frecuencia experimentas cambios intensos y repentinos de estado de ánimo?',
    category: 'emotional',
    options: [
      { value: 0, label: 'Raramente o nunca' },
      { value: 1, label: 'Ocasionalmente' },
      { value: 2, label: 'Frecuentemente' },
      { value: 3, label: 'Casi siempre' }
    ]
  },
  {
    id: 2,
    text: '¿Tienes dificultad para controlar la ira o irritabilidad?',
    category: 'emotional',
    options: [
      { value: 0, label: 'No, raramente' },
      { value: 1, label: 'A veces' },
      { value: 2, label: 'Con frecuencia' },
      { value: 3, label: 'Muy frecuentemente' }
    ]
  },
  {
    id: 3,
    text: '¿Sientes un vacío interno persistente o crónico?',
    category: 'emotional',
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Ocasionalmente' },
      { value: 2, label: 'Frecuentemente' },
      { value: 3, label: 'Constantemente' }
    ]
  },
  {
    id: 4,
    text: '¿Has tenido pensamientos de hacerte daño o impulsos autodestructivos?',
    category: 'risk',
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'En el pasado, pero no recientemente' },
      { value: 2, label: 'Ocasionalmente' },
      { value: 3, label: 'Frecuentemente' }
    ]
  },
  {
    id: 5,
    text: '¿Tus relaciones interpersonales son intensas e inestables?',
    category: 'interpersonal',
    options: [
      { value: 0, label: 'No, son estables' },
      { value: 1, label: 'Algo inestables' },
      { value: 2, label: 'Muy inestables' },
      { value: 3, label: 'Extremadamente caóticas' }
    ]
  },
  {
    id: 6,
    text: '¿Tienes miedo intenso al abandono o rechazo?',
    category: 'interpersonal',
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Moderado' },
      { value: 2, label: 'Intenso' },
      { value: 3, label: 'Extremo' }
    ]
  },
  {
    id: 7,
    text: '¿Actúas impulsivamente de maneras que podrían perjudicarte (gastos, sexo, sustancias, conducción)?',
    category: 'impulsivity',
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Ocasionalmente' },
      { value: 2, label: 'Frecuentemente' },
      { value: 3, label: 'Muy frecuentemente' }
    ]
  },
  {
    id: 8,
    text: '¿Tienes dificultad para saber quién eres realmente o sientes que tu identidad cambia?',
    category: 'identity',
    options: [
      { value: 0, label: 'No, tengo claridad' },
      { value: 1, label: 'Alguna confusión' },
      { value: 2, label: 'Confusión frecuente' },
      { value: 3, label: 'Confusión extrema' }
    ]
  },
  {
    id: 9,
    text: '¿Experimentas síntomas disociativos (sentirte desconectado de ti mismo o de la realidad)?',
    category: 'dissociation',
    options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Ocasionalmente' },
      { value: 2, label: 'Frecuentemente' },
      { value: 3, label: 'Con mucha frecuencia' }
    ]
  },
  {
    id: 10,
    text: '¿Tienes dificultad para manejar el estrés o situaciones emocionalmente intensas?',
    category: 'coping',
    options: [
      { value: 0, label: 'No, manejo bien' },
      { value: 1, label: 'Algo de dificultad' },
      { value: 2, label: 'Mucha dificultad' },
      { value: 3, label: 'Dificultad extrema' }
    ]
  }
]

export default function AutoevaluacionPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState('assessment') // assessment, form, loading, success
  const [responses, setResponses] = useState({})
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
  }

  const calculateScore = () => {
    const total = Object.values(responses).reduce((sum, val) => sum + val, 0)
    return total
  }

  const formatRUT = (value) => {
    // Remove all non-numeric characters except K
    let rut = value.replace(/[^0-9kK]/g, '')
    
    if (rut.length <= 1) return rut
    
    // Separate body and verification digit
    const body = rut.slice(0, -1)
    const dv = rut.slice(-1)
    
    // Format body with dots
    let formatted = body.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    
    // Add dash and verification digit
    return formatted + '-' + dv
  }

  const handleRUTChange = (e) => {
    const formatted = formatRUT(e.target.value)
    setFormData(prev => ({ ...prev, rut: formatted }))
    if (errors.rut) {
      setErrors(prev => ({ ...prev, rut: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nombre completo es requerido'
    }
    
    if (!formData.rut.trim()) {
      newErrors.rut = 'RUT es requerido'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Teléfono es requerido'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAssessmentComplete = () => {
    const allAnswered = questions.every(q => responses[q.id] !== undefined)
    
    if (!allAnswered) {
      alert('Por favor responde todas las preguntas antes de continuar')
      return
    }
    
    setCurrentStep('form')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      const score = calculateScore()
      
      const response = await fetch('/api/leads/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          assessmentScore: score,
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
      
      // Redirect to results page with token
      router.push(`/autoevaluacion/resultados?token=${data.lakairaToken}&score=${data.assessmentScore}`)
      
    } catch (error) {
      setSubmitError(error.message)
      setIsSubmitting(false)
    }
  }

  const allQuestionsAnswered = questions.every(q => responses[q.id] !== undefined)
  const progress = (Object.keys(responses).length / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 text-sm font-semibold uppercase tracking-wider rounded-full mb-4">
              Test de Autoevaluación
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Evalúa tu <span className="font-serif font-semibold text-emerald-700">Desregulación Emocional</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cuestionario clínico validado para identificar patrones de desregulación emocional
            </p>
          </div>

          {/* Progress Bar */}
          {currentStep === 'assessment' && (
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progreso</span>
                <span>{Object.keys(responses).length} / {questions.length}</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Assessment Questions */}
          {currentStep === 'assessment' && (
            <div className="space-y-6">
              {questions.map((question, index) => (
                <Card key={question.id} className="border-0 shadow-lg bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      <span className="text-emerald-600 mr-2">{index + 1}.</span>
                      {question.text}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {question.options.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            responses[question.id] === option.value
                              ? 'border-emerald-600 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option.value}
                            checked={responses[question.id] === option.value}
                            onChange={() => handleResponseChange(question.id, option.value)}
                            className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="ml-3 text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-center pt-8">
                <Button
                  size="lg"
                  onClick={handleAssessmentComplete}
                  disabled={!allQuestionsAnswered}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 text-lg font-semibold"
                >
                  {allQuestionsAnswered ? 'Ver Resultados Clínicos' : 'Completa todas las preguntas'}
                </Button>
              </div>
            </div>
          )}

          {/* Contact Form */}
          {currentStep === 'form' && (
            <Card className="border-0 shadow-2xl bg-white">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-amber-50 border-b border-emerald-100">
                <CardTitle className="text-2xl font-serif text-gray-900 text-center">
                  Accede a tus Resultados Clínicos
                </CardTitle>
                <p className="text-center text-gray-600 mt-2">
                  Para acceder a tu análisis personalizado, completa tus datos:
                </p>
              </CardHeader>
              <CardContent className="p-8">
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800 text-sm">{submitError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, fullName: e.target.value }))
                        if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }))
                      }}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ej: María Fernanda González Silva"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="rut" className="block text-sm font-semibold text-gray-700 mb-2">
                      RUT (formato: XX.XXX.XXX-X) *
                    </label>
                    <input
                      id="rut"
                      type="text"
                      value={formData.rut}
                      onChange={handleRUTChange}
                      maxLength={12}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                        errors.rut ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ej: 12.345.678-9"
                    />
                    {errors.rut && <p className="mt-1 text-sm text-red-600">{errors.rut}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }))
                        if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
                      }}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, phone: e.target.value }))
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
                      }}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+56 9 XXXX XXXX"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <p className="font-semibold mb-1">Confidencialidad garantizada</p>
                        <p>Tus datos están protegidos y solo serán utilizados para fines clínicos y de contacto del Instituto DBT.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep('assessment')}
                      className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Volver al Test
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        'Ver Resultados y Acceder a LaKaira AI'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
