import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Activity, Shield, Cpu, AlertTriangle, TrendingDown, CheckCircle } from 'lucide-react'
import AgendarConsultaButton from '@/components/AgendarConsultaButton'

export const metadata = {
  title: 'Patología Dual (TLP + TUS): Desregulación con adicciones | DBT-SUD de Fidelidad Total',
  description: 'Centro de Alta Complejidad especializado en Patología Dual (TLP + TUS) — Desregulación con adicciones. Protocolo DBT-SUD de Fidelidad Total + monitoreo ApoFix AI. Único en Chile con certificación WDBTA.',
  keywords: [
    'Patología Dual Chile',
    'DBT-SUD de Fidelidad Total',
    'TLP y adicción',
    'Trastorno Límite de Personalidad y sustancias',
    'Centro Alta Complejidad Chile',
    'DBT-SUD Santiago',
    'Tratamiento dual diagnóstico',
    'ApoFix AI impulsividad'
  ],
  alternates: {
    canonical: 'https://institutodbtchile.cl/tratamientos/patologia-dual',
  },
  openGraph: {
    title: 'Patología Dual: DBT-SUD de Fidelidad Total | Instituto DBT Chile',
    description: 'Centro de Alta Complejidad en Patología Dual. Protocolo DBT-SUD + monitoreo ApoFix AI para TLP + Trastorno por Uso de Sustancias.',
    url: 'https://institutodbtchile.cl/tratamientos/patologia-dual',
    type: 'article',
    images: [{
      url: 'https://customer-assets.emergentagent.com/job_nextjs-dbt-cl/artifacts/2zcxnp4t_-logo_dbt-1.png',
      width: 1200,
      height: 630,
    }],
  },
}

const clinicalFramework = [
  {
    icon: Brain,
    title: 'Disregulación Emocional Compleja',
    description: 'La comorbilidad TLP-TUS representa una alteración profunda de los sistemas de regulación afectiva, con compromiso de circuitos prefrontales-límbicos y desbalance dopaminérgico que perpetúa tanto la inestabilidad emocional como el consumo compulsivo.'
  },
  {
    icon: Activity,
    title: 'DBT-SUD de Fidelidad Total',
    description: 'Adaptación protocolizada de DBT para patología dual, integrando módulos de abstinencia dialéctica, prevención de recaídas y tolerancia al craving. Único programa en Chile con adherencia estricta a estándares WDBTA.'
  },
  {
    icon: Cpu,
    title: 'Monitoreo ApoFix AI',
    description: 'Sistema de inteligencia artificial basado en Principio de Energía Libre (Friston) para detección temprana de estados de alta impulsividad, predicción de crisis y ajuste dinámico de intervenciones preventivas.'
  },
  {
    icon: Shield,
    title: 'Estabilización Multisistémica',
    description: 'Intervención simultánea sobre desregulación emocional, impulsividad conductual, craving y esquemas cognitivos disfuncionales. Protocolo de 18 meses con fases diferenciadas de estabilización, consolidación y prevención terciaria.'
  }
]

const dbtSudModules = [
  {
    module: 'Abstinencia Dialéctica',
    description: 'Síntesis entre compromiso absoluto con la abstinencia y aceptación radical de las recaídas como eventos del proceso. Manejo de ambivalencia motivacional sin ruptura terapéutica.',
    sessions: '8 sesiones'
  },
  {
    module: 'Tolerancia al Craving',
    description: 'Entrenamiento en observación no reactiva del impulso de consumo. Aplicación de mindfulness, autoconsuelo y STOP a estados de urgencia adictiva.',
    sessions: '6 sesiones'
  },
  {
    module: 'Mindfulness y Consumo Consciente',
    description: 'Desarrollo de conciencia plena aplicada al ciclo activación-craving-consumo. Identificación de cadenas conductuales y ventanas de intervención temprana.',
    sessions: '8 sesiones'
  },
  {
    module: 'Regulación Emocional en Abstinencia',
    description: 'Estrategias para modular estados afectivos sin recurrir a sustancias. Acción opuesta, exposición a emociones y construcción de vida con significado.',
    sessions: '10 sesiones'
  },
  {
    module: 'Prevención de Recaídas Basada en DBT',
    description: 'Análisis en cadena de episodios de consumo, identificación de vulnerabilidades y construcción de planes de contingencia personalizados.',
    sessions: '6 sesiones'
  }
]

const lakairaCapabilities = [
  {
    capability: 'Detección de Estados de Riesgo',
    description: 'Algoritmos de procesamiento de lenguaje natural (NLP) y análisis de patrones de autorregistro para identificar marcadores de inminencia de recaída.',
    icon: AlertTriangle
  },
  {
    capability: 'Predicción de Crisis de Impulsividad',
    description: 'Modelos predictivos basados en series temporales de variables emocionales, contextuales y fisiológicas (cuando disponibles) para anticipar ventanas de alto riesgo.',
    icon: TrendingDown
  },
  {
    capability: 'Recomendaciones Terapéuticas Dinámicas',
    description: 'Sugerencias de habilidades DBT específicas en tiempo real según el perfil de desregulación detectado. Intervención preventiva just-in-time.',
    icon: CheckCircle
  }
]

