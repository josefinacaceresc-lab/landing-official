import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Layers, Heart, Shield, Sparkles, Microscope } from 'lucide-react'

export const metadata = {
  title: 'Schema Therapy (Terapia de Esquemas) | Instituto DBT Chile',
  description: 'Schema Therapy integrada con DBT en el único centro WDBTA de Chile. Tratamiento de Esquemas Maladaptativos Tempranos (EMT) y Modos Disfuncionales basado en la obra de Jeffrey Young.',
  alternates: { canonical: 'https://institutodbtchile.cl/esquema' },
}

const dominios = [
  { titulo: 'Desconexión y rechazo', emt: 'Abandono, desconfianza, privación emocional, defectuosidad, aislamiento social' },
  { titulo: 'Autonomía deteriorada', emt: 'Dependencia, vulnerabilidad al daño, apego confuso, fracaso' },
  { titulo: 'Límites deteriorados', emt: 'Grandiosidad, autocontrol insuficiente' },
  { titulo: 'Orientación a los demás', emt: 'Subyugación, autosacrificio, búsqueda de aprobación' },
  { titulo: 'Sobrevigilancia e inhibición', emt: 'Negatividad/pesimismo, inhibición emocional, estándares inflexibles, castigo' },
]

const modos = [
  { icon: Heart, titulo: 'Modos Niño', text: 'Niño Vulnerable, Niño Enojado, Niño Impulsivo. Estados emocionales primarios que conservan la huella de experiencias tempranas invalidantes.' },
  { icon: Shield, titulo: 'Modos de Afrontamiento', text: 'Protector Distanciado, Sobrecompensador, Capitulador. Estrategias automáticas que protegen al Niño Vulnerable pero perpetúan el sufrimiento.' },
  { icon: Sparkles, titulo: 'Modos Parentales', text: 'Padre Punitivo, Padre Exigente. Voces internalizadas que reproducen mensajes invalidantes recibidos durante el desarrollo.' },
  { icon: Layers, titulo: 'Adulto Sano', text: 'Objetivo terapéutico. Modo integrador que cuida al Niño Vulnerable, negocia con los modos de afrontamiento y silencia a los modos parentales disfuncionales.' },
]

export default function EsquemaPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 text-sm font-semibold text-primary uppercase tracking-wider">
              Modelo Clínico Integrado
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Schema Therapy: <em className="font-serif italic text-primary">la profundidad estructural</em>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              La Terapia de Esquemas (Young, Klosko & Weishaar, 2003) complementa a DBT trabajando los <strong>Esquemas Maladaptativos Tempranos (EMT)</strong> y los <strong>Modos Disfuncionales</strong> que sostienen el sufrimiento crónico. Es el segundo pilar clínico del Instituto DBT Chile.
            </p>
          </div>
        </div>
      </section>

      {/* Dominios */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Cinco dominios · 18 esquemas</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Los <em className="font-serif italic text-primary">Esquemas Maladaptativos Tempranos</em>
              </h2>
            </div>
            <div className="space-y-4">
              {dominios.map((d, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                  <div className="md:w-1/3">
                    <h3 className="text-lg font-semibold text-gray-900">{d.titulo}</h3>
                  </div>
                  <div className="md:w-2/3 text-gray-600 leading-relaxed">{d.emt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modos */}
      <section className="py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Trabajo con Modos</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                El mapa de los <em className="font-serif italic text-primary">Modos Internos</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {modos.map((m, i) => (
                <Card key={i} className="border-gray-200 hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <m.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-light text-gray-900 mb-3">{m.titulo}</h3>
                    <p className="text-gray-600 leading-relaxed">{m.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integración DBT + Schema */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Microscope className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              ¿Por qué <em className="font-serif italic text-primary">DBT + Schema Therapy</em>?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              DBT entrega <strong>estabilización conductual y emocional</strong> con la mayor evidencia disponible. Schema Therapy aporta <strong>profundidad estructural</strong> para trabajar las raíces evolutivas del sufrimiento. Su integración —documentada en literatura clínica reciente— maximiza la efectividad en casos de alta complejidad: TLP severo, patología dual, trauma complejo y trastornos resistentes.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              En el Instituto DBT Chile esta integración es realizada por clínicos con formación doctoral, certificación WDBTA y entrenamiento ISST.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            Descubre tu <em className="font-serif italic text-primary">perfil de personalidad</em>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Una evaluación clínica estructurada entrega el mapa inicial de rasgos que permite orientar el trabajo con Esquemas y Modos.
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white px-8">
            <Link href="/#contacto">Solicitar valoración inicial <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
