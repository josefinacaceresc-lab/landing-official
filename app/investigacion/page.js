import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Sparkles, Database, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Investigación Científica',
  description: 'Hub de investigación del Instituto DBT Chile: LaKaira AI, La Mente Algorítmica, NexariaLabs. Ciencia aplicada en neurociencia y salud mental.',
  alternates: {
    canonical: 'https://institutodbt.cl/investigacion',
  },
  openGraph: {
    title: 'Investigación Científica | Instituto DBT Chile',
    description: 'Hub de investigación: LaKaira AI, La Mente Algorítmica, NexariaLabs.',
    url: 'https://institutodbt.cl/investigacion',
    images: [{
      url: 'https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?fm=jpg&q=80&w=1200&h=630&fit=crop',
      width: 1200,
      height: 630,
    }],
  },
}

export default function InvestigacionPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              Investigación <span className="font-semibold text-emerald-600">Científica</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Desarrollamos ciencia aplicada de vanguardia en neurociencia, 
              inteligencia artificial y salud mental para transformar el tratamiento clínico.
            </p>
          </div>
        </div>
      </section>

      {/* Research Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* LaKaira AI */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-white to-emerald-50">
                <CardHeader>
                  <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-semibold text-gray-900">LaKaira AI</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Sistema de inteligencia artificial para la evaluación momentánea ecológica (EMA) 
                    y predicción de crisis emocionales en tiempo real.
                  </p>
                  <ul className="space-y-2 mb-6 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">•</span>
                      <span>Machine Learning aplicado a DBT</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">•</span>
                      <span>Monitoreo continuo de regulación emocional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-1">•</span>
                      <span>Intervenciones preventivas personalizadas</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                    Ver Proyecto
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* La Mente Algorítmica */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-white to-amber-50">
                <CardHeader>
                  <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-semibold text-gray-900">La Mente Algorítmica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Programa de investigación doctoral con 8 artículos científicos sobre 
                    desregulación emocional, EMA y axiomas de la neurociencia.
                  </p>
                  <ul className="space-y-2 mb-6 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span>Tratado Maestro (6,454 palabras, 33 refs APA 7)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span>Axiomas de la regulación emocional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span>Fundamentos neurocientíficos del DBT</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                    <Link href="/investigacion/la-mente-algoritmica" className="flex items-center gap-2">
                      Explorar Papers
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* NexariaLabs */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-white to-blue-50 md:col-span-2">
                <CardHeader>
                  <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-semibold text-gray-900">NexariaLabs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Laboratorio de innovación en tecnologías aplicadas a la salud mental. 
                        Desarrollamos herramientas digitales para terapeutas y pacientes.
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Plataformas de telepsicología</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Apps de mindfulness y regulación</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Sistemas de gestión clínica DBT</span>
                        </li>
                      </ul>
                    </div>
                    <div className="relative h-64 md:h-full rounded-xl overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                        alt="NexariaLabs research"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-6">
              ¿Interesado en <span className="font-semibold">Colaborar</span>?
            </h2>
            <p className="text-xl mb-8 text-emerald-50">
              Aceptamos propuestas de investigación conjunta y alianzas estratégicas
            </p>
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50">
              Contactar Equipo de Investigación
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}