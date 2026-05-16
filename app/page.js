'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Brain, BookOpen, Users, Award, Landmark, Microscope, Cpu, CheckCircle } from 'lucide-react'
import { trackWhatsAppClick, trackPhoneClick, trackEmailClick } from '@/lib/googleAdsTracking'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-primary/4 to-primary/12" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Vertical Logo - white JPG bg neutralized via mix-blend-mode: multiply on tinted gradient */}
            <div className="flex justify-center mb-8">
              <img
                src="https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/508ec6e06fbe47fd935a5e124ba0eae3_logodbt_vertical%2050-50.jpg"
                alt="Instituto DBT Chile"
                width="320"
                height="320"
                draggable="false"
                className="h-32 md:h-40 w-auto object-contain select-none"
                style={{ mixBlendMode: 'multiply' }}
                loading="eager"
              />
            </div>

            <div className="mb-6 text-sm font-semibold text-primary uppercase tracking-wider">
              Único Miembro Institucional WDBTA en Chile
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              Instituto <em className="font-serif italic text-primary">DBT Chile</em>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Terapia Dialéctico Conductual de excelencia internacional. <strong>Único representante WDBTA en Chile.</strong>
            </p>
            
            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg mb-12"
            >
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('hero')}
              >
                <span className="flex items-center gap-2">
                  Solicitar hora
                  <ArrowRight className="w-5 h-5" />
                </span>
              </a>
            </Button>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div>
                <div className="text-3xl font-serif font-light text-primary mb-1">15+</div>
                <div className="text-sm text-gray-600">Años en DBT</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-light text-primary mb-1">WDBTA</div>
                <div className="text-sm text-gray-600">Miembro institucional</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-light text-primary mb-1">2</div>
                <div className="text-sm text-gray-600">Terapias integradas</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-light text-primary mb-1">AI</div>
                <div className="text-sm text-gray-600">LaKaira · Tecnología clínica</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="inline-block mb-4 text-sm font-semibold text-emerald-700 uppercase tracking-wider">Acreditaciones globales</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                La máxima distinción <em className="font-serif italic text-emerald-700">clínica</em> en Chile.
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Somos la única institución del país acreditada como <strong>miembro institucional de la WDBTA</strong>, <strong>miembro categoría APA</strong> y <strong>certificada por la ISST</strong>. Tres sellos internacionales que garantizan un estándar científico y ético sin precedentes en salud mental.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm text-gray-700">
                <div><strong className="text-emerald-700">País:</strong> Único en Chile</div>
                <div><strong className="text-emerald-700">Acreditaciones:</strong> WDBTA · APA · ISST</div>
                <div><strong className="text-emerald-700">Dirección:</strong> Ph.D.(c) clínica</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* ── WDBTA ─────────────────────────────────────────── */}
              <Card className="group border border-emerald-100/60 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 bg-white overflow-hidden rounded-2xl">
                <div className="h-1 bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300" />
                <CardContent className="p-8">
                  <div className="mb-6 relative h-44 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl ring-1 ring-emerald-100">
                    <div className="absolute inset-0 rounded-xl shadow-inner pointer-events-none" />
                    <Image
                      src="https://customer-assets.emergentagent.com/job_nextjs-dbt-cl/artifacts/2zcxnp4t_-logo_dbt-1.png"
                      alt="WDBTA Logo"
                      width={400}
                      height={400}
                      className="object-contain h-32 w-auto drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                      style={{ mixBlendMode: 'multiply', imageRendering: '-webkit-optimize-contrast' }}
                      unoptimized
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-6 bg-emerald-600 rounded-full" />
                    <h3 className="text-2xl font-serif font-semibold text-gray-900">WDBTA</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">World Dialectical Behavior Therapy Association</p>
                  <p className="text-emerald-700 font-semibold tracking-wide">Miembro institucional</p>
                </CardContent>
              </Card>

              {/* ── APA ─────────────────────────────────────────────── */}
              <Card className="group border border-blue-100/60 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 bg-white overflow-hidden rounded-2xl">
                <div className="h-1 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300" />
                <CardContent className="p-8">
                  <div className="mb-6 relative h-44 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl ring-1 ring-blue-100">
                    <Image
                      src="https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/ebe15d76640a47118ddc6ff68a1b73e6_LOGO%20APA.webp"
                      alt="American Psychological Association Logo"
                      width={400}
                      height={400}
                      className="object-contain h-36 w-auto drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                      style={{ mixBlendMode: 'multiply', imageRendering: '-webkit-optimize-contrast' }}
                      unoptimized
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-6 bg-blue-600 rounded-full" />
                    <h3 className="text-2xl font-serif font-semibold text-gray-900">APA</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">American Psychological Association</p>
                  <p className="text-blue-700 font-semibold uppercase tracking-wider text-sm">Categoría Miembro</p>
                </CardContent>
              </Card>

              {/* ── ISST ────────────────────────────────────────────── */}
              <Card className="group border border-amber-100/60 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 bg-white overflow-hidden rounded-2xl">
                <div className="h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />
                <CardContent className="p-8">
                  <div className="mb-6 relative h-44 flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl ring-1 ring-amber-100">
                    <Image
                      src="https://customer-assets.emergentagent.com/job_nextjs-dbt-cl/artifacts/ekey2ops_isst-300x218.jpg"
                      alt="ISST Logo"
                      width={300}
                      height={218}
                      className="object-contain h-32 w-auto drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                      style={{ mixBlendMode: 'multiply', imageRendering: 'auto' }}
                      unoptimized
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-6 bg-amber-600 rounded-full" />
                    <h3 className="text-2xl font-serif font-semibold text-gray-900">ISST</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">International Society of Schema Therapy</p>
                  <p className="text-amber-700 font-semibold tracking-wide">Certificación</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Lakaira AI & NexariaLabs Section - PROMINENT */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-white to-primary/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
                <Cpu className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Psiquiatría Computacional
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
                <span className="font-bold text-primary">Lakaira AI</span>
                <br />
                <span className="text-3xl md:text-4xl">El Puente entre DBT Clínico y Ciencia de Datos</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Desarrollado por <strong>NexariaLabs</strong>, Lakaira AI es nuestra extensión de inteligencia artificial que integra análisis de lenguaje natural, modelos predictivos y psicometría computacional para potenciar la precisión diagnóstica y el monitoreo terapéutico en tiempo real.
              </p>
            </div>

            {/* Main Card */}
            <Card className="border-2 border-primary/20 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left: Content */}
                  <div className="p-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      ¿Qué hace Lakaira AI?
                    </h3>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <strong className="text-gray-900">Fenotipado Digital:</strong>
                          <span className="text-gray-600"> Análisis multidimensional de desregulación emocional mediante IDP-4.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <strong className="text-gray-900">Predicción de Riesgo:</strong>
                          <span className="text-gray-600"> Modelos de machine learning para prevención de crisis.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <strong className="text-gray-900">Monitoreo Continuo:</strong>
                          <span className="text-gray-600"> Análisis de progreso terapéutico con métricas objetivas.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <strong className="text-gray-900">Interoperabilidad Clínica:</strong>
                          <span className="text-gray-600"> Integración con protocolos DBT y Schema Therapy.</span>
                        </div>
                      </li>
                    </ul>
                    
                    <Button 
                      size="lg" 
                      asChild 
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold w-full md:w-auto"
                    >
                      <a 
                        href="https://www.nexaryalabs.cl" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        Explorar NexariaLabs
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </Button>
                  </div>

                  {/* Right: Visual/Stats */}
                  <div className="bg-gradient-to-br from-primary to-primary/80 p-10 text-white flex flex-col justify-center">
                    <div className="mb-8">
                      <Cpu className="w-16 h-16 mb-4 opacity-90" />
                      <h4 className="text-2xl font-bold mb-2">NexariaLabs</h4>
                      <p className="text-primary-foreground/90 leading-relaxed">
                        Laboratorio de Psiquiatría Computacional y Data Science aplicado a salud mental. Desarrollo de herramientas IA para clínica de alta complejidad.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-3xl font-bold mb-1">IDP-4</div>
                        <div className="text-sm text-primary-foreground/80">Test de Fenotipado</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-3xl font-bold mb-1">24/7</div>
                        <div className="text-sm text-primary-foreground/80">Monitoreo AI</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-3xl font-bold mb-1">ML</div>
                        <div className="text-sm text-primary-foreground/80">Machine Learning</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="text-3xl font-bold mb-1">NLP</div>
                        <div className="text-sm text-primary-foreground/80">Análisis Lingüístico</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Badge */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                <strong className="text-primary">Lakaira AI</strong> es una marca registrada de NexariaLabs · Desarrollo científico exclusivo para InstitutoDBT.cl
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WDBTA Research Chapter - Clean & Elegant */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Certificación Internacional</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Capítulo de Investigación <span className="font-semibold text-primary">WDBTA</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Único miembro institucional de la <strong>World Dialectical Behavior Therapy Association</strong> en Chile
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Barcelona 2023 REAL PHOTO */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/aecd20208fec4060be44c1b61f5f61a0_1697991434321.jpeg"
                    alt="WDBTA Research Chapter Barcelona 2023"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <p className="text-sm font-bold text-gray-900">Barcelona 2023</p>
                  <p className="text-xs text-gray-600">WDBTA Research Chapter</p>
                </div>
              </div>

              {/* Right: Description */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Fidelidad Total DBT</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Adherencia estricta a los protocolos de Marsha Linehan con certificación WDBTA, garantizando el estándar de oro internacional.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Red Global de Investigación</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Conexión directa con los principales centros de DBT del mundo: Seattle, Londres, Amsterdam y Melbourne.
                  </p>
                </div>
                <div className="pt-4">
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                    <Link href="/investigacion/wdbta">
                      Conocer más sobre WDBTA
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Parents Program - Clean & Elegant */}
      <section className="py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header with Logo */}
            <div className="text-center mb-12">
              <div className="mb-6 flex justify-center">
                <img 
                  src="https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/0ba31dde40a141b3afe812d81aa5b1ba_family%20horizotal.jpg"
                  alt="Family Parents"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Programas para <span className="font-semibold text-secondary">Familias</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Entrenamiento especializado en habilidades DBT para padres y cuidadores. Basado en <strong>Family Connections™</strong> y <strong>DBT-Family Skills Training</strong>.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Psicoeducación Familiar</h3>
                <p className="text-gray-600">Comprensión profunda del TLP y neurobiología de la desregulación emocional.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Habilidades DBT</h3>
                <p className="text-gray-600">Mindfulness, Tolerancia al Malestar, Regulación Emocional adaptadas para familias.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reducción de Conflictos</h3>
                <p className="text-gray-600"><strong>72% de reducción</strong> en comportamientos autolesivos reportados.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Grupos de Apoyo</h3>
                <p className="text-gray-600">Espacios seguros para compartir experiencias con otras familias.</p>
              </div>
            </div>

            {/* Family Photo - Single, Centered */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Comunidad Family Parents</h3>
              <div className="max-w-3xl mx-auto">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
                  <img 
                    src="https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/21926a5786ce45b0914d6e0075ddcaf2_family%201.jpg"
                    alt="Comunidad Family Parents — Encuentro de familias"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <p className="text-center text-sm text-gray-500 mt-4 italic">
                  Encuentro de familias y cuidadores formados en habilidades DBT — Instituto DBT Chile
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-4">
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                <a
                  href={getWhatsAppUrl('Hola Karina, me interesa el Programa Familia (DBT-A) en Instituto DBT Chile.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('family-cta')}
                >
                  Solicitar Información
                </a>
              </Button>
              <p className="mt-4 text-sm text-gray-500">Modalidad presencial y online · 12 sesiones</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-4 text-sm font-semibold text-emerald-700 uppercase tracking-wider">Por qué elegirnos</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Un estándar científico sin precedentes en Chile
              </h2>
            </div>

            {/* Programas Clínicos — Patient-facing landing cards */}
            <div className="mb-20">
              <div className="text-center mb-10">
                <div className="mb-3 text-sm font-semibold text-primary uppercase tracking-wider">Programas Clínicos</div>
                <h3 className="text-3xl md:text-4xl font-light text-gray-900">
                  Tratamientos de <em className="font-serif italic text-primary">alta complejidad</em>
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {/* TLP */}
                <Link href="/tratamiento/tlp-alta-gama" className="group">
                  <Card className="border-0 shadow-lg hover:shadow-2xl transition-all bg-white h-full">
                    <CardContent className="p-7">
                      <h4 className="text-xl font-bold text-primary mb-2">Trastorno Límite de Personalidad</h4>
                      <p className="text-sm font-semibold text-primary/80 uppercase tracking-wide mb-4">TLP</p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Tratamiento de primera línea con la mayor evidencia científica. Reducción de conductas suicidas, autolesivas y hospitalizaciones bajo estándar WDBTA.
                      </p>
                      <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Conocer más <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>

                {/* Patología Dual — destacado */}
                <Link href="/tratamientos/patologia-dual" className="group">
                  <Card className="border-2 border-primary/30 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-primary/5 to-white h-full">
                    <CardContent className="p-7">
                      <h4 className="text-xl font-bold text-primary mb-2">Patología Dual <span className="font-light text-gray-700">(TLP + TUS)</span></h4>
                      <p className="text-sm font-bold text-primary uppercase tracking-wide mb-4">Desregulación con adicciones</p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Único Centro de Alta Complejidad en Chile para TLP + Trastorno por Uso de Sustancias. Protocolo DBT-SUD de Fidelidad Total con monitoreo LaKaira AI.
                      </p>
                      <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Conocer más <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>

                {/* DBT-A */}
                <Link href="/tratamiento/dbt-infanto-juvenil" className="group">
                  <Card className="border-0 shadow-lg hover:shadow-2xl transition-all bg-white h-full">
                    <CardContent className="p-7">
                      <h4 className="text-xl font-bold text-primary mb-2">DBT Infanto-Juvenil</h4>
                      <p className="text-sm font-semibold text-primary/80 uppercase tracking-wide mb-4">DBT-A</p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Programa para Adolescentes con Fidelidad Total al modelo Rathus & Miller. Integración mandatoria del sistema familiar vía Camino del Medio.
                      </p>
                      <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Conocer más <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Landmark className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Miembro WDBTA</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Único miembro institucional de la World DBT Association en Chile. Estándares internacionales en cada tratamiento.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">DBT + Schema Therapy</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Integración exclusiva certificada ISST. Protocolo propio para desregulación emocional profunda.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Microscope className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Dirección Ph.D.(c)</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Dirigido por la Dra.(c) Josefina Cáceres Cortés, con formación doctoral en curso y publicaciones científicas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">LaKaira AI</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Plataforma clínica de inteligencia artificial para apoyo en regulación emocional. Proyecto NexariaLabs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}

      {/* Self-Assessment CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-emerald-600 to-emerald-800 text-white overflow-hidden">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  
                  <h2 className="text-4xl font-light mb-4">
                    Evalúa tu <span className="font-serif font-semibold">Desregulación Emocional</span>
                  </h2>
                  
                  {/* ── Unique-in-Chile badges ──────────── */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-emerald-700 text-xs font-bold uppercase tracking-wider shadow-md">
                      <CheckCircle className="w-3.5 h-3.5" /> Única en Chile
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-amber-950 text-xs font-bold uppercase tracking-wider shadow-md">
                      Investigación Transversal
                    </span>
                  </div>

                  <p className="text-xl text-emerald-100 mb-2 max-w-2xl mx-auto">
                    Primer instrumento de evaluación dimensional transversal desarrollado para la <strong className="text-white">población chilena</strong>
                  </p>
                  <p className="text-sm text-emerald-200/90 mb-8 max-w-2xl mx-auto">
                    Test en proceso de validación + Reporte personalizado inmediato
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <Button size="lg" asChild className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-lg font-semibold">
                      <Link href="/evaluacion-idp4">
                        Comenzar Test Gratuito
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-emerald-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>10 minutos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Resultados inmediatos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Reporte clínico</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>100% confidencial</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Solicita tu <span className="font-semibold">Consulta</span>
            </h2>
            <p className="text-xl mb-12 text-emerald-50">
              Da el primer paso. Nuestro equipo responde en menos de 24 horas hábiles.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-white text-emerald-700 hover:bg-emerald-50 px-12 py-6 text-lg font-semibold"
            >
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('home-contacto')}
              >
                WhatsApp · +56 9 3055 0750
              </a>
            </Button>
            <p className="mt-6 text-sm text-emerald-100">
              Horario: Lun–Jue · 10:00–19:00 · Vie · 10:00–16:00 (Santiago)
            </p>
            <div className="mt-8 text-sm text-emerald-100 space-y-2">
              <a
                href="tel:+56228480652"
                onClick={() => trackPhoneClick('contacto-section')}
                className="block hover:text-white transition-colors"
              >
                📞 +56 2 2848 0652
              </a>
              <a
                href="mailto:contacto@dbtchile.cl"
                onClick={() => trackEmailClick('contacto-section')}
                className="block hover:text-white transition-colors"
              >
                ✉️ contacto@dbtchile.cl
              </a>
              <p>📍 El Coihue 3776, Vitacura, Santiago</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}