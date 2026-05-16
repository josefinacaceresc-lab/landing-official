import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Brain, Users, Heart, Shield, Sparkles, Layers } from 'lucide-react'

export const metadata = {
  title: 'DBT Infanto-Juvenil (DBT-A) | Instituto DBT Chile',
  description: 'Programa DBT para Adolescentes (DBT-A) con Fidelidad Total al modelo Rathus & Miller. Integración del sistema familiar vía Camino del Medio. Tratamiento de alta complejidad para adolescentes con desregulación emocional, ideación de daño y descontrol impulsivo.',
  keywords: [
    'DBT adolescentes Chile',
    'DBT-A Santiago',
    'Rathus Miller Chile',
    'tratamiento adolescentes TLP',
    'Camino del Medio',
    'Instituto DBT Chile infantojuvenil',
  ],
  alternates: { canonical: 'https://institutodbtchile.cl/tratamiento/dbt-infanto-juvenil' },
  openGraph: {
    title: 'DBT-A: Programa DBT para Adolescentes | Instituto DBT Chile',
    description: 'Programa DBT Infanto-Juvenil con Fidelidad Total al modelo Rathus & Miller.',
    url: 'https://institutodbtchile.cl/tratamiento/dbt-infanto-juvenil',
    type: 'article',
  },
}

const caracteristicas = [
  {
    icon: Shield,
    title: 'Fidelidad Total al modelo',
    text: 'Adherencia estricta al modelo DBT-A de Rathus & Miller (2015). Único programa en Chile con esta fidelidad documentada.',
  },
  {
    icon: Users,
    title: 'Sistema familiar mandatorio',
    text: 'Integración obligatoria de padres/cuidadores al entrenamiento en habilidades. La diáda adolescente-familia es la unidad de tratamiento.',
  },
  {
    icon: Layers,
    title: 'Camino del Medio (Middle Path)',
    text: 'Quinto módulo específico para adolescentes: dialéctica, validación y habilidades parentales para resolver polémicas familiares.',
  },
  {
    icon: Heart,
    title: 'Estabilización y seguridad',
    text: 'Foco prioritario en ideación de daño, autolesiones y descontrol impulsivo. Etapa crítica del desarrollo cerebral.',
  },
]

const poblaciones = [
  'Desregulación emocional severa en adolescencia',
  'Ideación suicida y conductas autolesivas',
  'Descontrol impulsivo, conductas de riesgo',
  'Trastornos de conducta alimentaria con desregulación',
  'Conflictos familiares crónicos asociados',
  'Rasgos límites en adolescencia (TLP emergente)',
]

const modulos = [
  { n: '01', titulo: 'Mindfulness', text: 'Adaptación del módulo nuclear a lenguaje y experiencia adolescente.' },
  { n: '02', titulo: 'Tolerancia al Malestar', text: 'Habilidades de crisis: TIPP, distracción, autocuidado. Críticas en adolescentes.' },
  { n: '03', titulo: 'Regulación Emocional', text: 'Comprensión y modulación de estados emocionales intensos típicos del desarrollo.' },
  { n: '04', titulo: 'Efectividad Interpersonal', text: 'Relaciones con pares, asertividad, manejo de conflictos con figuras de autoridad.' },
  { n: '05', titulo: 'Camino del Medio', text: 'Módulo exclusivo DBT-A: dialéctica adolescente ↔ padres, validación bidireccional, habilidades parentales.' },
]

export default function DBTAdolescentesPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 text-sm font-semibold text-primary uppercase tracking-wider">
              Programa Infanto-Juvenil · Rathus & Miller
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              DBT <em className="font-serif italic text-primary">Infanto-Juvenil</em>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Nuestro programa DBT para Adolescentes (<strong>DBT-A</strong>) sigue estrictamente el modelo de <strong>Fidelidad Total</strong> de Rathus & Miller. Nos enfocamos en la estabilización de la <strong>desregulación emocional y conductual</strong> en etapas críticas del desarrollo. El tratamiento integra de forma mandatoria al sistema familiar a través del entrenamiento en habilidades del <em>“Camino del Medio”</em> (Middle Path), validación y dialéctica. Diseñado para adolescentes con alta complejidad clínica, ideación de daño o descontrol impulsivo, garantizando un entorno de seguridad y precisión terapéutica.
            </p>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Características del programa</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Cuatro elementos <em className="font-serif italic text-primary">no negociables</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {caracteristicas.map((c, i) => (
                <Card key={i} className="border-gray-200 hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <c.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{c.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{c.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section className="py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Cinco módulos DBT-A</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Entrenamiento <em className="font-serif italic text-primary">en habilidades</em> familia-adolescente
              </h2>
            </div>
            <div className="space-y-4">
              {modulos.map((m, i) => (
                <div key={i} className="flex gap-6 bg-white p-6 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                  <div className="text-3xl font-serif font-light text-primary/60 min-w-[50px]">{m.n}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{m.titulo}</h3>
                    <p className="text-gray-600 leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Poblaciones */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Indicaciones clínicas</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Adolescentes con <em className="font-serif italic text-primary">alta complejidad clínica</em>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {poblaciones.map((p, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                  <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            ¿Tu hijo/a necesita <em className="font-serif italic text-primary">tratamiento especializado</em>?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            La evaluación inicial define la pertinencia del programa DBT-A y orienta el plan terapéutico familiar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              <a
                href="mailto:contacto@dbtchile.cl?subject=Consulta%20sobre%20DBT-A%20%2F%20Programa%20Familia&body=Hola%20Instituto%20DBT%20Chile%2C%0A%0AQuisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20Programa%20DBT-A%20para%20adolescentes%20y%20familias.%0A%0ANombre%20completo%3A%20%0ATel%C3%A9fono%3A%20%0AEdad%20del%20adolescente%3A%20%0ABreve%20descripci%C3%B3n%3A%20%0A%0AGracias."
                className="flex items-center gap-2"
              >
                Contactar al equipo <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
              <Link href="/tratamiento">Volver al programa clínico</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
