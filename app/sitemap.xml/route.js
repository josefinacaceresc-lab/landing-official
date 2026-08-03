/**
 * Route Handler for /sitemap.xml
 *
 * Uses a route handler (not the Next.js metadata `sitemap.js` file) because
 * the metadata variant is pre-rendered at build time and ignores
 * `dynamic = 'force-dynamic'`, which caused missing paper routes in
 * production builds. This handler generates the XML at request time so any
 * newly added route is picked up on the next request without a full rebuild.
 */

import { articulos } from '@/lib/articulos'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BASE = 'https://institutodbtchile.cl'

const staticRoutes = [
  { path: '', priority: 1.0, changefreq: 'weekly' },
  { path: '/terapia-dbt', priority: 0.98, changefreq: 'weekly' },
  { path: '/dbt-y-adicciones', priority: 0.98, changefreq: 'weekly' },
  { path: '/dbt-kids-and-teens', priority: 0.98, changefreq: 'weekly' },
  { path: '/dbt-trauma', priority: 0.98, changefreq: 'weekly' },
  { path: '/trastornos-de-personalidad', priority: 0.98, changefreq: 'weekly' },
  { path: '/equipo', priority: 0.9, changefreq: 'monthly' },
  { path: '/tratamiento', priority: 0.95, changefreq: 'monthly' },
  { path: '/tratamiento/tlp-alta-gama', priority: 0.95, changefreq: 'monthly' },
  { path: '/tratamiento/dbt-infanto-juvenil', priority: 0.9, changefreq: 'monthly' },
  { path: '/tratamientos/patologia-dual', priority: 0.9, changefreq: 'monthly' },
  { path: '/evaluacion-psiquiatrica', priority: 0.95, changefreq: 'monthly' },
  { path: '/investigacion', priority: 0.9, changefreq: 'weekly' },
  { path: '/investigacion/la-mente-algoritmica', priority: 0.85, changefreq: 'monthly' },
  { path: '/investigacion/wdbta', priority: 0.85, changefreq: 'monthly' },
  { path: '/investigacion/preprint-apofenia-relacional-recursiva', priority: 0.85, changefreq: 'monthly' },
  { path: '/investigacion/preprint-inferencia-activa', priority: 0.85, changefreq: 'monthly' },
  { path: '/esquema', priority: 0.8, changefreq: 'monthly' },
  { path: '/historia', priority: 0.8, changefreq: 'monthly' },
  { path: '/evaluacion-bsl23', priority: 0.75, changefreq: 'monthly' },
  { path: '/foro', priority: 0.85, changefreq: 'weekly' },
  { path: '/privacidad', priority: 0.3, changefreq: 'yearly' },
  { path: '/terminos', priority: 0.3, changefreq: 'yearly' },
]

const paperIds = [1, 2, 3, 4, 5, 6, 7, 8]

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function urlBlock(loc, lastmod, changefreq, priority) {
  return (
    `  <url>\n` +
    `    <loc>${escapeXml(loc)}</loc>\n` +
    `    <lastmod>${lastmod}</lastmod>\n` +
    `    <changefreq>${changefreq}</changefreq>\n` +
    `    <priority>${priority.toFixed(2)}</priority>\n` +
    `  </url>`
  )
}

export async function GET() {
  const now = new Date().toISOString()

  const entries = []

  // Static routes
  for (const r of staticRoutes) {
    entries.push(urlBlock(`${BASE}${r.path}`, now, r.changefreq, r.priority))
  }

  // Doctoral papers
  for (const id of paperIds) {
    entries.push(urlBlock(`${BASE}/investigacion/paper/${id}`, now, 'yearly', 0.85))
  }

  // Clinical forum articles
  for (const a of articulos || []) {
    const lastmod = a.fecha ? new Date(a.fecha).toISOString() : now
    entries.push(urlBlock(`${BASE}/foro/articulos/${a.slug}`, lastmod, 'monthly', 0.8))
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries.join('\n') +
    `\n</urlset>\n`

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
