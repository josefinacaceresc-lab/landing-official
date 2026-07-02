/**
 * Landing dedicada — DBT Kids & Teens · Programa propio del Instituto DBT Chile
 * ─────────────────────────────────────────────────────────────────────────
 * MODELO PROPIETARIO:
 *   "DBT con DialectIA Teens" — adaptación clínica original del Instituto
 *   DBT Chile que integra:
 *     · 25 talleres presenciales secuenciales (2h c/u, 10–16 participantes,
 *       edades 8–18 adaptable)
 *     · 5 competencias DBT progresivas (C1 a C5) con 5 niveles cada una
 *       (Novato → Básico → Intermedio → Avanzado → Dominio)
 *     · Sistema de progresión por evidencia observable (3 demostraciones
 *       exitosas consecutivas)
 *     · DialectIA Teens: asistente clínico-conductual entre talleres
 *     · Intenciones de implementación (Gollwitzer 1999)
 *     · Modelo biosocial DBT en lenguaje juvenil
 *
 * PROPÓSITO SEO:
 *   Capturar todo el tráfico orgánico chileno para:
 *     "DBT para adolescentes", "DBT para niños", "DBT-A Chile",
 *     "terapia para adolescentes Santiago", "tratamiento autolesiones",
 *     "psicólogo adolescentes Chile", "ayuda crisis adolescente",
 *     "talleres habilidades emocionales adolescentes".
 *
 * Schema inyectado: MedicalWebPage + EducationalProgram + Course +
 *                   MedicalTherapy + MedicalCondition + FAQPage +
 *                   BreadcrumbList.
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowRight, Brain, Heart, Shield, Layers, CheckCircle, BookOpen, Sparkles, Compass, Activity, Award, Users } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/whatsapp'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`

// ── SEO metadata ────────────────────────────────────────────────────────
export const metadata = {
  title: 'DBT Kids & Teens · Terapia DBT para Niños y Adolescentes',
  description: 'Programa propio del Instituto DBT Chile para niños y adolescentes. 25 talleres presenciales, 5 competencias DBT progresivas y DialectIA Teens, asistente clínico adaptativo entre sesiones. Para edades 8–18 años, presencial en Santiago y telemático en todo Chile.',
  keywords: [
    // Nivel 1 — alto volumen
    'DBT para adolescentes',
    'DBT para niños',
    'terapia para adolescentes Santiago',
    'tratamiento adolescentes Chile',
    'psicólogo adolescentes Santiago',
    'psiquiatra adolescentes Santiago',
    'tratamiento autolesiones adolescentes',
    'ayuda crisis adolescente',
    // Nivel 2 — clínica
    'DBT-A Chile',
    'DBT infanto juvenil',
    'desregulación emocional adolescentes',
    'autolesiones tratamiento',
    'ideación suicida adolescentes Chile',
    'habilidades emocionales niños',
    // Long-tail emocional (padres)
    'mi hija se autolesiona',
    'mi hijo adolescente está en crisis',
    'mi hijo no controla sus emociones',
    'ayuda para adolescente con depresión',
    // Branded proprietary
    'DBT Kids and Teens',
    'DialectIA Teens',
    'modelo DBT Chile adolescentes',
    'Instituto DBT Chile infanto juvenil',
  ],
  alternates: { canonical: 'https://institutodbtchile.cl/dbt-kids-and-teens' },
  openGraph: {
    title: 'DBT Kids & Teens · Programa DBT para Niños y Adolescentes',
    description: 'Modelo propio del Instituto DBT Chile: 25 talleres + 5 competencias + DialectIA Teens. Para edades 8–18.',
    url: 'https://institutodbtchile.cl/dbt-kids-and-teens',
    type: 'article',
    locale: 'es_CL',
  },
}

// ── Contenido estructurado ──────────────────────────────────────────────

const competenciasDBT = [
  {
    sigla: 'C1',
    title: 'Conciencia emocional',
    text: 'Identificar y nombrar lo que se siente. Distinguir emoción, pensamiento, cuerpo e impulso. Punto de partida de toda regulación.',
  },
  {
    sigla: 'C2',
    title: 'Regulación emocional',
    text: 'Reducir vulnerabilidad emocional y modular la intensidad. Aprender qué hacer con la emoción sin apagarla ni dejarla decidir todo.',
  },
  {
    sigla: 'C3',
    title: 'Tolerancia al malestar',
    text: 'Atravesar momentos críticos sin recurrir a conductas autodestructivas. Aceptación radical, sentido de propósito, supervivencia emocional.',
  },
  {
    sigla: 'C4',
    title: 'Mente sabia',
    text: 'Integración entre mente emocional, mente racional y mente sabia. Tomar decisiones que la versión futura de uno mismo agradezca.',
  },
  {
    sigla: 'C5',
    title: 'Efectividad interpersonal',
    text: 'Pedir, decir que no, manejar conflictos y construir vínculos estables respetando la propia identidad y la del otro.',
  },
]

const pilaresPrograma = [
  {
    icon: BookOpen,
    title: '25 talleres presenciales',
    text: 'Programa estructurado de talleres secuenciales de 2 horas cada uno, grupos de 10–16 participantes. Cada taller construye sobre el anterior con material clínico, pedagógico y experiencial cuidadosamente diseñado.',
  },
  {
    icon: Sparkles,
    title: 'DialectIA Teens',
    text: 'Asistente clínico-conductual entre sesiones. No reemplaza terapia: es un entrenador adaptativo que acompaña la práctica de habilidades DBT con casos reales y devuelve feedback inmediato en momentos críticos.',
  },
  {
    icon: Award,
    title: '5 competencias × 5 niveles',
    text: 'Progresión por evidencia observable: para subir de nivel se requieren tres demostraciones exitosas consecutivas. Niveles Novato → Básico → Intermedio → Avanzado → Dominio en cada competencia.',
  },
  {
    icon: Compass,
    title: 'Modelo biosocial DBT',
    text: 'Comprensión sin culpa de la vulnerabilidad emocional y los ambientes invalidantes. El consultante aprende qué hacer con su sensibilidad, no a esconderla.',
  },
]

const paraQuienEsteIndicado = [
  'Niños y adolescentes con emociones intensas que sienten que no tienen control sobre lo que les pasa.',
  'Adolescentes con conductas autolesivas, ideación suicida recurrente o pensamientos persistentes de hacerse daño.',
  'Familias buscando un tratamiento clínico serio para hijos en crisis emocional, no talleres de coaching genéricos.',
  'Diagnóstico previo o sospecha clínica de TLP, trastorno de la conducta alimentaria o desregulación emocional severa.',
  'Adolescentes con dificultades de regulación que han quedado fuera de tratamientos tradicionales.',
  'Padres y madres que sienten que las herramientas convencionales se han quedado cortas y necesitan un modelo basado en evidencia.',
  'Equipos de salud derivando a niños y adolescentes que requieren un abordaje DBT especializado.',
  'Familias que valoran un programa donde el consultante aprende, practica y ve su progreso con criterios objetivos.',
]

const pasos = [
  {
    n: '01',
    titulo: 'Contacto clínico',
    text: 'La familia o adolescente solicita la valoración inicial. Nuestro equipo se comunica dentro de 24 horas hábiles. Conversación confidencial conducida por personal clínico, no comercial.',
  },
  {
    n: '02',
    titulo: 'Evaluación familiar',
    text: 'Sesión clínica con psicóloga DBT-A certificada. Entrevista con padres, entrevista con el adolescente, historia clínica, escalas estandarizadas, evaluación de riesgo y formulación clínica integral.',
  },
  {
    n: '03',
    titulo: 'Plan terapéutico individualizado',
    text: 'Diseño del plan: ingreso al programa de talleres con grupo etario adecuado, modalidad (presencial, híbrida o telemática), trabajo multifamiliar y acceso a DialectIA Teens entre sesiones.',
  },
]

const faqs = [
  {
    q: '¿Para qué edades está diseñado el programa?',
    a: 'El programa está diseñado para niños y adolescentes entre 8 y 18 años, con materiales y lenguaje adaptados a cada rango etario. Los grupos se conforman por edad y momento clínico para mantener la cohesión y la seguridad psicológica del espacio.',
  },
  {
    q: '¿Atienden adolescentes con conductas autolesivas o ideación suicida?',
    a: 'Sí. El modelo DBT es el tratamiento con mayor evidencia empírica acumulada para conductas autolesivas no suicidas (CANS), ideación suicida y desregulación emocional severa en adolescentes. La indicación se establece tras una evaluación clínica integral conducida por nuestro equipo DBT-A certificado.',
  },
  {
    q: '¿En qué se diferencia este programa de otras terapias para adolescentes?',
    a: 'Tres elementos lo distinguen: (1) Es un modelo propio del Instituto DBT Chile que combina la evidencia internacional de DBT con adaptaciones locales y un sistema de progresión por evidencia observable. (2) Integra DialectIA Teens, un asistente clínico-conductual entre talleres que ningún otro centro chileno ofrece. (3) Su progresión es medible y verificable, no depende únicamente de la intuición del terapeuta.',
  },
  {
    q: '¿Los padres participan dentro de las sesiones?',
    a: 'No. Nuestro modelo propio difiere intencionalmente del protocolo DBT-A estándar de Rathus & Miller. La hipótesis clínica que sustenta el programa es que en el desarrollo infanto-juvenil debe priorizarse la autonomía y la capacidad de aprender del propio niño o adolescente: primero el control esforzado, luego la regulación emocional autónoma. Las sesiones grupales no incluyen a los padres dentro del espacio terapéutico. Sí mantenemos coordinación clínica periódica con la familia mediante entrevistas separadas, devoluciones programadas y orientación psicoeducativa cuando es necesaria, sin interferir el espacio de aprendizaje del consultante.',
  },
  {
    q: '¿Qué es DialectIA Teens y cómo funciona?',
    a: 'DialectIA Teens es un asistente clínico adaptativo desarrollado por el Instituto DBT Chile para acompañar la práctica de habilidades DBT entre talleres. No reemplaza al terapeuta ni al equipo clínico: es una herramienta de práctica que ayuda al adolescente a ordenar lo que siente, elegir una habilidad adecuada y completar la misión semanal asignada. Cumple reglas clínicas estrictas de uso y supervisión.',
  },
  {
    q: '¿Cuánto dura el programa completo?',
    a: 'El programa estándar consta de 25 talleres secuenciales de 2 horas cada uno, complementados con terapia individual semanal, trabajo multifamiliar y acceso a DialectIA Teens entre sesiones. La duración del proceso varía según la severidad clínica del caso, típicamente entre 9 y 18 meses.',
  },
  {
    q: '¿Es necesario tener un diagnóstico previo para ingresar al programa?',
    a: 'No. La evaluación inicial conducida por nuestro equipo es parte del proceso clínico. A partir de ella se establece la formulación diagnóstica y se define la pertinencia y modalidad del ingreso al programa. Las familias no necesitan llegar con un diagnóstico hecho.',
  },
  {
    q: '¿La modalidad es presencial o telemática?',
    a: 'Operamos bajo un modelo híbrido. Los talleres grupales se realizan de forma presencial en nuestra sede de Santiago y la terapia individual y el trabajo familiar puede ser presencial o telemático según indicación clínica. Familias fuera de la Región Metropolitana acceden a la modalidad telemática completa.',
  },
  {
    q: '¿Es reembolsable por Isapre?',
    a: 'Sí. Emitimos boleta de honorarios médica reembolsable parcialmente según el plan de salud privado de cada familia. Nuestro equipo administrativo acompaña en la gestión documental del trámite.',
  },
]

// ── JSON-LD Schema ──────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalWebPage',
      '@id': 'https://institutodbtchile.cl/dbt-kids-and-teens#webpage',
      url: 'https://institutodbtchile.cl/dbt-kids-and-teens',
      name: 'DBT Kids & Teens · Terapia DBT para Niños y Adolescentes · Instituto DBT Chile',
      inLanguage: 'es-CL',
      isPartOf: { '@id': 'https://institutodbtchile.cl/#website' },
      about: { '@id': 'https://institutodbtchile.cl/dbt-kids-and-teens#therapy' },
      breadcrumb: { '@id': 'https://institutodbtchile.cl/dbt-kids-and-teens#breadcrumb' },
      audience: {
        '@type': 'PeopleAudience',
        suggestedMinAge: 8,
        suggestedMaxAge: 18,
        healthCondition: {
          '@type': 'MedicalCondition',
          name: 'Desregulación emocional severa en población infanto-juvenil',
        },
      },
    },
    {
      '@type': 'MedicalTherapy',
      '@id': 'https://institutodbtchile.cl/dbt-kids-and-teens#therapy',
      name: 'DBT Kids & Teens · DBT con DialectIA Teens',
      alternateName: ['DBT-A', 'DBT para adolescentes', 'DBT para niños', 'DBT infanto-juvenil', 'DialectIA Teens'],
      description: 'Programa propio del Instituto DBT Chile para niños y adolescentes con desregulación emocional severa. Integra 25 talleres presenciales, 5 competencias DBT progresivas y DialectIA Teens (asistente clínico adaptativo entre sesiones).',
      medicineSystem: 'Psicoterapia basada en evidencia',
      relevantSpecialty: ['Psiquiatría infanto-juvenil', 'Psicología clínica adolescente'],
      study: {
        '@type': 'MedicalStudy',
        studyLocation: 'University of Washington · Adaptación Rathus & Miller',
        sponsor: 'Marsha M. Linehan, Ph.D., Alec L. Miller, Psy.D. & Jill H. Rathus, Ph.D.',
      },
    },
    {
      '@type': 'EducationalProgram',
      '@id': 'https://institutodbtchile.cl/dbt-kids-and-teens#program',
      name: 'Programa DBT Kids & Teens · 25 Talleres + DialectIA',
      description: 'Programa estructurado de 25 talleres presenciales DBT para niños y adolescentes, complementado con asistente clínico adaptativo DialectIA Teens y trabajo multifamiliar.',
      educationalLevel: 'Clinical program · ages 8–18',
      provider: { '@id': 'https://institutodbtchile.cl/#clinic' },
      educationalProgramMode: ['On-site', 'Hybrid'],
      hasCourse: {
        '@type': 'Course',
        name: 'Taller 1 · ¿Por qué siento todo tan fuerte?',
        description: 'Introducción al modelo biosocial DBT, termostato emocional, validación y primeras habilidades. 2 horas, 10–16 participantes, edades 8–18.',
        provider: { '@id': 'https://institutodbtchile.cl/#clinic' },
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://institutodbtchile.cl/dbt-kids-and-teens#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://institutodbtchile.cl/' },
        { '@type': 'ListItem', position: 2, name: 'DBT Kids & Teens', item: 'https://institutodbtchile.cl/dbt-kids-and-teens' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://institutodbtchile.cl/dbt-kids-and-teens#faq',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

// ───────────────────────────────────────────────────────────────────────
export default function DBTKidsTeensPage() {
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
            <div className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
              <Award className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.18em]">Modelo propio del Instituto DBT Chile</span>
            </div>

            <div className="mb-6 text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.18em]">
              Acreditación Internacional · WDBTA · APA · ISST
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-5 tracking-tight leading-[1.05]">
              <em className="font-serif italic text-primary">DBT</em> Kids &amp; Teens
            </h1>

            <p className="text-base md:text-lg text-gray-700 mb-4 font-normal">
              Terapia DBT para <strong>niños y adolescentes</strong> · Edades 8 a 18 · Santiago de Chile
            </p>

            <p className="text-lg md:text-xl text-gray-700 mb-4 font-light tracking-wide">
              Modelo propio con DialectIA Teens · Instituto DBT Chile
            </p>

            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Sentir fuerte no es estar mal. El desafío es aprender qué hacer con eso. Programa estructurado de 25 talleres, cinco competencias DBT progresivas y un asistente clínico-conductual entre sesiones.
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-10 px-5 py-2.5 bg-emerald-50/70 border border-emerald-200/70 rounded-full text-xs md:text-sm">
              <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Reembolsable Isapre
              </span>
              <span className="text-emerald-300 hidden md:inline">·</span>
              <span className="text-emerald-800">Foco en autonomía y autorregulación</span>
              <span className="text-emerald-300 hidden md:inline">·</span>
              <span className="text-emerald-800">Modelo propio basado en evidencia</span>
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

      {/* ── Marco clínico inicial ────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Marco clínico
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                <em className="font-serif italic text-primary">DBT sin culpar</em>: entender, validar y comenzar a elegir
              </h2>
            </div>

            <div className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                En DBT no partimos preguntando <em className="italic">"¿qué está mal contigo?"</em>. Partimos preguntando: <em className="italic">"¿qué te pasa, cuándo te pasa, qué intenta hacer tu emoción y qué habilidad podría ayudarte?"</em>.
              </p>
              <p>
                El modelo biosocial DBT comprende la <strong>vulnerabilidad emocional</strong> —sentir rápido, sentir fuerte, tardar más en volver a la calma— como una característica del sistema nervioso, no como una falla moral. Cuando esa sensibilidad se cruza con un ambiente que no la entiende, valida o regula, el adolescente queda sin recursos para confiar en su propia emoción.
              </p>
              <p>
                El programa <strong>DBT Kids &amp; Teens</strong> es el modelo propio del Instituto DBT Chile que enseña, paso a paso, qué hacer con esa intensidad. No la apaga. La conduce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ¿Para quién está indicado? ──────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Indicación clínica
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                ¿Para <em className="font-serif italic text-primary">quién</em> está indicado este programa?
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                El programa DBT Kids &amp; Teens está diseñado para familias que reconocen alguna de las siguientes situaciones clínicas:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {paraQuienEsteIndicado.map((s, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" strokeWidth={1.8} />
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">{s}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-center text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed italic">
              Si reconoce alguna de estas situaciones en su hijo o hija, una conversación clínica confidencial es el primer paso.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4 Pilares del modelo propio ──────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Arquitectura del programa
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Cuatro pilares del <em className="font-serif italic text-primary">modelo propio</em>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Lo que distingue clínicamente a DBT Kids &amp; Teens de otros programas para adolescentes en Chile.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pilaresPrograma.map((p, i) => (
                <Card key={i} className="border border-gray-100 shadow-md hover:shadow-xl transition-shadow bg-white h-full">
                  <CardContent className="p-7">
                    <div className="w-12 h-12 mb-5 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                      <p.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{p.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 Competencias DBT ────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Sistema de progresión
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Cinco competencias DBT · cinco <em className="font-serif italic text-primary">niveles</em> cada una
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                El consultante avanza por evidencia observable, no por intención. Para subir de nivel se requieren <strong>tres demostraciones exitosas consecutivas</strong>. Niveles: Novato → Básico → Intermedio → Avanzado → Dominio.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {competenciasDBT.map((c, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-7 bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-2xl font-serif font-light text-primary">{c.sigla}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{c.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-center text-xs text-gray-500 max-w-3xl mx-auto leading-relaxed italic">
              El sistema de progresión por evidencia integra los hallazgos sobre intenciones de implementación de Gollwitzer (1999), que multiplican por tres la probabilidad de transferencia de habilidades al contexto real.
            </p>
          </div>
        </div>
      </section>

      {/* ── DialectIA Teens — Diferenciador propietario ─────────────── */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-primary/5 border-y border-emerald-100/60">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-primary/20 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-[0.18em]">Diferenciador propietario</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                <em className="font-serif italic text-primary">DialectIA Teens</em>: tu coach DBT entre talleres
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Entre una sesión y la siguiente, el adolescente puede practicar habilidades DBT con un asistente clínico-conductual diseñado por nuestro equipo para ayudarle a ordenar lo que siente, elegir una habilidad y completar la misión semanal asignada.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Para qué sirve</div>
                <p className="text-sm text-gray-700 leading-relaxed">Practicar habilidades DBT cuando aparece una emoción intensa, fuera del horario de sesión.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Qué no hace</div>
                <p className="text-sm text-gray-700 leading-relaxed">No diagnostica, no interpreta traumas, no reemplaza terapia ni al equipo clínico tratante.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Uso recomendado</div>
                <p className="text-sm text-gray-700 leading-relaxed">Cinco a diez minutos, especialmente en momentos de activación emocional intermedia a alta.</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-xl p-6 border border-emerald-200/50">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" strokeWidth={1.8} />
                <div>
                  <h4 className="text-sm font-semibold text-emerald-900 mb-2">Reglas clínicas de uso</h4>
                  <ul className="space-y-1.5 text-sm text-gray-700 leading-relaxed">
                    <li>· Practicar habilidades, no reemplazar sesiones clínicas.</li>
                    <li>· No registrar detalles íntimos o traumáticos innecesarios.</li>
                    <li>· En situación de peligro, recurrir a un adulto responsable o al equipo clínico.</li>
                    <li>· Registrar las habilidades practicadas y compartirlas en el próximo taller.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 25 talleres ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Estructura del programa
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                Veinticinco <em className="font-serif italic text-primary">talleres secuenciales</em>
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Cada taller construye sobre el anterior. Diseño experiencial cuidadoso, lenguaje juvenil, seguridad grupal, lenguaje no culpabilizante y producto final concreto en cada sesión.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-xl p-6 bg-gray-50/60 border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Formato de cada taller</h3>
                <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                  <li>· 2 horas de duración</li>
                  <li>· 10 a 16 participantes por grupo</li>
                  <li>· Agenda estructurada en bloques temáticos</li>
                  <li>· Producto final: mapa o ficha personal</li>
                  <li>· Misión DBT semanal con formato "Cuando ___, voy a ___"</li>
                </ul>
              </div>
              <div className="rounded-xl p-6 bg-gray-50/60 border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Acuerdos del grupo</h3>
                <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                  <li>· Participar hablando, escribiendo, dibujando u observando</li>
                  <li>· No contar historias de otras personas fuera del grupo</li>
                  <li>· Validación obligatoria antes de cualquier solución</li>
                  <li>· No usar burlas, diagnósticos ni etiquetas contra otros</li>
                  <li>· Posibilidad de pausa o salida acompañada si algo activa demasiado</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-xl p-6 bg-primary/5 border border-primary/15">
              <p className="text-sm text-gray-700 leading-relaxed italic">
                <strong>Ejemplo · Taller 1:</strong> "¿Por qué siento todo tan fuerte?" — Modelo biosocial, termostato emocional, validación entre pares, cadena mini DBT, mente sabia y mapa DBT inicial. Cada taller cierra con una misión concreta y un compromiso semanal.
              </p>
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
                Sabemos que iniciar el proceso es el momento de mayor incertidumbre para una familia. El flujo está diseñado para acompañar desde el primer contacto.
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
                Preguntas <em className="font-serif italic text-primary">frecuentes</em> sobre DBT Kids &amp; Teens
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
              ¿Cómo le gustaría <em className="font-serif italic text-primary">iniciar</em> el proceso para su hijo o hija?
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Nuestro equipo clínico acompañará a su familia desde la primera conversación. Respuesta personalizada en menos de 24 horas hábiles. Conversación confidencial.
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
                href="/tratamiento/dbt-infanto-juvenil"
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
