'use client'

/**
 * Preprint: Procesamiento psicológico como sistema de inferencia activa
 * Author: Dra. Josefina Cáceres, Ph.D. · Instituto DBT Chile
 * Date: Mayo 2026
 *
 * Design: Ultra-luxury academic. Serif typography, generous whitespace,
 * KaTeX-rendered equations. Inspired by Nature, JAMA Psychiatry and NEJM
 * editorial standards.
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Download, ArrowLeft, BookOpen, Calendar, User, FileText, ExternalLink } from 'lucide-react'
import 'katex/dist/katex.min.css'
import { BlockMath, InlineMath } from 'react-katex'

const PDF_URL = 'https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/5446dac1f0494c63ba43949b795c6f34_preprint_inferencia_activa.pdf'
const DOI = '10.5281/zenodo.20369629'
const DOI_URL = `https://doi.org/${DOI}`
const ZENODO_URL = 'https://zenodo.org/records/20369629'

// ScholarlyArticle JSON-LD schema (Google Scholar + AI engines)
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  '@id': 'https://institutodbtchile.cl/investigacion/preprint-inferencia-activa#article',
  headline: 'Procesamiento psicológico como sistema de inferencia activa: Fundamentos computacionales de la coherencia y el sufrimiento',
  alternativeHeadline: 'Active Inference Framework for Psychological Processing',
  abstract: 'Marco computacional que formaliza el procesamiento psicológico humano como sistema de inferencia activa, donde la coherencia interna se modela como minimización de energía libre variacional y el sufrimiento emerge como un estado de error de predicción persistente (Disonancia Lógica Absoluta, DLA).',
  inLanguage: 'es-CL',
  datePublished: '2026-05-01',
  dateModified: '2026-05-22',
  author: {
    '@type': 'Person',
    name: 'Josefina Cáceres',
    honorificSuffix: 'Ph.D.',
    email: 'jcaceres@institutodbtchile.cl',
    affiliation: {
      '@type': 'MedicalOrganization',
      name: 'Instituto DBT Chile',
      url: 'https://institutodbtchile.cl',
    },
    sameAs: 'https://institutodbtchile.cl/equipo',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Instituto DBT Chile',
    url: 'https://institutodbtchile.cl',
    logo: 'https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/508ec6e06fbe47fd935a5e124ba0eae3_logodbt_vertical%2050-50.jpg',
  },
  about: ['Inferencia Activa', 'Energía Libre Variacional', 'Sufrimiento Psicológico', 'Red Bayesiana', 'DBT'],
  keywords: 'inferencia activa, energía libre variacional, sufrimiento, disonancia lógica absoluta, red bayesiana, procesamiento psicológico, coherencia, DBT, regulación emocional',
  url: 'https://institutodbtchile.cl/investigacion/preprint-inferencia-activa',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'DOI',
    value: '10.5281/zenodo.20369629',
    url: 'https://doi.org/10.5281/zenodo.20369629',
  },
  sameAs: [
    'https://doi.org/10.5281/zenodo.20369629',
    'https://zenodo.org/records/20369629',
  ],
  citation: 'Cáceres Cortés, J. (2026). Procesamiento psicológico como sistema de inferencia activa: Fundamentos computacionales de la coherencia y el sufrimiento. Zenodo. https://doi.org/10.5281/zenodo.20369629',
  encoding: {
    '@type': 'MediaObject',
    encodingFormat: 'application/pdf',
    contentUrl: PDF_URL,
  },
  isPartOf: {
    '@type': 'Series',
    name: 'La Mente Algorítmica · Programa de Investigación Doctoral',
    url: 'https://institutodbtchile.cl/investigacion/la-mente-algoritmica',
  },
}

const sections = [
  {
    id: '1',
    num: '1',
    title: 'Introducción',
    intro: 'El sufrimiento psicológico ha sido históricamente abordado desde marcos fenomenológicos, conductuales y neuroquímicos. Sin embargo, la pregunta computacional fundamental permanece abierta: ¿qué operación formal ejecuta un sistema cognitivo cuando sufre?',
  },
  {
    id: '2',
    num: '2',
    title: 'Marco Teórico: Inferencia Activa y Procesamiento Psicológico',
    intro: 'Formalizamos al agente psicológico como un sistema bayesiano que minimiza activamente la energía libre variacional para mantener coherencia entre su modelo generativo interno y la evidencia sensorial recibida.',
    subsections: [
      { id: '2.1', title: 'El agente como modelo generativo' },
      { id: '2.2', title: 'Coherencia como mínimo global' },
      { id: '2.3', title: 'Sufrimiento como mínimo local patológico' },
    ],
  },
  {
    id: '3',
    num: '3',
    title: 'Disonancia Lógica Absoluta (DLA)',
    intro: 'Introducimos el constructo formal de DLA: un estado en el que el agente sostiene un conjunto de creencias mutuamente contradictorias con alta confianza, generando un atractor patológico que el sistema no puede abandonar sin reestructuración profunda del modelo generativo.',
    subsections: [
      { id: '3.1', title: 'Definición formal' },
      { id: '3.2', title: 'Mecanismo de trampa' },
      { id: '3.3', title: 'Relación con la psicopatología' },
    ],
  },
  {
    id: '4',
    num: '4',
    title: 'Teoremas del Sufrimiento',
    intro: 'Se establecen cuatro teoremas que formalizan las condiciones bajo las cuales el sistema pierde capacidad de actualización bayesiana y queda atrapado en el atractor DLA.',
    theorems: [
      'Teorema 1 · Irreductibilidad del Error',
      'Teorema 2 · Contradicción de Precisión',
      'Teorema 3 · Colapso del Repertorio Activo',
      'Teorema 4 · Recursividad del Meta-Sufrimiento',
    ],
  },
  {
    id: '5',
    num: '5',
    title: 'Regresiones Logísticas del Sistema',
    intro: 'Operacionalizamos el modelo mediante regresiones logísticas multinivel que predicen la probabilidad de sufrimiento crónico a partir de los 22 nodos de la red bayesiana, con efectos aleatorios por participante.',
  },
  {
    id: '6',
    num: '6',
    title: 'Implicaciones Terapéuticas',
    intro: 'El marco propuesto sugiere que la intervención clínica eficaz debe operar simultáneamente sobre los pesos sinápticos del modelo, las políticas de acción y la temperatura de exploración del sistema, alineando coherentemente con los protocolos DBT y Schema Therapy.',
  },
  {
    id: '7',
    num: '7',
    title: 'Conclusión',
    intro: 'El sufrimiento psicológico puede comprenderse como un fenómeno computacional preciso: un agente atrapado en un mínimo local de energía libre cuyas creencias posteriores no pueden converger hacia un modelo generativo coherente.',
  },
]

export default function PreprintInferenciaActivaPage() {
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
            {/* Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium tracking-wider uppercase">
                <FileText className="w-3 h-3" />
                Preprint · Mayo 2026
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
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-gray-900 mb-6 tracking-tight">
              Procesamiento psicológico como sistema de{' '}
              <em className="text-primary not-italic font-normal">inferencia activa</em>
            </h1>

            {/* Subtitle */}
            <p className="font-serif italic text-xl md:text-2xl text-gray-600 mb-10 leading-snug">
              Fundamentos computacionales de la coherencia y el sufrimiento
            </p>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pb-10 border-b border-gray-200">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Autor</div>
                <div className="text-sm font-medium text-gray-900">Josefina Cáceres, Ph.D.</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Afiliación</div>
                <div className="text-sm font-medium text-gray-900">Instituto DBT Chile</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Fecha</div>
                <div className="text-sm font-medium text-gray-900">Mayo 2026</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Estado</div>
                <div className="text-sm font-medium text-gray-900">Preprint v1.0 · Zenodo</div>
              </div>
            </div>

            {/* Download CTA — Premium */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 h-14 text-base font-medium shadow-md hover:shadow-lg transition-all"
              >
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Descargar Manuscrito (PDF)
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 h-14 px-6"
              >
                <a
                  href={ZENODO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ver en Zenodo
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
                <strong className="text-gray-900">Objetivo.</strong> Proponemos un marco computacional que formaliza el procesamiento psicológico humano como un sistema de inferencia activa (<em>Active Inference</em>), donde la coherencia interna del agente se modela como la minimización de energía libre variacional y el sufrimiento emerge como un estado de error de predicción persistente e irreductible: la <em>Disonancia Lógica Absoluta</em> (DLA).
              </p>
              <p className="text-lg">
                <strong className="text-gray-900">Método.</strong> Se desarrolla una red bayesiana de 22 nodos <InlineMath math={'N = \\{N_1, N_2, \\ldots, N_{22}\\}'} /> que captura las variables latentes del procesamiento emocional-cognitivo. Se formalizan cuatro Teoremas del Sufrimiento mediante lógica proposicional y cálculo variacional. Se propone un protocolo de Evaluación Ecológica Momentánea (EMA) para validación empírica.
              </p>
              <p className="text-lg">
                <strong className="text-gray-900">Resultados.</strong> La DLA se demuestra como condición necesaria y suficiente para el sufrimiento crónico cuando <InlineMath math={'F(q) > \\Theta_{\\text{crit}}'} /> y <InlineMath math={'\\nabla_q F = 0'} /> (mínimo local patológico). Los cuatro teoremas establecen las condiciones formales bajo las cuales el sistema pierde capacidad de actualización.
              </p>
              <p className="text-lg">
                <strong className="text-gray-900">Conclusión.</strong> El sufrimiento psicológico puede comprenderse como un fenómeno computacional preciso: un agente atrapado en un mínimo local de energía libre cuyas creencias posteriores no pueden converger hacia un modelo generativo coherente.
              </p>
            </div>

            {/* Keywords */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">Palabras clave</div>
              <div className="flex flex-wrap gap-2">
                {['inferencia activa', 'energía libre variacional', 'sufrimiento', 'disonancia lógica absoluta', 'red bayesiana', 'procesamiento psicológico', 'coherencia', 'DBT', 'regulación emocional'].map((kw) => (
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
                  Cáceres Cortés, J. (2026). <em>Procesamiento psicológico como sistema de inferencia activa: Fundamentos computacionales de la coherencia y el sufrimiento</em> [Preprint]. Zenodo.
                  {' '}
                  <a
                    href={DOI_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    https://doi.org/{DOI}
                  </a>
                </div>
              </div>

              {/* BibTeX */}
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">BibTeX</div>
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-5 text-xs md:text-sm overflow-x-auto font-mono leading-relaxed">
{`@misc{caceres2026inferencia,
  author       = {C{\\'a}ceres Cort{\\'e}s, Josefina},
  title        = {Procesamiento psicol{\\'o}gico como sistema de inferencia activa: Fundamentos computacionales de la coherencia y el sufrimiento},
  year         = {2026},
  month        = {5},
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
              Energía Libre Variacional
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mb-10 text-white/95">
              La ecuación fundamental del agente
            </h2>
            <div className="bg-black/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-white/10">
              <div className="text-white text-2xl md:text-3xl">
                <BlockMath math={'F(q, s) = D_{KL}\\!\\left[q(\\theta)\\,\\|\\,p(\\theta \\mid s)\\right] + \\mathbb{E}_q\\!\\left[-\\ln p(s \\mid \\theta)\\right]'} />
              </div>
              <p className="text-sm text-white/60 mt-6 leading-relaxed font-serif italic">
                La energía libre variacional <InlineMath math={'F(q, s)'} /> mide la divergencia entre la creencia interna del agente <InlineMath math={'q(\\theta)'} /> y la realidad posterior verdadera <InlineMath math={'p(\\theta \\mid s)'} />, más el error de prediccción esperado.
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
                <article key={sec.id} className="group">
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
                  {sec.theorems && (
                    <div className="mt-5 ml-8 grid sm:grid-cols-2 gap-2">
                      {sec.theorems.map((th) => (
                        <div key={th} className="text-sm text-gray-700 px-4 py-3 rounded-lg bg-amber-50/40 border border-amber-100">
                          {th}
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Key Equations Gallery ─────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[#FAF7F2] border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-3 text-center">
              Formalismo matemático · Selección
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-12 text-center">
              Ecuaciones <em className="text-primary">cardinales</em>
            </h2>

            <div className="space-y-10">
              {/* Coherence */}
              <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
                <div className="text-xs text-amber-700 uppercase tracking-wider mb-3 font-medium">Coherencia (mínimo global)</div>
                <BlockMath math={'\\text{Coherencia} \\iff F(q^*) = \\min F(q) \\;\\wedge\\; \\nabla^2 F > 0'} />
                <p className="text-sm text-gray-600 mt-4 font-serif italic">
                  El agente alcanza coherencia cuando la energía libre está en un mínimo global con curvatura positiva.
                </p>
              </div>

              {/* Suffering */}
              <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
                <div className="text-xs text-amber-700 uppercase tracking-wider mb-3 font-medium">Sufrimiento (mínimo local patológico)</div>
                <BlockMath math={'\\text{Sufrimiento} \\iff \\nabla_q F = 0 \\;\\wedge\\; F(q) > F(q^*) + \\Delta_{\\text{crit}}'} />
                <p className="text-sm text-gray-600 mt-4 font-serif italic">
                  El sistema queda atrapado en un mínimo local con gradiente nulo pero energía libre persistentemente elevada.
                </p>
              </div>

              {/* DLA */}
              <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
                <div className="text-xs text-amber-700 uppercase tracking-wider mb-3 font-medium">Disonancia Lógica Absoluta (DLA)</div>
                <BlockMath math={'\\exists\\, \\mathcal{B} \\subset B \\;\\text{tal que}\\; \\mathcal{B} \\vdash \\bot \\;\\wedge\\; \\forall\\, b_i \\in \\mathcal{B}: \\operatorname{conf}(b_i) > \\gamma'} />
                <p className="text-sm text-gray-600 mt-4 font-serif italic">
                  Existe un subconjunto de creencias mutuamente contradictorias todas sostenidas con alta confianza.
                </p>
              </div>

              {/* Logistic Regression */}
              <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
                <div className="text-xs text-amber-700 uppercase tracking-wider mb-3 font-medium">Modelo predictivo del sufrimiento</div>
                <BlockMath math={'P(\\text{Sufrimiento} = 1 \\mid x) = \\sigma\\!\\left(\\beta_0 + \\sum_i \\beta_i X_i + \\sum_{ij} \\gamma_{ij} X_i X_j\\right)'} />
                <p className="text-sm text-gray-600 mt-4 font-serif italic">
                  Regresión logística multinivel con términos de interacción entre los 22 nodos de la red bayesiana.
                </p>
              </div>

              {/* Therapy */}
              <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
                <div className="text-xs text-amber-700 uppercase tracking-wider mb-3 font-medium">Operador terapéutico</div>
                <BlockMath math={'\\Delta F_{\\text{terapia}} = \\sum_i \\alpha_i \\Delta\\omega_i + \\sum G(\\pi) + T \\cdot H(q)'} />
                <p className="text-sm text-gray-600 mt-4 font-serif italic">
                  El cambio terapéutico esperado opera simultáneamente sobre pesos sinápticos <InlineMath math={'\\omega_i'} />, políticas <InlineMath math={'\\pi'} /> y temperatura de exploración <InlineMath math={'T'} />.
                </p>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-12 font-serif italic">
              El manuscrito completo contiene 15 ecuaciones, 4 teoremas formales y un apéndice con la red bayesiana completa de 22 nodos.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Final CTA — Download ──────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-4">
              Acceso al manuscrito completo
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4 leading-tight">
              Leer el preprint completo
            </h2>
            <p className="text-base text-gray-600 mb-10 leading-relaxed">
              7 páginas · 15 ecuaciones · 20 referencias bibliográficas. Versión LaTeX renderizada en PDF.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white px-10 h-14 text-base font-medium shadow-md hover:shadow-lg transition-all"
            >
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3"
              >
                <Download className="w-5 h-5" />
                Descargar Manuscrito LaTeX (PDF)
                <ExternalLink className="w-4 h-4 opacity-60" />
              </a>
            </Button>

            <p className="text-xs text-gray-500 mt-8 leading-relaxed max-w-md mx-auto">
              Cita sugerida: Cáceres, J. (2026). <em className="font-serif">Procesamiento psicológico como sistema de inferencia activa: Fundamentos computacionales de la coherencia y el sufrimiento</em>. Preprint, Instituto DBT Chile.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
