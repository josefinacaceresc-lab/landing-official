'use client'

/**
 * FAQ Section — Home page · Instituto DBT Chile
 * ─────────────────────────────────────────────────────────────────────────
 * Purpose:
 *   1. Provide clinically rigorous answers to the 8 most frequently searched
 *      questions about DBT in Chile (high SEO value).
 *   2. Inject FAQPage JSON-LD schema so Google can show these answers as
 *      Featured Snippets / Rich Results.
 *   3. Inject Speakable schema so voice assistants (Siri, Google Home, Alexa)
 *      can read these answers aloud.
 *
 * Design language:
 *   - Premium European clinical aesthetic (consistent with the rest of the site)
 *   - Serif italics for emphasis (font-serif italic)
 *   - Cream/gray background, no green fluorescent colors
 *   - No emoji, no "salesy" tone
 *
 * Editorial guidelines (CRITICAL):
 *   - Always say "consultante", never "paciente"
 *   - Use Spanish formal register
 *   - Cite evidence when relevant (e.g., "más de 30 ECAs")
 *   - Never make medical promises (avoid "cura", "garantiza")
 *   - Always written in plural ("nuestro equipo", "atendemos") = institutional
 */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  {
    q: '¿Qué es la terapia DBT?',
    a: 'La Terapia Dialéctico Conductual (DBT) es un tratamiento psicoterapéutico basado en evidencia, desarrollado por la Dra. Marsha Linehan en la Universidad de Washington. Integra estrategias cognitivo-conductuales con prácticas de mindfulness y aceptación, organizado en cuatro módulos centrales: mindfulness, regulación emocional, tolerancia al malestar y efectividad interpersonal.',
  },
  {
    q: '¿En qué se diferencia DBT de la terapia tradicional?',
    a: 'A diferencia de la psicoterapia individual convencional, DBT estándar es un programa estructurado que combina cuatro componentes simultáneos: terapia individual, entrenamiento grupal en habilidades, coaching telefónico entre sesiones y equipo de consultoría para terapeutas. Esta arquitectura multimodal está diseñada específicamente para personas con desregulación emocional severa y conductas clínicamente complejas.',
  },
  {
    q: '¿DBT funciona para el Trastorno Límite de la Personalidad?',
    a: 'Sí. DBT es el tratamiento con mayor evidencia empírica acumulada para el Trastorno Límite de la Personalidad, con más de treinta ensayos clínicos aleatorizados publicados. La literatura muestra reducciones significativas y sostenidas en conductas suicidas, autolesiones no suicidas, hospitalizaciones psiquiátricas y mejoras consistentes en el funcionamiento global del consultante.',
  },
  {
    q: '¿Cuánto dura el tratamiento DBT estándar?',
    a: 'El programa DBT estándar tiene una duración aproximada de doce meses, organizados en dos ciclos de seis meses que cubren los cuatro módulos de habilidades. Algunos consultantes consolidan los aprendizajes en seis a nueve meses; otros requieren extensiones según la severidad clínica, la comorbilidad presente y los objetivos individuales acordados con el equipo tratante.',
  },
  {
    q: '¿Dónde queda el Instituto DBT Chile?',
    a: 'Nuestras instalaciones clínicas se encuentran en Vitacura, Santiago de Chile. Atendemos a consultantes de la Región Metropolitana y de todo el país, con modalidades presencial y telemática según indicación clínica.',
  },
  {
    q: '¿Atienden online o solo presencial?',
    a: 'Ofrecemos ambas modalidades. La indicación entre formato presencial, híbrido o telemático se establece tras la valoración inicial considerando severidad clínica, perfil de riesgo, comorbilidad y preferencia del consultante. La evidencia disponible muestra que las habilidades DBT y la terapia individual mantienen su eficacia en formato online cuando se aplican con fidelidad al protocolo original.',
  },
  {
    q: '¿Quién dirige el Instituto DBT Chile?',
    a: 'La dirección clínica y científica del Instituto está a cargo de la Dra. Josefina Cáceres Cortés, Ph.D., con formación internacional en Terapia Dialéctico Conductual y en Terapia de Esquemas. Es representante institucional de la World Dialectical Behavior Therapy Association (WDBTA) en Chile, miembro de la International Society of Schema Therapy (ISST) y de la American Psychological Association (APA).',
  },
  {
    q: '¿Tienen formación internacional certificada?',
    a: 'Sí. Nuestro equipo cuenta con formación en DBT por entrenadores certificados internacionalmente, manteniendo diálogo académico continuo con centros vinculados al modelo original de Marsha Linehan. El Instituto DBT Chile es miembro institucional de la World Dialectical Behavior Therapy Association (WDBTA), única representación de este organismo en el país.',
  },
]

/**
 * JSON-LD FAQPage schema — invisible to users, read by Google / AI engines.
 * Each Question + Answer pair produces a Featured Snippet candidate.
 * The Speakable property at the page level signals voice-assistant readability.
 */
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://institutodbtchile.cl/#faq',
  inLanguage: 'es-CL',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.faq-question', '.faq-answer'],
  },
  isPartOf: {
    '@type': 'MedicalClinic',
    '@id': 'https://institutodbtchile.cl/#clinic',
  },
}

export default function FAQSection() {
  return (
    <section
      id="preguntas-frecuentes"
      aria-labelledby="faq-title"
      className="py-24 bg-white border-t border-gray-100"
    >
      {/* JSON-LD: FAQPage + Speakable schema (invisible to humans, read by SEO/AI) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-14">
            <div className="mb-4 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
              Información clínica · Resolución de dudas frecuentes
            </div>
            <h2
              id="faq-title"
              className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight"
            >
              Preguntas <em className="font-serif italic text-primary">frecuentes</em>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Respuestas claras y basadas en evidencia sobre el tratamiento DBT y nuestro modelo clínico. Si tu consulta no aparece aquí, te invitamos a escribirnos directamente.
            </p>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border border-gray-200 rounded-lg px-5 bg-white hover:border-primary/40 transition-colors"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-medium text-gray-900 hover:text-primary py-5 hover:no-underline">
                  <span className="faq-question">{item.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-[15px] leading-relaxed pb-5 pt-1">
                  <p className="faq-answer">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Bottom note */}
          <p className="text-center text-xs text-gray-500 mt-10 leading-relaxed">
            Esta información tiene fines educativos y no reemplaza una valoración clínica personalizada.<br />
            Para una evaluación adaptada a tu situación específica, contáctanos directamente.
          </p>
        </div>
      </div>
    </section>
  )
}
