import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  metadataBase: new URL('https://institutodbt.cl'),
  title: {
    default: 'Instituto DBT Chile | Terapia Dialéctico Conductual',
    template: '%s | Instituto DBT Chile'
  },
  description: 'Instituto líder en Terapia Dialéctico Conductual (DBT) en Chile. Único representante de WDBTA. Investigación científica en neurociencia y salud mental.',
  keywords: ['DBT', 'Terapia Dialéctico Conductual', 'WDBTA', 'salud mental', 'Chile', 'neurociencia', 'investigación', 'psicología clínica'],
  authors: [{ name: 'Instituto DBT Chile' }],
  creator: 'Instituto DBT Chile',
  publisher: 'Instituto DBT Chile',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://institutodbt.cl',
    languages: {
      'es-CL': 'https://institutodbt.cl',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://institutodbt.cl',
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
  verification: {
    google: 'AW-18117776220',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es-CL">
      <head>
        <link rel="canonical" href="https://institutodbt.cl" />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
        {/* Google Tag Manager */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18117776220"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18117776220');
          `
        }} />
        {/* JSON-LD Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalBusiness',
            '@id': 'https://institutodbt.cl',
            name: 'Instituto DBT Chile',
            url: 'https://institutodbt.cl',
            logo: 'https://institutodbt.cl/logo-enso.png',
            description: 'Instituto líder en Terapia Dialéctico Conductual (DBT) en Chile. Único representante de WDBTA.',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'CL',
              addressLocality: 'Chile'
            },
            geo: {
              '@type': 'GeoCoordinates',
              addressCountry: 'CL'
            },
            areaServed: 'CL',
            medicalSpecialty: 'Psychology',
            availableLanguage: ['es-CL'],
            sameAs: []
          })
        }} />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}