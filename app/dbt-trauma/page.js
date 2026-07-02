/**
 * Landing dedicada — DBT-PTSD · Tratamiento del trauma complejo
 * ─────────────────────────────────────────────────────────────────────────
 * Propósito:
 *   1. SEO orgánico para "DBT-PTSD", "tratamiento trauma complejo",
 *      "DBT trauma Chile", "TEPT complejo Chile".
 *   2. Ads exact-match para campañas de trauma con CPC bajo.
 *   3. Posicionar al Instituto DBT Chile como único representante del
 *      modelo DBT-PTSD del Professor Dr. Martin Bohus (ZI Mannheim) en Chile,
 *      vehiculado por la Dra.(c) Josefina Cáceres Cortés a través de la
 *      relación institucional con la WDBTA.
 *
 * Lineamientos editoriales (CRÍTICO):
 *   - "consultante" (nunca "paciente")
 *   - Sin emojis
 *   - Registro formal europeo
 *   - Sin promesas terapéuticas absolutas ("cura", "elimina", etc.)
 *   - Manifiesto institucional sobre la transmisión directa Bohus → Cáceres
 *
 * Schema injected: MedicalWebPage + MedicalTherapy + Person + FAQPage +
 *                  BreadcrumbList
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowRight, Shield, Brain, Activity, Layers, CheckCircle, BookOpen, Award, GraduationCap } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/whatsapp'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`

// ── SEO metadata ─────────────────────────────────────────────────────────
export const metadata = {
  title: 'DBT-PTSD · Tratamiento del Trauma Complejo en Chile',
  description:
    'Único Instituto en Chile con el modelo DBT-PTSD del Professor Dr. Martin Bohus (ZI Mannheim). Implementación clínica conducida por la Dra.(c) Josefina Cáceres Cortés bajo estándar WDBTA. Tratamiento estructurado para trauma complejo, TEPT-c y comorbilidad con TLP.',
  keywords: [
    'DBT-PTSD',
    'DBT trauma',
    'tratamiento trauma complejo Chile',
    'TEPT complejo Chile',
    'terapia trauma complejo',
    'Martin Bohus Chile',
    'trauma y trastorno límite',
    'trauma infantil tratamiento',
    'CPTSD Chile',
    'Instituto DBT Chile trauma',
  ],
  alternates: { canonical: 'https://institutodbtchile.cl/dbt-trauma' },
  openGraph: {
    title: 'DBT-PTSD · Tratamiento del Trauma Complejo en Chile',
    description:
      'Único Instituto en Chile con el modelo DBT-PTSD del Professor Dr. Martin Bohus. Implementación local conducida por la Dra.(c) Josefina Cáceres Cortés bajo estándar WDBTA.',
    url: 'https://institutodbtchile.cl/dbt-trauma',
    type: 'article',
    locale: 'es_CL',
  },
}

// ── Contenido estructurado ──────────────────────────────────────────────
const fases = [
  {
    n: '01',
    titulo: 'Estabilización y construcción de habilidades',
    text: 'Trabajo previo en regulación emocional, tolerancia al malestar y conductas de seguridad. Esta fase es condición clínica indispensable antes de cualquier exposición al material traumático.',
  },
  {
    n: '02',
    titulo: 'Exposición específica al trauma',
    text: 'Aplicación del protocolo de exposición de Bohus, integrando estrategias de aceptación radical, descondicionamiento del miedo y reprocesamiento de creencias nucleares ligadas al trauma.',
  },
  {
    n: '03',
    titulo: 'Integración y vida posterior al trauma',
    text: 'Consolidación de la nueva identidad post-traumática, redefinición de vínculos, planes de vida y prevención de recaídas. Cierre clínico estructurado conforme al manual original.',
  },
]

const indicaciones = [
  {
    icon: Layers,
    titulo: 'TEPT complejo (CPTSD)',
    text: 'Trauma sostenido en la infancia o adolescencia, frecuentemente vinculado a negligencia, abuso emocional, físico o sexual, con desregulación afectiva crónica.',
  },
  {
    icon: Activity,
    titulo: 'Comorbilidad TLP + TEPT',
    text: 'Trastorno Límite de la Personalidad con antecedente traumático severo, donde DBT estándar requiere un módulo específico de exposición al trauma.',
  },
  {
    icon: Brain,
    titulo: 'Trauma con desregulación emocional',
    text: 'Sintomatología post-traumática acompañada de impulsividad, autolesiones, disociación severa o ideación suicida recurrente.',
  },
  {
    icon: Shield,
    titulo: 'Fallas en tratamientos previos',
    text: 'Consultantes con respuesta parcial o nula a EMDR, terapia de exposición prolongada o terapia cognitiva centrada en trauma, frecuentemente por inestabilidad clínica de base.',
  },
]

const diferenciadores = [
  {
    titulo: 'Protocolo de alta fidelidad',
    descripcion: 'Aplicación del manual original DBT-PTSD del Professor Dr. Martin Bohus, sin adaptaciones reduccionistas. Mismo estándar metodológico del Zentralinstitut für Seelische Gesundheit (ZI Mannheim, Alemania).',
  },
  {
    titulo: 'Transmisión directa Bohus → Cáceres',
    descripcion: 'La implementación clínica nacional fue desarrollada por la Dra.(c) Josefina Cáceres Cortés en relación institucional sostenida con el Professor Bohus a través de la World Dialectical Behavior Therapy Association (WDBTA).',
  },
  {
    titulo: 'Equipo de consultoría especializado',
    descripcion: 'Reunión semanal de supervisión cruzada entre terapeutas certificados, dedicada exclusivamente a casos de trauma complejo bajo protocolo DBT-PTSD.',
  },
  {
    titulo: 'Integración con Programa DBT estándar',
    descripcion: 'El módulo de trauma se articula con el programa DBT estándar de doce meses, permitiendo abordar simultáneamente la inestabilidad de base y la sintomatología post-traumática.',
  },
]

const faqs = [
  {
    q: '¿Qué es exactamente DBT-PTSD?',
    a: 'DBT-PTSD es un protocolo de tratamiento desarrollado por el Professor Dr. Martin Bohus en el Zentralinstitut für Seelische Gesundheit (ZI Mannheim, Alemania) para el abordaje del Trastorno por Estrés Postraumático complejo (TEPT-c) con comorbilidad frecuente al Trastorno Límite de la Personalidad. Combina los principios estructurales de DBT estándar con un módulo específico de exposición al trauma, en una secuencia clínicamente jerarquizada.',
  },
  {
    q: '¿En qué se diferencia DBT-PTSD de EMDR o de Terapia de Exposición Prolongada?',
    a: 'A diferencia de EMDR y de la Terapia de Exposición Prolongada, DBT-PTSD está diseñado específicamente para consultantes con desregulación emocional severa, autolesiones, ideación suicida o comorbilidad con Trastorno Límite de la Personalidad. Su valor diferencial es que exige una fase previa de construcción de habilidades antes de cualquier exposición, lo que reduce el riesgo de descompensación clínica frecuente en otras modalidades de tratamiento del trauma.',
  },
  {
    q: '¿Es el Instituto DBT Chile el único centro chileno con este modelo?',
    a: 'Sí. El Instituto DBT Chile es el único centro clínico en Chile que implementa el modelo DBT-PTSD original del Professor Dr. Martin Bohus, conforme al manual del ZI Mannheim. La implementación nacional fue desarrollada por la Dra.(c) Josefina Cáceres Cortés en el marco de su relación institucional con el Professor Bohus a través de la World Dialectical Behavior Therapy Association (WDBTA).',
  },
  {
    q: '¿Quién fue el Professor Dr. Martin Bohus?',
    a: 'El Professor Dr. Martin Bohus es Profesor Emérito de Psiquiatría y Psicoterapia de la Universidad de Heidelberg, fundador del Departamento de Psiquiatría y Psicoterapia Psicosomática del Zentralinstitut für Seelische Gesundheit (ZI Mannheim) y autor del manual DBT-PTSD. Es una de las máximas autoridades mundiales en tratamiento de trauma complejo y comorbilidad con Trastorno Límite de la Personalidad.',
  },
  {
    q: '¿Cuánto dura el tratamiento DBT-PTSD?',
    a: 'El tratamiento DBT-PTSD tiene una duración aproximada de doce a catorce meses, organizada en tres fases secuenciales: estabilización y construcción de habilidades, exposición específica al trauma e integración posterior. La duración real se ajusta a la severidad clínica, presencia de comorbilidades y objetivos individuales acordados con el equipo tratante.',
  },
  {
    q: '¿Qué evidencia respalda DBT-PTSD?',
    a: 'DBT-PTSD cuenta con múltiples ensayos clínicos aleatorizados conducidos por el equipo del ZI Mannheim, publicados en revistas como JAMA Psychiatry y Lancet Psychiatry, que demuestran reducciones significativas en sintomatología post-traumática, autolesiones y desregulación emocional en consultantes con TEPT-c, incluidos los casos con comorbilidad TLP donde otras terapias del trauma habían fallado.',
  },
  {
    q: '¿Es reembolsable por Isapre?',
    a: 'Sí. Emitimos boleta de honorarios médica reembolsable parcialmente según el plan de salud privado de cada consultante. Nuestro equipo administrativo acompaña al consultante en la gestión documental del trámite.',
  },
  {
    q: '¿Atienden de forma telemática?',
    a: 'Sí. Operamos un modelo híbrido. Atendemos de forma presencial en nuestra sede clínica de Santiago de Chile y de forma telemática mediante plataforma segura conforme a estándares internacionales de confidencialidad clínica, lo que nos permite acompañar a consultantes en todo el territorio nacional y a residentes chilenos en el extranjero.',
  },
]

// ── Schema JSON-LD ──────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalWebPage',
      '@id': 'https://institutodbtchile.cl/dbt-trauma#webpage',
      url: 'https://institutodbtchile.cl/dbt-trauma',
      name: 'DBT-PTSD · Tratamiento del Trauma Complejo en Chile · Instituto DBT Chile',
      inLanguage: 'es-CL',
      isPartOf: { '@id': 'https://institutodbtchile.cl/#website' },
      about: { '@id': 'https://institutodbtchile.cl/dbt-trauma#therapy' },
      breadcrumb: { '@id': 'https://institutodbtchile.cl/dbt-trauma#breadcrumb' },
    },
    {
      '@type': 'MedicalTherapy',
      '@id': 'https://institutodbtchile.cl/dbt-trauma#therapy',
      name: 'DBT-PTSD · Terapia Dialéctico Conductual para Trastorno por Estrés Postraumático Complejo',
      alternateName: ['DBT-PTSD', 'DBT for PTSD', 'DBT trauma', 'Tratamiento de Trauma Complejo'],
      description:
        'Protocolo de tratamiento estructurado del trauma complejo desarrollado por el Professor Dr. Martin Bohus en el Zentralinstitut für Seelische Gesundheit (ZI Mannheim, Alemania), específicamente indicado para Trastorno por Estrés Postraumático Complejo (TEPT-c) y comorbilidad con Trastorno Límite de la Personalidad.',
      medicineSystem: 'Psicoterapia basada en evidencia',
      relevantSpecialty: ['Psiquiatría', 'Psicología clínica', 'Psicotraumatología'],
      study: {
        '@type': 'MedicalStudy',
        studyLocation: 'Zentralinstitut für Seelische Gesundheit, ZI Mannheim · Universidad de Heidelberg',
        sponsor: 'Prof. Dr. med. Dr. phil. Martin Bohus',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://institutodbtchile.cl/dbt-trauma#bohus',
      name: 'Professor Dr. Martin Bohus',
      honorificPrefix: 'Prof. Dr. med. Dr. phil.',
      jobTitle: 'Profesor Emérito de Psiquiatría y Psicoterapia',
      affiliation: [
        { '@type': 'Organization', name: 'Universität Heidelberg' },
        { '@type': 'Organization', name: 'Zentralinstitut für Seelische Gesundheit (ZI Mannheim)' },
        { '@type': 'Organization', name: 'World Dialectical Behavior Therapy Association (WDBTA)' },
      ],
      knowsAbout: ['DBT-PTSD', 'Trauma complejo', 'Trastorno Límite de la Personalidad', 'Terapia Dialéctico Conductual'],
    },
    {
      '@type': 'Person',
      '@id': 'https://institutodbtchile.cl/dbt-trauma#caceres',
      name: 'Dra.(c) Josefina Cáceres Cortés',
      jobTitle: 'Directora clínica · Instituto DBT Chile',
      affiliation: [
        { '@type': 'Organization', name: 'Instituto DBT Chile' },
        { '@type': 'Organization', name: 'World Dialectical Behavior Therapy Association (WDBTA)' },
      ],
      knowsAbout: ['DBT estándar', 'DBT-PTSD', 'Terapia de Esquemas', 'Trastorno Límite de la Personalidad'],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://institutodbtchile.cl/dbt-trauma#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://institutodbtchile.cl/' },
        { '@type': 'ListItem', position: 2, name: 'DBT-PTSD · Tratamiento del Trauma', item: 'https://institutodbtchile.cl/dbt-trauma' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://institutodbtchile.cl/dbt-trauma#faq',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

// ───────────────────────────────────────────────────────────────────────
export default function DBTTraumaPage() {
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
              Único en Chile · Modelo Professor Dr. Martin Bohus · WDBTA
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-5 tracking-tight leading-[1.05]">
              <em className="font-serif italic text-primary">DBT-PTSD</em>
              <br className="hidden md:block" />
              <span className="text-3xl md:text-5xl lg:text-6xl text-gray-800">Tratamiento del Trauma Complejo</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-6 font-light tracking-wide">
              Modelo del Professor Dr. Martin Bohus · Zentralinstitut für Seelische Gesundheit, ZI Mannheim
            </p>

            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Implementación clínica nacional desarrollada por la Dra.(c) Josefina Cáceres Cortés, en relación institucional sostenida con el Professor Bohus a través de la <strong>World Dialectical Behavior Therapy Association (WDBTA)</strong>. Único Instituto en Chile con el modelo original DBT-PTSD de alta fidelidad.
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-10 px-5 py-2.5 bg-emerald-50/70 border border-emerald-200/70 rounded-full text-xs md:text-sm">
              <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Protocolo Bohus original
              </span>
              <span className="text-emerald-300 hidden md:inline">·</span>
              <span className="text-emerald-800">TEPT complejo · TLP comórbido</span>
              <span className="text-emerald-300 hidden md:inline">·</span>
              <span className="text-emerald-800">Reembolsable Isapre</span>
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
                Respuesta clínica en menos de 24 horas hábiles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ¿Qué es DBT-PTSD? ─────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Modelo clínico
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                ¿Qué es <em className="font-serif italic text-primary">DBT-PTSD</em>?
              </h2>
            </div>

            <div className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                <strong>DBT-PTSD</strong> es un protocolo de tratamiento del trauma complejo desarrollado por el <strong>Prof. Dr. med. Dr. phil. Martin Bohus</strong> en el <em className="italic">Zentralinstitut für Seelische Gesundheit (ZI Mannheim, Alemania)</em>, una de las instituciones de salud mental más prestigiosas de Europa, perteneciente a la Universidad de Heidelberg.
              </p>
              <p>
                A diferencia de las terapias tradicionales del trauma, DBT-PTSD fue diseñado específicamente para consultantes con <strong>desregulación emocional severa</strong>, comorbilidad con Trastorno Límite de la Personalidad, autolesiones, ideación suicida o disociación severa, en quienes la exposición directa al material traumático sin estabilización previa supone un riesgo clínico inaceptable.
              </p>
              <p>
                El protocolo articula tres fases secuenciales: una <em className="italic">fase de estabilización y construcción de habilidades</em>, una <em className="italic">fase de exposición específica al trauma</em> y una <em className="italic">fase de integración y vida posterior al trauma</em>. Cada transición está clínicamente jerarquizada y exige criterios objetivos de estabilidad para avanzar.
              </p>
              <p>
                Múltiples ensayos clínicos aleatorizados publicados en revistas como <em className="italic">JAMA Psychiatry</em> y <em className="italic">Lancet Psychiatry</em> han demostrado reducciones significativas en sintomatología post-traumática, conductas autolesivas y desregulación emocional, incluso en casos donde otras terapias del trauma habían fallado previamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Transmisión Bohus → Cáceres (Manifiesto E-E-A-T) ──────────── */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 border-y border-emerald-100/60">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-emerald-700 uppercase tracking-[0.2em]">
                Transmisión clínica directa
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                De <em className="font-serif italic text-primary">Mannheim</em> a <em className="font-serif italic text-primary">Santiago</em>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                La implementación del modelo DBT-PTSD en Chile no es una adaptación derivada: es transmisión clínica directa entre el autor del manual original y su implementación nacional, sostenida por una relación institucional formal a través de la WDBTA.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Bohus card */}
              <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-emerald-700" strokeWidth={1.5} />
                  </div>
                  <div className="text-xs font-medium text-emerald-700 uppercase tracking-[0.18em]">
                    Autor del modelo
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Professor Dr. Martin Bohus</h3>
                <p className="text-sm text-gray-500 mb-4 italic">Doctor en Medicina · Universidad de Heidelberg</p>
                <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                  <li className="flex gap-2"><span className="text-emerald-700 font-medium">·</span> Profesor Emérito de Psiquiatría y Psicoterapia, Universidad de Heidelberg.</li>
                  <li className="flex gap-2"><span className="text-emerald-700 font-medium">·</span> Fundador del Departamento de Psiquiatría y Psicoterapia Psicosomática del ZI Mannheim.</li>
                  <li className="flex gap-2"><span className="text-emerald-700 font-medium">·</span> Autor del manual DBT-PTSD y referente mundial en trauma complejo y TLP.</li>
                  <li className="flex gap-2"><span className="text-emerald-700 font-medium">·</span> Miembro fundador y figura central de la World Dialectical Behavior Therapy Association (WDBTA).</li>
                </ul>
              </div>

              {/* Cáceres card */}
              <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-emerald-700" strokeWidth={1.5} />
                  </div>
                  <div className="text-xs font-medium text-emerald-700 uppercase tracking-[0.18em]">
                    Implementación nacional
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Dra.(c) Josefina Cáceres Cortés</h3>
                <p className="text-sm text-gray-500 mb-4 italic">Directora clínica · Instituto DBT Chile</p>
                <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                  <li className="flex gap-2"><span className="text-emerald-700 font-medium">·</span> Desarrolladora de la implementación clínica del modelo DBT-PTSD en Chile.</li>
                  <li className="flex gap-2"><span className="text-emerald-700 font-medium">·</span> Relación institucional sostenida con el Professor Bohus a través de la WDBTA.</li>
                  <li className="flex gap-2"><span className="text-emerald-700 font-medium">·</span> Formación en DBT estándar, DBT-PTSD y Terapia de Esquemas bajo estándares internacionales.</li>
                  <li className="flex gap-2"><span className="text-emerald-700 font-medium">·</span> Responsable del único programa DBT-PTSD de alta fidelidad activo en territorio chileno.</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 max-w-3xl mx-auto text-center">
              <blockquote className="text-lg md:text-xl font-serif italic font-light text-gray-700 leading-snug">
                <span className="text-emerald-700">“</span>
                La fidelidad al modelo no es un detalle técnico, es la diferencia entre tratar el trauma y replicar su daño. Implementar DBT-PTSD significa sostener la misma exigencia clínica que en Mannheim, aquí en Chile.
                <span className="text-emerald-700">”</span>
              </blockquote>
              <div className="mt-5 text-sm text-gray-500 tracking-wide">
                — Dra.(c) Josefina Cáceres Cortés · Directora clínica
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Indicaciones clínicas ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Indicaciones clínicas
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                ¿Para quién está <em className="font-serif italic text-primary">indicado</em> DBT-PTSD?
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                DBT-PTSD está específicamente diseñado para consultantes con trauma complejo y desregulación emocional severa, donde otros tratamientos del trauma resultan insuficientes o clínicamente riesgosos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {indicaciones.map((m, i) => (
                <Card key={i} className="border border-gray-100 shadow-md hover:shadow-xl transition-shadow bg-white h-full">
                  <CardContent className="p-7">
                    <div className="w-12 h-12 mb-5 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                      <m.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{m.titulo}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Las 3 fases del tratamiento ──────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Arquitectura del tratamiento
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Las <em className="font-serif italic text-primary">tres fases</em> del protocolo Bohus
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                La secuencia clínica es no negociable. Cada fase tiene criterios objetivos de avance, conforme al manual original del ZI Mannheim.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {fases.map((p, i) => (
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

      {/* ── Diferenciadores institucionales ──────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Diferenciadores clínicos
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Por qué nuestro <em className="font-serif italic text-primary">DBT-PTSD</em> es distinto
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {diferenciadores.map((c, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-xl border border-gray-100 bg-gray-50/40 hover:bg-white hover:shadow-md transition-all">
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

      {/* ── Bibliografía / Referencias científicas ───────────────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50/50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Evidencia científica
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Referencias <em className="font-serif italic text-primary">científicas</em> seleccionadas
              </h2>
            </div>

            <ul className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
              <li className="flex gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <BookOpen className="w-4 h-4 mt-1 shrink-0 text-primary" />
                <span>
                  Bohus, M., Kleindienst, N., Hahn, C., et al. (2020). <em className="italic">Dialectical Behavior Therapy for Posttraumatic Stress Disorder (DBT-PTSD) compared with Cognitive Processing Therapy (CPT) in complex PTSD related to childhood abuse: A randomized clinical trial</em>. JAMA Psychiatry, 77(12), 1235–1245.
                </span>
              </li>
              <li className="flex gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <BookOpen className="w-4 h-4 mt-1 shrink-0 text-primary" />
                <span>
                  Bohus, M., Dyer, A. S., Priebe, K., et al. (2013). <em className="italic">Dialectical behaviour therapy for post-traumatic stress disorder after childhood sexual abuse in patients with and without borderline personality disorder: A randomised controlled trial</em>. Psychotherapy and Psychosomatics, 82(4), 221–233.
                </span>
              </li>
              <li className="flex gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <BookOpen className="w-4 h-4 mt-1 shrink-0 text-primary" />
                <span>
                  Steil, R., Dyer, A., Priebe, K., Kleindienst, N., &amp; Bohus, M. (2011). <em className="italic">Dialectical behavior therapy for posttraumatic stress disorder related to childhood sexual abuse: A pilot study of an intensive residential treatment program</em>. Journal of Traumatic Stress, 24(1), 102–106.
                </span>
              </li>
              <li className="flex gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <BookOpen className="w-4 h-4 mt-1 shrink-0 text-primary" />
                <span>
                  Bohus, M., &amp; Wolf-Arehult, M. (2013). <em className="italic">Interaktives SkillsTraining für Borderline-Patienten</em>. Schattauer Verlag, Stuttgart.
                </span>
              </li>
              <li className="flex gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <BookOpen className="w-4 h-4 mt-1 shrink-0 text-primary" />
                <span>
                  World Dialectical Behavior Therapy Association (WDBTA). <em className="italic">International standards for DBT-PTSD certified clinical programs</em>. WDBTA Institutional Documents.
                </span>
              </li>
            </ul>
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
                Preguntas <em className="font-serif italic text-primary">frecuentes</em> sobre DBT-PTSD
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
              El acceso al programa DBT-PTSD requiere una valoración clínica de ingreso conducida por nuestro equipo. Respuesta personalizada en menos de 24 horas hábiles.
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
                href="/equipo"
                className="text-sm text-gray-600 hover:text-primary border-b border-gray-300 hover:border-primary pb-0.5 transition-colors"
              >
                Conocer el equipo clínico
              </Link>
            </div>

            <p className="mt-10 text-xs text-gray-500 tracking-wide max-w-xl mx-auto leading-relaxed">
              Esta página tiene fines educativos y no reemplaza una valoración clínica personalizada. Para una evaluación adaptada a tu situación específica, contáctenos directamente.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
