import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, CheckCircle, Globe, Users } from 'lucide-react'

export const metadata = {
  title: 'WDBTA Chile - World DBT Training Alliance',
  description: 'Único representante de WDBTA (World DBT Training Alliance) en Chile. Certificación internacional en Terapia Dialéctico Conductual.',
  alternates: {
    canonical: 'https://institutodbt.cl/investigacion/wdbta',
  },
  openGraph: {
    title: 'WDBTA Chile | Instituto DBT Chile',
    description: 'Único representante de WDBTA en Chile. Certificación internacional en DBT.',
    url: 'https://institutodbt.cl/investigacion/wdbta',
    images: [{
      url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?fm=jpg&q=80&w=1200&h=630&fit=crop',
      width: 1200,
      height: 630,
    }],
  },
}

export default function WDBTAPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
              <Award className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              <span className="font-semibold text-emerald-600">WDBTA</span> Chile
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              World DBT Training Alliance
            </p>
            
            <div className="inline-block px-6 py-3 bg-emerald-100 border-2 border-emerald-600 rounded-full">
              <p className="text-emerald-800 font-semibold">
                🏆 Único Representante Oficial en Chile
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is WDBTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                  alt="DBT mindfulness practice"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div>
                <h2 className="text-4xl font-light text-gray-900 mb-6">
                  ¿Qué es <span className="font-semibold text-emerald-600">WDBTA</span>?
                </h2>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  La World DBT Training Alliance es la organización internacional líder 
                  en la certificación y entrenamiento de profesionales en Terapia Dialéctico 
                  Conductual (DBT).
                </p>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Fundada por la Dra. Marsha M. Linehan, creadora de DBT, la WDBTA establece 
                  los estándares de oro para la formación, práctica y supervisión de esta terapia 
                  basada en evidencia.
                </p>
                
                <div className="flex items-center gap-2 text-emerald-700">
                  <Globe className="w-6 h-6" />
                  <a href="https://dbt-wdbta.org" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    dbt-wdbta.org
                  </a>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    Certificación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Nuestros terapeutas están certificados bajo los más altos estándares 
                    internacionales de práctica DBT.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Users className="w-6 h-6 text-emerald-600" />
                    Supervisión
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Acceso directo a supervisión internacional y comunidad global de 
                    expertos en DBT.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Award className="w-6 h-6 text-emerald-600" />
                    Estándares
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Garantizamos adherencia estricta a los protocolos de tratamiento 
                    validados empíricamente.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-light text-gray-900 mb-12 text-center">
              Beneficios de la <span className="font-semibold text-emerald-600">Membresía WDBTA</span>
            </h2>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <ul className="space-y-4">
                {[
                  'Acceso a recursos exclusivos de formación continua',
                  'Red global de profesionales DBT certificados',
                  'Supervisión clínica de expertos internacionales',
                  'Actualizaciones sobre investigación y mejores prácticas',
                  'Reconocimiento internacional de competencia en DBT',
                  'Materiales didácticos y protocolos validados',
                  'Participación en conferencias y eventos WDBTA',
                  'Certificación que distingue excelencia clínica'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-lg text-gray-700">
                    <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-6">
              Tratamiento <span className="font-semibold">Certificado WDBTA</span>
            </h2>
            <p className="text-xl mb-8 text-emerald-50">
              Recibe terapia DBT de clase mundial con nuestro equipo certificado
            </p>
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50">
              Agendar Evaluación Inicial
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}