import './globals.css'
import { Poppins } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FastCaptureModal from '@/components/FastCaptureModal'
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton'
import GclidCapture from '@/components/GclidCapture'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap'
})

export const metadata = {
  metadataBase: new URL('https://institutodbtchile.cl'),
  title: {
    default: 'Instituto DBT Chile | Terapia Dialéctico Conductual',
    template: '%s | Instituto DBT Chile'
  },
  description: 'Instituto DBT Chile (antes DBT Chile) — instituto líder en Terapia Dialéctico Conductual (DBT) en Chile desde 2021. Único representante de WDBTA. Especialistas en Trastorno Límite de la Personalidad, trauma complejo y adicciones.',
  keywords: ['DBT Chile', 'Instituto DBT Chile', 'dbtchile', 'DBT', 'Terapia Dialéctico Conductual', 'WDBTA', 'Trastorno Límite de la Personalidad', 'TLP', 'salud mental', 'Chile', 'neurociencia', 'psicología clínica'],
  authors: [{ name: 'Instituto DBT Chile' }],
  creator: 'Instituto DBT Chile',
  publisher: 'Instituto DBT Chile',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://institutodbtchile.cl',
    languages: {
      'es-CL': 'https://institutodbtchile.cl',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://institutodbtchile.cl',
    title: 'Instituto DBT Chile | Terapia Dialéctico Conductual',
    description: 'Instituto líder en Terapia Dialéctico Conductual (DBT) en Chile. Único representante de WDBTA.',
    siteName: 'Instituto DBT Chile',
    images: [{
      url: 'https://images.unsplash.com/photo-1765490526583-4bf7f007096f?fm=jpg&q=80&w=1200&h=630&fit=crop',
      width: 1200,
      height: 630,
      alt: 'Instituto DBT Chile'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instituto DBT Chile | Terapia Dialéctico Conductual',
    description: 'Instituto líder en Terapia Dialéctico Conductual (DBT) en Chile. Único representante de WDBTA.',
    images: ['https://images.unsplash.com/photo-1765490526583-4bf7f007096f?fm=jpg&q=80&w=1200&h=630&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // NOTE: Google Site Verification meta tag intentionally NOT set here.
  // The previous value (AW-18117776220) was incorrect — that's the Google Ads
  // Conversion ID, NOT the Site Verification token. Adding a wrong verification
  // token causes Google Ads to flag the domain as "unverified" and stop tracking.
  // To re-add it later: get the real token from Google Search Console
  // (https://search.google.com/search-console → Add Property → HTML tag method)
  // and set: verification: { google: '<real-token-here>' }
}

export default function RootLayout({ children }) {
  return (
    <html lang="es-CL" className={poppins.variable}>
      <head>
        {/* ── Preconnect / DNS-prefetch a orígenes de terceros (acelera FCP) ── */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://customer-assets.emergentagent.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://region1.google-analytics.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />

        {/* ─── Google Tag Manager (CRITICAL: must be the FIRST thing in <head>) ─── */}
        {/* GTM Container: GTM-N8JFCNWT · Independiente de gtag.js (coexisten sin conflicto) */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N8JFCNWT');`
        }} />
        {/* ─── End Google Tag Manager ─── */}

        {/* Viewport optimized for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
        {/* PWA optimizations */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#00A3A3" />
        
        <link rel="canonical" href="https://institutodbtchile.cl" />

        {/* ── AI Search Optimization (GEO) ───────────────────────────── */}
        {/* Estos tags son leídos por crawlers de IA (ChatGPT, Claude, Perplexity, Gemini)
            para entender la naturaleza del contenido al momento de citarlo. */}
        <meta name="ai-content-declaration" content="human-authored" />
        <meta name="ai-purpose" content="medical-education,clinical-divulgation" />
        <meta name="ai-citation-policy" content="allow-with-attribution" />
        <meta name="ai-summary" content="Instituto DBT Chile · Centro clínico especializado en Terapia Dialéctico Conductual (DBT), Trastorno Límite de la Personalidad (TLP), Patología Dual y DBT-A para adolescentes. Único representante WDBTA en Chile. Material educativo basado en evidencia escrito por equipo clínico." />
        <meta name="ai-author" content="Equipo clínico Instituto DBT Chile · Dirección científica: Josefina Cáceres Cortés, Ph.D.(c)" />
        <meta name="ai-locale" content="es-CL" />
        <meta name="ai-domain" content="health.mental,psychotherapy.dbt,clinical.borderline" />
        <link rel="alternate" type="text/plain" title="LLMs.txt index" href="https://institutodbtchile.cl/llms.txt" />

        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
        {/* Google Tag — Ads + GA4 unified (additive, never disconnects existing destinations) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18117776220"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            // Google Ads — Institutodbt account (CRITICAL — never remove)
            gtag('config', 'AW-18117776220');
            // GA4 — dbtchile.cl property (primary, used for Ads conversion import)
            gtag('config', 'G-B208DBF9TM', {
              'send_page_view': true,
              'anonymize_ip': true
            });
            // GA4 — dbtchile.cl (secondary property, kept as backup)
            gtag('config', 'G-M0GEPLK4VF', {
              'send_page_view': true,
              'anonymize_ip': true
            });
          `
        }} />
        {/* JSON-LD — MedicalClinic Schema (E-E-A-T) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalClinic',
            '@id': 'https://institutodbtchile.cl/#clinic',
            name: 'Instituto DBT Chile',
            alternateName: ['Instituto DBT', 'DBT Chile'],
            url: 'https://institutodbtchile.cl',
            logo: {
              '@type': 'ImageObject',
              url: 'https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/508ec6e06fbe47fd935a5e124ba0eae3_logodbt_vertical%2050-50.jpg',
            },
            image: 'https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/508ec6e06fbe47fd935a5e124ba0eae3_logodbt_vertical%2050-50.jpg',
            description: 'Instituto líder en Terapia Dialéctico Conductual (DBT) en Chile. Único representante institucional WDBTA. Atención especializada en Trastorno Límite de la Personalidad, Patología Dual y Psiquiatría Computacional.',
            slogan: 'Terapia Dialéctico Conductual de excelencia internacional',
            telephone: '+56-2-28480652',
            email: 'contacto@dbtchile.cl',
            priceRange: '$$$',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'El Coihue 3776',
              addressLocality: 'Vitacura',
              addressRegion: 'Región Metropolitana',
              addressCountry: 'CL',
              postalCode: '7630000',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: -33.3870,
              longitude: -70.5811,
            },
            areaServed: {
              '@type': 'Country',
              name: 'Chile',
            },
            foundingDate: '2021',
            founder: {
              '@type': 'Physician',
              '@id': 'https://institutodbtchile.cl/equipo#josefina-caceres',
              name: 'Josefina Cáceres Cortés',
              honorificSuffix: 'Ph.D.(c)',
              jobTitle: 'Directora científica',
              description: 'Directora clínica del Instituto DBT Chile. Única representante institucional WDBTA en Chile. Doctoranda con especialización en DBT, Schema Therapy y Psiquiatría Computacional.',
            },
            medicalSpecialty: [
              'Psychology',
              'Psychiatry',
              'Mental Health',
            ],
            availableService: [
              { '@type': 'MedicalTherapy', name: 'Terapia Dialéctico Conductual (DBT) Estándar' },
              { '@type': 'MedicalTherapy', name: 'DBT para Trastorno Límite de la Personalidad (TLP)' },
              { '@type': 'MedicalTherapy', name: 'DBT Infanto-Juvenil (DBT-A)' },
              { '@type': 'MedicalTherapy', name: 'Tratamiento de Patología Dual (DBT-SUD)' },
              { '@type': 'MedicalTherapy', name: 'Schema Therapy' },
              { '@type': 'MedicalTherapy', name: 'Programa Familia · Apoyo a padres' },
            ],
            memberOf: [
              {
                '@type': 'Organization',
                name: 'World Dialectical Behavior Therapy Association',
                alternateName: 'WDBTA',
                url: 'https://wdbta.com',
              },
              {
                '@type': 'Organization',
                name: 'American Psychological Association',
                alternateName: 'APA',
                url: 'https://www.apa.org',
              },
              {
                '@type': 'Organization',
                name: 'International Society of Schema Therapy',
                alternateName: 'ISST',
                url: 'https://schematherapysociety.org',
              },
              {
                '@type': 'Organization',
                name: 'Sociedad Española de Estudios de los Trastornos Límite de la Personalidad',
                alternateName: 'SEETLP',
              },
            ],
            availableLanguage: ['es-CL', 'en'],
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                opens: '10:00',
                closes: '19:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Friday',
                opens: '10:00',
                closes: '16:00',
              },
            ],
            sameAs: [
              'https://dbtchile.cl',
              'https://wdbta.com',
              'https://www.apa.org',
            ],
          }, null, 0)
        }} />

        {/* JSON-LD — Organization (parent entity) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://institutodbtchile.cl/#org',
            name: 'Instituto DBT Chile',
            alternateName: ['DBT Chile', 'DBTCHILE'],
            foundingDate: '2021',
            url: 'https://institutodbtchile.cl',
            sameAs: ['https://dbtchile.cl'],
            logo: 'https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/508ec6e06fbe47fd935a5e124ba0eae3_logodbt_vertical%2050-50.jpg',
            contactPoint: [
              {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                telephone: '+56-2-28480652',
                email: 'contacto@dbtchile.cl',
                areaServed: 'CL',
                availableLanguage: ['Spanish'],
              },
              {
                '@type': 'ContactPoint',
                contactType: 'appointment',
                telephone: '+56-9-37654001',
                contactOption: 'WhatsApp',
                areaServed: 'CL',
                availableLanguage: ['Spanish'],
              },
            ],
          }, null, 0)
        }} />
        {/* JSON-LD — MedicalTherapy (GEO/AI-optimized: indications, contraindications, code)
             Diseñado para extracción por GPTBot, PerplexityBot, ClaudeBot, Google-Extended.
             Referencia el @id del MedicalClinic para evitar duplicación de entidad institucional. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTherapy',
            '@id': 'https://institutodbtchile.cl/#dbt-therapy',
            name: 'Terapia Dialéctico Conductual (DBT)',
            alternateName: ['DBT', 'Dialectical Behavior Therapy', 'Terapia DBT'],
            description: 'Terapia psicológica basada en evidencia desarrollada por Marsha Linehan, con integración de aceptación radical y cambio conductual, aplicada al tratamiento de la desregulación emocional severa, el Trastorno Límite de la Personalidad y las conductas de riesgo.',
            code: {
              '@type': 'MedicalCode',
              code: 'DBT',
              codingSystem: 'Psychotherapy Models',
            },
            indication: [
              {
                '@type': 'MedicalIndication',
                name: 'Trastorno Límite de la Personalidad (TLP)',
              },
              {
                '@type': 'MedicalIndication',
                name: 'Desregulación Emocional Severa',
              },
              {
                '@type': 'MedicalIndication',
                name: 'Conductas Autolesivas y Vulnerabilidad Emocional',
              },
              {
                '@type': 'MedicalIndication',
                name: 'Conducta Suicida y Parasuicida',
              },
              {
                '@type': 'MedicalIndication',
                name: 'Patología Dual (adicciones + salud mental)',
              },
              {
                '@type': 'MedicalIndication',
                name: 'Trastornos de la Conducta Alimentaria con desregulación emocional',
              },
            ],
            contraindication: 'Psicosis activa no estabilizada sin soporte farmacológico integrado.',
            provider: { '@id': 'https://institutodbtchile.cl/#clinic' },
            recognizingAuthority: {
              '@type': 'Organization',
              name: 'World Dialectical Behavior Therapy Association',
              alternateName: 'WDBTA',
              url: 'https://wdbta.com',
            },
            howPerformed: 'Programa clínico integrado de doce meses con cinco componentes: terapia individual quincenal, entrenamiento en habilidades grupal quincenal, coaching entre sesiones, equipo de consultoría semanal para terapeutas y programa familiar de apoyo.',
          }, null, 0)
        }} />

      </head>
      <body className={`${poppins.className} prevent-horizontal-scroll font-smooth`}>
        {/* ─── Google Tag Manager (noscript fallback for users with JS disabled) ─── */}
        {/* Critical: must be the FIRST element inside <body>. Same container as <head> script. */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N8JFCNWT"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* ─── End Google Tag Manager (noscript) ─── */}

        <GclidCapture />
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FastCaptureModal />
        <FloatingWhatsAppButton />
      </body>
    </html>
  )
}