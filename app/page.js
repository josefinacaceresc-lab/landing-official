import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Brain, BookOpen, Users, Award, Landmark, Microscope, Cpu, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'InstitutoDBT.cl | Centro de Alta Complejidad & Psiquiatría Computacional',
  description: 'InstitutoDBT.cl — Centro de Alta Complejidad y Psiquiatría Computacional. Único miembro institucional WDBTA en Chile. DBT de Fidelidad Total + Schema Therapy bajo dirección de la Dra. Josefina Cáceres, Ph.D.(c).',
  alternates: {
    canonical: 'https://institutodbt.cl',
  },
  openGraph: {
    title: 'InstitutoDBT.cl | Centro de Alta Complejidad & Psiquiatría Computacional',
    description: 'Único miembro institucional WDBTA en Chile. DBT de Fidelidad Total + Schema Therapy.',
    url: 'https://institutodbt.cl',
    images: [{
      url: 'https://institutodbt.cl/media/wdbta-barcelona-2023.jpeg',
      width: 1200,
      height: 630,
    }],
  },
}

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 text-sm font-semibold text-emerald-700 uppercase tracking-wider">
              Único Miembro Institucional WDBTA en Chile
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              Donde la ciencia encuentra a las <em className="font-serif italic text-emerald-700">personas</em>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Dirigido por la <strong>Dra.(c) Josefina Cáceres Cortés, Ph.D.(c)</strong> — el centro de salud mental más avanzado de Chile. Combinamos el tratamiento DBT de mayor evidencia científica con Schema Therapy y tecnología clínica propia, bajo el único sello institucional <strong>WDBTA</strong> del país.
            </p>
            
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg mb-12">
              <Link href="#contacto" className="flex items-center gap-2">
                Solicitar hora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div>
                <div className="text-3xl font-serif font-light text-emerald-700 mb-1">15+</div>
                <div className="text-sm text-gray-600">Años en DBT</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-light text-emerald-700 mb-1">WDBTA</div>
                <div className="text-sm text-gray-600">Miembro institucional</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-light text-emerald-700 mb-1">2</div>
                <div className="text-sm text-gray-600">Terapias integradas</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-light text-emerald-700 mb-1">AI</div>
                <div className="text-sm text-gray-600">LaKaira · Tecnología clínica</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="inline-block mb-4 text-sm font-semibold text-emerald-700 uppercase tracking-wider">Acreditaciones globales</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                La máxima distinción <em className="font-serif italic text-emerald-700">clínica</em> en Chile.
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Somos la única institución del país acreditada como <strong>miembro institucional de la WDBTA</strong> y <strong>certificada por la ISST</strong>. Dos sellos internacionales que garantizan un estándar científico y ético sin precedentes en salud mental.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm text-gray-700">
                <div><strong className="text-emerald-700">País:</strong> Único en Chile</div>
                <div><strong className="text-emerald-700">Acreditaciones:</strong> WDBTA · ISST</div>
                <div><strong className="text-emerald-700">Dirección:</strong> Ph.D.(c) clínica</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 shadow-2xl hover:shadow-3xl transition-shadow bg-white overflow-hidden">
                <CardContent className="p-8">
                  <div className="mb-6 relative h-32 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                    <Image
                      src="https://www.institutodbt.cl/logos/wdbta.png"
                      alt="WDBTA Logo"
                      width={200}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-2">WDBTA</h3>
                  <p className="text-sm text-gray-600 mb-4">World Dialectical Behavior Therapy Association</p>
                  <p className="text-emerald-700 font-semibold">Miembro institucional</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-2xl hover:shadow-3xl transition-shadow bg-white overflow-hidden">
                <CardContent className="p-8">
                  <div className="mb-6 relative h-32 flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                    <Image
                      src="https://www.institutodbt.cl/logos/isst.jpg"
                      alt="ISST Logo"
                      width={200}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-2">ISST</h3>
                  <p className="text-sm text-gray-600 mb-4">International Society of Schema Therapy</p>
                  <p className="text-amber-600 font-semibold">Certificación</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-4 text-sm font-semibold text-emerald-700 uppercase tracking-wider">Por qué elegirnos</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Un estándar científico sin precedentes en Chile
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Landmark className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Miembro WDBTA</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Único miembro institucional de la World DBT Association en Chile. Estándares internacionales en cada tratamiento.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">DBT + Schema Therapy</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Integración exclusiva certificada ISST. Protocolo propio para desregulación emocional profunda.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Microscope className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Dirección Ph.D.(c)</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Dirigido por la Dra.(c) Josefina Cáceres Cortés, con formación doctoral en curso y publicaciones científicas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">LaKaira AI</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Plataforma clínica de inteligencia artificial para apoyo en regulación emocional. Proyecto NexariaLabs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}

      {/* Self-Assessment CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-emerald-600 to-emerald-800 text-white overflow-hidden">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  
                  <h2 className="text-4xl font-light mb-4">
                    Evalúa tu <span className="font-serif font-semibold">Desregulación Emocional</span>
                  </h2>
                  
                  <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                    Test clínico validado + Acceso de prueba a <strong>LaKaira AI</strong> por 24 horas
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <Button size="lg" asChild className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-lg font-semibold">
                      <Link href="/autoevaluacion">
                        Comenzar Test Gratuito
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-emerald-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>10 minutos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Resultados inmediatos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Acceso LaKaira AI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>100% confidencial</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Solicita tu <span className="font-semibold">Consulta</span>
            </h2>
            <p className="text-xl mb-12 text-emerald-50">
              Da el primer paso. Nuestro equipo responde en menos de 24 horas hábiles.
            </p>
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 px-12 py-6 text-lg font-semibold">
              <a href="https://wa.me/56930550750?text=Hola,%20me%20gustaría%20solicitar%20una%20evaluación%20de%20alta%20complejidad%20en%20InstitutoDBT.cl.%20Mi%20nombre%20es..." target="_blank" rel="noopener noreferrer">
                WhatsApp · +56 9 3055 0750
              </a>
            </Button>
            <p className="mt-6 text-sm text-emerald-100">
              Horario: Lunes a Viernes, 9:00 - 18:00 hrs (Chile)
            </p>
            <div className="mt-8 text-sm text-emerald-100 space-y-2">
              <p>📞 22 848 0652</p>
              <p>✉️ contacto@institutodbt.cl</p>
              <p>📍 El Coihue 3776, Vitacura, Santiago</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}