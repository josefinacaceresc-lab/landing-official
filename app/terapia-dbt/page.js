/**
 * Landing dedicada — Terapia DBT
 * ─────────────────────────────────────────────────────────────────────────
 * Propósito:
 *   1. Aterrizaje de campañas Google Ads con keyword "terapia DBT"
 *   2. SEO orgánico para búsquedas relacionadas ("terapia DBT Chile",
 *      "terapia dialéctico conductual", "DBT Santiago", etc.)
 *   3. Featured Snippets + voice search via FAQPage schema
 *
 * Lineamientos editoriales (CRÍTICO):
 *   - "consultante" (nunca "paciente")
 *   - Sin emojis
 *   - Registro formal europeo
 *   - Sin promesas médicas
 *   - Manifiesto institucional integrado antes del CTA final
 *
 * Schema injected: MedicalWebPage + MedicalTherapy + FAQPage + BreadcrumbList
 */

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowRight, Brain, Heart, Layers, Shield, CheckCircle, BookOpen, Users, Phone, MessageSquare } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/whatsapp'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`

// ── SEO metadata ─────────────────────────────────────────────────────────
export const metadata = {
  title: 'Terapia DBT en Chile · Instituto DBT Chile · WDBTA',
  description: 'Terapia Dialéctico Conductual (DBT) de alta fidelidad en Chile. Único Instituto representante WDBTA. Reembolsable Isapre · Modalidad presencial y telemática · Boleta médica.',
  keywords: [
    'terapia DBT',
    'terapia DBT Chile',
    'terapia dialéctico conductual',
    'DBT Santiago',
    'DBT Chile',
    'tratamiento DBT',
    'Instituto DBT Chile',
    'terapia dialéctica conductual Chile',
  ],
  alternates: { canonical: 'https://institutodbtchile.cl/terapia-dbt' },
  openGraph: {
    title: 'Terapia DBT en Chile · Instituto DBT Chile',
    description: 'Terapia Dialéctico Conductual de alta fidelidad. Único Instituto representante WDBTA en Chile. Reembolsable Isapre.',
    url: 'https://institutodbtchile.cl/terapia-dbt',
    type: 'article',
    locale: 'es_CL',
  },
}

// ── Contenido estructurado ──────────────────────────────────────────────
const modulos = [
  {
    icon: Brain,
    title: 'Mindfulness',
    text: 'Capacidad nuclear para observar, describir y participar plenamente. Fundamento de la regulación del sistema emocional, presente en cada uno de los demás módulos.',
  },
  {
    icon: Shield,
    title: 'Tolerancia al malestar',
    text: 'Habilidades para atravesar crisis sin recurrir a conductas autodestructivas. Incluye aceptación radical, técnicas de supervivencia y sentido de propósito en momentos críticos.',
  },
  {
    icon: Heart,
    title: 'Regulación emocional',
    text: 'Comprensión, modulación y cambio de estados emocionales intensos. Núcleo del tratamiento DBT y eje de la transformación clínica sostenida.',
  },
  {
    icon: Layers,
    title: 'Efectividad interpersonal',
    text: 'Construcción de vínculos estables, asertividad, manejo de conflictos y respeto a la propia identidad relacional sin perder la autenticidad.',
  },
]

const componentes = [
  {
    titulo: 'Terapia individual',
    descripcion: 'Sesión semanal con psicóloga o psiquiatra DBT-certificada. Trabajo en jerarquía de objetivos terapéuticos según el protocolo Linehan.',
  },
  {
    titulo: 'Entrenamiento grupal en habilidades',
    descripcion: 'Grupo cerrado semanal donde se aprenden y practican los cuatro módulos. Espacio psicoeducativo con seguimiento clínico riguroso.',
  },
  {
    titulo: 'Coaching telefónico entre sesiones',
    descripcion: 'Acompañamiento en momentos de crisis y generalización de habilidades a la vida cotidiana, disponible según protocolo establecido.',
  },
  {
    titulo: 'Equipo de consultoría clínica',
    descripcion: 'Reunión semanal del equipo terapéutico para revisión de casos, supervisión cruzada y mantenimiento de la fidelidad al modelo.',
  },
]

