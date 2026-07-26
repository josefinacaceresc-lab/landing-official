/**
 * SEO UTILITY - CRITICAL FOR PRESERVING 3 YEARS OF AUTHORITY
 * 
 * This file ensures:
 * 1. Canonical tags on every page
 * 2. Consistent metadata structure
 * 3. Proper URL canonicalization
 * 4. Schema.org structured data
 */

// Canonical URL is always the production domain for SEO consistency,
// but allow override via env for preview/staging environments.
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://institutodbtchile.cl';

/**
 * Generate canonical URL for a given path
 * @param {string} path - The page path (e.g., '/investigacion', '/blog/article')
 * @returns {string} - Full canonical URL
 */
export function getCanonicalUrl(path = '/') {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Remove trailing slash except for root
  const cleanPath = normalizedPath === '/' 
    ? '' 
    : normalizedPath.replace(/\/$/, '');
  
  return `${BASE_URL}${cleanPath}`;
}

/**
 * Generate base metadata object with SEO essentials
 * @param {Object} params - Metadata parameters
 * @returns {Object} - Next.js metadata object
 */
export function generateMetadata({ 
  title, 
  description, 
  path = '/',
  keywords = [],
  type = 'website',
  images = [],
  noindex = false
}) {
  const canonical = getCanonicalUrl(path);
  
  const defaultKeywords = [
    'DBT Chile',
    'Terapia Dialéctico Conductual',
    'TLP',
    'Trastorno Límite Personalidad',
    'Desregulación Emocional',
    'WDBTA',
    'Psiquiatría',
    'Salud Mental Chile'
  ];
  
  const allKeywords = [...new Set([...keywords, ...defaultKeywords])];
  
  const defaultImage = {
    url: `${BASE_URL}/media/og-default.jpg`,
    width: 1200,
    height: 630,
    alt: 'Instituto DBT Chile'
  };
  
  return {
    title,
    description,
    keywords: allKeywords,
    authors: [{ name: 'Instituto DBT Chile' }],
    creator: 'Instituto DBT Chile',
    publisher: 'Instituto DBT Chile',
    
    alternates: {
      canonical,
      languages: {
        'es-CL': canonical,
      },
    },
    
    openGraph: {
      type,
      locale: 'es_CL',
      url: canonical,
      title,
      description,
      siteName: 'Instituto DBT Chile',
      images: images.length > 0 ? images : [defaultImage],
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.length > 0 ? images.map(img => img.url) : [defaultImage.url],
    },
    
    robots: noindex ? {
      index: false,
      follow: false,
    } : {
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
  };
}

/**
 * Generate Organization schema for structured data
 * @returns {Object} - JSON-LD schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': BASE_URL,
    name: 'Instituto DBT Chile',
    alternateName: 'DBT Chile',
    url: BASE_URL,
    logo: `${BASE_URL}/media/logo-dbt-chile.png`,
    description: 'Centro especializado en Terapia Dialéctico Conductual (DBT) y tratamiento de Trastorno Límite de Personalidad. Único miembro institucional WDBTA en Chile.',
    
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CL',
      addressLocality: 'Santiago',
      addressRegion: 'Región Metropolitana',
      streetAddress: 'El Coihue 3776, Vitacura'
    },
    
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.4,
      longitude: -70.6,
      addressCountry: 'CL'
    },
    
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+56-22-848-0652',
      contactType: 'customer service',
      areaServed: 'CL',
      availableLanguage: ['es']
    },
    
    areaServed: 'CL',
    medicalSpecialty: ['Psychology', 'Psychiatry'],
    availableLanguage: ['es-CL'],
    
    sameAs: [
      // Add social media URLs here when available
    ],
    
    founder: {
      '@type': 'Person',
      name: 'Josefina Cáceres Cortés',
      honorificSuffix: 'Ph.D.(c)',
      jobTitle: 'Directora científica',
      affiliation: {
        '@type': 'Organization',
        name: 'World Dialectical Behavior Therapy Association',
        alternateName: 'WDBTA'
      }
    },
    
    memberOf: [
      {
        '@type': 'Organization',
        name: 'World Dialectical Behavior Therapy Association',
        alternateName: 'WDBTA'
      }
    ]
  };
}

/**
 * Generate Article schema for blog posts
 * @param {Object} params - Article parameters
 * @returns {Object} - JSON-LD schema
 */
export function getArticleSchema({ 
  title, 
  description, 
  path, 
  datePublished, 
  dateModified,
  author = 'Josefina Cáceres Cortés, Ph.D.(c)',
  image 
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: getCanonicalUrl(path),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
      affiliation: {
        '@type': 'Organization',
        name: 'Instituto DBT Chile'
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Instituto DBT Chile',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/media/logo-dbt-chile.png`
      }
    },
    image: image || `${BASE_URL}/media/og-default.jpg`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getCanonicalUrl(path)
    }
  };
}

/**
 * Generate Medical Therapy schema
 * @param {Object} params - Therapy parameters
 * @returns {Object} - JSON-LD schema
 */
export function getMedicalTherapySchema({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name,
    description,
    url: getCanonicalUrl(path),
    provider: {
      '@type': 'MedicalBusiness',
      name: 'Instituto DBT Chile',
      url: BASE_URL
    },
    medicineSystem: 'Evidence-based psychotherapy',
    recognizingAuthority: {
      '@type': 'Organization',
      name: 'World Dialectical Behavior Therapy Association',
      alternateName: 'WDBTA'
    }
  };
}

export default {
  getCanonicalUrl,
  generateMetadata,
  getOrganizationSchema,
  getArticleSchema,
  getMedicalTherapySchema,
  BASE_URL
};
