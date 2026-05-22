/**
 * Layout for /autoevaluacion/resultados — applies noindex metadata.
 *
 * Why noindex?
 *   - Contains personal clinical assessment results (DERS-21 score)
 *   - Privacy concern under Chilean Ley 19.628 (datos personales)
 *   - Should NEVER appear in search engines, even by accident
 *   - Each visit has unique URL parameters (?score=X&token=...) that don't
 *     deserve crawling.
 */

export const metadata = {
  title: 'Resultados de tu autoevaluación · Instituto DBT Chile',
  description: 'Resultados personales de tu autoevaluación clínica.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-snippet': -1,
      'max-image-preview': 'none',
    },
  },
}

export default function ResultadosLayout({ children }) {
  return children
}
