'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Brain, BookOpen, Users, Award, Landmark, Microscope, Cpu, CheckCircle } from 'lucide-react'
import { trackPhoneClick, trackEmailClick } from '@/lib/googleAdsTracking'
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/whatsapp'
import FAQSection from '@/components/FAQSection'

const WA_HREF_DEFAULT = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`
const WA_HREF_REMOTE = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, me gustaría agendar una evaluación inicial online (DBT Remote). ¿Me podrían indicar los pasos? Gracias.')}`

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section — sobrio, editorial, CTA único */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="container relative z-10 mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-10">
              <img
                src="https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/508ec6e06fbe47fd935a5e124ba0eae3_logodbt_vertical%2050-50.jpg"
                alt="Instituto DBT Chile"
                width="320"
                height="320"
                draggable="false"
                className="h-24 md:h-28 w-auto object-contain select-none"
                style={{ mixBlendMode: 'multiply' }}
                loading="eager"
              />
            </div>

            <div className="mb-8 text-[11px] md:text-xs text-gray-400 uppercase tracking-[0.25em]">
              Anteriormente DBT Chile · Desde 2021
            </div>

            <h1 className="mb-8">
              <span className="block font-serif text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 tracking-tight leading-[1.05]">
                Instituto DBT Chile
              </span>
              <span className="block mt-6 text-xl md:text-2xl font-light text-gray-700 leading-snug tracking-wide">
                Tratamiento DBT de alta especialización para desregulación emocional severa y casos complejos
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Programa anual estructurado, presencial en Vitacura y online en todo Chile y el extranjero (DBT Remote). Un modelo que integra DBT con Terapia de Esquemas para los casos donde otros tratamientos no han funcionado.
            </p>

            <div className="flex flex-col items-center">
              <Button
                asChild
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-7 text-base font-medium tracking-wide shadow-sm hover:shadow-md transition-all"
              >
                <a href={WA_HREF_DEFAULT} target="_blank" rel="noopener noreferrer">
                  Agendar evaluación inicial
                </a>
              </Button>
              <p className="mt-3 text-xs text-gray-500 tracking-wide">
                presencial u online
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ¿Es esto lo que le pasa? — bloque de reconocimiento ─────────── */}
      <section id="es-esto-lo-que-le-pasa" className="py-20 md:py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto" style={{ maxWidth: '700px' }}>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-10 text-center">
              ¿Es esto lo que le pasa?
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-[1.9] text-justify">
                Hay personas que sienten todo con una intensidad que a los demás les cuesta entender. La rabia llega antes de alcanzar a pensarla. Una discusión menor deja tres días de derrumbe. Las relaciones se vuelven urgentes y después insoportables. Y de fondo, la sensación permanente de no saber bien quién se es.
              </p>
              <p className="text-lg text-gray-700 leading-[1.9] text-justify">
                Muchos han pasado ya por varios tratamientos. Algunos ayudaron un tiempo y después dejaron de funcionar. Eso no significa que no haya salida: significa que el problema está en un nivel que esos tratamientos no alcanzaron.
              </p>
              <p className="text-lg text-gray-700 leading-[1.9] text-justify">
                A ese patrón la clínica lo llama desregulación emocional, y suele estar en la base del trastorno límite de la personalidad. El tratamiento con mayor evidencia acumulada para abordarlo es la Terapia Dialéctico Conductual, o DBT.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Por qué Instituto DBT Chile — bloque editorial ─────────────── */}
      <section id="por-que" className="py-20 md:py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto" style={{ maxWidth: '700px' }}>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-10 text-center">
              Por qué Instituto DBT Chile
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-[1.9] text-justify">
                Un modelo propio, sostenido durante doce meses. Al año, el 73% de nuestros consultantes permanece en tratamiento activo.
              </p>
              <p className="text-lg text-gray-700 leading-[1.9] text-justify">
                Trabajamos sobre la arquitectura de la Terapia Dialéctico Conductual —sesión individual, entrenamiento en habilidades, coaching entre sesiones y consultoría clínica semanal del equipo— integrada con Terapia de Esquemas bajo certificación ISST, para los casos en que el patrón de personalidad, y no la habilidad ausente, sostiene el problema.
              </p>
              <p className="text-lg text-gray-700 leading-[1.9] text-justify">
                Junto a NexariaLabs desarrollamos ApoFix: la primera aplicación de psiquiatría computacional a la desregulación emocional en una práctica clínica de habla hispana. Hoy en fase piloto, con participación voluntaria.
              </p>
              <p className="text-lg text-gray-700 leading-[1.9] text-justify">
                Atendemos exclusivamente de forma particular, sin convenios institucionales, y nunca más de cien casos activos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <div className="inline-block mb-4 text-sm font-semibold text-emerald-700 uppercase tracking-wider">Estándar clínico internacional</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Lo que hay <em className="font-serif italic text-emerald-700">detrás</em> de un tratamiento serio.
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8 leading-[1.9]">
                Nuestro rigor no es una declaración de intenciones, sino un respaldo verificable. Somos la única institución chilena que reúne tres acreditaciones internacionales que normalmente se encuentran por separado: <strong>WDBTA</strong> (Terapia Dialéctico Conductual), <strong>APA</strong> (Psicología Norteamericana) e <strong>ISST</strong> (Schema Therapy). Son los marcos que garantizan que cada intervención tiene método, evidencia y estándar internacional.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm text-gray-700">
                <div><strong className="text-emerald-700">Cobertura:</strong> Única institución chilena con las tres</div>
                <div><strong className="text-emerald-700">Acreditaciones:</strong> WDBTA · APA · ISST</div>
                <div><strong className="text-emerald-700">Dirección clínica:</strong> Ph.D.(c) con formación internacional</div>
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

      {/* Programas Clínicos — "El cuidado clínico que ofrecemos" (moved above ApoFix for CRO) */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-4 text-sm font-semibold text-emerald-700 uppercase tracking-wider">El cuidado clínico que ofrecemos</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                Trabajamos los <em className="font-serif italic text-emerald-700">cuadros que otros lugares evitan</em>.
              </h2>
              <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                TLP severo, comorbilidades complejas, adolescentes en crisis, adicciones combinadas con trastornos de personalidad. Casos donde la terapia tradicional ha quedado corta y se necesita una estructura clínica específica.
              </p>
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
                        El tratamiento con la mayor evidencia científica acumulada para el TLP. Reducción consistente de crisis, conductas autolesivas y hospitalizaciones, bajo estándar WDBTA, con los cuatro componentes del modelo sostenidos durante doce meses.
                      </p>
                      <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Conocer el programa <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>

                {/* Patología Dual — destacado */}
                <Link href="/tratamientos/patologia-dual" className="group">
                  <Card className="border-2 border-primary/30 shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-primary/5 to-white h-full">
                    <CardContent className="p-7">
                      <h4 className="text-xl font-bold text-primary mb-2">Patología Dual <span className="font-light text-gray-700">(TLP + adicciones)</span></h4>
                      <p className="text-sm font-bold text-primary uppercase tracking-wide mb-4">Cuando hay desregulación y consumo</p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Cuando la sustancia funciona como un intento desesperado de regular un dolor que el sistema nervioso no puede contener, el tratamiento tiene que abordar las dos cosas a la vez. Centro de alta complejidad con protocolo DBT-SUD adaptado a nuestro programa anual y monitoreo clínico ApoFix AI.
                      </p>
                      <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Conocer el programa <ArrowRight className="w-4 h-4" />
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
                        Para adolescentes con desregulación emocional severa, autolesiones o riesgo suicida. Protocolo Rathus & Miller con trabajo multifamiliar obligatorio: los padres no son espectadores, son parte activa del proceso.
                      </p>
                      <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Conocer el programa <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              {/* ── Sub-strip de especializaciones SEO/Ads landings ── */}
              <div className="mt-10 pt-10 border-t border-emerald-100/70">
                <div className="text-center mb-6">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-[0.18em]">Otras especializaciones clínicas</div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Link href="/terapia-dbt" className="group block p-5 bg-white rounded-xl border border-gray-100 hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="text-base font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">Terapia DBT</div>
                    <div className="text-xs text-gray-500 leading-snug">Visión general del modelo Linehan · Acreditación WDBTA</div>
                  </Link>
                  <Link href="/dbt-trauma" className="group block p-5 bg-white rounded-xl border border-gray-100 hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="text-base font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">DBT-PTSD · Trauma complejo</div>
                    <div className="text-xs text-gray-500 leading-snug">Único en Chile · Modelo Professor Dr. Martin Bohus</div>
                  </Link>
                  <Link href="/dbt-y-adicciones" className="group block p-5 bg-white rounded-xl border border-gray-100 hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="text-base font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">DBT y Adicciones</div>
                    <div className="text-xs text-gray-500 leading-snug">Tratamiento integrado para patología dual</div>
                  </Link>
                  <Link href="/dbt-kids-and-teens" className="group block p-5 bg-white rounded-xl border border-gray-100 hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="text-base font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">DBT Kids and Teens</div>
                    <div className="text-xs text-gray-500 leading-snug">Modelo propio DialectIA Teens · Autonomía emocional</div>
                  </Link>
                  <Link href="/trastornos-de-personalidad" className="group block p-5 bg-white rounded-xl border border-gray-100 hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="text-base font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">Trastornos de Personalidad</div>
                    <div className="text-xs text-gray-500 leading-snug">DBT + Terapia de Esquemas · Diagnóstico dimensional</div>
                  </Link>
                </div>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Dirección científica</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Josefina Cáceres Cortés, Ph.D.(c), con formación doctoral en curso y publicaciones científicas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">ApoFix AI</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Plataforma clínica de inteligencia artificial para apoyo en regulación emocional. Proyecto NexariaLabs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── DBT Remote: el mismo programa, donde usted esté ─────────────── */}
      <section className="py-20 md:py-24 bg-stone-50 border-y border-stone-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto text-center" style={{ maxWidth: '700px' }}>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-10">
              DBT Remote: el mismo programa, donde usted esté
            </h2>
            <p className="text-lg text-gray-700 leading-[1.9] text-justify mb-10">
              Todos los componentes del programa — sesiones individuales, grupo de habilidades y evaluación inicial — están disponibles en modalidad online con el mismo equipo clínico y la misma estructura. Atendemos pacientes en todo Chile y chilenos residentes en el extranjero.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-400 text-gray-800 hover:bg-white px-10 py-6 text-base font-medium tracking-wide"
            >
              <a href={WA_HREF_REMOTE} target="_blank" rel="noopener noreferrer">
                Agendar evaluación online
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ApoFix AI & NexariaLabs Section - PROMINENT */}
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
                <span className="font-bold text-primary">ApoFix AI</span>
                <br />
                <span className="text-3xl md:text-4xl">El Puente entre DBT Clínico y Ciencia de Datos</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Desarrollado por <strong>NexariaLabs</strong>, ApoFix AI es nuestra extensión de inteligencia artificial que integra análisis de lenguaje natural, modelos predictivos y psicometría computacional para potenciar la precisión diagnóstica y el monitoreo terapéutico en tiempo real.
              </p>
            </div>

            {/* Main Card */}
            <Card className="border-2 border-primary/20 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left: Content */}
                  <div className="p-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      ¿Qué hace ApoFix AI?
                    </h3>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <strong className="text-gray-900">Fenotipado Digital:</strong>
                          <span className="text-gray-600"> Análisis multidimensional de la desregulación emocional con instrumentos clínicos.</span>
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
                        <div className="text-3xl font-bold mb-1">AI</div>
                        <div className="text-sm text-primary-foreground/80">Fenotipado Digital</div>
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
                <strong className="text-primary">ApoFix AI</strong> es una marca registrada de NexariaLabs · Desarrollo científico exclusivo para Instituto DBT Chile
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
              <div className="mb-4 text-sm font-semibold text-primary uppercase tracking-wider">Vinculación internacional verificable</div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Capítulo de Investigación <span className="font-semibold text-primary">WDBTA</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Pertenecer formalmente a la <strong>World Dialectical Behavior Therapy Association</strong> implica acceso continuo a los marcos clínicos que se discuten internacionalmente en Seattle, Londres, Amsterdam y Melbourne. No es un sello decorativo: es la garantía de que nuestro modelo se actualiza con la evidencia que se produce afuera.
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Modelo completo, cadencia propia</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Sostenemos los cuatro componentes del modelo de Linehan durante doce meses: terapia individual cada quince días, entrenamiento grupal de habilidades cada quince días, coaching telefónico en crisis y consultoría clínica semanal del equipo. El currículum completo de los cuatro módulos se cubre a lo largo del año, con una cadencia grupal ampliada de forma deliberada: más tiempo entre sesiones significa más práctica de cada habilidad en la vida real antes de avanzar a la siguiente.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Diálogo continuo con centros internacionales</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Acceso a la red de investigación de DBT en Seattle, Londres, Amsterdam y Melbourne. Lo que se discute allá llega acá, sin la latencia que normalmente existe entre la evidencia y la práctica clínica chilena.
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
                Convivir con una persona en crisis emocional crónica desgasta de un modo específico que rara vez se nombra. Las familias también necesitan herramientas, un lenguaje común con su ser querido y un espacio donde su propio agotamiento sea reconocido. Trabajamos con los modelos <strong>Family Connections™</strong> y <strong>DBT-Family Skills Training</strong>, los dos programas con mayor evidencia internacional para acompañar a quienes están del otro lado del cuadro.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprender lo que ocurre</h3>
                <p className="text-gray-600">Psicoeducación clínica sobre TLP, modelo biosocial de Linehan y neurobiología de la desregulación emocional. Información que devuelve sentido al caos.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aprender el mismo lenguaje DBT</h3>
                <p className="text-gray-600">Mindfulness, tolerancia al malestar y regulación emocional adaptados para el contexto familiar. Las habilidades se practican en casa con el lenguaje que también aprende su hijo o pareja.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reducción medida de las crisis</h3>
                <p className="text-gray-600">La evidencia internacional documenta una disminución significativa de conductas autolesivas cuando la familia se integra activamente al modelo terapéutico. Hoffman, Fruzzetti y colaboradores (2007), entre otros, han mostrado mejoras sostenidas tanto en el consultante como en la calidad de los vínculos familiares.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No estar solos en esto</h3>
                <p className="text-gray-600">Grupos cerrados de familias que atraviesan procesos similares. Espacios contenidos donde el agotamiento, la culpa y el cansancio pueden hablarse sin pudor.</p>
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

            {/* Enlace informativo al programa */}
            <div className="text-center mt-4">
              <Link
                href="/tratamiento/dbt-infanto-juvenil"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-base border-b border-primary/40 hover:border-primary pb-0.5 transition-all"
              >
                Conocer el programa para familias
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="mt-4 text-sm text-gray-500">Modalidad presencial y online · 12 sesiones · Grupos cerrados</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section (SEO: FAQPage schema + Speakable) ───────────────── */}
      <FAQSection />


      {/* ── Programa y valores — información institucional ──────────────── */}
      <section className="py-20 md:py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto" style={{ maxWidth: '700px' }}>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-10 text-center">
              Programa y valores
            </h2>
            <p className="text-lg text-gray-700 leading-[1.9] text-justify">
              El tratamiento completo tiene una duración de 12 meses, en modalidad presencial u online. La inversión es de $580.000 mensuales e incluye todos los componentes del programa. El ingreso comienza con una evaluación clínica inicial de $90.000. Entregamos boleta reembolsable según su seguro complementario.
            </p>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-4 text-xs font-medium text-gray-500 uppercase tracking-[0.2em]">
              Valoración clínica inicial
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 leading-tight">
              ¿<em className="font-serif italic text-primary">Conversamos</em>?
            </h2>
            <p className="text-base text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Si llegaste hasta acá, probablemente hay algo que vienes pensando hace tiempo. No es necesario tener todo claro para un primer contacto. Nuestro equipo recibe cada solicitud personalmente y responde dentro de las 24 horas hábiles.
            </p>

            <a
              href={WA_HREF_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-base border-b border-primary/40 hover:border-primary pb-0.5 transition-all"
            >
              Agendar evaluación inicial
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="mt-16 pt-10 border-t border-gray-200 grid sm:grid-cols-3 gap-8 text-sm text-gray-600">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Teléfono</p>
                <a
                  href="tel:+56228480652"
                  onClick={() => trackPhoneClick('contacto-section')}
                  className="hover:text-primary transition-colors"
                >
                  +56 2 2848 0652
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Correo</p>
                <a
                  href="mailto:contacto@dbtchile.cl"
                  onClick={() => trackEmailClick('contacto-section')}
                  className="hover:text-primary transition-colors"
                >
                  contacto@dbtchile.cl
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Sede</p>
                <p>El Coihue 3776, Vitacura, Santiago</p>
              </div>
            </div>

            <p className="mt-10 text-xs text-gray-400">
              Lunes a jueves · 10:00 – 19:00 hrs · Viernes · 10:00 – 16:00 hrs (hora Chile)
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
