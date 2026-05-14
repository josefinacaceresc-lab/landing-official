import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Brain, Activity, Shield, Cpu, Layers, CheckCircle, Microscope, Users } from 'lucide-react'

export const metadata = {
  title: 'Tratamiento DBT de Fidelidad Total | Instituto DBT Chile',
  description: 'Programa clínico integrado DBT + Schema Therapy de máxima evidencia. Único centro WDBTA en Chile con monitoreo LaKaira AI. Tratamiento ambulatorio intensivo para TLP, patología dual y desregulación emocional severa.',
  keywords: [
    'Tratamiento DBT Chile',
    'DBT de Fidelidad Total',
    'Schema Therapy Santiago',
    'TLP tratamiento Chile',
    'Patología Dual DBT-SUD',
    'Instituto DBT Chile',
    'WDBTA Chile'
  ],
  alternates: { canonical: 'https://institutodbt.cl/tratamiento' },
}

const pilares = [
  {
    icon: Brain,
    title: 'DBT Comprehensivo',
    text: 'Terapia Dialéctico-Conductual estándar (Linehan) en su forma completa: terapia individual semanal, entrenamiento grupal de habilidades, coaching telefónico y equipo de consulta. Adherencia estricta a los principios de la WDBTA.',
  },
  {
    icon: Layers,
    title: 'Schema Therapy Integrada',
    text: 'Trabajo profundo sobre Esquemas Maladaptativos Tempranos (EMT) y Modos Disfuncionales (Young, 2003). Combinación basada en evidencia con DBT para casos de mayor complejidad estructural.',
  },
  {
    icon: Cpu,
    title: 'Monitoreo LaKaira AI',
    text: 'Sistema clínico propio basado en el Principio de Energía Libre (Friston). Detecta tempranamente estados de alta impulsividad, predice crisis y ajusta dinámicamente las intervenciones preventivas entre sesiones.',
  },
  {
    icon: Shield,
    title: 'Equipo Acreditado',
    text: 'Dirección clínica con formación doctoral (Ph.D.(c)) y certificación WDBTA. Único equipo en Chile con esta combinación de credenciales internacionales sobre DBT y Schema Therapy.',
  },
]

const fases = [
  {
    n: '01',
    titulo: 'Evaluación clínica integral',
    descripcion: 'Entrevista diagnóstica estructurada, aplicación de IDP-4, BSL-23 y batería complementaria. Formulación clínica colaborativa y definición de objetivos jerarquizados.',
  },
  {
    n: '02',
    titulo: 'Pre-tratamiento y compromiso',
    descripcion: 'Sesiones de orientación, contrato terapéutico, análisis de motivación y prevención de abandono. Etapa crítica para la fidelidad al modelo DBT.',
  },
  {
    n: '03',
    titulo: 'Etapa 1 — Estabilización conductual',
    descripcion: 'Control de conductas suicidas, autolesivas, interferentes a la terapia y conductas de riesgo. Entrenamiento intensivo en habilidades DBT (Mindfulness, Tolerancia al Malestar, Regulación Emocional, Efectividad Interpersonal).',
  },
  {
    n: '04',
    titulo: 'Etapa 2 — Procesamiento emocional',
    descripcion: 'Trabajo sobre trauma, sufrimiento silencioso y experiencias invalidantes. Aquí se integra Schema Therapy para reestructuración de Modos y EMT.',
  },
  {
    n: '05',
    titulo: 'Etapa 3 — Vida con sentido',
    descripcion: 'Construcción de proyecto vital, profundización de relaciones, ajuste de objetivos personales y trayectoria de funcionamiento óptimo.',
  },
  {
    n: '06',
    titulo: 'Etapa 4 — Plenitud y libertad',
    descripcion: 'Trabajo final orientado a la conexión profunda, sentido espiritual/existencial y libertad respecto del sufrimiento (en línea con Linehan, 2014).',
  },
]

const poblaciones = [
  {
    titulo: 'Trastorno Límite de Personalidad (TLP)',
    href: '/tratamiento/tlp',
    descripcion: 'Tratamiento de primera línea con evidencia de mayor calidad. Reducción de conductas suicidas, autolesivas y hospitalizaciones bajo estándar WDBTA.',
  },
  {
    titulo: 'Patología Dual (TLP + TUS)',
    href: '/tratamientos/patologia-dual',
    descripcion: 'Protocolo DBT-SUD de Fidelidad Total. Único Centro de Alta Complejidad en Chile para comorbilidad TLP + Trastorno por Uso de Sustancias.',
  },
  {
    titulo: 'DBT Infanto-Juvenil (DBT-A)',
    href: '/tratamiento/dbt-infanto-juvenil',
    descripcion: 'Programa DBT para Adolescentes con Fidelidad Total al modelo Rathus & Miller. Integración mandatoria del sistema familiar a través del Camino del Medio.',
  },
]

export default function TratamientoPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 text-sm font-semibold text-primary uppercase tracking-wider">
              Programa Clínico
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Tratamiento <em className="font-serif italic text-primary">DBT</em> de Fidelidad Total
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Programa integrado de Terapia Dialéctico-Conductual y Schema Therapy con monitoreo clínico mediante <strong>LaKaira AI</strong>. Único centro en Chile con membresía institucional <strong>WDBTA</strong>, garantizando adherencia estricta a los estándares internacionales del modelo.
            </p>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Cuatro pilares</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Un modelo clínico <em className="font-serif italic text-primary">unificado</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {pilares.map((p, i) => (
                <Card key={i} className="border-gray-200 hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <p.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-light text-gray-900 mb-3">{p.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{p.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fases */}
      <section className="py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Trayectoria terapéutica</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Seis fases. <em className="font-serif italic text-primary">Una jerarquía clínica clara.</em>
              </h2>
            </div>
            <div className="space-y-6">
              {fases.map((f, i) => (
                <div key={i} className="flex gap-6 bg-white p-8 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                  <div className="text-4xl font-serif font-light text-primary/60 min-w-[60px]">{f.n}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.titulo}</h3>
                    <p className="text-gray-600 leading-relaxed">{f.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Poblaciones clínicas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Poblaciones que atendemos</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Complejidad clínica <em className="font-serif italic text-primary">de alta especialización</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {poblaciones.map((pob, i) => (
                <Card key={i} className="border-gray-200 hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{pob.titulo}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{pob.descripcion}</p>
                    <Link href={pob.href} className="text-primary font-semibold hover:underline flex items-center gap-2">
                      Conocer más <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            ¿Listo para comenzar tu <em className="font-serif italic text-primary">proceso clínico</em>?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Comienza con nuestra evaluación clínica IDP-4, validada para identificar perfiles de personalidad y orientar el plan terapéutico.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white px-8">
              <Link href="/evaluacion-idp4">Iniciar Evaluación IDP-4</Link>
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
