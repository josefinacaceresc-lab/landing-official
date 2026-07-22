'use client'

/**
 * Preprint: Apofenia Relacional Recursiva (ARR)
 * Author: Josefina Cáceres Cortés · Instituto DBT Chile · NexaryaLabs
 * DOI: 10.5281/zenodo.21346541
 *
 * Design: Ultra-luxury academic (Nature / JAMA Psychiatry standard).
 * Client component because react-katex requires it.
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Download, ArrowLeft, BookOpen, FileText, ExternalLink } from 'lucide-react'
import 'katex/dist/katex.min.css'
import { BlockMath, InlineMath } from 'react-katex'

const DOI = '10.5281/zenodo.21346541'
const DOI_URL = `https://doi.org/${DOI}`
const ZENODO_URL = 'https://zenodo.org/records/21346541'
const DOCX_URL = '/articulos/apofenia-relacional-recursiva.docx'
const PAGE_URL = 'https://institutodbtchile.cl/investigacion/preprint-apofenia-relacional-recursiva'

const TITLE_FULL = 'Apofenia Relacional Recursiva: un punto ciego en la Teoría de los Marcos Relacionales, su mecanismo en el procesamiento predictivo, y su validación por simulación agéntica con convergencia emergente al modelo biosocial'

// ScholarlyArticle JSON-LD schema (Google Scholar + AI engines)
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  '@id': `${PAGE_URL}#article`,
  headline: TITLE_FULL,
  alternativeHeadline: 'Recursive Relational Apophenia (ARR)',
  abstract: 'La Teoría de los Marcos Relacionales (TMR) explica la cognición como respuesta relacional derivada arbitrariamente aplicable. Este artículo identifica un punto ciego —el registro funcional de la transformación de funciones— y propone el concepto de ignición eidética y el operador ARR (radio espectral del subgrafo relacional de amenaza), validado por simulación agéntica con convergencia emergente al modelo biosocial de Linehan.',
  inLanguage: 'es-CL',
  datePublished: '2026-01-01',
  dateModified: '2026-01-01',
  author: {
    '@type': 'Person',
    name: 'Josefina Cáceres Cortés',
    email: 'jcaceres@institutodbtchile.cl',
    affiliation: [
      { '@type': 'MedicalOrganization', name: 'Instituto DBT Chile', url: 'https://institutodbtchile.cl' },
      { '@type': 'Organization', name: 'NexaryaLabs', url: 'https://www.nexaryalabs.cl' },
    ],
    sameAs: 'https://institutodbtchile.cl/equipo',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Instituto DBT Chile',
    url: 'https://institutodbtchile.cl',
    logo: 'https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/508ec6e06fbe47fd935a5e124ba0eae3_logodbt_vertical%2050-50.jpg',
  },
  about: ['Teoría de los Marcos Relacionales', 'Rumiación', 'Procesamiento Predictivo', 'Modelo Biosocial', 'Señales de Alerta Temprana', 'DBT'],
  keywords: 'Teoría de los Marcos Relacionales, rumiación, procesamiento predictivo, modelo biosocial, señales de alerta temprana, simulación basada en agentes, fenotipado digital por voz, apofenia relacional recursiva, ignición eidética',
  url: PAGE_URL,
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'DOI',
    value: DOI,
    url: DOI_URL,
  },
  sameAs: [DOI_URL, ZENODO_URL],
  citation: `Cáceres Cortés, J. (2026). ${TITLE_FULL}. Zenodo. ${DOI_URL}`,
  isPartOf: {
    '@type': 'Series',
    name: 'La Mente Algorítmica · Programa de Investigación Doctoral',
    url: 'https://institutodbtchile.cl/investigacion/la-mente-algoritmica',
  },
}

const keywords = [
  'Teoría de los Marcos Relacionales', 'rumiación', 'procesamiento predictivo',
  'modelo biosocial', 'señales de alerta temprana', 'simulación basada en agentes',
  'fenotipado digital por voz', 'ignición eidética', 'apofenia relacional recursiva',
]

const sections = [
  {
    num: '1',
    title: 'Introducción',
    intro: 'La desregulación emocional grave rara vez irrumpe sin preparación: un evento menor activa una cadena de pensamiento repetitivo que estrecha la atención, confirma la amenaza anticipada y culmina —horas después— en crisis conductual. Persisten dos brechas: carecemos de una cuenta mecanicista de por qué el bucle rumiativo se vuelve autónomo, y de un instrumento que detecte esa autonomización en tiempo real desde el habla espontánea.',
  },
  {
    num: '2',
    title: 'Trabajo relacionado y delimitación de la contribución',
    intro: 'El constructo colinda con tres literaturas maduras. Se delimita explícitamente qué toma de cada una y qué añade que ninguna contiene.',
    subsections: [
      { id: '2.1', title: 'Pensamiento repetitivo negativo (rasgo vs. estado)' },
      { id: '2.2', title: 'Procesamiento predictivo, priors fuertes y psicosis' },
      { id: '2.3', title: 'Señales de alerta temprana y sistemas dinámicos' },
      { id: '2.4', title: 'Síntesis de la novedad reclamada' },
    ],
  },
  {
    num: '3',
    title: 'El punto ciego de la TMR',
    intro: 'La TMR formaliza qué funciones se transforman, pero no distingue el registro funcional de esa transformación. Se nombran dos pliegues no vistos: la ignición eidética (el cruce de función evaluativa a cuasi-perceptual con juicio de realidad conservado) y el control contextual endógeno (la red se vuelve su propio contexto).',
    subsections: [
      { id: '3.1', title: 'Lo que la TMR sí formaliza' },
      { id: '3.2', title: 'Primer pliegue: el registro funcional de la transformación' },
      { id: '3.3', title: 'Segundo pliegue: control contextual endógeno' },
      { id: '3.4', title: 'El mecanismo del cruce (procesamiento predictivo)' },
    ],
  },
  {
    num: '4',
    title: 'Formalización del operador ARR',
    intro: 'Se define ARR como el radio espectral del subgrafo de funciones aversivas, construido desde el parseo relacional del habla. El régimen supercrítico (ρ ≥ 1) indexa el atractor apofénico; su deriva constituye la señal de alerta temprana.',
    subsections: [
      { id: '4.1', title: 'Parseo relacional del habla (tripletas ⟨A, marco, B⟩)' },
      { id: '4.2', title: 'Grafo relacional dinámico y cuatro indicadores' },
      { id: '4.3', title: 'El operador y su régimen crítico (ρ = 1)' },
      { id: '4.4', title: 'Índice de ignición eidética (IE)' },
    ],
  },
  {
    num: '5',
    title: 'Operacionalización y flujo de cómputo',
    intro: 'Pipeline sobre audio conversacional en español: transcripción robusta a ruido, extracción prosódica, parseo relacional auditable, actualización del grafo y cómputo de ρ e IE, con sello temporal para análisis de precedencia. Todos los parámetros se congelan y depositan públicamente antes de la recolección.',
  },
  {
    num: '6',
    title: 'Validación por simulación agéntica',
    intro: 'Simulación diseñada para poder fallar: 400 agentes, 72 h. Una ablación que desacopla la ignición reduce las crisis de 377 a 6 episodios (el mecanismo es generativo); el radio espectral anticipa las crisis agudas con mediana de 9.6 h; emergen dos regímenes (crónico 27% / agudo 73%).',
    subsections: [
      { id: '6.1', title: 'Lógica: un modelo diseñado para poder fallar' },
      { id: '6.2', title: 'Arquitectura (400 agentes · 432 pasos)' },
      { id: '6.3', title: 'Resultados: ablación, anticipación, regímenes y comparador' },
    ],
  },
  {
    num: '7',
    title: 'Convergencia emergente con el modelo biosocial',
    intro: 'El modelo reproduce —sin haber sido programado para ello— tres de los cuatro rasgos de la curva de respuesta del modelo biosocial (Linehan, 1993), incluido el retorno lento a la línea base, que se identifica formalmente con el enlentecimiento crítico de la teoría de transiciones.',
  },
  {
    num: '8',
    title: 'Predicciones falsables y condiciones de frontera',
    intro: 'Se declara una cascada de predicciones falsables con comparadores predefinidos y adjudicación clínica ciega. Se establece que la ignición eidética no es psicosis: conserva el juicio de realidad, se ancla a la red autobiográfica y es reversible por perturbación contextual.',
  },
  {
    num: '9',
    title: 'Implicaciones teóricas: dos regímenes de un operador',
    intro: 'ARR es la proyección dinámica sobre conducta verbal de un subconjunto de la red bayesiana de 22 nodos del programa, cuyo fundamento —el sufrimiento crónico como Disonancia Lógica Absoluta— se desarrolla en Cáceres Cortés (2026).',
  },
  {
    num: '10',
    title: 'Limitaciones',
    intro: 'Sesgos posibles del modelo de lenguaje en el parseo, inferencia conductual-lingüística de la razón de precisiones, muestreo intermitente, y la naturaleza del mundo simulado (corrobora consistencia, no verdad). El conflicto de interés estructural se mitiga por depósito previo, adjudicación ciega y compromiso de publicar resultados negativos.',
  },
  {
    num: '11',
    title: 'Conclusión',
    intro: 'La TMR explicó cómo el lenguaje construye redes que transforman funciones; nunca formalizó el umbral en que esas funciones cambian de registro. Este artículo nombra ambos pliegues, les da mecanismo y los vuelve medibles mediante un operador cuyo radio espectral formaliza la frontera entre rumiar y estar atrapado.',
  },
]

export default function PreprintARRPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* JSON-LD: ScholarlyArticle schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ─── Breadcrumb ─────────────────────────────────────────────── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/investigacion"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Investigación científica</span>
          </Link>
        </div>
      </div>

      {/* ─── Hero / Article Header ─────────────────────────────────── */}
      <section className="py-16 md:py-24 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium tracking-wider uppercase">
                <FileText className="w-3 h-3" />
                Preprint · 2026
              </span>
              <a
                href={DOI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium tracking-wider hover:bg-blue-100 transition-colors"
                aria-label={`DOI ${DOI} — abrir en doi.org`}
              >
                <BookOpen className="w-3 h-3" />
                DOI: {DOI}
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-xs text-gray-400 uppercase tracking-[0.2em]">
                La Mente Algorítmica
              </span>
            </div>

            {/* Title — serif editorial */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.12] text-gray-900 mb-6 tracking-tight">
              Apofenia Relacional Recursiva:{' '}
              <em className="text-primary not-italic font-normal">un punto ciego en la Teoría de los Marcos Relacionales</em>
            </h1>

            {/* Subtitle */}
            <p className="font-serif italic text-lg md:text-xl text-gray-600 mb-10 leading-snug">
              Su mecanismo en el procesamiento predictivo y su validación por simulación agéntica con convergencia emergente al modelo biosocial
            </p>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pb-10 border-b border-gray-200">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Autora</div>
                <div className="text-sm font-medium text-gray-900">Josefina Cáceres Cortés</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Afiliación</div>
                <div className="text-sm font-medium text-gray-900">Instituto DBT Chile · NexaryaLabs</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Año</div>
                <div className="text-sm font-medium text-gray-900">2026</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Estado</div>
                <div className="text-sm font-medium text-gray-900">Preprint · Zenodo</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 h-14 text-base font-medium shadow-md hover:shadow-lg transition-all"
              >
                <a href={DOI_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3">
                  <ExternalLink className="w-5 h-5" />
                  Ver versión de registro (DOI)
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 h-14 px-6"
              >
                <a href={DOCX_URL} download className="inline-flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Descargar manuscrito (DOCX)
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 h-14 px-6"
              >
                <Link href="/investigacion/la-mente-algoritmica" className="inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Programa completo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Abstract ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-6 text-center">
              Resumen
            </div>
            <div className="prose prose-lg max-w-none font-serif text-gray-800 leading-relaxed">
              <p className="text-lg">
                La <strong className="text-gray-900">Teoría de los Marcos Relacionales (TMR)</strong> explica la cognición humana como respuesta relacional derivada arbitrariamente aplicable y ofrece una cuenta funcional de la rumiación como derivación combinatoria con transformación de funciones aversivas. Este artículo identifica un <em>punto ciego</em>: la teoría formaliza qué funciones se transforman, pero no distingue el <strong className="text-gray-900">registro funcional</strong> de esa transformación —el umbral en que una relación derivada deja de portar funciones evaluativas y adquiere funciones cuasi-perceptuales.
              </p>
              <p className="text-lg">
                Proponemos denominar a ese cruce <em className="text-primary not-italic">ignición eidética</em> y mostramos que su mecanismo es descriptible en el procesamiento predictivo como sobreponderación de la precisión de priors derivados. Identificamos, además, una segunda condición: el <strong className="text-gray-900">control contextual endógeno</strong>, en que la red relacional se convierte en su propio contexto y el bucle deja de requerir input del mundo.
              </p>
              <p className="text-lg">
                Formalizamos el operador <strong className="text-gray-900">ARR (Apofenia Relacional Recursiva)</strong> como el <InlineMath math={'\\rho(W_t)'} />, radio espectral del subgrafo relacional de amenaza construido desde habla espontánea, cuyo régimen supercrítico (<InlineMath math={'\\rho \\geq 1'} />) indexa el atractor apofénico y cuya deriva constituye una señal de alerta temprana.
              </p>
              <p className="text-lg">
                Sometemos el modelo a una <strong className="text-gray-900">simulación agéntica</strong> (400 agentes, 72 h) diseñada para poder fallar. Una ablación que desacopla la ignición reduce las crisis de 377 a 6 episodios; el radio espectral anticipa las crisis agudas con mediana de 9.6 h; emergen dos regímenes (crónico 27% / agudo 73%); y el modelo reproduce, sin ajuste, tres de los cuatro rasgos de la curva biosocial de Linehan (1993), incluido el retorno lento a la línea base, identificado con el enlentecimiento crítico.
              </p>
            </div>

            {/* Keywords */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">Palabras clave</div>
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw) => (
                  <span key={kw} className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-mono lowercase">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* ─── Cómo citar (APA + BibTeX) ─────────────────────── */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-4">
                Cómo citar este preprint
              </div>

              {/* APA */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">APA 7ª ed.</div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 font-serif text-sm md:text-base text-gray-800 leading-relaxed">
                  Cáceres Cortés, J. (2026). <em>{TITLE_FULL}</em> [Preprint]. Zenodo.
                  {' '}
                  <a href={DOI_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    https://doi.org/{DOI}
                  </a>
                </div>
              </div>

              {/* BibTeX */}
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">BibTeX</div>
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-5 text-xs md:text-sm overflow-x-auto font-mono leading-relaxed">
{`@misc{caceres2026apofenia,
  author       = {C{\\'a}ceres Cort{\\'e}s, Josefina},
  title        = {Apofenia Relacional Recursiva: un punto ciego en la Teor{\\'i}a de los Marcos Relacionales},
  year         = {2026},
  publisher    = {Zenodo},
  doi          = {${DOI}},
  url          = {${DOI_URL}},
  note         = {Preprint}
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Core Formalism: Featured Equation ────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-xs text-amber-400/80 uppercase tracking-[0.3em] mb-4">
              El operador ARR
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mb-10 text-white/95">
              El radio espectral del subgrafo de amenaza
            </h2>
            <div className="bg-black/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-white/10">
              <div className="text-white text-2xl md:text-3xl">
                <BlockMath math={'\\mathrm{ARR}_t = \\rho(W_t) = \\max_i \\; |\\lambda_i(W_t)|'} />
              </div>
              <p className="text-sm text-white/60 mt-6 leading-relaxed font-serif italic">
                Si <InlineMath math={'\\rho < 1'} />, la propagación es contractiva y las perturbaciones se disipan. Si <InlineMath math={'\\rho \\geq 1'} />, cada ciclo amplifica la activación que lo produjo: el bucle es supercrítico y el atractor apofénico se autoalimenta. El umbral <InlineMath math={'\\rho = 1'} /> formaliza la frontera entre <em>rumiar</em> y <em>estar atrapado</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Sections / TOC with intros ────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-8 text-center">
              Estructura del manuscrito
            </div>

            <div className="space-y-12">
              {sections.map((sec) => (
                <article key={sec.num} className="group">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-mono text-sm text-amber-600/80">{sec.num}.</span>
                    <h2 className="font-serif text-2xl md:text-3xl text-gray-900 leading-tight">
                      {sec.title}
                    </h2>
                  </div>
                  <p className="text-gray-700 text-base leading-relaxed font-serif ml-8">
                    {sec.intro}
                  </p>
                  {sec.subsections && (
                    <ul className="mt-4 ml-8 space-y-1">
                      {sec.subsections.map((sub) => (
                        <li key={sub.id} className="text-sm text-gray-500">
                          <span className="font-mono text-xs text-amber-600/60 mr-2">{sub.id}.</span>
                          {sub.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Key Results Tables ────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#FAF7F2] border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-3 text-center">
              Resultados de la simulación
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-12 text-center">
              Hallazgos <em className="text-primary">cardinales</em>
            </h2>

            {/* Ablation highlight */}
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                <div className="font-mono text-3xl font-light text-gray-900">377 → 6</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-2">Crisis tras ablar la ignición (mecanismo generativo)</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                <div className="font-mono text-3xl font-light text-gray-900">9.6 h</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-2">Anticipación mediana de la crisis aguda (ρ)</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                <div className="font-mono text-3xl font-light text-gray-900">27 / 73%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-2">Regímenes emergentes: crónico / agudo</div>
              </div>
            </div>

            {/* Table 2 — Biosocial convergence */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm overflow-x-auto">
              <div className="text-xs text-amber-700 uppercase tracking-wider mb-4 font-medium">
                Tabla · Convergencia emergente con el modelo biosocial (Linehan, 1993)
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-gray-500">
                    <th className="py-2 pr-4 font-semibold">Rasgo</th>
                    <th className="py-2 px-3 font-semibold">Desregulados</th>
                    <th className="py-2 px-3 font-semibold">Regulados</th>
                    <th className="py-2 pl-3 font-semibold">Concordancia</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Línea base</td><td className="py-2 px-3 font-mono">0.247</td><td className="py-2 px-3 font-mono">0.138</td><td className="py-2 pl-3">Sensibilidad basal ↑</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Pico promedio</td><td className="py-2 px-3 font-mono">0.353</td><td className="py-2 px-3 font-mono">0.177</td><td className="py-2 pl-3">Reactividad ↑ (×2)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Retorno al 90%</td><td className="py-2 px-3 font-mono">10.0 h</td><td className="py-2 px-3 font-mono">1.2 h</td><td className="py-2 pl-3">Retorno lento (×8)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Pendiente de subida</td><td className="py-2 px-3 font-mono">—</td><td className="py-2 px-3 font-mono">—</td><td className="py-2 pl-3 text-gray-400">No diferenciada</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-600 mt-4 font-serif italic">
                Tres de cuatro rasgos emergen espontáneamente; el más característico —retorno lento— es el más marcado, e identifica el enlentecimiento crítico (Scheffer et al., 2009) con la clínica de la desregulación.
              </p>
            </div>

            <p className="text-center text-sm text-gray-500 mt-12 font-serif italic">
              El manuscrito completo incluye el protocolo agéntico de replicación (Apéndice A) con pseudocódigo y parámetros congelados, y la cascada de predicciones falsables con comparadores predefinidos.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-4">
              Acceso al manuscrito
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 leading-tight">
              Leer el preprint completo
            </h2>
            <p className="text-base text-gray-600 mb-10 leading-relaxed">
              Versión de registro depositada en Zenodo con DOI permanente.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-10 h-14 text-base font-medium shadow-md hover:shadow-lg transition-all"
              >
                <a href={DOI_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3">
                  <ExternalLink className="w-5 h-5" />
                  Ver en Zenodo (DOI)
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 h-14 px-8"
              >
                <a href={DOCX_URL} download className="inline-flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Descargar (DOCX)
                </a>
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-8 leading-relaxed max-w-md mx-auto">
              Cita sugerida: Cáceres Cortés, J. (2026). <em className="font-serif">Apofenia Relacional Recursiva…</em> Zenodo. https://doi.org/{DOI}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
