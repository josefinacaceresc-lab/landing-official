import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@/components/ui/button'
import { FileText, Download, ArrowLeft, Clock, BookOpen, Calendar, ArrowRight } from 'lucide-react'
import { articulos, getArticuloBySlug, getAllArticleSlugs } from '@/lib/articulos'

// ─── Static generation: precompile all article pages at build time ───────
export async function generateStaticParams() {
  return getAllArticleSlugs()
}

// ─── Per-page SEO metadata (Title, Description, Open Graph, Twitter) ─────
export async function generateMetadata({ params }) {
  const art = getArticuloBySlug(params.slug)
  if (!art) {
    return { title: 'Artículo no encontrado · Instituto DBT Chile' }
  }
  const url = `https://institutodbtchile.cl/foro/articulos/${art.slug}`
  return {
    title: `${art.titulo_corto} | Foro Clínico DBT Chile`,
    description: art.resumen,
    keywords: art.seo_keywords,
    authors: [{ name: art.autor }],
    alternates: { canonical: url },
    openGraph: {
      title: art.titulo,
      description: art.resumen,
      url,
      siteName: 'Instituto DBT Chile',
      type: 'article',
      publishedTime: art.fecha,
      authors: [art.autor],
      locale: 'es_CL',
    },
    twitter: {
      card: 'summary_large_image',
      title: art.titulo_corto,
      description: art.resumen,
    },
  }
}

