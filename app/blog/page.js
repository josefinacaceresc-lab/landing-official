import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight, Tag } from 'lucide-react'

export const metadata = {
  title: 'Blog - Artículos sobre DBT y Salud Mental',
  description: 'Artículos científicos y educativos sobre Terapia Dialéctico Conductual, neurociencia, regulación emocional y salud mental.',
  alternates: {
    canonical: 'https://institutodbt.cl/blog',
  },
  openGraph: {
    title: 'Blog | Instituto DBT Chile',
    description: 'Artículos científicos sobre DBT, neurociencia y salud mental.',
    url: 'https://institutodbt.cl/blog',
    images: [{
      url: 'https://images.unsplash.com/photo-1471520201477-47a62a269a87?fm=jpg&q=80&w=1200&h=630&fit=crop',
      width: 1200,
      height: 630,
    }],
  },
}

const blogPosts = [
  {
    title: '¿Qué es la Terapia Dialéctico Conductual (DBT)?',
    excerpt: 'Una introducción completa a los fundamentos, principios y aplicaciones de DBT en el tratamiento de la desregulación emocional.',
    date: '2024-05-15',
    category: 'Educación',
    slug: 'que-es-dbt'
  },
  {
    title: 'Neurociencia de la Regulación Emocional',
    excerpt: 'Exploramos los mecanismos cerebrales involucrados en el procesamiento y regulación de las emociones.',
    date: '2024-05-10',
    category: 'Investigación',
    slug: 'neurociencia-regulacion-emocional'
  },
  {
    title: 'Mindfulness: Práctica y Beneficios',
    excerpt: 'Cómo la atención plena transforma el cerebro y mejora la capacidad de regular emociones.',
    date: '2024-05-05',
    category: 'Práctica',
    slug: 'mindfulness-practica-beneficios'
  },
  {
    title: 'DBT para Adolescentes: Guía Completa',
    excerpt: 'Adaptaciones específicas de DBT para el tratamiento de adolescentes y sus familias.',
    date: '2024-04-28',
    category: 'Educación',
    slug: 'dbt-adolescentes'
  },
  {
    title: 'Skills Training: Habilidades de Tolerancia al Malestar',
    excerpt: 'Técnicas prácticas para sobrevivir crisis emocionales sin empeorar la situación.',
    date: '2024-04-20',
    category: 'Skills',
    slug: 'skills-tolerancia-malestar'
  },
  {
    title: 'La Importancia de la Validación Emocional',
    excerpt: 'Cómo la validación terapéutica facilita el cambio y reduce el sufrimiento emocional.',
    date: '2024-04-15',
    category: 'Práctica',
    slug: 'validacion-emocional'
  }
]

const categories = ['Todos', 'Educación', 'Investigación', 'Práctica', 'Skills']

export default function BlogPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              Blog <span className="font-semibold text-emerald-600">DBT</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Artículos científicos y educativos sobre terapia, neurociencia y salud mental
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={cat === 'Todos' ? 'default' : 'outline'}
                  className={cat === 'Todos' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-emerald-600 text-emerald-700 hover:bg-emerald-50'}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white group">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                        <Link href={`/blog/${post.slug}`} className="flex items-center gap-1">
                          Leer
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-6">
              Mantente <span className="font-semibold">Informado</span>
            </h2>
            <p className="text-xl mb-8 text-emerald-50">
              Suscríbete para recibir nuevos artículos y actualizaciones sobre DBT
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="px-6 py-3 rounded-lg text-gray-900 flex-1"
              />
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 whitespace-nowrap">
                Suscribirme
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}