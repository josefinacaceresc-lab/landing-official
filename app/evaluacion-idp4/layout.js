// SEO metadata for /evaluacion-idp4 (page.js is a client component, so metadata
// must be exported from this server-side layout file).

export const metadata = {
  title: 'IDP-4 · Inventario Dimensional de Personalidad — Única en Chile | Instituto DBT Chile',
  description:
    'Investigación transversal de personalidad única en Chile. Primer instrumento de evaluación dimensional transversal desarrollado para la población chilena. Dra. Josefina Cáceres, 2026. Digital Phenotyping integrado.',
  keywords: [
    'IDP-4',
    'Inventario Dimensional de Personalidad',
    'investigación transversal Chile',
    'evaluación personalidad chilena',
    'test TLP Chile',
    'desregulación emocional',
    'Digital Phenotyping',
    'Josefina Cáceres',
    'Instituto DBT Chile',
  ],
  alternates: {
    canonical: 'https://institutodbtchile.cl/evaluacion-idp4',
  },
  openGraph: {
    title: 'IDP-4 · Investigación Transversal Única en Chile',
    description:
      'Primer instrumento de evaluación dimensional transversal desarrollado para la población chilena. Test orientativo gratuito con reporte clínico inmediato.',
    url: 'https://institutodbtchile.cl/evaluacion-idp4',
    type: 'website',
    locale: 'es_CL',
    siteName: 'Instituto DBT Chile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IDP-4 · Única en Chile',
    description: 'Investigación transversal de personalidad para la población chilena.',
  },
}

export default function EvaluacionIdp4Layout({ children }) {
  return children
}
