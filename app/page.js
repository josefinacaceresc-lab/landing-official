import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Brain, BookOpen, Users, Award, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Instituto DBT Chile | Terapia Dialéctico Conductual',
  description: 'Instituto líder en Terapia Dialéctico Conductual (DBT) en Chile. Único representante de WDBTA. Investigación científica en neurociencia y salud mental.',
  alternates: {
    canonical: 'https://institutodbt.cl',
  },
  openGraph: {
    title: 'Instituto DBT Chile | Terapia Dialéctico Conductual',
    description: 'Instituto líder en Terapia Dialéctico Conductual (DBT) en Chile. Único representante de WDBTA.',
    url: 'https://institutodbt.cl',
    images: [{
      url: 'https://images.unsplash.com/photo-1765490526583-4bf7f007096f?fm=jpg&q=80&w=1200&h=630&fit=crop',
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
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1765490526583-4bf7f007096f?fm=jpg&q=60&w=3000&auto=format&fit=crop"
            alt="Zen stones representing balance and harmony"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Enso Circle Logo */}
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-emerald-600 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                <div className="w-16 h-16 rounded-full border-4 border-amber-500" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              Instituto <span className="font-semibold text-emerald-600">DBT</span> Chile
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
              Terapia Dialéctico Conductual de Vanguardia
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              <Award className="w-5 h-5 text-amber-600" />
              <p className="text-sm text-gray-700 font-medium">
                Único Representante WDBTA en Chile
              </p>
            </div>
            
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Lideramos la investigación científica y práctica clínica en neurociencia, 
              regulación emocional y salud mental con estándares internacionales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
                <Link href="#contacto" className="flex items-center gap-2">
                  Agendar Consulta
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-lg">
                <Link href="/investigacion" className="flex items-center gap-2">
                  Conocer Investigación
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Excelencia <span className="font-semibold text-emerald-600">Científica</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Pioneros en investigación y tratamiento de la desregulación emocional
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">WDBTA</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Miembros certificados de la World DBT Training Alliance, 
                    garantizando los más altos estándares terapéuticos.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Investigación</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Publicaciones doctorales, proyectos LaKaira AI y La Mente Algorítmica. 
                    Ciencia aplicada al tratamiento.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Users className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Equipo Clínico</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Liderados por la Dra. Josefina Cáceres, expertos en DBT 
                    con formación internacional.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Research Highlight */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                  alt="Neural network research"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Investigación</span>
                </div>
                
                <h2 className="text-4xl font-light text-gray-900 mb-6">
                  La Mente <span className="font-semibold text-emerald-600">Algorítmica</span>
                </h2>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Nuestro programa de investigación incluye 8 artículos científicos sobre 
                  desregulación emocional, EMA (Evaluación Momentánea Ecológica), y axiomas 
                  de la neurociencia aplicada.
                </p>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Destacamos el <strong>Tratado Maestro sobre Desregulación Emocional</strong> 
                  con 6,454 palabras y 33 referencias APA 7, estableciendo un nuevo estándar 
                  en la comprensión científica del fenómeno.
                </p>
                
                <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                  <Link href="/investigacion/la-mente-algoritmica" className="flex items-center gap-2">
                    Explorar Investigación
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contacto" className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Comienza tu <span className="font-semibold">Transformación</span>
            </h2>
            <p className="text-xl mb-12 text-emerald-50">
              Contáctanos para una evaluación inicial con nuestro equipo especializado
            </p>
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 px-12 py-6 text-lg font-semibold">
              Hablar con Serena (Asistente de Admisión)
            </Button>
            <p className="mt-6 text-sm text-emerald-100">
              Horario: Lunes a Viernes, 9:00 - 18:00 hrs (Chile)
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}