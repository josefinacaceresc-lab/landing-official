/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://institutodbtchile.cl',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  // Excluir rutas privadas, sensibles y self-references.
  // IMPORTANTE: incluir tanto la forma con slash (`/admin/`) como sin (`/admin`)
  // porque next-sitemap genera rutas SIN slash final por defecto.
  exclude: [
    '/api/*',
    '/admin',
    '/admin/*',
    '/lakaira-ai',
    '/lakaira-ai/*',
    '/autoevaluacion/resultados',
    '/autoevaluacion/resultados/*',
    '/evaluacion-idp4/resultados',
    '/evaluacion-idp4/resultados/*',
    '/evaluacion-bsl23/resultados',
    '/evaluacion-bsl23/resultados/*',
    '/sitemap.xml',
    '/sitemap-*.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin',
          '/admin/',
          '/lakaira-ai',
          '/lakaira-ai/',
          '/autoevaluacion/resultados',
          '/evaluacion-idp4/resultados',
          '/evaluacion-bsl23/resultados',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    additionalSitemaps: [
      'https://institutodbtchile.cl/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq per route
    // CRITICAL: Priority reflects SEO importance & traffic potential
    const customConfig = {
      // Core pages - Maximum priority
      '/': { priority: 1.0, changefreq: 'daily' },

      // Research Hub - High authority content
      '/investigacion': { priority: 0.95, changefreq: 'weekly' },
      '/investigacion/la-mente-algoritmica': { priority: 0.9, changefreq: 'weekly' },
      '/investigacion/wdbta': { priority: 0.85, changefreq: 'monthly' },

      // Treatments - Highest conversion potential
      '/tratamiento': { priority: 0.95, changefreq: 'monthly' },
      '/tratamiento/tlp-alta-gama': { priority: 0.95, changefreq: 'monthly' },
      '/tratamiento/dbt-infanto-juvenil': { priority: 0.9, changefreq: 'monthly' },
      '/tratamientos/patologia-dual': { priority: 0.9, changefreq: 'monthly' },

      // Team & About
      '/equipo': { priority: 0.85, changefreq: 'monthly' },

      // Forum (HTML articles, high SEO value)
      '/foro': { priority: 0.85, changefreq: 'weekly' },

      // Esquema institucional
      '/esquema': { priority: 0.8, changefreq: 'monthly' },

      // Blog - Fresh content signal
      '/blog': { priority: 0.75, changefreq: 'daily' },

      // Assessments - Lead generation (landing pages only, NOT /resultados)
      '/autoevaluacion': { priority: 0.75, changefreq: 'monthly' },
      '/evaluacion-bsl23': { priority: 0.75, changefreq: 'monthly' },
      '/evaluacion-idp4': { priority: 0.8, changefreq: 'monthly' },
    }

    return {
      loc: path,
      changefreq: customConfig[path]?.changefreq || 'weekly',
      priority: customConfig[path]?.priority || 0.6,
      lastmod: new Date().toISOString(),
      // NO alternateRefs — sitio monolingüe es-CL.
      // Antes generaba bug: href="https://institutodbtchile.cl/admin/admin"
      // porque next-sitemap apendea path automáticamente.
    }
  },
}