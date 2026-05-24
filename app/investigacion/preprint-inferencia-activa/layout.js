/**
 * Layout for /investigacion/preprint-inferencia-activa
 *
 * Server component — exports metadata for SEO and Google Scholar indexing.
 * The page itself is client-side ('use client') because react-katex requires it.
 */

export const metadata = {
  title: 'Procesamiento psicológico como sistema de inferencia activa · Preprint 2026',
  description: 'Preprint científico de la Dra. Josefina Cáceres (Instituto DBT Chile). Marco computacional que formaliza el sufrimiento psicológico como un sistema de inferencia activa con minimización de energía libre variacional y Disonancia Lógica Absoluta (DLA).',
  keywords: [
    'inferencia activa',
    'energía libre variacional',
    'sufrimiento psicológico',
    'disonancia lógica absoluta',
    'red bayesiana',
    'procesamiento psicológico',
    'coherencia',
    'DBT',
    'regulación emocional',
    'computational psychiatry',
    'free energy principle',
    'Josefina Cáceres',
    'Instituto DBT Chile',
  ],
  authors: [{ name: 'Josefina Cáceres, Ph.D.', url: 'https://institutodbtchile.cl' }],
  alternates: {
    canonical: 'https://institutodbtchile.cl/investigacion/preprint-inferencia-activa',
  },
  openGraph: {
    type: 'article',
    title: 'Procesamiento psicológico como sistema de inferencia activa',
    description: 'Preprint de la Dra. Josefina Cáceres · Instituto DBT Chile · Mayo 2026',
    url: 'https://institutodbtchile.cl/investigacion/preprint-inferencia-activa',
    siteName: 'Instituto DBT Chile',
    publishedTime: '2026-05-01T00:00:00.000Z',
    authors: ['Josefina Cáceres'],
    tags: ['inferencia activa', 'DBT', 'computational psychiatry'],
  },
  // Google Scholar specific meta tags
  other: {
    'citation_title': 'Procesamiento psicológico como sistema de inferencia activa: Fundamentos computacionales de la coherencia y el sufrimiento',
    'citation_author': 'Cáceres, Josefina',
    'citation_publication_date': '2026/05',
    'citation_journal_title': 'Preprint · Instituto DBT Chile',
    'citation_pdf_url': 'https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/5446dac1f0494c63ba43949b795c6f34_preprint_inferencia_activa.pdf',
    'citation_language': 'es',
    'citation_keywords': 'inferencia activa; energía libre variacional; sufrimiento; disonancia lógica absoluta; red bayesiana; DBT',
  },
}

export default function PreprintLayout({ children }) {
  return children
}