const pasos = [
  {
    n: '01',
    titulo: 'Primera conversación',
    text: 'Solicitas tu valoración inicial. Nuestro equipo te contacta dentro de 24 horas hábiles para coordinar la primera entrevista.',
  },
  {
    n: '02',
    titulo: 'Evaluación de Ingreso',
    text: 'Sesión clínica completa con psiquiatra o psicóloga DBT-certificada. Aplicación de MMPI-2 y BSL-23, formulación diagnóstica y propuesta de tratamiento.',
  },
  {
    n: '03',
    titulo: 'Plan personalizado',
    text: 'Recibes un plan terapéutico individualizado con modalidad (presencial, híbrida o telemática), frecuencia y módulos prioritarios según tu situación clínica.',
  },
]

const faqs = [
  {
    q: '¿Qué es exactamente la Terapia DBT?',
    a: 'La Terapia Dialéctico Conductual (DBT) es un tratamiento psicoterapéutico basado en evidencia, desarrollado por la Dra. Marsha Linehan en la Universidad de Washington. Integra estrategias cognitivo-conductuales con prácticas de mindfulness y aceptación, organizado en cuatro módulos centrales: mindfulness, regulación emocional, tolerancia al malestar y efectividad interpersonal.',
  },
  {
    q: '¿Para qué condiciones está indicada la Terapia DBT?',
    a: 'La Terapia DBT cuenta con la mayor evidencia empírica acumulada para el Trastorno Límite de la Personalidad, conductas autolesivas, ideación suicida recurrente y desregulación emocional severa. Existe evidencia robusta también para trastornos de la conducta alimentaria, comorbilidad con uso de sustancias (DBT-SUD) y población adolescente (DBT-A).',
  },
  {
    q: '¿Cuánto dura el tratamiento DBT estándar?',
    a: 'El programa DBT estándar tiene una duración aproximada de doce meses, organizados en dos ciclos de seis meses que cubren los cuatro módulos de habilidades. La duración real se ajusta a la severidad clínica, comorbilidad presente y objetivos individuales acordados con el equipo tratante.',
  },
  {
    q: '¿La Terapia DBT es presencial u online?',
    a: 'Operamos bajo un modelo híbrido. Atendemos de forma presencial en nuestra sede clínica de Santiago de Chile y de forma telemática mediante plataforma segura conforme a estándares internacionales de confidencialidad clínica, lo que nos permite acompañar a consultantes en todo el territorio nacional y a residentes chilenos en el extranjero.',
  },
  {
    q: '¿La Terapia DBT es reembolsable por Isapre?',
    a: 'Sí. Emitimos boleta de honorarios médica reembolsable parcialmente según el plan de salud privado de cada consultante. Nuestro equipo administrativo acompaña al consultante en la gestión documental del trámite.',
  },
  {
    q: '¿Cuál es la diferencia entre DBT y una psicoterapia tradicional?',
    a: 'A diferencia de la psicoterapia individual convencional, DBT estándar es un programa estructurado que combina cuatro componentes simultáneos: terapia individual, entrenamiento grupal en habilidades, coaching telefónico entre sesiones y equipo de consultoría para terapeutas. Esta arquitectura multimodal está diseñada específicamente para personas con desregulación emocional severa.',
  },
]

