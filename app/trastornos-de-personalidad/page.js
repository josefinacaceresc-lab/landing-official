/**
 * Landing dedicada — Trastornos de Personalidad
 * ─────────────────────────────────────────────────────────────────────────
 * Propósito:
 *   1. Ads exact-match para keyword "trastornos de personalidad" (alta
 *      intención, alto CPC) — subir Quality Score bajar CPC.
 *   2. SEO orgánico para long-tail: "trastorno límite personalidad Chile",
 *      "TLP tratamiento Santiago", "diagnóstico trastorno personalidad".
 *   3. E-E-A-T institucional: DBT + Schema Therapy integrado, único en Chile.
 *
 * Lineamientos editoriales (CRÍTICO):
 *   - "consultante" (nunca "paciente")
 *   - Sin emojis
 *   - Registro formal europeo
 *   - Sin promesas absolutas ("cura", "elimina", "supera para siempre")
 *   - Nomenclatura DSM-5-TR + CIE-11 (dimensional + categorial)
 *   - Foco en evaluación IDP-4 propia como diferenciador
 *
 * Schema injected: MedicalWebPage + MedicalCondition + MedicalTherapy +
 *                  FAQPage + BreadcrumbList
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowRight, Layers, Shield, Brain, Activity, CheckCircle, ClipboardCheck, BookOpen, Microscope } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/whatsapp'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`

// ── SEO metadata ─────────────────────────────────────────────────────────
export const metadata = {
  title: 'Trastornos de Personalidad · Diagnóstico y Tratamiento en Chile',
  description:
    'Diagnóstico dimensional y tratamiento integrado para Trastornos de Personalidad en Chile. TLP, evitativo, narcisista, obsesivo y otros. Modelo DBT + Terapia de Esquemas. Evaluación IDP-4 propia. Reembolsable Isapre.',
  keywords: [
    'trastornos de personalidad',
    'trastorno límite de personalidad',
    'TLP',
    'tratamiento trastorno personalidad Chile',
    'diagnóstico trastorno personalidad',
    'personalidad límite Chile',
    'trastorno personalidad Santiago',
    'DBT trastorno personalidad',
    'terapia de esquemas Chile',
    'Instituto DBT Chile',
    'IDP-4',
  ],
  alternates: { canonical: 'https://institutodbtchile.cl/trastornos-de-personalidad' },
  openGraph: {
    title: 'Trastornos de Personalidad · Diagnóstico y Tratamiento · Instituto DBT Chile',
    description:
      'Diagnóstico dimensional y tratamiento integrado para Trastornos de Personalidad en Chile. Modelo DBT + Terapia de Esquemas. Único Instituto WDBTA + ISST en Chile.',
    url: 'https://institutodbtchile.cl/trastornos-de-personalidad',
    type: 'article',
    locale: 'es_CL',
  },
}

// ── Contenido estructurado ──────────────────────────────────────────────
const tipos = [
  {
    icon: Activity,
    titulo: 'Trastorno Límite de la Personalidad',
    codigo: 'TLP · Cluster B',
    text: 'Inestabilidad emocional intensa, impulsividad, temor al abandono, autolesiones y patrón de relaciones caóticas. Es el trastorno de personalidad con mayor evidencia empírica de respuesta a DBT.',
  },
  {
    icon: Shield,
    titulo: 'Trastorno Evitativo de la Personalidad',
    codigo: 'Cluster C',
    text: 'Inhibición social sostenida, hipersensibilidad al rechazo, sentimientos crónicos de inadecuación y evitación de vínculos íntimos por temor a la crítica. Alta comorbilidad con ansiedad social.',
  },
  {
    icon: Brain,
    titulo: 'Trastorno Obsesivo-Compulsivo de la Personalidad',
    codigo: 'TOCP · Cluster C',
    text: 'Perfeccionismo rígido, sobrecontrol emocional, dificultad para delegar y necesidad de orden que interfiere con el funcionamiento cotidiano. Distinto del TOC clásico.',
  },
  {
    icon: Layers,
    titulo: 'Trastorno Narcisista de la Personalidad',
    codigo: 'Cluster B',
    text: 'Alteración en la regulación de la autoestima, vulnerabilidad narcisista, fluctuación entre grandiosidad y colapso, dificultad para tolerar la crítica. Frecuentemente comórbido con depresión.',
  },
  {
    icon: Brain,
    titulo: 'Trastorno Esquizoide y Esquizotípico',
    codigo: 'Cluster A',
    text: 'Distanciamiento de los vínculos sociales, restricción afectiva o pensamiento excéntrico persistente. Requieren evaluación diferencial cuidadosa respecto del espectro esquizofreniforme.',
  },
  {
    icon: Layers,
    titulo: 'Trastornos de Personalidad no especificados',
    codigo: 'Mixtos · Rasgos disfuncionales',
    text: 'Combinaciones dimensionales que no encajan en una categoría única del DSM-5-TR pero causan malestar clínico significativo. Frecuentes en la práctica real y requieren formulación individualizada.',
  },
]

const fasesModelo = [
  {
    n: '01',
    titulo: 'Evaluación diagnóstica estructurada',
    text: 'Entrevista clínica en profundidad + Inventario de Trastornos de Personalidad IDP-4 (herramienta propia del Instituto) + instrumentos complementarios (MMPI-2, BSL-23, escalas de esquemas de Young).',
  },
  {
    n: '02',
    titulo: 'Formulación clínica integradora',
    text: 'Comprensión dimensional del funcionamiento de personalidad conforme al Modelo Alternativo del DSM-5-TR y CIE-11: dominios de rasgos + nivel de funcionamiento + estilos de vinculación.',
  },
  {
    n: '03',
    titulo: 'Programa terapéutico DBT + Schema Therapy',
    text: 'Aplicación del protocolo integrado exclusivo del Instituto DBT Chile: DBT estándar para desregulación aguda + Terapia de Esquemas para reestructuración de patrones nucleares. Doce a veinticuatro meses.',
  },
]

const diferenciadores = [
  {
    titulo: 'Modelo integrado DBT + Schema Therapy',
    descripcion: 'Único centro en Chile que integra formalmente el protocolo DBT estándar (WDBTA) con Terapia de Esquemas (certificación ISST). Diseñado para consultantes donde la conducta y los esquemas nucleares deben abordarse simultáneamente.',
  },
  {
    titulo: 'Instrumento diagnóstico IDP-4 propio',
    descripcion: 'Evaluación estructurada del Instituto DBT Chile para trastornos de personalidad, calibrada al perfil clínico chileno. Permite formulación diagnóstica más precisa que las escalas anglosajonas de screening general.',
  },
  {
    titulo: 'Diagnóstico dimensional, no reduccionista',
    descripcion: 'Trabajamos con el Modelo Alternativo del DSM-5-TR y con la clasificación dimensional del CIE-11. Esto significa evaluar rasgos, nivel de funcionamiento y estilos de apego, no encasillar en una etiqueta única.',
  },
  {
    titulo: 'Direccción clínica especializada',
    descripcion: 'Programa dirigido por la Dra.(c) Josefina Cáceres Cortés, con formación en DBT estándar, DBT-PTSD, Terapia de Esquemas y relación institucional sostenida con la WDBTA y con figuras internacionales como el Professor Dr. Martin Bohus.',
  },
]

const faqs = [
  {
    q: '¿Qué son exactamente los Trastornos de Personalidad?',
    a: 'Los Trastornos de Personalidad son patrones estables de experiencia interna y comportamiento que se desvían significativamente de las expectativas culturales, causan malestar clínico o deterioro funcional y son inflexibles en el tiempo. El DSM-5-TR reconoce diez categorías clásicas organizadas en tres clusters (A, B y C), y adicionalmente propone un Modelo Alternativo dimensional basado en dominios de rasgos y nivel de funcionamiento de la personalidad.',
  },
  {
    q: '¿Cuál es el Trastorno de Personalidad más frecuente?',
    a: 'En consulta clínica especializada, el Trastorno Límite de la Personalidad (TLP) es el más frecuentemente diagnosticado y también el que cuenta con la mayor evidencia empírica de respuesta a tratamiento estructurado (DBT). Sin embargo, en la práctica real predominan los cuadros con rasgos mixtos o Trastornos de Personalidad no especificados, que requieren formulación individualizada.',
  },
  {
    q: '¿Los Trastornos de Personalidad tienen tratamiento?',
    a: 'Sí. Contrario a la creencia obsoleta de que la personalidad es inmodificable, la evidencia acumulada de las últimas tres décadas demuestra que los Trastornos de Personalidad responden a psicoterapias estructuradas basadas en evidencia, particularmente DBT, Terapia de Esquemas, MBT (mentalización) y TFP (focalizada en la transferencia). El Instituto DBT Chile trabaja con un modelo integrado DBT + Terapia de Esquemas.',
  },
  {
    q: '¿Cómo se diagnostica un Trastorno de Personalidad?',
    a: 'El diagnóstico requiere una entrevista clínica estructurada, aplicación de instrumentos psicométricos validados (IDP-4 propio del Instituto, MMPI-2, escalas de esquemas de Young) y una formulación clínica integradora conforme al DSM-5-TR y CIE-11. Un diagnóstico serio no se hace en una única sesión: exige valoración clínica sostenida por parte de un profesional especializado.',
  },
  {
    q: '¿Cuál es la diferencia entre DBT y Terapia de Esquemas?',
    a: 'DBT (Terapia Dialéctico Conductual) está enfocada en la desregulación emocional y la construcción de habilidades conductuales inmediatas: mindfulness, tolerancia al malestar, regulación emocional y efectividad interpersonal. Terapia de Esquemas trabaja los patrones nucleares subyacentes (esquemas maladaptativos tempranos) que originan la vulnerabilidad. En el Instituto DBT Chile los integramos formalmente en un único programa terapéutico.',
  },
  {
    q: '¿Cuánto dura el tratamiento?',
    a: 'El programa integrado DBT + Terapia de Esquemas tiene una duración aproximada de doce a veinticuatro meses según severidad clínica y objetivos individuales. Los primeros seis a doce meses se enfocan en desregulación aguda y construcción de habilidades. Los meses siguientes profundizan en la reestructuración de esquemas nucleares y consolidación de una identidad relacional estable.',
  },
  {
    q: '¿Qué es el instrumento IDP-4?',
    a: 'El IDP-4 (Inventario de Trastornos de Personalidad, cuarta versión) es un instrumento diagnóstico propio del Instituto DBT Chile, diseñado y calibrado para el perfil clínico chileno. Permite una evaluación estructurada de los rasgos y dominios de personalidad, complementaria a los instrumentos internacionales clásicos, con mayor sensibilidad al contexto sociocultural local.',
  },
  {
    q: '¿El tratamiento es reembolsable por Isapre?',
    a: 'Sí. Emitimos boleta de honorarios médica reembolsable parcialmente según el plan de salud privado de cada consultante. Nuestro equipo administrativo acompaña al consultante en la gestión documental del trámite.',
  },
]

// ── Schema JSON-LD ──────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalWebPage',
      '@id': 'https://institutodbtchile.cl/trastornos-de-personalidad#webpage',
      url: 'https://institutodbtchile.cl/trastornos-de-personalidad',
      name: 'Trastornos de Personalidad · Diagnóstico y Tratamiento · Instituto DBT Chile',
      inLanguage: 'es-CL',
      isPartOf: { '@id': 'https://institutodbtchile.cl/#website' },
      about: { '@id': 'https://institutodbtchile.cl/trastornos-de-personalidad#condition' },
      breadcrumb: { '@id': 'https://institutodbtchile.cl/trastornos-de-personalidad#breadcrumb' },
    },
    {
      '@type': 'MedicalCondition',
      '@id': 'https://institutodbtchile.cl/trastornos-de-personalidad#condition',
      name: 'Trastornos de Personalidad',
      alternateName: ['Personality Disorders', 'Trastorno Límite de Personalidad', 'TLP', 'BPD'],
      code: {
        '@type': 'MedicalCode',
        codingSystem: 'ICD-11',
        codeValue: '6D10',
      },
      possibleTreatment: [
        { '@type': 'MedicalTherapy', name: 'Terapia Dialéctico Conductual (DBT)' },
        { '@type': 'MedicalTherapy', name: 'Terapia de Esquemas (Schema Therapy)' },
        { '@type': 'MedicalTherapy', name: 'Modelo integrado DBT + Schema Therapy (Instituto DBT Chile)' },
      ],
      relevantSpecialty: ['Psiquiatría', 'Psicología clínica'],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://institutodbtchile.cl/trastornos-de-personalidad#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://institutodbtchile.cl/' },
        { '@type': 'ListItem', position: 2, name: 'Trastornos de Personalidad', item: 'https://institutodbtchile.cl/trastornos-de-personalidad' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://institutodbtchile.cl/trastornos-de-personalidad#faq',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

// ───────────────────────────────────────────────────────────────────────
export default function TrastornosPersonalidadPage() {
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
              Modelo integrado DBT + Terapia de Esquemas · WDBTA · ISST
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-5 tracking-tight leading-[1.05]">
              <em className="font-serif italic text-primary">Trastornos</em> de Personalidad
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-6 font-light tracking-wide">
              Diagnóstico dimensional y tratamiento integrado · Instituto DBT Chile
            </p>

            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Programa clínico estructurado para consultantes con Trastornos de Personalidad, formulado según el Modelo Alternativo del DSM-5-TR y CIE-11. Único centro chileno que integra formalmente DBT estándar con Terapia de Esquemas.
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-10 px-5 py-2.5 bg-emerald-50/70 border border-emerald-200/70 rounded-full text-xs md:text-sm">
              <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Evaluación IDP-4 propia
              </span>
              <span className="text-emerald-300 hidden md:inline">·</span>
              <span className="text-emerald-800">Modalidad presencial y telemática</span>
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

      {/* ── ¿Qué son los Trastornos de Personalidad? ─────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Marco clínico
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                ¿Qué son los <em className="font-serif italic text-primary">Trastornos de Personalidad</em>?
              </h2>
            </div>

            <div className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Los <strong>Trastornos de Personalidad</strong> son patrones estables de experiencia interna y comportamiento que se desvían significativamente de las expectativas culturales, causan malestar clínico o deterioro funcional y son inflexibles a lo largo del tiempo.
              </p>
              <p>
                El <strong>DSM-5-TR</strong> reconoce diez trastornos categoriales, organizados en tres clusters: Cluster A (esquizoide, esquizotípico, paranoide), Cluster B (límite, narcisista, histriónico, antisocial) y Cluster C (evitativo, dependiente, obsesivo-compulsivo). Además, incorpora un <em className="italic">Modelo Alternativo</em> dimensional basado en dominios de rasgos y nivel de funcionamiento.
              </p>
              <p>
                La clasificación <strong>CIE-11</strong> (2022) es más radical: reemplaza las categorías clásicas por una única categoría de Trastorno de Personalidad, evaluada según severidad y calificadores dimensionales. Esta transición refleja décadas de investigación que cuestionan la validez de las categorías tradicionales.
              </p>
              <p>
                Frente a la creencia obsoleta de que la personalidad es inmodificable, <strong>la evidencia empírica acumulada</strong> demuestra que estos cuadros responden a psicoterapias estructuradas, particularmente DBT, Terapia de Esquemas, Mentalización (MBT) y Terapia Focalizada en la Transferencia (TFP).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tipos de Trastornos ───────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/40">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Cuadros clínicos
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Trastornos que <em className="font-serif italic text-primary">tratamos</em>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Abordamos el espectro completo de Trastornos de Personalidad conforme al DSM-5-TR y CIE-11, con formulación clínica dimensional individualizada.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tipos.map((t, i) => (
                <Card key={i} className="border border-gray-100 shadow-md hover:shadow-xl transition-shadow bg-white h-full">
                  <CardContent className="p-7">
                    <div className="w-12 h-12 mb-5 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                      <t.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">{t.codigo}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.titulo}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{t.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Diferenciador: Modelo DBT + Schema Therapy ──────────────── */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 border-y border-emerald-100/60">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 text-xs font-medium text-emerald-700 uppercase tracking-[0.2em]">
              Modelo integrado propio
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
              <em className="font-serif italic text-primary">DBT</em> + <em className="font-serif italic text-primary">Terapia de Esquemas</em>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Por primera vez en Chile, un único programa terapéutico integra formalmente el protocolo <strong>DBT estándar</strong> (certificación WDBTA) con la <strong>Terapia de Esquemas</strong> de Jeffrey Young (certificación ISST).
            </p>
            <blockquote className="text-xl md:text-2xl font-serif italic font-light text-gray-800 leading-snug mt-10">
              <span className="text-emerald-700">“</span>
              DBT interviene sobre la conducta y la desregulación aguda. Terapia de Esquemas interviene sobre los patrones nucleares que originan la vulnerabilidad. Integrarlas no es sumarlas: es construir un modelo transdiagnóstico que no existe en ningún otro centro de la región.
              <span className="text-emerald-700">”</span>
            </blockquote>
            <div className="mt-8 text-sm text-gray-500 tracking-wide">
              — Instituto DBT Chile · Dirección clínica Dra.(c) Josefina Cáceres Cortés
            </div>
          </div>
        </div>
      </section>

      {/* ── Proceso diagnóstico y terapéutico ────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Arquitectura clínica
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                El <em className="font-serif italic text-primary">proceso</em>, paso a paso
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Del primer contacto hasta el programa terapéutico completo, tres fases con criterios clínicos claros de avance.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {fasesModelo.map((p, i) => (
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

      {/* ── Diferenciadores ──────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Diferenciadores clínicos
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Por qué el <em className="font-serif italic text-primary">Instituto DBT Chile</em>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {diferenciadores.map((c, i) => (
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

      {/* ── Autoevaluación IDP-4 · CTA secundario ────────────────────── */}
      <section className="py-16 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="w-7 h-7 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
              ¿Quieres una <em className="font-serif italic text-primary">primera aproximación</em>?
            </h3>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Completa la <strong>Evaluación IDP-4</strong>, nuestro instrumento propio de screening de rasgos de personalidad. No reemplaza el diagnóstico clínico, pero orienta la conversación con nuestro equipo.
            </p>
            <Link
              href="/evaluacion-idp4"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 border-b border-primary/40 hover:border-primary pb-0.5 transition-colors"
            >
              Realizar evaluación IDP-4
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bibliografía ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50/50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Evidencia científica
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Referencias <em className="font-serif italic text-primary">científicas</em>
              </h2>
            </div>

            <ul className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
              <li className="flex gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <BookOpen className="w-4 h-4 mt-1 shrink-0 text-primary" />
                <span>
                  American Psychiatric Association. (2022). <em className="italic">Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition, Text Revision (DSM-5-TR)</em>. APA Publishing.
                </span>
              </li>
              <li className="flex gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <BookOpen className="w-4 h-4 mt-1 shrink-0 text-primary" />
                <span>
                  World Health Organization. (2022). <em className="italic">International Classification of Diseases, Eleventh Revision (ICD-11) — Personality Disorders</em>. WHO.
                </span>
              </li>
              <li className="flex gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <BookOpen className="w-4 h-4 mt-1 shrink-0 text-primary" />
                <span>
                  Linehan, M. M. (1993). <em className="italic">Cognitive-Behavioral Treatment of Borderline Personality Disorder</em>. Guilford Press.
                </span>
              </li>
              <li className="flex gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <BookOpen className="w-4 h-4 mt-1 shrink-0 text-primary" />
                <span>
                  Young, J. E., Klosko, J. S., &amp; Weishaar, M. E. (2003). <em className="italic">Schema Therapy: A Practitioner&apos;s Guide</em>. Guilford Press.
                </span>
              </li>
              <li className="flex gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <BookOpen className="w-4 h-4 mt-1 shrink-0 text-primary" />
                <span>
                  Bateman, A., &amp; Fonagy, P. (2016). <em className="italic">Mentalization-Based Treatment for Personality Disorders</em>. Oxford University Press.
                </span>
              </li>
              <li className="flex gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <Microscope className="w-4 h-4 mt-1 shrink-0 text-primary" />
                <span>
                  Cáceres Cortés, J. (2024). <em className="italic">IDP-4 · Inventario de Trastornos de Personalidad — Manual clínico</em>. Instituto DBT Chile.
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
                Preguntas <em className="font-serif italic text-primary">frecuentes</em>
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
