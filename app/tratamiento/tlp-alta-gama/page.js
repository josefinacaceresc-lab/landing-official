import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Brain, Heart, Layers, Shield, Microscope, Activity, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Trastorno Límite de Personalidad (TLP) | Instituto DBT Chile',
  description: 'Centro de referencia nacional en tratamiento del Trastorno Límite de Personalidad bajo estándar WDBTA. Enfoque dimensional y computacional con DBT de Fidelidad Total + Schema Therapy + monitoreo ApoFix AI.',
  keywords: [
    'TLP Chile',
    'Trastorno Límite de Personalidad',
    'DBT TLP Santiago',
    'tratamiento TLP WDBTA',
    'Instituto DBT Chile',
    'borderline Chile',
  ],
  alternates: { canonical: 'https://institutodbtchile.cl/tratamiento/tlp-alta-gama' },
  openGraph: {
    title: 'TLP: Tratamiento DBT de Fidelidad Total | Instituto DBT Chile',
    description: 'Referente nacional en tratamiento del Trastorno Límite de Personalidad bajo estándar WDBTA.',
    url: 'https://institutodbtchile.cl/tratamiento/tlp-alta-gama',
    type: 'article',
  },
}

const pilaresHabilidades = [
  {
    icon: Brain,
    title: 'Mindfulness',
    text: 'Capacidad nuclear para observar, describir y participar plenamente. Fundamento de la regulación del sistema emocional.',
  },
  {
    icon: Shield,
    title: 'Tolerancia al Malestar',
    text: 'Habilidades para atravesar crisis sin recurrir a conductas autodestructivas. Aceptación radical y supervivencia en crisis.',
  },
  {
    icon: Heart,
    title: 'Regulación Emocional',
    text: 'Comprensión, modulación y cambio de estados emocionales intensos. Núcleo del tratamiento del TLP.',
  },
  {
    icon: Layers,
    title: 'Efectividad Interpersonal',
    text: 'Construcción de relaciones estables, asertividad, manejo de conflictos y respeto a la propia identidad.',
  },
]

const ejes = [
  {
    n: '01',
    titulo: 'Perspectiva dimensional',
    text: 'Abordamos el TLP desde su estructura dimensional: desregulación emocional, conductual, cognitiva, interpersonal y del self. No tratamos un "trastorno categórico", tratamos sistemas alterados de regulación.',
  },
  {
    n: '02',
    titulo: 'Modelo computacional',
    text: 'Analizamos los sistemas de respuesta emocional y los déficits en la capacidad predictiva del consultante. Integración con el principio de Energía Libre (Friston) vía ApoFix AI.',
  },
  {
    n: '03',
    titulo: 'Síntesis dialéctica',
    text: 'Aceptación y cambio simultáneos. Validación radical del sufrimiento + tecnologías de cambio conductual. El corazón del modelo Linehan.',
  },
  {
    n: '04',
    titulo: 'Construcción de una vida valiosa',
    text: 'El objetivo final no es la reducción de síntomas: es la construcción de una vida que merezca ser vivida. Proyecto vital, vínculos significativos, sentido.',
  },
]

const evidencia = [
  { stat: '77%', desc: 'Reducción de intentos suicidas vs. tratamiento usual (Linehan et al., 2006)' },
  { stat: '50%', desc: 'Reducción de hospitalizaciones psiquiátricas (meta-análisis Cochrane, 2020)' },
  { stat: '1ª', desc: 'Línea de tratamiento recomendada por NICE, APA y NHMRC' },
  { stat: 'A', desc: 'Nivel de evidencia máximo para DBT en TLP (estudios RCT múltiples)' },
]

export default function TLPPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 text-sm font-semibold text-primary uppercase tracking-wider">
              Referente Nacional WDBTA
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Trastorno Límite de <em className="font-serif italic text-primary">Personalidad</em>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              El <strong>Instituto DBT Chile</strong> es el referente nacional en el tratamiento del TLP bajo el estándar <strong>WDBTA</strong>. Abordamos el trastorno desde una perspectiva <strong>dimensional y computacional</strong>, analizando los sistemas de respuesta emocional y los déficits en la capacidad predictiva del consultante. Nuestro enfoque no es solo la reducción de síntomas, sino la construcción de <em>una vida que merezca ser vivida</em> mediante la síntesis dialéctica y el entrenamiento riguroso en los cuatro pilares de habilidades DBT.
            </p>
          </div>
        </div>
      </section>

      {/* Ejes clínicos */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Cuatro ejes clínicos</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Un modelo <em className="font-serif italic text-primary">dimensional y dialéctico</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {ejes.map((e, i) => (
                <div key={i} className="flex gap-6 bg-white p-8 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                  <div className="text-4xl font-serif font-light text-primary/60 min-w-[60px]">{e.n}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{e.titulo}</h3>
                    <p className="text-gray-600 leading-relaxed">{e.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cuatro pilares de habilidades */}
      <section className="py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Cuatro pilares de habilidades DBT</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Entrenamiento <em className="font-serif italic text-primary">riguroso</em> y sistemático
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pilaresHabilidades.map((p, i) => (
                <Card key={i} className="border-gray-200 hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <p.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Evidencia */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Evidencia clínica</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Tratamiento de <em className="font-serif italic text-primary">primera línea</em>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {evidencia.map((e, i) => (
                <div key={i} className="text-center p-6 bg-primary/5 rounded-xl">
                  <div className="text-4xl md:text-5xl font-serif font-light text-primary mb-2">{e.stat}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 bg-amber-50 border-l-4 border-amber-500 rounded">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Diagnóstico:</strong> Recomendamos confirmar el diagnóstico de TLP (DSM-5/CIE-11) por psicólogo o psiquiatra entrenado. Nuestra evaluación clínica integra entrevista estructurada + <Link href="/evaluacion-idp4" className="text-primary underline font-medium">IDP-4</Link> + <Link href="/evaluacion-bsl23" className="text-primary underline font-medium">BSL-23</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            ¿Buscas tratamiento de <em className="font-serif italic text-primary">máxima fidelidad clínica</em>?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Comienza con nuestra evaluación IDP-4 — instrumento dimensional para identificar perfiles de personalidad y orientar el plan terapéutico.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white px-8">
              <Link href="/evaluacion-idp4">Iniciar Evaluación IDP-4 <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
              <Link href="/equipo">Conocer al equipo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
