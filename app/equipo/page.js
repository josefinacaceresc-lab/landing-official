import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Award, GraduationCap, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Equipo Clínico',
  description: 'Equipo de psicólogos clínicos especializados en DBT, liderados por la Dra. Josefina Cáceres. Certificación WDBTA y formación internacional.',
  alternates: {
    canonical: 'https://institutodbt.cl/equipo',
  },
  openGraph: {
    title: 'Equipo Clínico | Instituto DBT Chile',
    description: 'Equipo de especialistas en DBT con certificación WDBTA.',
    url: 'https://institutodbt.cl/equipo',
    images: [{
      url: 'https://images.unsplash.com/photo-1471520201477-47a62a269a87?fm=jpg&q=80&w=1200&h=630&fit=crop',
      width: 1200,
      height: 630,
    }],
  },
}

const teamMembers = [
  {
    name: 'Dra. Josefina Cáceres',
    role: 'Directora & Psicóloga Clínica',
    credentials: ['PhD en Neurociencia Clínica', 'Certificación WDBTA', 'Especialista en DBT'],
    description: 'Líder en investigación de desregulación emocional y fundadora del Instituto DBT Chile.',
    featured: true
  },
  {
    name: 'Ps. María González',
    role: 'Psicóloga Clínica Senior',
    credentials: ['Magíster en Psicología Clínica', 'Certificación DBT', '10+ años experiencia'],
    description: 'Especialista en trastornos de la personalidad y terapia grupal DBT.'
  },
  {
    name: 'Ps. Carlos Ramírez',
    role: 'Psicólogo Clínico',
    credentials: ['Magíster en Neuropsicología', 'Certificación DBT', 'Formación WDBTA'],
    description: 'Experto en evaluación neuropsicológica y skills training.'
  },
  {
    name: 'Ps. Andrea Silva',
    role: 'Psicóloga Clínica',
    credentials: ['Especialista en Adolescentes', 'Certificación DBT', 'Mindfulness'],
    description: 'Especialista en DBT para adolescentes y coaching telefónico.'
  }
]

export default function EquipoPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              Nuestro <span className="font-semibold text-emerald-600">Equipo</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Psicólogos clínicos con certificación internacional en DBT, 
              comprometidos con la excelencia terapéutica y el rigor científico.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Featured - Dra. Josefina Cáceres */}
            <div className="mb-20">
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-emerald-50 to-white overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-[500px]">
                      <Image
                        src="https://images.unsplash.com/photo-1471520201477-47a62a269a87?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                        alt="Dra. Josefina Cáceres"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="inline-block px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-full">
                          DIRECTORA
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-12">
                      <h2 className="text-4xl font-light text-gray-900 mb-2">
                        Dra. Josefina <span className="font-semibold text-emerald-600">Cáceres</span>
                      </h2>
                      <p className="text-lg text-gray-600 mb-6">Directora & Psicóloga Clínica</p>
                      
                      <div className="space-y-3 mb-8">
                        {[
                          { icon: GraduationCap, text: 'PhD en Neurociencia Clínica' },
                          { icon: Award, text: 'Certificación WDBTA' },
                          { icon: Sparkles, text: 'Especialista en DBT' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center gap-3 text-gray-700">
                            <item.icon className="w-5 h-5 text-emerald-600" />
                            <span>{item.text}</span>
                          </div>
                        ))}
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        Líder en investigación de desregulación emocional y fundadora del 
                        Instituto DBT Chile. Autora del programa doctoral "La Mente Algorítmica" 
                        con 8 artículos científicos sobre neurociencia y DBT.
                      </p>
                      
                      <p className="text-gray-600 leading-relaxed">
                        Su trabajo ha establecido nuevos estándares en la comprensión de los 
                        mecanismos neurobiológicos de la regulación emocional, combinando rigor 
                        científico con práctica clínica compasiva.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rest of Team */}
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-light text-gray-900">
                Equipo <span className="font-semibold text-emerald-600">Clínico</span>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.filter(m => !m.featured).map((member, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-white">
                  <CardContent className="p-8">
                    <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-200">
                      <Image
                        src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?fm=jpg&q=60&w=3000&auto=format&fit=crop"
                        alt={member.name}
                        fill
                        className="object-cover opacity-50"
                      />
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-emerald-600 font-medium mb-4">{member.role}</p>
                    
                    <div className="space-y-2 mb-4">
                      {member.credentials.map((cred, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-emerald-600 mt-1">•</span>
                          <span>{cred}</span>
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-6">
              ¿Listo para <span className="font-semibold">Comenzar</span>?
            </h2>
            <p className="text-xl mb-8 text-emerald-50">
              Agenda tu primera sesión con nuestro equipo especializado
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}