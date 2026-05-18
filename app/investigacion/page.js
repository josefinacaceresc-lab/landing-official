import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Sparkles, Database, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Investigación Científica',
  description: 'Hub de investigación del Instituto DBT Chile: LaKaira AI, La Mente Algorítmica, NexariaLabs. Ciencia aplicada en neurociencia y salud mental.',
  alternates: {
    canonical: 'https://institutodbtchile.cl/investigacion',
  },
  openGraph: {
    title: 'Investigación Científica | Instituto DBT Chile',
    description: 'Hub de investigación: LaKaira AI, La Mente Algorítmica, NexariaLabs.',
    url: 'https://institutodbtchile.cl/investigacion',
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              Investigación <span className="font-semibold text-primary">Científica</span>
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
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-white to-primary/5">
                <CardHeader>
                  <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-primary to-primary/90 flex items-center justify-center">
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
                      <span className="text-primary mt-1">•</span>
                      <span>Machine Learning aplicado a DBT</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Monitoreo continuo de regulación emocional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Intervenciones preventivas personalizadas</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold">
                    <a
                      href="mailto:contacto@dbtchile.cl?subject=Consulta%20sobre%20LaKaira%20AI&body=Hola%2C%20quisiera%20más%20información%20sobre%20el%20proyecto%20LaKaira%20AI.%0A%0AMi%20nombre%3A%20%0ATeléfono%3A%20%0AContexto%3A%20"
                      className="flex items-center gap-2"
                    >
                      Ver Proyecto
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* La Mente Algorítmica */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-white to-secondary/5">
                <CardHeader>
                  <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-secondary to-secondary/90 flex items-center justify-center">
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
                      <span className="text-secondary mt-1">•</span>
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
                  <Button asChild variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold">
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
                        Desarrollamos herramientas digitales para terapeutas y consultantes.
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

      {/* CTA - Join Research (CRITICAL FEATURE - Dra. Cáceres Priority) */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-secondary text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Main Content */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <Brain className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Convocatoria Abierta
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                ¿Quieres <span className="font-bold">ser parte de esta investigación</span>?
              </h2>
              
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                Invitamos a <strong>profesionales de la salud mental</strong>, <strong>investigadores</strong> y <strong>consultantes con diagnóstico de TLP o desregulación emocional</strong> a participar en nuestros estudios científicos de alta complejidad.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="font-bold text-lg mb-2">Participantes Clínicos</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Personas con diagnóstico de TLP o alta desregulación emocional interesadas en contribuir al avance científico.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="font-bold text-lg mb-2">Investigadores & Co-autores</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Profesionales que buscan alianzas estratégicas en psiquiatría computacional y neurociencia aplicada.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <h3 className="font-bold text-lg mb-2">Colaboradores Institucionales</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Universidades, centros de investigación y entidades que buscan proyectos conjuntos.
                  </p>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                asChild
                className="bg-white text-primary hover:bg-white/90 px-10 py-7 text-lg font-bold shadow-2xl"
              >
                <a
                  href="mailto:contacto@dbtchile.cl?subject=Ser%20parte%20de%20la%20Investigaci%C3%B3n%20-%20Instituto%20DBT%20Chile&body=Hola%2C%20me%20gustar%C3%ADa%20ser%20parte%20de%20la%20investigaci%C3%B3n%20del%20Instituto%20DBT%20Chile.%0A%0AMi%20nombre%3A%20%0ARol%20%2F%20Profesi%C3%B3n%3A%20%0ATel%C3%A9fono%3A%20%0AComentario%3A%20"
                  className="flex items-center gap-2"
                >
                  Ser parte de esta Investigación
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>

              <Button
                size="lg"
                asChild
                variant="outline"
                className="!bg-transparent border-2 border-white text-white hover:!bg-white hover:!text-primary px-10 py-7 text-lg font-semibold"
              >
                <a
                  href="mailto:contacto@dbtchile.cl?subject=Propuesta%20de%20Colaboraci%C3%B3n%20Cient%C3%ADfica&body=Hola%20equipo%20DBT%20Chile%2C%0A%0ATengo%20una%20propuesta%20de%20colaboraci%C3%B3n%20cient%C3%ADfica%20que%20me%20gustar%C3%ADa%20presentar.%0A%0ANombre%3A%20%0AInstituci%C3%B3n%3A%20%0AResumen%20de%20la%20propuesta%3A%20"
                  className="flex items-center gap-2"
                >
                  Propuesta de Colaboración
                </a>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-10 text-center">
              <p className="text-white/90 text-sm mb-2">
                <strong>Contacto directo:</strong>{' '}
                <a href="mailto:contacto@dbtchile.cl" className="underline hover:text-white">
                  contacto@dbtchile.cl
                </a>
              </p>
              <p className="text-white/70 text-xs">
                Respondemos propuestas científicas en un plazo máximo de 72 horas hábiles
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}