import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Users, Mic, MapPin, ArrowRight, FileText, Download, BookOpen } from 'lucide-react'

export const metadata = {
  title: 'Foro Clínico DBT Chile | Encuentros, Artículos y Formación Continua',
  description: 'Foro Clínico del Instituto DBT Chile: artículos científicos, encuentros académicos, jornadas WDBTA, formación continua para profesionales y espacios de divulgación en DBT y Schema Therapy.',
  alternates: { canonical: 'https://institutodbtchile.cl/foro' },
}

const eventos = [
  {
    fecha: 'Programa permanente',
    titulo: 'Seminarios Mensuales de Investigación',
    formato: 'Online · Streaming abierto',
    descripcion: 'Presentación de los 8 papers doctorales del programa "La Mente Algorítmica" y discusión clínica con invitados internacionales.',
  },
  {
    fecha: 'Calendario rotativo',
    titulo: 'Family Connections (NEABPD)',
    formato: 'Grupos cerrados · 12 semanas',
    descripcion: 'Programa psicoeducativo para familiares de personas con TLP, basado en el modelo internacional NEABPD adaptado al contexto chileno.',
  },
]

const espacios = [
  { icon: Mic, titulo: 'Divulgación científica', text: 'Conferencias abiertas, charlas con expertos internacionales y publicaciones de divulgación basada en evidencia.' },
  { icon: Users, titulo: 'Comunidad clínica', text: 'Red de profesionales formados o en formación en DBT y Schema Therapy en Chile y Latinoamérica.' },
  { icon: Calendar, titulo: 'Formación continua', text: 'Programas estructurados para psicólogos, psiquiatras y profesionales de salud mental con interés en DBT/ST.' },
]

// ─── Artículos del Foro Clínico ──────────────────────────────────────────
// Los PDFs viven en /public/articulos/. Para agregar uno nuevo:
//   1) subir el PDF a /public/articulos/
//   2) agregar un objeto aquí con su metadata
const articulos = [
  {
    titulo: 'Desregulación emocional en el TLP: por qué sientes todo tan intenso',
    autor: 'Dra. Josefina Cáceres Cortés, Ph.D.',
    categoria: 'Divulgación clínica',
    resumen:
      'Una mirada a la ciencia detrás de la hipersensibilidad emocional en el Trastorno Límite de la Personalidad. Modelo biosocial de Linehan y cómo la Terapia Dialéctico-Conductual (DBT) ofrece un camino hacia la regulación.',
    keywords: ['Desregulación emocional', 'TLP', 'Modelo biosocial', 'DBT'],
    paginas: 4,
    pdfUrl: '/articulos/desregulacion-emocional-tlp.pdf',
  },
]

export default function ForoPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 text-sm font-semibold text-primary uppercase tracking-wider">
              Foro Clínico · Comunidad Académica
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Donde la <em className="font-serif italic text-primary">comunidad clínica</em> se encuentra
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              El Foro del Instituto DBT Chile es el espacio académico y comunitario donde se comparten encuentros, jornadas, formación continua y divulgación científica en DBT, Schema Therapy y patología dual.
            </p>
          </div>
        </div>
      </section>

      {/* Espacios */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Tres espacios</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Un foro <em className="font-serif italic text-primary">vivo y permanente</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {espacios.map((e, i) => (
                <Card key={i} className="border-gray-200 hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <e.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{e.titulo}</h3>
                    <p className="text-gray-600 leading-relaxed">{e.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Artículos del Foro Clínico */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 text-sm font-semibold text-primary uppercase tracking-wider">
                Biblioteca · Lectura abierta
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Artículos del <em className="font-serif italic text-primary">Foro Clínico</em>
              </h2>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Divulgación científica basada en evidencia. Lectura breve, rigor académico. Escritos por nuestro equipo clínico para profesionales, consultantes y familiares.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {articulos.map((art, i) => (
                <Card
                  key={i}
                  className="group border-gray-200 hover:border-primary/40 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-8">
                    {/* Header con categoría */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                        <BookOpen className="w-3.5 h-3.5" />
                        {art.categoria}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        {art.paginas} {art.paginas === 1 ? 'página' : 'páginas'}
                      </span>
                    </div>

                    {/* Título */}
                    <h3 className="text-2xl font-light text-gray-900 leading-snug mb-3 group-hover:text-primary transition-colors">
                      {art.titulo}
                    </h3>

                    {/* Autor */}
                    <p className="text-sm text-gray-500 mb-4 italic">{art.autor}</p>

                    {/* Resumen */}
                    <p className="text-gray-600 leading-relaxed mb-6">{art.resumen}</p>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {art.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 font-medium"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
                      <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-white">
                        <a
                          href={art.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Leer artículo
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="flex-1 border-primary/30 text-primary hover:bg-primary/5">
                        <a
                          href={art.pdfUrl}
                          download
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Descargar PDF
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Nota al pie */}
            <p className="text-center text-sm text-gray-400 mt-12 max-w-2xl mx-auto">
              Estos artículos son material de divulgación con fines educativos.
              No reemplazan evaluación clínica ni constituyen diagnóstico individual.
            </p>
          </div>
        </div>
      </section>

      {/* Próximos eventos */}
      <section className="py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Próximos eventos</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Agenda <em className="font-serif italic text-primary">académica</em>
              </h2>
            </div>
            <div className="space-y-6">
              {eventos.map((ev, i) => (
                <Card key={i} className="border-gray-200 hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-sm">
                      <span className="flex items-center gap-2 text-primary font-semibold">
                        <Calendar className="w-4 h-4" /> {ev.fecha}
                      </span>
                      <span className="flex items-center gap-2 text-gray-500">
                        <MapPin className="w-4 h-4" /> {ev.formato}
                      </span>
                    </div>
                    <h3 className="text-2xl font-light text-gray-900 mb-3">{ev.titulo}</h3>
                    <p className="text-gray-600 leading-relaxed">{ev.descripcion}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            ¿Quieres recibir <em className="font-serif italic text-primary">las próximas convocatorias</em>?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Escríbenos y te avisaremos cuando se abran inscripciones para jornadas, seminarios y programas de formación.
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white px-8">
            <a
              href="mailto:contacto@dbtchile.cl?subject=Pr%C3%B3ximas%20convocatorias%20-%20Foro%20Instituto%20DBT%20Chile&body=Hola%20equipo%2C%0A%0AQuisiera%20recibir%20avisos%20de%20pr%C3%B3ximas%20convocatorias%20para%20jornadas%2C%20seminarios%20y%20programas%20de%20formaci%C3%B3n.%0A%0ANombre%3A%20%0AProfesi%C3%B3n%20%2F%20Rol%3A%20%0AEmail%3A%20%0A%0AGracias."
              className="flex items-center gap-2"
            >
              Contactar al equipo <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