// ─── Page component ──────────────────────────────────────────────────────
export default function ArticuloPage({ params }) {
  const art = getArticuloBySlug(params.slug)
  if (!art) notFound()

  const isPadres = art.categoria === 'Para padres'
  const accent = isPadres ? 'amber' : 'primary'
  const url = `https://institutodbtchile.cl/foro/articulos/${art.slug}`

  // Schema.org Article JSON-LD (rich snippet support)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalScholarlyArticle',
    headline: art.titulo,
    description: art.resumen,
    author: {
      '@type': 'Person',
      name: art.autor,
      jobTitle: art.autor_rol,
      affiliation: {
        '@type': 'MedicalOrganization',
        name: 'Instituto DBT Chile',
        url: 'https://institutodbtchile.cl',
      },
    },
    publisher: {
      '@type': 'MedicalOrganization',
      name: 'Instituto DBT Chile',
      url: 'https://institutodbtchile.cl',
      logo: {
        '@type': 'ImageObject',
        url: 'https://institutodbtchile.cl/logo.png',
      },
    },
    datePublished: art.fecha,
    dateModified: art.fecha,
    inLanguage: 'es-CL',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: art.seo_keywords,
    articleSection: art.categoria,
    wordCount: art.paginas * 350,
  }

  // Pick suggested related articles (same category first, then others)
  const related = articulos
    .filter((a) => a.slug !== art.slug)
    .sort((a, b) => (a.categoria === art.categoria ? -1 : 1))
    .slice(0, 2)

  return (
    <>
      {/* JSON-LD for Google rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="bg-white">
        {/* Breadcrumb + back */}
        <div className="border-b border-gray-100 bg-gray-50/50">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/foro"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Foro Clínico
            </Link>
          </div>
        </div>

        {/* Hero */}
        <header className="py-12 md:py-16 bg-gradient-to-br from-white via-gray-50/40 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    isPadres ? 'bg-amber-100 text-amber-800' : 'bg-primary/10 text-primary'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {art.categoria}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  {art.tiempoLectura} min de lectura
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                  <FileText className="w-3.5 h-3.5" />
                  {art.paginas} {art.paginas === 1 ? 'página' : 'páginas'}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight tracking-tight mb-6">
                {art.titulo}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-2">
                <span className="font-medium text-gray-800">{art.autor}</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-500">{art.autor_rol}</span>
                {art.fecha && (
                  <>
                    <span className="text-gray-400">·</span>
                    <span className="inline-flex items-center gap-1.5 text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(art.fecha).toLocaleDateString('es-CL', {
                        day: 'numeric', month: 'long', year: 'numeric',
                      })}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Body content (markdown) */}
        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className={`prose prose-lg max-w-none
                prose-headings:font-light prose-headings:text-gray-900 prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:font-medium
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-[17px]
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-li:text-gray-700 prose-li:my-1
                prose-blockquote:border-l-4 ${isPadres ? 'prose-blockquote:border-amber-400' : 'prose-blockquote:border-primary'}
                prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-md
                prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-gray-700
                prose-table:text-sm prose-table:my-6
                prose-th:bg-gray-100 prose-th:font-semibold prose-th:text-gray-800 prose-th:p-3 prose-th:text-left
                prose-td:p-3 prose-td:border-t prose-td:border-gray-100 prose-td:align-top
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {art.contenido}
                </ReactMarkdown>
              </div>

              {/* Keywords cloud */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">
                  Temas tratados
                </p>
                <div className="flex flex-wrap gap-2">
                  {art.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-xs px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 font-medium"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA — Agendar consulta */}
        <section className={`py-16 ${isPadres ? 'bg-gradient-to-br from-amber-50 via-white to-amber-50/30' : 'bg-gradient-to-br from-primary/5 via-white to-primary/10'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                {isPadres ? (
                  <>¿Reconociste algo en tu hijo/a?</>
                ) : (
                  <>¿Te identificaste con lo que leíste?</>
                )}
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                {isPadres
                  ? 'Una evaluación especializada con un equipo formado en DBT puede marcar la diferencia. La intervención temprana cambia el pronóstico.'
                  : 'Una evaluación especializada con un equipo formado en DBT puede ayudarte a entender lo que sientes y construir un camino de regulación.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  size="lg"
                  className={`text-white px-8 ${isPadres ? 'bg-amber-600 hover:bg-amber-700' : 'bg-primary hover:bg-primary/90'}`}
                >
                  <a
                    href="https://wa.me/56930550750?text=Hola%2C%20le%C3%AD%20el%20art%C3%ADculo%20del%20Foro%20y%20me%20gustar%C3%ADa%20agendar%20una%20consulta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agendar consulta por WhatsApp
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className={`px-8 ${isPadres ? 'border-amber-300 text-amber-700 hover:bg-amber-50' : 'border-primary/30 text-primary hover:bg-primary/5'}`}
                >
                  <a href={art.pdfUrl} download>
                    <Download className="w-4 h-4 mr-2" />
                    Descargar PDF
                  </a>
                </Button>
              </div>

              <p className="mt-8 text-sm text-gray-500">
                ¿Prefieres una evaluación clínica estructurada?{' '}
                <Link href="/evaluacion-idp4" className="text-primary hover:underline font-medium">
                  Toma el Test IDP-4 gratuito →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="py-16 border-t border-gray-100">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-8 text-center">
                  Otros artículos del <em className="font-serif italic text-primary">Foro Clínico</em>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {related.map((r) => {
                    const rIsPadres = r.categoria === 'Para padres'
                    return (
                      <Link
                        key={r.slug}
                        href={`/foro/articulos/${r.slug}`}
                        className="group block p-6 rounded-lg border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all"
                      >
                        <span
                          className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 ${
                            rIsPadres
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-primary/10 text-primary'
                          }`}
                        >
                          {r.categoria}
                        </span>
                        <h3 className={`text-lg font-medium text-gray-900 leading-snug mb-2 transition-colors ${
                          rIsPadres ? 'group-hover:text-amber-700' : 'group-hover:text-primary'
                        }`}>
                          {r.titulo_corto}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{r.resumen}</p>
                        <div className="mt-3 text-xs text-gray-500 flex items-center gap-3">
                          <span>{r.tiempoLectura} min lectura</span>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1">
                            Leer artículo
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Disclaimer médico */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <p className="max-w-3xl mx-auto text-center text-xs text-gray-500 leading-relaxed">
              <strong className="text-gray-600">Aviso médico:</strong> Este artículo es material de
              divulgación con fines educativos. No reemplaza la evaluación clínica ni constituye
              diagnóstico individual. Si tú o un ser querido están en crisis, contactar SAMU 131,
              Salud Responde *4141 o tu servicio de urgencia local.
            </p>
          </div>
        </section>
      </article>
    </>
  )
}