// ── Schema JSON-LD ──────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalWebPage',
      '@id': 'https://institutodbtchile.cl/terapia-dbt#webpage',
      url: 'https://institutodbtchile.cl/terapia-dbt',
      name: 'Terapia DBT en Chile · Instituto DBT Chile',
      inLanguage: 'es-CL',
      isPartOf: { '@id': 'https://institutodbtchile.cl/#website' },
      about: { '@id': 'https://institutodbtchile.cl/terapia-dbt#therapy' },
      breadcrumb: { '@id': 'https://institutodbtchile.cl/terapia-dbt#breadcrumb' },
    },
    {
      '@type': 'MedicalTherapy',
      '@id': 'https://institutodbtchile.cl/terapia-dbt#therapy',
      name: 'Terapia Dialéctico Conductual (DBT)',
      alternateName: ['DBT', 'Dialectical Behavior Therapy', 'Terapia Dialéctica Conductual'],
      description: 'Tratamiento psicoterapéutico estructurado de alta fidelidad para desregulación emocional severa, Trastorno Límite de la Personalidad y condiciones afines, conforme al modelo de Marsha Linehan.',
      medicineSystem: 'Psicoterapia basada en evidencia',
      relevantSpecialty: ['Psiquiatría', 'Psicología clínica'],
      study: {
        '@type': 'MedicalStudy',
        studyLocation: 'University of Washington',
        sponsor: 'Marsha M. Linehan, Ph.D., ABPP',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://institutodbtchile.cl/terapia-dbt#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://institutodbtchile.cl/' },
        { '@type': 'ListItem', position: 2, name: 'Terapia DBT', item: 'https://institutodbtchile.cl/terapia-dbt' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://institutodbtchile.cl/terapia-dbt#faq',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

// ───────────────────────────────────────────────────────────────────────
export default function TerapiaDBTPage() {
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
              Terapia <em className="font-serif italic text-primary">DBT</em> en Chile
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-6 font-light tracking-wide">
              Terapia Dialéctico Conductual de alta fidelidad · Instituto DBT Chile
            </p>

            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Programa clínico estructurado para personas con desregulación emocional severa, basado en el modelo original de Marsha Linehan y conducido por equipo certificado bajo estándar WDBTA.
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
                Respuesta clínica en menos de 24 horas hábiles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ¿Qué es DBT? — Educational block ─────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Modelo clínico
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                ¿Qué es la <em className="font-serif italic text-primary">Terapia DBT</em>?
              </h2>
            </div>

            <div className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                La <strong>Terapia Dialéctico Conductual (DBT)</strong> es un tratamiento psicoterapéutico de tercera generación, desarrollado por la <strong>Dra. Marsha Linehan</strong> en la Universidad de Washington. Es el modelo con mayor evidencia empírica acumulada para el Trastorno Límite de la Personalidad y condiciones asociadas a desregulación emocional severa.
              </p>
              <p>
                DBT integra estrategias <em className="italic">cognitivo-conductuales</em> con prácticas de <em className="italic">mindfulness</em> y <em className="italic">aceptación</em>, organizadas en una arquitectura terapéutica multimodal. El consultante no recibe únicamente sesiones individuales: participa en un programa estructurado de doce meses que combina cuatro componentes simultáneos.
              </p>
              <p>
                Más de <strong>treinta ensayos clínicos aleatorizados</strong> han demostrado reducciones significativas en conductas suicidas, autolesiones no suicidas, hospitalizaciones psiquiátricas y mejoras consistentes en el funcionamiento global de los consultantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Los 4 módulos ────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/40">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Núcleo del tratamiento
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Los <em className="font-serif italic text-primary">cuatro módulos</em> de la Terapia DBT
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Cada módulo es una arquitectura clínica completa de habilidades aplicadas, diseñada para transformar capacidades de regulación específicas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {modulos.map((m, i) => (
                <Card key={i} className="border border-gray-100 shadow-md hover:shadow-xl transition-shadow bg-white h-full">
                  <CardContent className="p-7">
                    <div className="w-12 h-12 mb-5 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                      <m.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{m.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Componentes del programa ─────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Arquitectura clínica
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Componentes del <em className="font-serif italic text-primary">Programa DBT estándar</em>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Lo que distingue a DBT de una psicoterapia tradicional es su carácter multimodal. Cuatro componentes simultáneos, cada uno con un rol clínico específico.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {componentes.map((c, i) => (
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

      {/* ── Tu primera consulta — Proceso en 3 pasos ─────────────────── */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                El primer paso
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Tu primera consulta, <em className="font-serif italic text-primary">paso a paso</em>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Sabemos que el inicio del proceso suele ser el momento de mayor incertidumbre. Nuestro flujo está diseñado para acompañarle desde el primer contacto.
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

      {/* ── FAQ específica de Terapia DBT ────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Preguntas frecuentes
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Preguntas <em className="font-serif italic text-primary">frecuentes</em> sobre la Terapia DBT
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
              Nuestro equipo clínico te acompañará desde la primera conversación. Respuesta personalizada en menos de 24 horas hábiles.
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
