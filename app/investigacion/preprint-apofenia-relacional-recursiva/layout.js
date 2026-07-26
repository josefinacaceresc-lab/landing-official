/**
 * Layout for /investigacion/preprint-apofenia-relacional-recursiva
 *
 * Server component — exports metadata for SEO and Google Scholar indexing.
 * The page itself is client-side ('use client') because react-katex requires it.
 */

const URL = 'https://institutodbtchile.cl/investigacion/preprint-apofenia-relacional-recursiva'
const DOCX_URL = 'https://institutodbtchile.cl/articulos/apofenia-relacional-recursiva.docx'

export const metadata = {
  title: 'Apofenia Relacional Recursiva (ARR) · Preprint 2026',
  description: 'Preprint científico de Josefina Cáceres Cortés (Instituto DBT Chile · NexaryaLabs). Un punto ciego en la Teoría de los Marcos Relacionales: la ignición eidética, el operador ARR y su validación por simulación agéntica con convergencia emergente al modelo biosocial. DOI: 10.5281/zenodo.21346541.',
  keywords: [
    'Teoría de los Marcos Relacionales',
    'apofenia relacional recursiva',
    'rumiación',
    'procesamiento predictivo',
    'inferencia activa',
    'modelo biosocial',
    'Linehan',
    'señales de alerta temprana',
    'simulación basada en agentes',
    'fenotipado digital por voz',
    'radio espectral',
    'ignición eidética',
    'Josefina Cáceres Cortés',
    'Instituto DBT Chile',
    'NexaryaLabs',
    'DBT',
  ],
  authors: [{ name: 'Josefina Cáceres Cortés, Ph.D.(c)', url: 'https://institutodbtchile.cl' }],
  alternates: {
    canonical: URL,
  },
  openGraph: {
    type: 'article',
    title: 'Apofenia Relacional Recursiva: un punto ciego en la Teoría de los Marcos Relacionales',
    description: 'Preprint de Josefina Cáceres Cortés, Ph.D.(c) · Instituto DBT Chile · NexaryaLabs · 2026 · DOI 10.5281/zenodo.21346541',
    url: URL,
    siteName: 'Instituto DBT Chile',
    publishedTime: '2026-01-01T00:00:00.000Z',
    authors: ['Josefina Cáceres Cortés, Ph.D.(c)'],
    tags: ['RFT', 'procesamiento predictivo', 'DBT', 'computational psychiatry'],
  },
  // Google Scholar specific meta tags
  other: {
    'citation_title': 'Apofenia Relacional Recursiva: un punto ciego en la Teoría de los Marcos Relacionales, su mecanismo en el procesamiento predictivo, y su validación por simulación agéntica con convergencia emergente al modelo biosocial',
    'citation_author': 'Cáceres Cortés, Josefina',
    'citation_publication_date': '2026',
    'citation_journal_title': 'Preprint · Instituto DBT Chile · Zenodo',
    'citation_doi': '10.5281/zenodo.21346541',
    'citation_public_url': URL,
    'citation_pdf_url': DOCX_URL,
    'citation_language': 'es',
    'citation_keywords': 'Teoría de los Marcos Relacionales; rumiación; procesamiento predictivo; modelo biosocial; señales de alerta temprana; simulación basada en agentes; fenotipado digital por voz',
  },
}

export default function PreprintARRLayout({ children }) {
  return children
}