const evidenceBase = [
  {
    study: 'Linehan et al. (2002)',
    finding: 'DBT-SUD reduce días de consumo en 50% vs TAU en mujeres con TLP + dependencia de sustancias.',
    journal: 'Archives of General Psychiatry'
  },
  {
    study: 'Dimeff & Linehan (2008)',
    finding: 'Protocolo DBT-SUD muestra superioridad en retención terapéutica (76% vs 42%) y tasas de abstinencia continua a 12 meses.',
    journal: 'Addictive Behaviors'
  },
  {
    study: 'Bornovalova et al. (2019)',
    finding: 'Mecanismos de cambio en DBT-SUD: mejora en regulación emocional media la reducción de consumo.',
    journal: 'Journal of Consulting and Clinical Psychology'
  }
]

export default function PatologiaDualPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 text-center">
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 text-sm font-semibold uppercase tracking-wider rounded-full">
                Centro de Alta Complejidad
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 text-center tracking-tight">
              Patología <span className="font-serif font-semibold text-primary">Dual</span> <span className="font-light text-gray-700">(TLP + TUS)</span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 text-center">
              Desregulación con adicciones
            </h2>

            <p className="text-lg text-gray-600 mb-4 text-center max-w-3xl mx-auto italic">
              TLP + Trastorno por Uso de Sustancias
            </p>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-6 text-center max-w-4xl mx-auto">
              Protocolo especializado <strong className="text-emerald-700">DBT-SUD de Fidelidad Total</strong> para el tratamiento de la comorbilidad más desafiante en salud mental: Trastorno Límite de Personalidad con Trastorno por Uso de Sustancias.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-12 text-center max-w-3xl mx-auto">
              Único programa en Chile con <strong>certificación WDBTA</strong>, integración de <strong>monitoreo ApoFix AI</strong> y adherencia estricta a protocolos de fidelidad internacional.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <AgendarConsultaButton
                source="patologia-dual-hero"
                label="Solicitar Evaluación Especializada"
                message="¡Hola! 👋 Vi su página web y me gustaría recibir información sobre su Programa de Patología Dual (DBT-SUD). ¿Me podrían ayudar a agendar una hora? Gracias."
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
              />
              <Button size="lg" variant="outline" className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8">
                <Link href="#evidencia">
                  Ver Evidencia Científica
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              <div className="p-4 bg-white rounded-lg border border-emerald-100 shadow-sm">
                <div className="text-3xl font-serif font-light text-emerald-700 mb-1">18</div>
                <div className="text-sm text-gray-600">Meses de protocolo</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-emerald-100 shadow-sm">
                <div className="text-3xl font-serif font-light text-emerald-700 mb-1">76%</div>
                <div className="text-sm text-gray-600">Retención terapéutica</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-emerald-100 shadow-sm">
                <div className="text-3xl font-serif font-light text-emerald-700 mb-1">50%</div>
                <div className="text-sm text-gray-600">↓ Días de consumo</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-emerald-100 shadow-sm">
                <div className="text-3xl font-serif font-light text-emerald-700 mb-1">AI</div>
                <div className="text-sm text-gray-600">Monitoreo ApoFix AI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Framework */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block mb-4 text-sm font-semibold text-emerald-700 uppercase tracking-wider">Marco Clínico</span>
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                Modelo de <span className="font-serif font-semibold text-emerald-700">Estabilización Multisistémica</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Intervención especializada sobre la disregulación emocional compleja que caracteriza la patología dual
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {clinicalFramework.map((item, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-gradient-to-br from-white to-emerald-50">
                  <CardHeader>
                    <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-serif font-semibold text-gray-900">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DBT-SUD Modules */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block mb-4 text-sm font-semibold text-emerald-700 uppercase tracking-wider">Protocolo DBT-SUD</span>
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                Módulos de <span className="font-serif font-semibold text-emerald-700">Fidelidad Total</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Adaptación protocolizada de DBT para el tratamiento de la comorbilidad TLP-TUS
              </p>
            </div>

            <div className="space-y-4">
              {dbtSudModules.map((module, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-serif font-semibold text-gray-900">{module.module}</h3>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                        {module.sessions}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {module.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ApoFix AI Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-emerald-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <Cpu className="w-10 h-10 text-white" />
              </div>
              <span className="inline-block mb-4 text-sm font-semibold text-emerald-300 uppercase tracking-wider">NexariaLabs · IA Clínica</span>
              <h2 className="text-4xl font-light mb-4">
                Monitoreo <span className="font-serif font-semibold text-emerald-400">ApoFix AI</span>
              </h2>
              <p className="text-xl text-emerald-50 max-w-3xl mx-auto">
                Sistema de inteligencia artificial para detección temprana de estados de alta impulsividad y predicción de crisis en patología dual
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {lakairaCapabilities.map((item, index) => (
                <Card key={index} className="border-0 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-emerald-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">{item.capability}</h3>
                    <p className="text-emerald-100 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-serif font-semibold text-white mb-4">Fundamentos Teóricos</h3>
              <p className="text-emerald-100 leading-relaxed mb-4">
                ApoFix AI integra el <strong>Principio de Energía Libre</strong> (Friston, 2010) con modelos computacionales de regulación emocional y toma de decisiones bajo incertidumbre. El sistema construye modelos generativos del estado emocional del paciente, detecta desviaciones de la homeostasis predictiva y activa protocolos de intervención preventiva cuando el <em>prediction error</em> supera umbrales críticos.
              </p>
              <p className="text-emerald-100 leading-relaxed">
                En patología dual, ApoFix AI monitoriza específicamente: (1) marcadores de disregulación afectiva, (2) patrones lingüísticos asociados a craving, (3) fluctuaciones de impulsividad y (4) indicadores de ruptura de abstinencia. Primer sistema de este tipo aplicado a DBT-SUD en América Latina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Base */}
      <section id="evidencia" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block mb-4 text-sm font-semibold text-emerald-700 uppercase tracking-wider">Base Empírica</span>
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                Evidencia <span className="font-serif font-semibold text-emerald-700">Científica</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Estudios controlados que sustentan la eficacia de DBT-SUD en patología dual
              </p>
            </div>

            <div className="space-y-6">
              {evidenceBase.map((item, index) => (
                <Card key={index} className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-emerald-700 font-semibold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.study}</h3>
                        <p className="text-gray-700 mb-2 leading-relaxed">{item.finding}</p>
                        <p className="text-sm text-emerald-700 font-medium italic">{item.journal}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-8 bg-gradient-to-br from-amber-50 to-emerald-50 rounded-2xl border border-amber-200">
              <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">Metaanálisis Cochrane (2021)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                La revisión sistemática más reciente sobre intervenciones psicológicas en patología dual concluye que <strong>DBT y DBT-SUD muestran evidencia moderada-alta</strong> (Level A) para reducción de consumo, mejora de retención terapéutica y disminución de conductas autolesivas en población con TLP + TUS.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Recomendación NICE (National Institute for Health and Care Excellence):</strong> DBT es tratamiento de primera línea para TLP con comorbilidad adictiva cuando está disponible con fidelidad al protocolo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light text-gray-900 mb-4">
                Proceso de <span className="font-serif font-semibold text-emerald-700">Admisión</span>
              </h2>
              <p className="text-xl text-gray-600">
                Evaluación especializada de alta complejidad
              </p>
            </div>

            <div className="space-y-4 mb-12">
              {[
                { step: 1, title: 'Evaluación Diagnóstica', description: 'Entrevista clínica estructurada (SCID-5-PD), evaluación de severidad de consumo (AUDIT/DAST) y análisis de cadenas funcionales.' },
                { step: 2, title: 'Valoración de Riesgo', description: 'Protocolo de suicidabilidad, impulsividad conductual y predictores de dropout. Evaluación de red de apoyo y factores protectores.' },
                { step: 3, title: 'Diseño de Tratamiento', description: 'Plan individualizado DBT-SUD con objetivos jerarquizados: (1) Conductas amenazantes de vida, (2) Conductas interferentes con terapia, (3) Abstinencia sostenida, (4) Calidad de vida.' },
                { step: 4, title: 'Integración ApoFix AI', description: 'Onboarding al sistema de monitoreo, entrenamiento en autorregistro y calibración de algoritmos predictivos personalizados.' }
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-6 bg-white rounded-lg shadow-md border-l-4 border-emerald-600">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-700 mb-6">
                <strong>Requisitos de ingreso:</strong> Diagnóstico confirmado de TLP (DSM-5) + Trastorno por Uso de Sustancias (moderado-severo). Compromiso con protocolo de 18 meses. Disponibilidad para sesiones individuales semanales + grupo de habilidades + coaching telefónico.
              </p>
              <AgendarConsultaButton
                source="patologia-dual-admision"
                label="Solicitar Evaluación de Admisión"
                message="¡Hola! 👋 Me gustaría solicitar una evaluación de admisión para su Programa de Patología Dual (DBT-SUD). ¿Me podrían ayudar a coordinar una hora? Gracias."
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 text-lg font-semibold"
              />
              <p className="mt-4 text-sm text-gray-600">
                WhatsApp: +56 9 3055 0750 | Email: contacto@dbtchile.cl
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-6">
              Centro de Alta Complejidad con <span className="font-semibold">Certificación WDBTA</span>
            </h2>
            <p className="text-xl mb-8 text-emerald-50">
              Único programa en Chile con adherencia estricta a estándares internacionales de DBT-SUD y monitoreo asistido por inteligencia artificial
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 px-8">
                <Link href="/equipo">
                  Conocer Equipo Especializado
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8">
                <Link href="/investigacion">
                  Ver Investigación WDBTA
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
