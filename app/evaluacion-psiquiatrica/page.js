/**
 * Landing dedicada — Evaluación Psiquiátrica
 * ─────────────────────────────────────────────────────────────────────────
 * Propósito:
 *   1. Ads exact-match para keyword "evaluación psiquiátrica" y "psiquiatra
 *      trastorno personalidad" (alta intención, alto CPC).
 *   2. SEO orgánico long-tail: "psiquiatra Vitacura", "evaluación
 *      psiquiátrica online Chile", "diagnóstico trastorno personalidad
 *      psiquiatra".
 *   3. E-E-A-T institucional: perfil clínico del psiquiatra evaluador
 *      (Dr. Luis Acuña San Martín) — Physician schema + LinkedIn sameAs.
 *
 * Lineamientos editoriales (CRÍTICO):
 *   - "consultante" (nunca "paciente")
 *   - Sin emojis
 *   - Registro formal europeo
 *   - Sin promesas absolutas
 *   - Sin lenguaje que viole Google Health Ads (evitar "cura", "garantía")
 *
 * Schema injected: MedicalWebPage + Physician + MedicalProcedure +
 *                  FAQPage + BreadcrumbList
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  ArrowRight,
  Stethoscope,
  ClipboardCheck,
  Video,
  MapPin,
  Clock,
  CheckCircle,
  FileText,
  UserCheck,
  BookOpen,
  Microscope,
  ShieldCheck,
} from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/whatsapp'

// Mensaje específico WhatsApp para evaluación psiquiátrica
const WA_MESSAGE =
  '¡Hola! Vi su sitio y me gustaría solicitar una evaluación psiquiátrica con el Dr. Luis Acuña. ¿Me podrían ayudar a agendar una hora? Muchas gracias.'
const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

// ── SEO metadata ─────────────────────────────────────────────────────────
export const metadata = {
  title: 'Evaluación Psiquiátrica en Chile · Dr. Luis Acuña · Instituto DBT Chile',
  description:
    'Evaluación psiquiátrica clínica con el Dr. Luis Acuña San Martín, psiquiatra de adultos. Diagnóstico integral y formulación clínica basada en entrevista, MCMI (Millon) y BSL-23. Presencial en Vitacura y teleconsulta. Reembolsable Isapre.',
  keywords: [
    'evaluación psiquiátrica',
    'psiquiatra Santiago',
    'psiquiatra Vitacura',
    'psiquiatra adultos Chile',
    'evaluación psiquiátrica online',
    'diagnóstico psiquiátrico',
    'psiquiatra trastorno de personalidad',
    'psiquiatra TLP',
    'Luis Acuña psiquiatra',
    'Instituto DBT Chile',
  ],
  alternates: { canonical: 'https://institutodbtchile.cl/evaluacion-psiquiatrica' },
  openGraph: {
    title: 'Evaluación Psiquiátrica · Dr. Luis Acuña San Martín · Instituto DBT Chile',
    description:
      'Evaluación psiquiátrica clínica con el Dr. Luis Acuña, psiquiatra de adultos y psicoterapeuta del Instituto DBT Chile. Presencial en Vitacura y teleconsulta.',
    url: 'https://institutodbtchile.cl/evaluacion-psiquiatrica',
    type: 'article',
    locale: 'es_CL',
  },
}

// ── Contenido estructurado ──────────────────────────────────────────────

const paraQuienes = [
  {
    icon: ClipboardCheck,
    titulo: 'Diagnóstico diferencial complejo',
    text: 'Cuadros de larga evolución con múltiples diagnósticos previos, respuesta parcial a tratamientos o dudas sobre trastornos de personalidad, bipolaridad, TDAH adulto o comorbilidades.',
  },
  {
    icon: FileText,
    titulo: 'Segunda opinión clínica',
    text: 'Revisión formal de un diagnóstico o esquema farmacológico ya establecido, con formulación clínica independiente y sugerencias fundadas en la evidencia actual.',
  },
  {
    icon: UserCheck,
    titulo: 'Ingreso al Programa DBT',
    text: 'Valoración psiquiátrica de entrada para consultantes que consideran iniciar el Programa DBT de doce meses del Instituto, con evaluación de indicaciones, riesgos y necesidad de tratamiento farmacológico coadyuvante.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Sospecha de Trastorno de Personalidad',
    text: 'Evaluación específica para consultantes con sospecha de TLP u otros trastornos de personalidad, integrando entrevista clínica, MCMI-III (Millon) y BSL-23 para valoración dimensional.',
  },
]

const protocoloEvaluacion = [
  {
    n: '01',
    titulo: 'Entrevista clínica estructurada',
    text: 'Anamnesis detallada de la historia biográfica, evolutiva, familiar, médica y del motivo de consulta. Se exploran síntomas actuales, funcionamiento interpersonal, laboral y afectivo, además de antecedentes de tratamientos previos y respuesta a los mismos.',
  },
  {
    n: '02',
    titulo: 'Aplicación de instrumentos psicométricos',
    text: 'Cuando la formulación clínica lo indica, se administran instrumentos validados: MCMI-III (Inventario Clínico Multiaxial de Millon) para valoración de estilos y trastornos de personalidad, y BSL-23 (Borderline Symptom List) para severidad sintomática en sospecha de TLP.',
  },
  {
    n: '03',
    titulo: 'Formulación clínica integrada',
    text: 'Se elabora una formulación clínica que articula diagnóstico categorial (DSM-5-TR / CIE-11), diagnóstico dimensional, hipótesis explicativas y plan de tratamiento sugerido: farmacológico, psicoterapéutico o combinado, según indicación.',
  },
  {
    n: '04',
    titulo: 'Devolución diagnóstica',
    text: 'Sesión de devolución al consultante con explicación clínica clara del diagnóstico, alternativas terapéuticas basadas en evidencia y, si el consultante lo autoriza, comunicación coordinada con el equipo tratante del Instituto.',
  },
]

const modalidades = [
  {
    icon: MapPin,
    tipo: 'Atención presencial',
    dias: 'Lunes por la tarde',
    ubicacion: 'Vitacura · Cerca de Alonso de Córdova',
    descripcion:
      'Sesión clínica en consulta presencial en el sector de Vitacura, próximo a Alonso de Córdova. Ideal para primera evaluación diagnóstica o consultantes que prefieren el encuadre presencial.',
  },
  {
    icon: Video,
    tipo: 'Teleconsulta',
    dias: 'Jueves y viernes por la tarde',
    ubicacion: 'Zoom · Google Meet · Telegram',
    descripcion:
      'Sesión clínica en modalidad remota con estándares de confidencialidad clínica. Ideal para consultantes en regiones, en el extranjero o que requieren flexibilidad horaria y logística.',
  },
]

const faqs = [
  {
    q: '¿En qué consiste una evaluación psiquiátrica?',
    a: 'Es una consulta clínica realizada por un médico psiquiatra que integra entrevista clínica detallada, revisión de antecedentes, aplicación selectiva de instrumentos psicométricos validados (como el MCMI-III o el BSL-23 cuando corresponde) y una formulación clínica que orienta el diagnóstico y plan terapéutico. En el Instituto DBT Chile la realiza el Dr. Luis Acuña San Martín, psiquiatra de adultos y psicoterapeuta.',
  },
  {
    q: '¿Cuánto dura la evaluación?',
    a: 'La evaluación inicial requiere generalmente entre una y dos sesiones clínicas, dependiendo de la complejidad del cuadro. En casos con múltiples diagnósticos previos o sospecha de trastorno de personalidad puede requerirse una tercera sesión de aplicación de instrumentos y devolución diagnóstica formal.',
  },
  {
    q: '¿Qué instrumentos se utilizan?',
    a: 'La evaluación se basa fundamentalmente en la entrevista clínica y anamnesis. Cuando la formulación clínica lo indica, se administra el MCMI-III (Inventario Clínico Multiaxial de Millon) para valoración de estilos y trastornos de personalidad, y el BSL-23 (Borderline Symptom List) para severidad sintomática en sospecha de Trastorno Límite de Personalidad.',
  },
  {
    q: '¿La evaluación es presencial u online?',
    a: 'Ambas modalidades están disponibles. La atención presencial se realiza los lunes por la tarde en Vitacura (cerca de Alonso de Córdova). La teleconsulta se realiza los jueves y viernes por la tarde mediante Zoom, Google Meet o Telegram con estándares de confidencialidad clínica.',
  },
  {
    q: '¿La evaluación incluye prescripción farmacológica?',
    a: 'Sí. Cuando la formulación clínica lo indica y el consultante consiente, la evaluación puede concluir con una indicación farmacológica basada en la evidencia actual. La psiquiatría del Instituto DBT Chile trabaja con criterio conservador y coordinado con el proceso psicoterapéutico.',
  },
  {
    q: '¿Es reembolsable por Isapre?',
    a: 'Sí. Se emite boleta de honorarios médica, reembolsable parcialmente según el plan de salud privado de cada consultante. El equipo administrativo del Instituto acompaña al consultante en la gestión documental del trámite.',
  },
  {
    q: '¿Necesito hacer una evaluación psiquiátrica para ingresar al Programa DBT?',
    a: 'No es un requisito absoluto, pero se recomienda cuando existen antecedentes de tratamientos farmacológicos previos, comorbilidades relevantes o dudas diagnósticas. La evaluación psiquiátrica permite ingresar al Programa con una formulación clínica clara y un plan farmacológico coordinado desde el inicio.',
  },
]

// ── Schema JSON-LD ──────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalWebPage',
      '@id': 'https://institutodbtchile.cl/evaluacion-psiquiatrica#webpage',
      url: 'https://institutodbtchile.cl/evaluacion-psiquiatrica',
      name: 'Evaluación Psiquiátrica · Dr. Luis Acuña San Martín · Instituto DBT Chile',
      inLanguage: 'es-CL',
      isPartOf: { '@id': 'https://institutodbtchile.cl/#website' },
      about: { '@id': 'https://institutodbtchile.cl/evaluacion-psiquiatrica#procedure' },
      breadcrumb: { '@id': 'https://institutodbtchile.cl/evaluacion-psiquiatrica#breadcrumb' },
      mainEntity: { '@id': 'https://institutodbtchile.cl/evaluacion-psiquiatrica#physician' },
    },
    {
      '@type': 'Physician',
      '@id': 'https://institutodbtchile.cl/evaluacion-psiquiatrica#physician',
      name: 'Dr. Luis Acuña San Martín',
      alternateName: 'Luis Acuña San Martín',
      jobTitle: 'Médico Psiquiatra de Adultos · Psicoterapeuta',
      medicalSpecialty: ['Psiquiatría', 'Psicoterapia'],
      worksFor: {
        '@type': 'MedicalOrganization',
        name: 'Instituto DBT Chile',
        url: 'https://institutodbtchile.cl/',
      },
      sameAs: ['https://www.linkedin.com/in/luisacunasanmartin'],
      availableService: [
        {
          '@type': 'MedicalProcedure',
          name: 'Evaluación psiquiátrica clínica',
          procedureType: 'Diagnostic',
        },
      ],
    },
    {
      '@type': 'MedicalProcedure',
      '@id': 'https://institutodbtchile.cl/evaluacion-psiquiatrica#procedure',
      name: 'Evaluación Psiquiátrica Clínica',
      procedureType: 'Diagnostic',
      description:
        'Evaluación psiquiátrica clínica basada en entrevista estructurada, MCMI-III (Millon) y BSL-23, con formulación clínica integrada según DSM-5-TR y CIE-11.',
      performer: { '@id': 'https://institutodbtchile.cl/evaluacion-psiquiatrica#physician' },
      howPerformed:
        'Entrevista clínica detallada, anamnesis biográfica, aplicación selectiva de instrumentos psicométricos validados (MCMI-III, BSL-23), formulación clínica integrada y devolución diagnóstica.',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://institutodbtchile.cl/evaluacion-psiquiatrica#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://institutodbtchile.cl/' },
        { '@type': 'ListItem', position: 2, name: 'Evaluación Psiquiátrica', item: 'https://institutodbtchile.cl/evaluacion-psiquiatrica' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://institutodbtchile.cl/evaluacion-psiquiatrica#faq',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

// ───────────────────────────────────────────────────────────────────────
export default function EvaluacionPsiquiatricaPage() {
  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-primary/4 to-primary/12" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.18em]">
              Psiquiatría clínica · Instituto DBT Chile
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-5 tracking-tight leading-[1.05]">
              Evaluación <em className="font-serif italic text-primary">Psiquiátrica</em>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-6 font-light tracking-wide">
              Dr. Luis Acuña San Martín · Psiquiatra de Adultos · Psicoterapeuta
            </p>

            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Diagnóstico integral y formulación clínica basada en entrevista estructurada, MCMI-III (Millon) y BSL-23. Atención presencial en Vitacura y teleconsulta segura.
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-10 px-5 py-2.5 bg-emerald-50/70 border border-emerald-200/70 rounded-full text-xs md:text-sm">
              <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Presencial en Vitacura
              </span>
              <span className="text-emerald-300 hidden md:inline">·</span>
              <span className="text-emerald-800">Teleconsulta segura</span>
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
                    Agendar evaluación psiquiátrica
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

      {/* ── Mensaje personal del Dr. Acuña ───────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/40 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Palabras del clínico
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                Mensaje del <em className="font-serif italic text-primary">Dr. Acuña</em>
              </h2>
            </div>

            <div className="bg-white border border-emerald-100 rounded-2xl p-8 md:p-12 shadow-sm">
              <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed space-y-4 font-light">
                <p>
                  Hola, le agradezco llegar a este espacio y el confiar desde ya en mi trabajo.
                </p>
                <p>
                  Soy psiquiatra de adultos, psicoterapeuta, trabajo en el Instituto DBT Chile y tengo la fortuna de contar con la disposición de un equipo de tremendos profesionales de la salud mental.
                </p>
                <p>
                  Puede acceder a mi currículo profesional en{' '}
                  <a
                    href="https://www.linkedin.com/in/luisacunasanmartin"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                  .
                </p>
                <p>
                  Ofrezco atención <strong>presencial los lunes por la tarde en Vitacura</strong> (cerca de Alonso de Córdova) y en <strong>teleconsulta los jueves y viernes por la tarde</strong> (vía Zoom, Google Meet o Telegram). Más abajo puede escoger la modalidad y horario que más le acomode.
                </p>
                <p>
                  Y una vez más, gracias por su confianza.
                </p>
              </blockquote>
              <div className="mt-8 pt-6 border-t border-emerald-100 text-sm text-gray-500 tracking-wide">
                — Dr. Luis Acuña San Martín · Médico Psiquiatra de Adultos
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ¿Para quiénes está indicada? ─────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Indicaciones clínicas
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                ¿Para <em className="font-serif italic text-primary">quiénes</em> está indicada?
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                La evaluación psiquiátrica está indicada en cuatro escenarios clínicos principales.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {paraQuienes.map((t, i) => (
                <Card key={i} className="border border-gray-100 shadow-md hover:shadow-xl transition-shadow bg-white h-full">
                  <CardContent className="p-7">
                    <div className="w-12 h-12 mb-5 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                      <t.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.titulo}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{t.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Protocolo de evaluación ─────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Protocolo clínico
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Cómo se realiza la <em className="font-serif italic text-primary">evaluación</em>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Cuatro fases clínicas con criterios rigurosos, entre una y tres sesiones según la complejidad diagnóstica.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {protocoloEvaluacion.map((p, i) => (
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

      {/* ── Instrumentos ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Instrumentos validados
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Rigor <em className="font-serif italic text-primary">psicométrico</em>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 mb-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Microscope className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">MCMI-III</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Inventario Clínico Multiaxial de Millon</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Instrumento clínico multifactorial ampliamente validado para la valoración de estilos y trastornos de personalidad conforme al DSM-5-TR. Permite identificar patrones caracterológicos y síndromes clínicos subyacentes.
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 mb-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">BSL-23</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Borderline Symptom List — 23 ítems</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Instrumento validado internacionalmente para la valoración dimensional de severidad sintomática en el Trastorno Límite de Personalidad. Permite monitorizar la respuesta al tratamiento y establecer líneas de base clínicas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modalidades ──────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 border-y border-emerald-100/60">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-emerald-700 uppercase tracking-[0.2em]">
                Modalidades disponibles
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Presencial en Vitacura o <em className="font-serif italic text-primary">teleconsulta</em>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Escoja la modalidad y horario que mejor se ajuste a su realidad clínica y logística.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {modalidades.map((m, i) => (
                <div key={i} className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 mb-5 rounded-full bg-emerald-100/60 flex items-center justify-center">
                    <m.icon className="w-6 h-6 text-emerald-700" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{m.tipo}</h3>
                  <div className="flex items-center gap-2 text-sm text-emerald-800 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{m.dias}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{m.ubicacion}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{m.descripcion}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-base font-medium tracking-wide shadow-lg hover:shadow-xl transition-all"
              >
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center gap-2">
                    Coordinar modalidad y horario
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bio Dr. Acuña ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Perfil del clínico
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Dr. <em className="font-serif italic text-primary">Luis Acuña San Martín</em>
              </h2>
            </div>

            <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Stethoscope className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Médico Psiquiatra de Adultos</h3>
                  <p className="text-sm text-gray-600">Psicoterapeuta · Instituto DBT Chile</p>
                </div>
              </div>

              <p className="text-base text-gray-700 leading-relaxed mb-6">
                El Dr. Luis Acuña San Martín es médico psiquiatra de adultos y psicoterapeuta con formación clínica y práctica sostenida en el diagnóstico y tratamiento de trastornos afectivos, ansiosos, de personalidad y comorbilidades complejas. Integra la evaluación psiquiátrica rigurosa con una comprensión psicoterapéutica del consultante.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/luisacunasanmartin"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 text-sm text-primary border border-primary/30 rounded-full px-5 py-2 hover:bg-primary/5 transition-colors"
                >
                  Ver perfil profesional (LinkedIn)
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/equipo"
                  className="text-sm text-gray-600 hover:text-primary border-b border-gray-300 hover:border-primary pb-0.5 transition-colors"
                >
                  Conocer al equipo clínico completo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bibliografía ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50/50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Fundamentación científica
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
                  World Health Organization. (2022). <em className="italic">International Classification of Diseases, Eleventh Revision (ICD-11)</em>. WHO.
                </span>
              </li>
              <li className="flex gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <Microscope className="w-4 h-4 mt-1 shrink-0 text-primary" />
                <span>
                  Millon, T., Millon, C., Davis, R., &amp; Grossman, S. (2009). <em className="italic">Millon Clinical Multiaxial Inventory-III (MCMI-III) Manual</em>. Pearson Assessments.
                </span>
              </li>
              <li className="flex gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <Microscope className="w-4 h-4 mt-1 shrink-0 text-primary" />
                <span>
                  Bohus, M., Kleindienst, N., Limberger, M. F., Stieglitz, R. D., Domsalla, M., Chapman, A. L., et al. (2009). The short version of the Borderline Symptom List (BSL-23): Development and initial data on psychometric properties. <em className="italic">Psychopathology, 42</em>(1), 32–39.
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
              Agende su <em className="font-serif italic text-primary">evaluación</em> psiquiátrica
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Coordinamos modalidad, día y hora según su disponibilidad. Respuesta clínica personalizada en menos de 24 horas hábiles.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-base font-medium tracking-wide shadow-lg hover:shadow-xl transition-all"
              >
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center gap-2">
                    Solicitar hora por WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </Button>
              <Link
                href="/trastornos-de-personalidad"
                className="text-sm text-gray-600 hover:text-primary border-b border-gray-300 hover:border-primary pb-0.5 transition-colors"
              >
                Ver Programa DBT · Trastornos de Personalidad
              </Link>
            </div>

            <p className="mt-10 text-xs text-gray-500 tracking-wide max-w-xl mx-auto leading-relaxed">
              Esta página tiene fines informativos y no reemplaza una valoración clínica personalizada. Para una evaluación adaptada a su situación específica, coordine directamente su hora con el equipo del Instituto.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
