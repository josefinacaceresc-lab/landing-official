/**
 * Landing dedicada — DBT-SUD en Chile · Primer Programa de Terapia
 * Dialéctico Conductual para Adicciones (Patología Dual)
 * ─────────────────────────────────────────────────────────────────────────
 * AUTORIDAD INSTITUCIONAL:
 *   Contenido autoritativo migrado/ampliado desde la pieza original del
 *   Instituto DBT Chile publicada en dbtchile.cl (versión histórica),
 *   con E-E-A-T reforzado mediante:
 *     · Direccion clinica Ps. Trahice Veliz + Dr. Luis Acuna (Sector Z,
 *       Instituto Psiquiátrico Dr. José Horwitz Barak, +5 años)
 *     · Formacion DBT-SUD por DBT Iberoamerica
 *     · Cita primaria de literatura clinica internacional
 *
 * PROPÓSITO SEO:
 *   Capturar el 100% del trafico organico chileno relacionado con:
 *     "DBT y adicciones", "tratamiento DBT adicciones", "DBT-SUD Chile",
 *     "patologia dual Chile", "TLP y adicciones", "primer programa DBT-SUD",
 *     "abstinencia dialectica", "adicciones y trastornos de personalidad".
 *
 * LINEAMIENTOS EDITORIALES (Google Health Algorithm + tono premium):
 *   - "consultante", no "paciente".
 *   - Cero uso de "rehabilitacion", "curacion", "desintoxicacion".
 *   - Registro formal europeo, sin emojis.
 *   - Bibliografia primaria visible.
 *
 * SCHEMA INYECTADO: MedicalWebPage + MedicalTherapy + Physician (×2) +
 *                   MedicalCondition + FAQPage + BreadcrumbList +
 *                   CitationList (bibliography).
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowRight, Brain, Shield, Activity, Layers, CheckCircle, BookOpen, Flame, Compass, Award, Microscope, Users } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/whatsapp'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`

// ── SEO metadata · densidad keyword Chile ───────────────────────────────
export const metadata = {
  title: 'DBT-SUD en Chile · Primer Programa DBT para Adicciones · Instituto DBT Chile',
  description: 'Primer programa DBT-SUD del país. Tratamiento integrado de adicciones y desregulación emocional bajo el modelo Linehan-Dimeff. Dirección clínica con +5 años en el Sector Z del Instituto Psiquiátrico Dr. José Horwitz Barak. Formación DBT Iberoamérica.',
  keywords: [
    'DBT y adicciones',
    'DBT adicciones',
    'tratamiento DBT adicciones',
    'DBT-SUD Chile',
    'primer programa DBT-SUD',
    'patología dual Chile',
    'TLP y adicciones',
    'trastorno límite y consumo',
    'adicciones y trastorno límite de personalidad',
    'abstinencia dialéctica',
    'DBT consumo de sustancias',
    'tratamiento integrado patología dual',
    'comorbilidad TLP adicciones',
    'Instituto DBT Chile adicciones',
    'Linehan Dimeff DBT adicciones',
  ],
  alternates: { canonical: 'https://institutodbtchile.cl/dbt-y-adicciones' },
  openGraph: {
    title: 'DBT-SUD en Chile · Primer Programa DBT para Adicciones',
    description: 'Hito clínico nacional: primer programa DBT-SUD del país, conforme al modelo Linehan-Dimeff. Tratamiento integrado de adicciones y desregulación emocional.',
    url: 'https://institutodbtchile.cl/dbt-y-adicciones',
    type: 'article',
    locale: 'es_CL',
  },
}

// ── Contenido estructurado ──────────────────────────────────────────────

// Componentes centrales DBT-SUD (estrategias específicas)
const estrategiasDBTSUD = [
  {
    icon: Compass,
    title: 'Abstinencia dialéctica',
    text: 'La meta es la abstinencia total. Pero si ocurre una recaída, se integra al proceso terapéutico como oportunidad de aprendizaje, no como fracaso. Sustituye el ciclo culpa-abandono por uno de aprendizaje-resiliencia.',
  },
  {
    icon: Brain,
    title: 'Clear Mind · mente clara',
    text: 'Distinción clínica entre mente adicta, mente vulnerable y mente clara. Modelo cognitivo dialéctico que permite identificar el estado mental en el que opera el consumo y trabajar la transición a la mente clara.',
  },
  {
    icon: Flame,
    title: 'Burning bridges',
    text: 'Romper deliberadamente con los contextos, relaciones y rutinas que sostienen el consumo problemático. Trabajo estructurado de identificación y desmontaje de la red conductual adictiva.',
  },
  {
    icon: Layers,
    title: 'Building new ones',
    text: 'Construcción activa de alternativas saludables: nuevos vínculos, nuevas rutinas, nuevos significados. La sustitución no es espontánea, requiere diseño clínico explícito.',
  },
]

// Comparación con otros modelos de tratamiento de adicciones
const comparativaModelos = [
  {
    nombre: 'Terapia Cognitivo Conductual para Adicciones',
    sigla: 'CBT-SUD',
    objetivo: 'Identificar y modificar pensamientos y conductas que mantienen el consumo.',
    evidencia: 'Ampliamente validada en consumo leve a moderado.',
    limite: 'Se queda corta en consultantes con alta impulsividad, riesgo suicida o conductas autodestructivas.',
  },
  {
    nombre: 'Entrevista Motivacional',
    sigla: 'MI / MET',
    objetivo: 'Trabajar la ambivalencia y aumentar la motivación intrínseca para cambiar.',
    evidencia: 'Efectiva para mejorar adherencia y compromiso terapéutico.',
    limite: 'Por sí sola produce cambios modestos; requiere complementarse con programas estructurados.',
  },
  {
    nombre: 'Programas de 12 pasos · grupos de ayuda mutua',
    sigla: '12-STEP',
    objetivo: 'Sostener abstinencia mediante apoyo grupal, espiritualidad y responsabilidad comunitaria.',
    evidencia: 'Útil para aumentar días de estabilidad clínica y soporte social.',
    limite: 'Heterogeneidad en calidad. No aborda específicamente desregulación emocional ni crisis suicidas.',
  },
  {
    nombre: 'DBT-SUD · Instituto DBT Chile',
    sigla: 'DBT-SUD',
    objetivo: 'Lograr abstinencia integrando recaídas en el proceso terapéutico. Aborda simultáneamente desregulación emocional y consumo.',
    evidencia: 'Linehan et al. (1999, 2002), Harned et al. (2008): reducciones significativas en consumo, conductas suicidas y aumento en retención.',
    limite: 'Único modelo que combina intervención en adicciones con trabajo intensivo en emociones, suicidio y trauma complejo.',
    destacado: true,
  },
]

// Componentes operativos del programa
const componentesOperativos = [
  {
    titulo: 'Terapia individual semanal',
    descripcion: 'Sesión con psicóloga o psiquiatra DBT-SUD certificado. Trabajo en jerarquía de objetivos: conductas de riesgo vital, conductas que interfieren con el tratamiento, conductas de consumo y, finalmente, calidad de vida.',
  },
  {
    titulo: 'Grupo de habilidades DBT adaptado a SUD',
    descripcion: 'Entrenamiento grupal en los cuatro módulos clásicos (mindfulness, regulación emocional, tolerancia al malestar, efectividad interpersonal) con módulos adicionales específicos: abstinencia dialéctica, clear mind, burning bridges, building new ones.',
  },
  {
    titulo: 'Coaching telefónico intensivo',
    descripcion: 'Apoyo directo del terapeuta en momentos de urgencia de consumo o desregulación emocional aguda, para evitar conductas impulsivas y generalizar habilidades al contexto real.',
  },
  {
    titulo: 'Análisis en cadena del uso',
    descripcion: 'Comprensión sistemática de los eslabones conductuales y emocionales que llevan al consumo, con identificación de puntos de intervención y generación de alternativas en cada paso.',
  },
  {
    titulo: 'Equipo de consultoría clínica',
    descripcion: 'Supervisión cruzada semanal del equipo terapéutico. Mantiene la fidelidad al modelo Linehan-Dimeff y evita los errores clásicos del tratamiento fragmentado entre lo psiquiátrico y lo adictivo.',
  },
  {
    titulo: 'Monitoreo clínico ApoFix AI',
    descripcion: 'Sistema propio de seguimiento continuo entre sesiones de variables críticas: estados emocionales, urgencias de consumo, conductas autolesivas, calidad del sueño. Permite intervenir antes de la crisis.',
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
    text: 'Diseño individualizado con jerarquía de objetivos clínicos, modalidad (presencial, híbrida o telemática), frecuencia de sesiones y acompañamiento entre estas. Coordinación con otros tratantes cuando aplica.',
  },
]

const faqs = [
  {
    q: '¿Qué es exactamente DBT-SUD?',
    a: 'DBT-SUD (Dialectical Behavior Therapy for Substance Use Disorders) es la adaptación del modelo DBT original al tratamiento integrado de personas con desregulación emocional severa y conductas problemáticas de consumo de sustancias. Fue desarrollada por Marsha Linehan, Linda Dimeff y su equipo en la Universidad de Washington. Mantiene la esencia de la DBT estándar —regulación emocional, tolerancia al malestar, mindfulness y efectividad interpersonal— e incorpora estrategias específicas: abstinencia dialéctica, clear mind, burning bridges y building new ones.',
  },
  {
    q: '¿Qué es la abstinencia dialéctica?',
    a: 'Es el concepto central del modelo DBT-SUD. Postula que la meta clínica es la abstinencia total, pero si ocurre una recaída, ésta se integra al proceso terapéutico como oportunidad de aprendizaje y no como fracaso. Sustituye la lógica binaria culpa-abandono por una lógica dialéctica de ensayo, error y resiliencia. Es lo que distingue radicalmente a DBT-SUD de modelos tradicionales basados en abstinencia rígida.',
  },
  {
    q: '¿Por qué no se trata por separado la parte psiquiátrica y la parte de consumo?',
    a: 'La literatura clínica internacional muestra de forma consistente que el tratamiento fragmentado de la comorbilidad —psiquiatría por un lado, dispositivos de adicciones por otro— produce resultados significativamente inferiores al tratamiento integrado. La sustancia frecuentemente funciona como un intento de regulación emocional fallido; tratarla aisladamente sin abordar la desregulación de base perpetúa el ciclo y aumenta la mortalidad.',
  },
  {
    q: '¿Es necesario haber dejado el consumo para iniciar el tratamiento?',
    a: 'No. DBT-SUD opera bajo abstinencia dialéctica y un modelo de jerarquía clínica. Trabajamos desde donde el consultante está, priorizando primero las conductas de riesgo vital, luego las conductas que interfieren con el tratamiento, después el consumo y finalmente la calidad de vida. La estabilización del consumo es un objetivo del tratamiento, no un requisito de ingreso.',
  },
  {
    q: '¿En qué se diferencia DBT-SUD de un programa de 12 pasos o de CBT-SUD?',
    a: 'Los programas de 12 pasos son útiles como soporte social pero no abordan específicamente la desregulación emocional ni las crisis suicidas. CBT-SUD funciona bien en consumo leve a moderado pero se queda corta en consultantes con alta impulsividad o conductas autodestructivas. DBT-SUD es el único modelo que combina intervención estructurada en adicciones con trabajo intensivo y simultáneo en regulación emocional, ideación suicida y trauma complejo.',
  },
  {
    q: '¿Quién dirige el área de DBT y Adicciones del Instituto?',
    a: 'El área es co-dirigida por la Ps. Trahice Véliz y el Dr. Luis Acuña, ambos con más de cinco años a cargo del Sector Z del Instituto Psiquiátrico Dr. José Horwitz Barak —centro público de referencia nacional en salud mental— y con formación especializada en DBT-SUD a través de DBT Iberoamérica.',
  },
  {
    q: '¿Qué evidencia científica respalda DBT-SUD?',
    a: 'Linehan et al. (1999) demostró que DBT-SUD redujo significativamente los días de consumo, las conductas suicidas y mejoró la retención respecto al tratamiento habitual en consultantes con TLP y dependencia de sustancias. Harned et al. (2008) mostró mayor adherencia y menores recaídas frente a terapia comunitaria experta en adicciones. Marlatt & Donovan (2005) sostienen que la prevención de recaídas requiere un enfoque compasivo y estructurado que DBT-SUD integra de forma única.',
  },
  {
    q: '¿Cuánto dura el tratamiento DBT-SUD?',
    a: 'El programa estándar tiene una duración aproximada de doce a dieciocho meses, organizado en fases que cubren los cuatro módulos de habilidades adaptados al consumo. La duración real se ajusta a la severidad clínica, la comorbilidad estructural presente y los objetivos individuales acordados con el equipo tratante.',
  },
  {
    q: '¿Es reembolsable por Isapre?',
    a: 'Sí. Emitimos boleta de honorarios médica reembolsable parcialmente según el plan de salud privado de cada consultante. Nuestro equipo administrativo acompaña al consultante en la gestión documental del trámite.',
  },
]

// Bibliografía primaria
const bibliografia = [
  {
    cita: 'Linehan, M. M., Schmidt, H., Dimeff, L. A., Craft, J. C., Kanter, J., & Comtois, K. A. (1999). Dialectical behavior therapy for patients with borderline personality disorder and drug-dependence. American Journal on Addictions, 8(4), 279–292.',
  },
  {
    cita: 'Linehan, M. M., Dimeff, L. A., Reynolds, S. K., Comtois, K. A., Welch, S. S., Heagerty, P., & Kivlahan, D. R. (2002). Dialectical behavior therapy versus comprehensive validation therapy plus 12-step for the treatment of opioid dependent women meeting criteria for borderline personality disorder. Drug and Alcohol Dependence, 67(1), 13–26.',
  },
  {
    cita: 'Harned, M. S., Chapman, A. L., Dexter-Mazza, E. T., Murray, A., Comtois, K. A., & Linehan, M. M. (2008). Treating co-occurring Axis I disorders in recurrently suicidal women with borderline personality disorder: A 2-year randomized trial of DBT versus community treatment by experts. Journal of Consulting and Clinical Psychology, 76(6), 1068–1075.',
  },
  {
    cita: 'Marlatt, G. A., & Donovan, D. M. (2005). Relapse Prevention: Maintenance Strategies in the Treatment of Addictive Behaviors (2nd ed.). New York: Guilford Press.',
  },
  {
    cita: 'Miller, W. R., & Rollnick, S. (2012). Motivational Interviewing: Helping People Change (3rd ed.). New York: Guilford Press.',
  },
]

// ── JSON-LD Schema enriquecido ──────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalWebPage',
      '@id': 'https://institutodbtchile.cl/dbt-y-adicciones#webpage',
      url: 'https://institutodbtchile.cl/dbt-y-adicciones',
      name: 'DBT-SUD en Chile · Primer Programa DBT para Adicciones · Instituto DBT Chile',
      inLanguage: 'es-CL',
      isPartOf: { '@id': 'https://institutodbtchile.cl/#website' },
      about: { '@id': 'https://institutodbtchile.cl/dbt-y-adicciones#therapy' },
      breadcrumb: { '@id': 'https://institutodbtchile.cl/dbt-y-adicciones#breadcrumb' },
      audience: {
        '@type': 'PeopleAudience',
        healthCondition: {
          '@type': 'MedicalCondition',
          name: 'Patología dual (Trastorno por uso de sustancias con comorbilidad psiquiátrica)',
          alternateName: ['Dual diagnosis', 'Comorbilidad psiquiátrica y adicciones', 'TLP y consumo de sustancias'],
        },
      },
      citation: bibliografia.map((b) => ({ '@type': 'CreativeWork', name: b.cita })),
    },
    {
      '@type': 'MedicalTherapy',
      '@id': 'https://institutodbtchile.cl/dbt-y-adicciones#therapy',
      name: 'DBT-SUD · Terapia Dialéctico Conductual para Trastornos por Uso de Sustancias',
      alternateName: ['DBT-SUD', 'Dialectical Behavior Therapy for Substance Use Disorders', 'DBT y Adicciones', 'Tratamiento integrado de Patología Dual', 'Primer programa DBT-SUD Chile'],
      description: 'Adaptación clínica del modelo DBT al tratamiento integrado de personas con desregulación emocional severa y conductas problemáticas de consumo de sustancias, conforme al protocolo Linehan-Dimeff. Primer programa DBT-SUD implementado en Chile.',
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
      description: 'Médico especialista con más de cinco años a cargo del Sector Z del Instituto Psiquiátrico Dr. José Horwitz Barak, con formación especializada en DBT-SUD por DBT Iberoamérica.',
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
            <div className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
              <Award className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.18em]">Primer programa DBT-SUD del país</span>
            </div>

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
              Cuando la sustancia opera como un intento desesperado de regular un dolor que el sistema nervioso no logra contener, el tratamiento debe abordar ambas dimensiones simultáneamente. Programa clínico integrado conforme al protocolo Linehan-Dimeff.
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

      {/* ── Necesidad clínica urgente ────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Marco clínico
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                Una necesidad <em className="font-serif italic text-primary">urgente</em> en salud mental
              </h2>
            </div>

            <div className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                En Chile, la coexistencia de <strong>trastornos por consumo de sustancias (SUD)</strong> con <strong>trastornos de personalidad</strong> y trauma complejo plantea un desafío clínico mayúsculo. Los programas tradicionales se han centrado en la abstinencia, el control de estímulos y la prevención de recaídas, sin ofrecer una respuesta suficiente a personas que, además del consumo, presentan <em className="italic">desregulación emocional grave, ideación suicida y conductas autolesivas</em>.
              </p>
              <p>
                El <strong>Instituto DBT Chile</strong> responde a esta necesidad con un hito histórico: <strong>el primer programa DBT-SUD del país</strong>, adaptación de la Terapia Dialéctico Conductual diseñada para consultantes con consumo problemático y trastornos emocionales severos. No es solo un avance clínico: es un cambio de paradigma cultural en cómo se entiende y aborda la complejidad de estas problemáticas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ¿Qué es DBT-SUD? ─────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Modelo terapéutico
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                ¿Qué es la <em className="font-serif italic text-primary">DBT-SUD</em>?
              </h2>
            </div>

            <div className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                La <strong>DBT-SUD</strong> (Dialectical Behavior Therapy for Substance Use Disorders) es una adaptación creada por <strong>Marsha Linehan y Linda Dimeff</strong> en la Universidad de Washington. Mantiene la esencia de la DBT estándar —regulación emocional, tolerancia al malestar, mindfulness y efectividad interpersonal— e incorpora estrategias específicas para el tratamiento de adicciones.
              </p>
              <p>
                El concepto central del modelo es la <strong>abstinencia dialéctica</strong>: la meta clínica es la abstinencia total, pero si ocurre una recaída, ésta se integra al proceso terapéutico como oportunidad de aprendizaje y no como fracaso. Con este modelo, el consumo deja de ser un círculo de culpa y abandono y se transforma en un proceso dialéctico de ensayo, error y aprendizaje.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Estrategias específicas DBT-SUD ──────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Estrategias específicas
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Cuatro herramientas <em className="font-serif italic text-primary">propias del modelo</em>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Lo que distingue clínicamente a DBT-SUD de cualquier otro abordaje de adicciones: estrategias diseñadas específicamente para el cruce entre desregulación emocional y consumo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {estrategiasDBTSUD.map((e, i) => (
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

      {/* ── Comparativa de modelos ───────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Posicionamiento clínico
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                DBT-SUD frente a otros <em className="font-serif italic text-primary">modelos de tratamiento</em>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                La innovación de DBT-SUD se entiende mejor al contrastarla con los enfoques tradicionales de adicciones.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {comparativaModelos.map((m, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-7 border ${
                    m.destacado
                      ? 'border-2 border-primary/40 bg-gradient-to-br from-primary/5 via-white to-emerald-50/50 shadow-xl'
                      : 'border-gray-100 bg-white shadow-sm'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className={`text-lg font-semibold ${m.destacado ? 'text-primary' : 'text-gray-900'}`}>
                      {m.nombre}
                    </h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                      m.destacado ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {m.sigla}
                    </span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Objetivo central</div>
                      <p className="text-gray-700 leading-relaxed">{m.objetivo}</p>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Evidencia</div>
                      <p className="text-gray-700 leading-relaxed">{m.evidencia}</p>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">{m.destacado ? 'Fortaleza diferencial' : 'Limitaciones'}</div>
                      <p className="text-gray-700 leading-relaxed">{m.limite}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Evidencia científica ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Base empírica
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Evidencia científica <em className="font-serif italic text-primary">internacional</em>
              </h2>
            </div>

            <div className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Los estudios sobre DBT-SUD son contundentes y se sostienen en seguimientos a largo plazo. Los consultantes no solo logran disminuir el consumo: mejoran su capacidad de regular emociones, su sentido de propósito vital y su calidad de vida global.
              </p>
              <div className="space-y-4 mt-6 pl-5 border-l-2 border-primary/30">
                <div>
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Linehan et al. (1999)</div>
                  <p className="text-sm leading-relaxed">En consultantes con TLP y dependencia de sustancias, la DBT-SUD redujo significativamente los días de consumo, las conductas suicidas y mejoró la retención respecto al tratamiento habitual.</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Harned et al. (2008)</div>
                  <p className="text-sm leading-relaxed">DBT-SUD mantuvo mayor adherencia y menores recaídas que la terapia comunitaria experta en adicciones, en mujeres recurrentemente suicidas con TLP.</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Marlatt &amp; Donovan (2005)</div>
                  <p className="text-sm leading-relaxed">La prevención de recaídas requiere un enfoque compasivo y estructurado, lo cual DBT-SUD integra de forma única en la literatura clínica disponible.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Equipo clínico ───────────────────────────────────────────── */}
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

      {/* ── Componentes operativos del programa ──────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-3 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
                Arquitectura clínica
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Componentes del <em className="font-serif italic text-primary">programa íntegro</em>
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Seis componentes simultáneos. Sin atajos, sin versiones reducidas, sin fragmentación entre lo psiquiátrico y lo adictivo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {componentesOperativos.map((c, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-xl border border-gray-100 bg-gray-50/40 hover:bg-white hover:shadow-md transition-all">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{c.titulo}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{c.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Impacto para Chile ───────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-emerald-50/40 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="mb-3 text-xs font-medium text-primary uppercase tracking-[0.2em]">
                Hito clínico nacional
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                Impacto para <em className="font-serif italic text-primary">Chile</em>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl font-serif font-light text-primary mb-2">01</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Primera vez en Chile</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Nunca antes se había implementado un programa DBT especializado en adicciones bajo protocolo Linehan-Dimeff íntegro en el país.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl font-serif font-light text-primary mb-2">02</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Población objetivo</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Consultantes con consumo problemático y desregulación emocional severa, ideación suicida recurrente o trauma complejo.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl font-serif font-light text-primary mb-2">03</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Modelo pionero</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Integra la evidencia internacional con la realidad clínica chilena, adaptando materiales, ejemplos y contextos culturales.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl font-serif font-light text-primary mb-2">04</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">Cambio de paradigma</h3>
                <p className="text-sm text-gray-600 leading-relaxed">En lugar de culpar y excluir a quienes recaen, se les integra y acompaña en un proceso de aprendizaje y resiliencia.</p>
              </div>
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

      {/* ── Bibliografía ─────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
              <h2 className="text-base font-semibold text-gray-700 uppercase tracking-[0.18em]">Bibliografía clínica</h2>
            </div>
            <ol className="space-y-4 list-decimal list-inside text-sm text-gray-600 leading-relaxed">
              {bibliografia.map((b, i) => (
                <li key={i} className="pl-2"><span className="italic">{b.cita}</span></li>
              ))}
            </ol>
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
