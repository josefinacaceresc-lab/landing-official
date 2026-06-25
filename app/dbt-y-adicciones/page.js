/**
 * Landing dedicada — DBT y Adicciones (Patología Dual / DBT-SUD)
 * ─────────────────────────────────────────────────────────────────────────
 * Propósito:
 *   1. SEO orgánico PRIORIDAD MÁXIMA — Google Ads bloquea estas keywords
 *      por política de salud, por lo que esta landing es la ÚNICA vía
 *      de captación digital para este perfil de consultante.
 *   2. Target keywords (Chile, español):
 *        · "DBT y adicciones"
 *        · "tratamiento DBT adicciones"
 *        · "DBT-SUD Chile"
 *        · "patología dual Chile"
 *        · "TLP y adicciones"
 *        · "adicciones y trastorno límite"
 *        · "DBT consumo de sustancias"
 *   3. Diferenciada de /tratamientos/patologia-dual (esa es ficha de
 *      programa; esta es educativa-SEO con E-E-A-T máximo).
 *
 * Lineamientos editoriales (CRÍTICO para Google Health Algorithm):
 *   - NO usar: "rehabilitación", "curación", "desintoxicación",
 *     "sobriedad", "cura", "recuperación garantizada".
 *   - SÍ usar: "tratamiento integrado", "comorbilidad", "reducción de daño",
 *     "estabilización clínica", "conductas de consumo".
 *   - "consultante" (nunca "paciente").
 *   - Sin emojis, registro formal europeo.
 *
 * Schema inyectado: MedicalWebPage + MedicalTherapy + Physician (×2) +
 *                   MedicalOrganization + FAQPage + BreadcrumbList
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowRight, Brain, Shield, Activity, Microscope, CheckCircle, BookOpen, Users, Layers } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/whatsapp'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`

// ── SEO metadata · alta densidad keyword Chile ──────────────────────────
export const metadata = {
  title: 'DBT y Adicciones · Patología Dual · Instituto DBT Chile',
  description: 'Tratamiento integrado DBT-SUD para consultantes con comorbilidad entre desregulación emocional y conductas de consumo de sustancias. Equipo clínico con más de cinco años en el Instituto Psiquiátrico Dr. José Horwitz Barak. Único centro en Chile con protocolo DBT-SUD íntegro.',
  keywords: [
    'DBT y adicciones',
    'DBT adicciones',
    'tratamiento DBT adicciones',
    'DBT-SUD Chile',
    'patología dual Chile',
    'TLP y adicciones',
    'trastorno límite y consumo',
    'adicciones y trastorno límite de personalidad',
    'DBT consumo de sustancias',
    'tratamiento integrado patología dual',
    'comorbilidad TLP adicciones',
    'Instituto DBT Chile adicciones',
  ],
  alternates: { canonical: 'https://institutodbtchile.cl/dbt-y-adicciones' },
  openGraph: {
    title: 'DBT y Adicciones · Patología Dual · Instituto DBT Chile',
    description: 'Tratamiento integrado DBT-SUD para comorbilidad TLP + uso de sustancias. Equipo formado en el Instituto Horwitz y certificado en DBT Iberoamérica.',
    url: 'https://institutodbtchile.cl/dbt-y-adicciones',
    type: 'article',
    locale: 'es_CL',
  },
}

// ── Contenido estructurado ──────────────────────────────────────────────

const ejesClinicos = [
  {
    icon: Layers,
    title: 'Abordaje simultáneo',
    text: 'Tratamos ambas condiciones a la vez —desregulación emocional y conductas de consumo— bajo un único equipo. La fragmentación entre el tratamiento psiquiátrico y el de adicciones es la causa principal de fracaso clínico.',
  },
  {
    icon: Shield,
    title: 'Modelo de reducción de daño',
    text: 'Cuando la abstinencia inmediata no es viable, trabajamos con estrategias de estabilización progresiva: jerarquía de objetivos según severidad clínica, reducción de conductas de mayor riesgo y construcción de habilidades sustitutivas.',
  },
  {
    icon: Brain,
    title: 'DBT-SUD íntegro',
    text: 'Protocolo Linehan-Dimeff completo: terapia individual, grupo de habilidades, coaching telefónico y equipo de consultoría, adaptado específicamente al consumo problemático y la comorbilidad estructural.',
  },
  {
    icon: Activity,
    title: 'Monitoreo clínico continuo',
    text: 'Sistema ApoFix AI para seguimiento de variables clínicas críticas entre sesiones: estados emocionales, urgencias de consumo, conductas autolesivas, calidad del sueño. Permite intervenir antes de que la crisis ocurra.',
  },
]

const protocolo = [
  {
    titulo: 'Terapia individual semanal',
    descripcion: 'Sesión con psicóloga o psiquiatra DBT-SUD certificado. Trabajo en jerarquía de objetivos: conductas de riesgo vital, conductas que interfieren con el tratamiento, conductas de consumo y, finalmente, calidad de vida.',
  },
  {
    titulo: 'Grupo de habilidades adaptado a SUD',
    descripcion: 'Entrenamiento grupal en los cuatro módulos DBT con módulos adicionales específicos: tolerancia al malestar aplicada al craving, regulación emocional vinculada al consumo, mindfulness sin sustancias.',
  },
  {
    titulo: 'Coaching telefónico en momentos críticos',
    descripcion: 'Acompañamiento entre sesiones cuando aparece urgencia de consumo o desregulación emocional intensa. Generalización de habilidades al contexto real, donde típicamente ocurre la conducta problemática.',
  },
  {
    titulo: 'Equipo de consultoría clínica',
    descripcion: 'Supervisión cruzada semanal del equipo terapéutico. Mantiene la fidelidad al modelo Linehan-Dimeff y evita los errores clásicos del tratamiento fragmentado entre lo psiquiátrico y lo adictivo.',
  },
]

const pasos = [
  {
    n: '01',
    titulo: 'Contacto clínico',
    text: 'Solicitas la valoración inicial. Nuestro equipo te contacta dentro de 24 horas hábiles. La conversación es confidencial y conducida por personal clínico, no comercial.',
  },
  {
    n: '02',
    titulo: 'Evaluación integrada',
    text: 'Sesión de evaluación con psiquiatra y psicóloga DBT-SUD. Historia clínica, escalas estandarizadas (MMPI-2, BSL-23, ASI), evaluación de riesgo y formulación dimensional de la comorbilidad.',
  },
  {
    n: '03',
    titulo: 'Plan terapéutico integrado',
    text: 'Diseño de plan individualizado con jerarquía de objetivos clínicos, modalidad (presencial, híbrida o telemática), frecuencia de sesiones y acompañamiento entre estas. Coordinación con otros tratantes cuando aplica.',
  },
]

const faqs = [
  {
    q: '¿Qué es exactamente DBT-SUD?',
    a: 'DBT-SUD (Dialectical Behavior Therapy for Substance Use Disorders) es la adaptación del modelo DBT original de Marsha Linehan al tratamiento integrado de personas con desregulación emocional severa y conductas problemáticas de consumo de sustancias. Fue desarrollado por Linehan y Dimeff a finales de los noventa y cuenta con más de dos décadas de evidencia empírica acumulada.',
  },
  {
    q: '¿Por qué no se trata por separado la parte psiquiátrica y la parte de consumo?',
    a: 'La literatura clínica internacional muestra de forma consistente que el tratamiento fragmentado de la comorbilidad —psiquiatría por un lado, dispositivos de adicciones por otro— produce resultados significativamente inferiores al tratamiento integrado. La sustancia frecuentemente funciona como un intento de regulación emocional fallido; tratarla aisladamente sin abordar la desregulación de base perpetúa el ciclo.',
  },
  {
    q: '¿Es necesario haber dejado el consumo para iniciar el tratamiento?',
    a: 'No. DBT-SUD opera bajo un modelo de reducción de daño y estabilización progresiva. Trabajamos desde donde el consultante está, jerarquizando los objetivos según severidad clínica. La estabilización del consumo es uno de los objetivos del tratamiento, no un requisito de ingreso.',
  },
  {
    q: '¿Qué tipo de sustancias y conductas aborda el protocolo?',
    a: 'El protocolo DBT-SUD ha sido investigado y aplicado en consultantes con consumo problemático de alcohol, opiáceos, cocaína, cannabis, estimulantes y otras sustancias, así como en conductas adictivas no relacionadas con sustancias. La indicación se evalúa caso a caso según la formulación clínica integral.',
  },
  {
    q: '¿Quién dirige el área de DBT y Adicciones del Instituto?',
    a: 'El área es co-dirigida por la Ps. Trahice Véliz y el Dr. Luis Acuña, ambos con más de cinco años a cargo del Sector Z del Instituto Psiquiátrico Dr. José Horwitz Barak —centro público de referencia nacional en salud mental— y con formación especializada en DBT-SUD en DBT Iberoamérica.',
  },
  {
    q: '¿Es reembolsable por Isapre?',
    a: 'Sí. Emitimos boleta de honorarios médica reembolsable parcialmente según el plan de salud privado de cada consultante. Nuestro equipo administrativo acompaña al consultante en la gestión documental del trámite.',
  },
  {
    q: '¿Cuánto dura el tratamiento DBT-SUD?',
    a: 'El programa estándar tiene una duración aproximada de doce a dieciocho meses, organizado en fases que cubren los cuatro módulos de habilidades adaptados al consumo. La duración real se ajusta a la severidad clínica, la comorbilidad estructural presente y los objetivos individuales acordados con el equipo tratante.',
  },
]

// ── JSON-LD Schema ──────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalWebPage',
      '@id': 'https://institutodbtchile.cl/dbt-y-adicciones#webpage',
      url: 'https://institutodbtchile.cl/dbt-y-adicciones',
      name: 'DBT y Adicciones · Patología Dual · Instituto DBT Chile',
      inLanguage: 'es-CL',
      isPartOf: { '@id': 'https://institutodbtchile.cl/#website' },
      about: { '@id': 'https://institutodbtchile.cl/dbt-y-adicciones#therapy' },
      breadcrumb: { '@id': 'https://institutodbtchile.cl/dbt-y-adicciones#breadcrumb' },
      audience: {
        '@type': 'PeopleAudience',
        healthCondition: {
          '@type': 'MedicalCondition',
          name: 'Patología dual (Trastorno por uso de sustancias con comorbilidad psiquiátrica)',
        },
      },
    },
    {
      '@type': 'MedicalTherapy',
      '@id': 'https://institutodbtchile.cl/dbt-y-adicciones#therapy',
      name: 'DBT-SUD · Terapia Dialéctico Conductual para Trastornos por Uso de Sustancias',
      alternateName: ['DBT-SUD', 'Dialectical Behavior Therapy for Substance Use Disorders', 'DBT y Adicciones', 'Tratamiento integrado de Patología Dual'],
      description: 'Adaptación clínica del modelo DBT al tratamiento integrado de personas con desregulación emocional severa y conductas problemáticas de consumo de sustancias, conforme al protocolo Linehan-Dimeff.',
      medicineSystem: 'Psicoterapia basada en evidencia',
      relevantSpecialty: ['Psiquiatría de adicciones', 'Psicología clínica', 'Patología dual'],
      study: {
        '@type': 'MedicalStudy',
        studyLocation: 'University of Washington',
        sponsor: 'Marsha M. Linehan, Ph.D., ABPP & Linda A. Dimeff, Ph.D.',
      },
    },
    {
      '@type': 'Physician',
      '@id': 'https://institutodbtchile.cl/dbt-y-adicciones#trahice-veliz',
      name: 'Trahice Véliz',
      honorificPrefix: 'Ps.',
      jobTitle: 'Co-Directora del área DBT y Adicciones · Instituto DBT Chile',
      description: 'Psicóloga clínica con más de cinco años a cargo del Sector Z del Instituto Psiquiátrico Dr. José Horwitz Barak, especializada en DBT-SUD por DBT Iberoamérica.',
      worksFor: { '@id': 'https://institutodbtchile.cl/#clinic' },
      affiliation: [
        { '@type': 'Organization', name: 'Instituto Psiquiátrico Dr. José Horwitz Barak · Sector Z' },
        { '@type': 'Organization', name: 'DBT Iberoamérica' },
      ],
    },
    {
      '@type': 'Physician',
      '@id': 'https://institutodbtchile.cl/dbt-y-adicciones#luis-acuna',
      name: 'Luis Acuña',
      honorificPrefix: 'Dr.',
      jobTitle: 'Co-Director del área DBT y Adicciones · Instituto DBT Chile',
      description: 'Médico especialista con más de cinco años a cargo del Sector Z del Instituto Psiquiátrico Dr. José Horwitz Barak, con formación en DBT-SUD por DBT Iberoamérica.',
      worksFor: { '@id': 'https://institutodbtchile.cl/#clinic' },
      affiliation: [
        { '@type': 'Organization', name: 'Instituto Psiquiátrico Dr. José Horwitz Barak · Sector Z' },
        { '@type': 'Organization', name: 'DBT Iberoamérica' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://institutodbtchile.cl/dbt-y-adicciones#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://institutodbtchile.cl/' },
        { '@type': 'ListItem', position: 2, name: 'DBT y Adicciones', item: 'https://institutodbtchile.cl/dbt-y-adicciones' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://institutodbtchile.cl/dbt-y-adicciones#faq',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

// ───────────────────────────────────────────────────────────────────────
export default function DBTAdiccionesPage() {
  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-primary/4 to-primary/12" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.18em]">
              Acreditación Internacional · WDBTA · APA · ISST
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-5 tracking-tight leading-[1.05]">
              <em className="font-serif italic text-primary">DBT</em> y Adicciones
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-4 font-light tracking-wide">
              Patología Dual · Tratamiento integrado DBT-SUD · Instituto DBT Chile
            </p>

            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Cuando la sustancia funciona como un intento desesperado de regular un dolor que el sistema nervioso no logra contener, el tratamiento tiene que abordar las dos cosas a la vez. Programa clínico integrado conforme al protocolo Linehan-Dimeff.
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-10 px-5 py-2.5 bg-emerald-50/70 border border-emerald-200/70 rounded-full text-xs md:text-sm">
              <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Reembolsable Isapre
              </span>
              <span className="text-emerald-300 hidden md:inline">·</span>
              <span className="text-emerald-800">Modalidad presencial y telemática</span>
              <span className="text-emerald-300 hidden md:inline">·</span>
              <span className="text-emerald-800">Boleta médica</span>
            </div>

            <div className="flex flex-col items-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-base font-medium tracking-wide shadow-lg hover:shadow-xl transition-all"
              >
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center gap-2">
                    Solicitar valoración inicial
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </Button>
              <p className="mt-3 text-xs text-gray-500 tracking-wide">
                Respuesta clínica en menos de 24 horas hábiles · Conversación confidencial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ¿Qué es DBT-SUD? ─────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Modelo clínico
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                Cuando hay <em className="font-serif italic text-primary">desregulación y consumo</em>
              </h2>
            </div>

            <div className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                La <strong>patología dual</strong> es la presencia simultánea de un trastorno mental severo —típicamente trastornos de la personalidad, depresión mayor recurrente, trastorno bipolar o estados disociativos— con un trastorno por uso de sustancias. No es una suma de dos diagnósticos: es una <em className="italic">estructura clínica distinta</em>, con su propia dinámica, su propia evidencia y su propio protocolo de tratamiento.
              </p>
              <p>
                <strong>DBT-SUD</strong> —Dialectical Behavior Therapy for Substance Use Disorders— fue desarrollada por <strong>Marsha Linehan y Linda Dimeff</strong> a finales de los años noventa como adaptación del modelo DBT original. La premisa clínica es nítida: en muchos consultantes la sustancia opera como un sistema de regulación emocional fallido. Tratar el consumo aisladamente sin intervenir sobre la desregulación de base perpetúa el ciclo.
              </p>
              <p>
                Más de <strong>dos décadas de literatura clínica</strong> han demostrado que el tratamiento integrado bajo protocolo DBT-SUD reduce significativamente las conductas de consumo problemático, las hospitalizaciones psiquiátricas, las conductas autolesivas y las recaídas, en consultantes con comorbilidad TLP + uso de sustancias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Equipo clínico — E-E-A-T MÁXIMO ──────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-emerald-700 uppercase tracking-[0.2em]">
                Dirección del área
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Equipo clínico <em className="font-serif italic text-emerald-700">especializado</em>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                El área de DBT y Adicciones del Instituto DBT Chile es co-dirigida por dos profesionales con experiencia clínica continuada en uno de los centros públicos de referencia nacional en salud mental.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Ps. Trahice Véliz */}
              <Card className="border border-gray-100 shadow-lg bg-white h-full">
                <CardContent className="p-8">
                  <div className="mb-4 text-xs font-semibold text-primary uppercase tracking-wider">Co-Directora</div>
                  <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-2">Ps. Trahice Véliz</h3>
                  <p className="text-sm font-medium text-gray-500 mb-5">Psicóloga clínica</p>

                  <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                    <div className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Más de cinco años a cargo del <strong>Sector Z</strong> del Instituto Psiquiátrico Dr. José Horwitz Barak.</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Formación especializada en <strong>DBT-SUD</strong> por <strong>DBT Iberoamérica</strong>.</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Experiencia clínica en patología dual y comorbilidad estructural compleja.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dr. Luis Acuña */}
              <Card className="border border-gray-100 shadow-lg bg-white h-full">
                <CardContent className="p-8">
                  <div className="mb-4 text-xs font-semibold text-primary uppercase tracking-wider">Co-Director</div>
                  <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-2">Dr. Luis Acuña</h3>
                  <p className="text-sm font-medium text-gray-500 mb-5">Médico especialista</p>

                  <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                    <div className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Más de cinco años a cargo del <strong>Sector Z</strong> del Instituto Psiquiátrico Dr. José Horwitz Barak.</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Formación especializada en <strong>DBT-SUD</strong> por <strong>DBT Iberoamérica</strong>.</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>Especializado en abordaje farmacológico de patología dual y comorbilidad psiquiátrica.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <p className="mt-10 text-center text-xs text-gray-500 max-w-3xl mx-auto leading-relaxed">
              El Sector Z del Instituto Psiquiátrico Dr. José Horwitz Barak es uno de los dispositivos clínicos públicos de mayor complejidad en Chile en el abordaje de comorbilidad psiquiátrica grave.
            </p>
          </div>
        </div>
      </section>

      {/* ── Ejes clínicos del modelo ─────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Núcleo del modelo
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Cuatro ejes del tratamiento <em className="font-serif italic text-primary">DBT-SUD</em>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Lo que distingue a un tratamiento serio de patología dual de un dispositivo convencional de adicciones.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ejesClinicos.map((e, i) => (
                <Card key={i} className="border border-gray-100 shadow-md hover:shadow-xl transition-shadow bg-white h-full">
                  <CardContent className="p-7">
                    <div className="w-12 h-12 mb-5 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                      <e.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{e.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{e.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Componentes del protocolo ────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Arquitectura clínica
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Protocolo <em className="font-serif italic text-primary">Linehan-Dimeff</em> íntegro
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Cuatro componentes simultáneos, cada uno con un rol clínico específico. Sin atajos, sin versiones reducidas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {protocolo.map((c, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-all">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{c.titulo}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{c.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tu primera consulta paso a paso ──────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                El primer contacto
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Tu primera consulta, <em className="font-serif italic text-primary">paso a paso</em>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Sabemos que iniciar el proceso es el momento de mayor incertidumbre. El flujo está diseñado para acompañar al consultante desde el primer contacto.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {pasos.map((p, i) => (
                <div key={i} className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                  <div className="text-4xl font-serif font-light text-primary/70 mb-3">{p.n}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{p.titulo}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Manifiesto institucional ─────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 border-y border-emerald-100/60">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 text-xs font-medium text-emerald-700 uppercase tracking-[0.2em]">
              Declaración institucional
            </div>
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif italic font-light text-gray-800 leading-snug">
              <span className="text-emerald-700">“</span>
              Por primera vez en la historia de la psicología clínica, unificamos la precisión conductual de DBT con la profundidad estructural de la Terapia de Esquemas. Un modelo transdiagnóstico único en el mundo, nacido en Chile para transformar la salud mental de toda la región.
              <span className="text-emerald-700">”</span>
            </blockquote>
            <div className="mt-8 text-sm text-gray-500 tracking-wide">
              — Instituto DBT Chile · Dirección clínica Dra.(c) Josefina Cáceres Cortés
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Preguntas frecuentes
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Preguntas <em className="font-serif italic text-primary">frecuentes</em> sobre DBT y Adicciones
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-gray-200 rounded-lg px-5 bg-white hover:border-primary/40 transition-colors"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium text-gray-900 hover:text-primary py-5 hover:no-underline">
                    <span className="faq-question">{f.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-[15px] leading-relaxed pb-5 pt-1">
                    <p className="faq-answer">{f.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-white to-primary/5 border-t border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-4 text-xs font-medium text-primary uppercase tracking-[0.2em]">
              Próximo paso
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-5 leading-tight">
              ¿Cómo te gustaría <em className="font-serif italic text-primary">iniciar</em> el proceso?
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Nuestro equipo clínico te acompañará desde la primera conversación. Respuesta personalizada en menos de 24 horas hábiles. Conversación confidencial.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-base font-medium tracking-wide shadow-lg hover:shadow-xl transition-all"
              >
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center gap-2">
                    Solicitar valoración inicial
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </Button>
              <Link
                href="/tratamientos/patologia-dual"
                className="text-sm text-gray-600 hover:text-primary border-b border-gray-300 hover:border-primary pb-0.5 transition-colors"
              >
                Ver ficha del programa clínico
              </Link>
            </div>

            <p className="mt-10 text-xs text-gray-500 tracking-wide max-w-xl mx-auto leading-relaxed">
              Esta página tiene fines educativos y no reemplaza una valoración clínica personalizada. Para una evaluación adaptada a la situación específica del consultante, contáctenos directamente.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
