'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, FileText, Printer, Download, Calendar, BookOpen, Tag, X, Info } from 'lucide-react'
import { papers, getPaperById } from '@/lib/papers'

// Note: this is a client component (needs print trigger via query param).
// Metadata is set via the parent <head> tags through layout / not needed here for PDF flow.

export default function PaperDetailPage({ params }) {
  const search = useSearchParams()
  const router = useRouter()
  const paper = getPaperById(params?.id)
  const isPrintMode = search?.get('print') === '1'
  const [showPrintHelp, setShowPrintHelp] = useState(isPrintMode)

  // Auto-trigger native print dialog when opened with ?print=1
  useEffect(() => {
    if (!paper) return
    if (isPrintMode) {
      // Give the page a tick to layout fonts/images, then open print dialog.
      const t = setTimeout(() => {
        try { window.print() } catch (_) {}
      }, 1200) // Slightly longer so user sees the instruction banner first
      return () => clearTimeout(t)
    }
  }, [isPrintMode, paper])

  if (!paper) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-4">Artículo no encontrado</h1>
          <Button asChild className="bg-primary text-white">
            <Link href="/investigacion/la-mente-algoritmica">Volver a Investigación</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <article className="bg-white print:bg-white">
      {/* JSON-LD — ScholarlyArticle schema for Google Scholar + E-E-A-T */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ScholarlyArticle',
          '@id': `https://institutodbtchile.cl/investigacion/paper/${paper.id}`,
          headline: paper.title,
          alternativeHeadline: paper.subtitle,
          abstract: paper.abstract,
          articleBody: paper.abstract,
          inLanguage: 'es-CL',
          datePublished: `${paper.date}-01-01`,
          dateModified: `${paper.date}-12-31`,
          wordCount: paper.words,
          keywords: paper.keywords || [],
          author: {
            '@type': 'Person',
            '@id': 'https://institutodbtchile.cl/equipo#josefina-caceres',
            name: 'Josefina Cáceres Cortés',
            honorificPrefix: 'Dra.',
            honorificSuffix: 'Ph.D.(c)',
            jobTitle: 'Directora Científica · Instituto DBT Chile',
            affiliation: {
              '@type': 'Organization',
              '@id': 'https://institutodbtchile.cl/#clinic',
              name: 'Instituto DBT Chile',
              url: 'https://institutodbtchile.cl',
            },
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://institutodbtchile.cl/#org',
            name: 'Instituto DBT Chile',
            logo: {
              '@type': 'ImageObject',
              url: 'https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/508ec6e06fbe47fd935a5e124ba0eae3_logodbt_vertical%2050-50.jpg',
            },
          },
          isAccessibleForFree: true,
          license: 'https://creativecommons.org/licenses/by-nc/4.0/',
          citation: paper.references ? `${paper.references} referencias académicas indexadas` : undefined,
          about: [
            { '@type': 'Thing', name: 'Dialectical Behavior Therapy' },
            { '@type': 'Thing', name: 'Borderline Personality Disorder' },
            { '@type': 'Thing', name: 'Emotion Regulation' },
          ],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://institutodbtchile.cl/investigacion/paper/${paper.id}`,
          },
        }, null, 0)
      }} />
      {/* Print help banner — only shown when ?print=1, before the dialog opens */}
      {showPrintHelp && (
        <div className="print:hidden fixed top-0 left-0 right-0 z-50 bg-primary text-white shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
            <Info className="w-5 h-5 flex-shrink-0" />
            <p className="flex-1 text-sm leading-snug">
              <strong>Diálogo de impresión abriéndose…</strong> En el campo <em>Destino</em> elige <strong>"Guardar como PDF"</strong> (Save as PDF) y haz click en <strong>Guardar</strong>.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-white text-primary text-sm font-semibold rounded-md hover:bg-white/90"
              >
                Reabrir diálogo
              </button>
              <button
                type="button"
                onClick={() => setShowPrintHelp(false)}
                aria-label="Cerrar aviso"
                className="p-1.5 hover:bg-white/10 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Toolbar (hidden on print) */}
      <div className="print:hidden bg-gradient-to-br from-primary/5 to-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <Button
            asChild
            variant="ghost"
            className="text-primary hover:bg-primary/10 font-semibold"
          >
            <Link href="/investigacion/la-mente-algoritmica" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Volver
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => window.print()}
              className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-md shadow-primary/20"
            >
              <Printer className="w-4 h-4 mr-2" /> Ver versión PDF
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.print()}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
            >
              <Download className="w-4 h-4 mr-2" /> Descargar PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Article body (print-friendly) */}
      <div className="container mx-auto px-4 py-12 print:py-6 max-w-4xl print:max-w-full">
        {/* Print-only header with brand */}
        <header className="hidden print:block mb-6 pb-4 border-b border-gray-300">
          <div className="text-xs uppercase tracking-wider text-gray-600 mb-1">
            Instituto DBT Chile · institutodbtchile.cl
          </div>
          <div className="text-xs text-gray-500">
            La Mente Algorítmica · Programa de Investigación Doctoral
          </div>
        </header>

        {/* Title + meta */}
        <div className="mb-8">
          {paper.featured && (
            <span className="inline-block px-3 py-1 bg-amber-600 text-white text-xs font-semibold rounded-full mb-4 print:bg-amber-700">
              DESTACADO
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-3 leading-tight print:text-3xl">
            {paper.title}
          </h1>
          {paper.subtitle && (
            <p className="text-xl text-gray-600 italic mb-6 print:text-base">
              {paper.subtitle}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 border-l-4 border-primary pl-4 py-2">
            <span className="font-semibold text-primary">Dra. Josefina Cáceres, Ph.D.(c)</span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-primary" /> {paper.date}</span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1"><FileText className="w-4 h-4 text-primary" /> {paper.words.toLocaleString()} palabras</span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1"><BookOpen className="w-4 h-4 text-primary" /> {paper.references} referencias</span>
          </div>
        </div>

        {/* Abstract */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 print:text-xl">Resumen</h2>
          <p className="text-gray-700 leading-relaxed text-justify print:text-sm">
            {paper.abstract}
          </p>
        </section>

        {/* Key findings */}
        {paper.keyFindings && paper.keyFindings.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 print:text-xl">Hallazgos principales</h2>
            <ul className="space-y-3">
              {paper.keyFindings.map((f, i) => (
                <li key={i} className="flex gap-3 text-gray-700 leading-relaxed print:text-sm">
                  <span className="font-serif font-semibold text-primary min-w-[24px]">{i + 1}.</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Keywords */}
        {paper.keywords && paper.keywords.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 print:text-lg">Palabras clave</h2>
            <div className="flex flex-wrap gap-2">
              {paper.keywords.map((k, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium print:bg-gray-100 print:text-gray-800"
                >
                  <Tag className="w-3 h-3 print:hidden" /> {k}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Notice on availability of full text */}
        <Card className="border-amber-200 bg-amber-50 mb-10 print:border print:border-gray-300 print:bg-white">
          <CardContent className="p-6">
            <h3 className="font-semibold text-amber-800 mb-2 print:text-gray-900">
              Versión completa del artículo
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              El texto íntegro del paper ({paper.words.toLocaleString()} palabras · {paper.references} referencias APA 7) está disponible bajo solicitud para profesionales de salud mental, académicos e investigadores. Para acceder a la versión completa contacta al equipo del Instituto DBT Chile.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 print:hidden">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white font-semibold">
                <a
                  href={`mailto:contacto@dbtchile.cl?subject=${encodeURIComponent('Solicitud de acceso a artículo: ' + paper.title)}&body=${encodeURIComponent('Hola Instituto DBT Chile,\n\nSolicito acceso a la versión completa del artículo doctoral:\n\n• Título: ' + paper.title + '\n• Autor: Dra. Josefina Cáceres, Ph.D.(c)\n• Referencia: https://institutodbtchile.cl/investigacion/paper/' + paper.id + '\n\nMis datos:\nNombre completo: \nProfesión / Institución: \nMotivo de la solicitud: \n\nGracias.')}`}
                >
                  Solicitar acceso
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Citation block */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 print:text-lg">Cómo citar</h2>
          <div className="bg-gray-50 border-l-4 border-primary p-4 rounded text-sm text-gray-700 leading-relaxed print:bg-white print:border print:border-gray-300">
            Cáceres, J. ({paper.date}). <em>{paper.title}</em>. Instituto DBT Chile — La Mente Algorítmica.
            Recuperado de https://institutodbtchile.cl/investigacion/paper/{paper.id}
          </div>
        </section>

        {/* Print footer */}
        <footer className="hidden print:block mt-12 pt-4 border-t border-gray-300 text-xs text-gray-500">
          © {new Date().getFullYear()} Instituto DBT Chile · Todos los derechos reservados ·
          Documento generado desde institutodbtchile.cl/investigacion/paper/{paper.id}
        </footer>
      </div>
    </article>
  )
}
