import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download, Calendar, User } from 'lucide-react'

export const metadata = {
  title: 'La Mente Algorítmica - Programa de Investigación Doctoral',
  description: '8 artículos científicos sobre desregulación emocional, EMA y axiomas de la neurociencia. Incluye el Tratado Maestro con 6,454 palabras y 33 referencias APA 7.',
  alternates: {
    canonical: 'https://institutodbtchile.cl/investigacion/la-mente-algoritmica',
  },
  openGraph: {
    title: 'La Mente Algorítmica | Instituto DBT Chile',
    description: '8 artículos científicos sobre desregulación emocional, EMA y axiomas de la neurociencia.',
    url: 'https://institutodbtchile.cl/investigacion/la-mente-algoritmica',
    type: 'article',
    images: [{
      url: 'https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?fm=jpg&q=80&w=1200&h=630&fit=crop',
      width: 1200,
      height: 630,
    }],
  },
}

const papers = [
  {
    id: 1,
    title: 'Tratado Maestro sobre Desregulación Emocional',
    description: 'Análisis exhaustivo de los mecanismos neurobiológicos, cognitivos y conductuales de la desregulación emocional.',
    words: 6454,
    references: 33,
    date: '2024',
    featured: true
  },
  {
    id: 2,
    title: 'Axiomas de la Regulación Emocional',
    description: 'Principios fundamentales que rigen los procesos de regulación emocional desde la neurociencia.',
    words: 4200,
    references: 28,
    date: '2024'
  },
  {
    id: 3,
    title: 'Evaluación Momentánea Ecológica (EMA) en DBT',
    description: 'Metodologías de evaluación en tiempo real para monitoreo de estados emocionales.',
    words: 3850,
    references: 22,
    date: '2024'
  },
  {
    id: 4,
    title: 'Neuroplasticidad y Terapia Dialéctico Conductual',
    description: 'Evidencia neurocientífica de los cambios cerebrales inducidos por DBT.',
    words: 4100,
    references: 31,
    date: '2024'
  },
  {
    id: 5,
    title: 'Sistemas de Procesamiento Emocional',
    description: 'Modelos computacionales de las redes neuronales implicadas en la emoción.',
    words: 3600,
    references: 26,
    date: '2024'
  },
  {
    id: 6,
    title: 'Mindfulness y Regulación Prefrontal',
    description: 'Mecanismos neurales de la atención plena en el control emocional.',
    words: 3900,
    references: 24,
    date: '2024'
  },
  {
    id: 7,
    title: 'Biomarcadores de Desregulación Emocional',
    description: 'Indicadores fisiológicos y neuroquímicos de la disregulación afectiva.',
    words: 4300,
    references: 29,
    date: '2024'
  },
  {
    id: 8,
    title: 'Inteligencia Artificial en Evaluación Clínica',
    description: 'Aplicaciones de machine learning para predicción de crisis emocionales.',
    words: 3750,
    references: 20,
    date: '2024'
  }
]

export default function LaMenteAlgoritmicaPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-emerald-50" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              La Mente <span className="font-semibold text-amber-600">Algorítmica</span>
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Programa de investigación doctoral sobre los fundamentos 
              neurocientíficos de la regulación emocional
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <span><strong>8 Artículos</strong> Científicos</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-amber-600" />
                <span><strong>Josefina Cáceres Cortés, Ph.D.(c)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span><strong>2024</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Paper — Tratado Maestro · White Paper */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/85 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-white text-primary rounded-full text-xs font-bold mb-4 tracking-wider uppercase shadow-md">
                Foundational Work · White Paper
              </span>
              <h2 className="text-4xl md:text-5xl font-light mb-3">
                Tratado Maestro sobre <span className="font-serif italic font-semibold">Desregulación Emocional</span>
              </h2>
              <p className="text-white/80 text-base italic">
                Josefina Cáceres Cortés, Ph.D.(c) · 2024
              </p>
            </div>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <p className="text-lg text-white/95 mb-6 leading-relaxed">
                  Síntesis más comprehensiva de la investigación sobre desregulación emocional, integrando perspectivas <strong>neurobiológicas, cognitivas y conductuales</strong> en un marco unificado. Documento de referencia del programa <em>La Mente Algorítmica</em>.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">6,454</div>
                    <div className="text-xs text-white/80 uppercase tracking-wider">Palabras</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">33</div>
                    <div className="text-xs text-white/80 uppercase tracking-wider">Referencias APA 7</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">12</div>
                    <div className="text-xs text-white/80 uppercase tracking-wider">Capítulos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">2026</div>
                    <div className="text-xs text-white/80 uppercase tracking-wider">Edición</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-bold shadow-2xl">
                    <a href="/investigacion/paper/1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Leer Tratado completo
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="!bg-transparent border-2 border-white text-white hover:!bg-white hover:!text-primary font-bold">
                    <a href="/investigacion/paper/1?print=1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Descargar Tratado (PDF)
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Papers Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title + editorial subtitle (premium European clinical aesthetic) */}
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-3 tracking-tight">
                Artículos del <span className="font-semibold text-amber-600">Programa</span>
              </h2>
              <p className="font-serif italic text-gray-500 text-lg md:text-xl tracking-[0.04em]">
                la mente algorítmica
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {papers.map((paper) => (
                <Card key={paper.id} className={`border-0 shadow-lg hover:shadow-xl transition-shadow ${
                  paper.featured ? 'bg-gradient-to-br from-amber-50 to-white' : 'bg-white'
                }`}>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {paper.featured && (
                        <span className="inline-block px-3 py-1 bg-amber-600 text-white text-xs rounded-full mb-2">
                          DESTACADO
                        </span>
                      )}
                      <div>{paper.title}</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {paper.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4 text-amber-600" />
                        {paper.words.toLocaleString()} palabras
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        {paper.date}
                      </span>
                      <span>• {paper.references} referencias</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                        <a href={`/investigacion/paper/${paper.id}`} target="_blank" rel="noopener noreferrer">
                          Leer artículo
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold">
                        <a href={`/investigacion/paper/${paper.id}?print=1`} target="_blank" rel="noopener noreferrer">
                          Ver versión PDF
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schema Markup for Articles */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ScholarlyArticle',
          headline: 'La Mente Algorítmica - Programa de Investigación Doctoral',
          author: {
            '@type': 'Person',
            name: 'Josefina Cáceres Cortés',
            honorificSuffix: 'Ph.D.(c)'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Instituto DBT Chile'
          },
          datePublished: '2024',
          description: '8 artículos científicos sobre desregulación emocional, EMA y axiomas de la neurociencia.',
          url: 'https://institutodbtchile.cl/investigacion/la-mente-algoritmica'
        })
      }} />
    </div>
  )
}