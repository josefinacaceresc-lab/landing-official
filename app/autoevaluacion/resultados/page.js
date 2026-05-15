'use client'

import { use, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertTriangle, Clock, Copy, Check, ExternalLink } from 'lucide-react'

function getScoreInterpretation(score) {
  if (score <= 10) {
    return {
      level: 'Bajo',
      color: 'emerald',
      description: 'Tu puntuación sugiere niveles bajos de desregulación emocional. Es posible que experimentes dificultades emocionales ocasionales, pero dentro de rangos adaptativos.',
      recommendation: 'Considera técnicas de mindfulness y autocuidado preventivo para mantener tu bienestar emocional.'
    }
  } else if (score <= 20) {
    return {
      level: 'Moderado',
      color: 'amber',
      description: 'Tu puntuación indica niveles moderados de desregulación emocional. Podrías beneficiarte de estrategias de regulación emocional estructuradas.',
      recommendation: 'Recomendamos una evaluación clínica para determinar si un programa de habilidades DBT sería beneficioso para ti.'
    }
  } else {
    return {
      level: 'Alto',
      color: 'red',
      description: 'Tu puntuación sugiere niveles significativos de desregulación emocional que pueden estar interfiriendo con tu calidad de vida y relaciones.',
      recommendation: 'Te recomendamos encarecidamente una evaluación especializada. El programa DBT de fidelidad total podría ser altamente beneficioso en tu caso.'
    }
  }
}

export default function ResultadosPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const score = parseInt(searchParams.get('score') || '0')
  
  const [copied, setCopied] = useState(false)
  const [tokenData, setTokenData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const interpretation = getScoreInterpretation(score)
  const lakairaUrl = `https://lakaira.institutodbt.cl/trial?token=${token}`

  useEffect(() => {
    if (token) {
      verifyToken()
    }
  }, [token])

  const verifyToken = async () => {
    try {
      const response = await fetch('/api/lakaira/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
      
      const data = await response.json()
      
      if (data.valid) {
        setTokenData(data)
      } else {
        setError(data.error || 'Token inválido')
      }
    } catch (err) {
      setError('Error al verificar el token')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(lakairaUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatExpiryDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-amber-600" />
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">
              No se encontró token de acceso
            </h1>
            <p className="text-gray-600 mb-8">
              Debes completar el test de autoevaluación primero.
            </p>
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Link href="/autoevaluacion">
                Realizar Test de Autoevaluación
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-amber-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Resultados de tu <span className="font-serif font-semibold text-emerald-700">Autoevaluación</span>
            </h1>
            {tokenData && (
              <p className="text-xl text-gray-600">
                Hola <strong className="text-emerald-700">{tokenData.fullName}</strong>, aquí están tus resultados
              </p>
            )}
          </div>

          {/* Score Card */}
          <Card className={`border-0 shadow-2xl mb-8 bg-gradient-to-br from-white to-${interpretation.color}-50`}>
            <CardHeader className="text-center border-b border-gray-200">
              <CardTitle className="text-3xl font-serif">
                Puntuación: <span className={`text-${interpretation.color}-600`}>{score} / 30</span>
              </CardTitle>
              <p className={`text-lg font-semibold text-${interpretation.color}-700 mt-2`}>
                Nivel de Desregulación: {interpretation.level}
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Interpretación Clínica</h3>
                <p className="text-gray-700 leading-relaxed">
                  {interpretation.description}
                </p>
              </div>
              
              <div className={`p-4 bg-${interpretation.color}-100 border border-${interpretation.color}-200 rounded-lg`}>
                <h4 className={`font-semibold text-${interpretation.color}-900 mb-2`}>Recomendación</h4>
                <p className={`text-${interpretation.color}-800`}>
                  {interpretation.recommendation}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* LaKaira AI Access */}
          <Card className="border-0 shadow-2xl mb-8 bg-gradient-to-br from-gray-900 to-emerald-900 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-serif flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                Acceso a LaKaira AI - 24 Horas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-emerald-100 leading-relaxed">
                Has desbloqueado acceso de prueba a <strong>LaKaira AI</strong>, nuestra plataforma de inteligencia artificial clínica para monitoreo de regulación emocional basada en el Principio de Energía Libre.
              </p>

              {tokenData && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-emerald-300" />
                    <span className="text-sm text-emerald-100">
                      Tu acceso expira el: <strong className="text-white">{formatExpiryDate(tokenData.expiresAt)}</strong>
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-emerald-100 mb-2">
                  Tu enlace de acceso único:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={lakairaUrl}
                    readOnly
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href={lakairaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button size="lg" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Acceder a LaKaira AI Ahora
                  </Button>
                </a>

                <div className="bg-amber-500/20 border border-amber-400/30 rounded-lg p-4">
                  <p className="text-sm text-amber-100">
                    <strong>Nota:</strong> Este enlace es personal e intransferible. Expira automáticamente en 24 horas. Guárdalo en un lugar seguro.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">¿Qué puedes hacer en LaKaira AI?</h4>
                <ul className="space-y-2 text-sm text-emerald-100">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Monitoreo en tiempo real de estados emocionales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Detección de patrones de desregulación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Recomendaciones personalizadas de habilidades DBT</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Registro de eventos emocionales y análisis predictivo</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-0 shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-gray-900">
                Próximos Pasos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Evaluación Clínica Especializada</h4>
                  <p className="text-gray-600 text-sm">
                    Agenda una evaluación diagnóstica completa con nuestro equipo WDBTA. Análisis profundo de tu perfil de desregulación emocional.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Plan de Tratamiento Personalizado</h4>
                  <p className="text-gray-600 text-sm">
                    Diseño de protocolo DBT individualizado según tus necesidades específicas: DBT Estándar, DBT-SUD, o Patología Dual.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Inicio de Tratamiento</h4>
                  <p className="text-gray-600 text-sm">
                    Integración al programa con monitoreo continuo LaKaira AI y acceso completo a todos los módulos de habilidades.
                  </p>
                </div>
              </div>

              <div className="pt-4 text-center">
                <Button size="lg" asChild className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                  <a href="https://wa.me/56930550750?text=Hola,%20completé%20el%20test%20de%20autoevaluación%20y%20me%20gustaría%20agendar%20una%20evaluación%20clínica%20especializada." target="_blank" rel="noopener noreferrer">
                    Agendar Evaluación Clínica
                  </a>
                </Button>
                <p className="mt-4 text-sm text-gray-600">
                  WhatsApp: +56 9 3055 0750 | Email: contacto@dbtchile.cl
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
