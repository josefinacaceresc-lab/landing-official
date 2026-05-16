/**
 * Next.js 14 dynamic sitemap generator.
 * Served at /sitemap.xml automatically.
 */

import { papers } from '@/lib/papers'

const BASE = 'https://institutodbtchile.cl'

export default function sitemap() {
  const now = new Date().toISOString()

  const staticRoutes = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/equipo`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/tratamiento`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/tratamiento/tlp-alta-gama`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/tratamiento/dbt-infanto-juvenil`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/tratamientos/patologia-dual`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/investigacion`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/investigacion/la-mente-algoritmica`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/investigacion/wdbta`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/esquema`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/foro`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/evaluacion-idp4`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ]

  const paperRoutes = (papers || []).map((p) => ({
    url: `${BASE}/investigacion/paper/${p.id}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.85,
  }))

  return [...staticRoutes, ...paperRoutes]
}
