import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Landmark, ShieldCheck, Microscope } from 'lucide-react'

export const metadata = {
  title: 'Nuestra Historia · Antes DBT Chile, hoy Instituto DBT Chile',
  description: 'Instituto DBT Chile es la continuidad institucional de DBT Chile (dbtchile.cl), el mismo equipo clínico y la misma dirección científica desde 2021. Conoce nuestra trayectoria en Terapia Dialéctico Conductual.',
  keywords: ['DBT Chile', 'Instituto DBT Chile', 'historia', 'dbtchile', 'continuidad institucional', 'Terapia Dialéctico Conductual Chile'],
  alternates: {
    canonical: 'https://institutodbtchile.cl/historia',
  },
  openGraph: {
    title: 'Nuestra Historia · Antes DBT Chile, hoy Instituto DBT Chile',
    description: 'La continuidad institucional de DBT Chile: mismo equipo clínico, misma dirección científica, desde 2021.',
    url: 'https://institutodbtchile.cl/historia',
    type: 'website',
    locale: 'es_CL',
    siteName: 'Instituto DBT Chile',
  },
}

// Schema de continuidad / sucesión de marca (señal E-E-A-T para Google)
const historiaSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://institutodbtchile.cl/historia#aboutpage',
  url: 'https://institutodbtchile.cl/historia',
  name: 'Nuestra Historia · Instituto DBT Chile',
  inLanguage: 'es-CL',
  mainEntity: {
    '@type': 'MedicalOrganization',
    '@id': 'https://institutodbtchile.cl/#clinic',
    name: 'Instituto DBT Chile',
    alternateName: ['DBT Chile', 'DBTCHILE'],
    foundingDate: '2021',
    url: 'https://institutodbtchile.cl',
    sameAs: ['https://dbtchile.cl'],
    description: 'Instituto DBT Chile es la continuidad institucional del proyecto clínico conocido anteriormente como DBT Chile, con el mismo equipo y dirección científica desde 2021.',
  },
}

export default function HistoriaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(historiaSchema) }}
      />

      <div className="bg-white">
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-white to-primary/12" />
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-6 text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.18em]">
                Continuidad institucional · Desde 2021
              </div>
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight leading-[1.08]">
                Antes <em className="font-serif italic text-primary">DBT Chile</em>.<br />
                Hoy, <em className="font-serif italic text-primary">Instituto DBT Chile</em>.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                El mismo equipo clínico, la misma dirección científica y la misma vocación
                de excelencia que iniciaron <strong className="text-gray-800">DBT Chile</strong> en 2021,
                ahora consolidados bajo el <strong className="text-gray-800">Instituto DBT Chile</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Declaración de sucesión */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none prose-headings:font-light prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900">
                <h2 className="text-3xl font-light text-gray-900 mb-6">Una misma institución, un nombre consolidado</h2>
                <p>
                  El proyecto clínico que durante sus primeros años operó bajo el nombre de
                  <strong> DBT Chile</strong> (dominio <em>dbtchile.cl</em>) es hoy el
                  <strong> Instituto DBT Chile</strong>. No se trata de un cambio de equipo ni de
                  dirección: es la misma institución, dirigida por la misma profesional, que ha
                  formalizado su identidad y su presencia digital bajo el dominio oficial
                  <strong> institutodbtchile.cl</strong>.
                </p>
                <p>
                  Fundado en <strong>2021</strong>, DBT Chile nació con una convicción: llevar a Chile la
                  Terapia Dialéctico Conductual con <strong>los cuatro componentes del modelo original</strong> de
                  Marsha Linehan y a los estándares internacionales de tratamiento del Trastorno Límite
                  de la Personalidad, el trauma complejo y la desregulación emocional. Esa misión
                  permanece intacta.
                </p>
                <p>
                  Toda la trayectoria, la experiencia clínica, las certificaciones internacionales y la
                  producción académica desarrolladas como DBT Chile forman parte, de manera continua e
                  ininterrumpida, del <strong>Instituto DBT Chile</strong>.
                </p>
              </div>

              {/* Timeline */}
              <div className="mt-14 space-y-6">
                <div className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Landmark className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">2021 · Origen como DBT Chile</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Inicio del proyecto clínico especializado en Terapia Dialéctico Conductual,
                      bajo la dirección de Josefina Cáceres Cortés, Ph.D.(c).
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Acreditación internacional</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Incorporación como única institución representante en Chile de la World Dialectical
                      Behavior Therapy Association (WDBTA), junto a vínculos con APA e ISST.
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Microscope className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Hoy · Instituto DBT Chile</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Consolidación de la identidad institucional en el dominio oficial
                      institutodbtchile.cl, con programas clínicos de alta complejidad, investigación
                      aplicada y formación avanzada en DBT.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-primary/5 via-white to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                La misma excelencia clínica, ahora consolidada
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Si buscabas <strong className="text-gray-800">DBT Chile</strong>, estás en el lugar
                correcto. Conoce nuestros programas o agenda una primera evaluación.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                  <Link href="/tratamiento">
                    Ver programas clínicos
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 border-primary/30 text-primary hover:bg-primary/5">
                  <Link href="/equipo">Conocer al equipo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
