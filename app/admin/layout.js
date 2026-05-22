/**
 * Layout for /admin route — applies noindex metadata.
 *
 * Critical for SEO & privacy:
 *   - Prevents Google/Bing from indexing the admin panel
 *   - Reinforces the next-sitemap.config.js exclusion at the page level
 *   - Defense-in-depth: even if a stale sitemap leaks /admin, the page itself
 *     tells crawlers to skip it.
 */

export const metadata = {
  title: 'Panel Administrativo · Instituto DBT Chile',
  description: 'Panel administrativo privado. Acceso restringido a personal autorizado.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-snippet': -1,
      'max-image-preview': 'none',
    },
  },
  // No canonical, no openGraph, no twitter — this is a private route.
}

export default function AdminLayout({ children }) {
  return children
}
