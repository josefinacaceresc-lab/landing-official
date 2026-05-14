/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.institutodbt.cl',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*', '/evaluacion-idp4/resultados', '/evaluacion-bsl23/resultados'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '**/resultados'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    additionalSitemaps: [
      'https://www.institutodbt.cl/sitemap.xml',
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
      
      // Services - High conversion potential
      '/servicios/dbt-estandar': { priority: 0.9, changefreq: 'monthly' },
      '/servicios/dbt-remote': { priority: 0.9, changefreq: 'monthly' },
      '/servicios/dbt-sud': { priority: 0.85, changefreq: 'monthly' },
      '/servicios/evaluacion-psiquiatrica': { priority: 0.85, changefreq: 'monthly' },
      
      // Team & About
      '/equipo': { priority: 0.8, changefreq: 'monthly' },
      
      // Blog - Fresh content signal
      '/blog': { priority: 0.8, changefreq: 'daily' },
      
      // Assessments - Lead generation
      '/autoevaluacion': { priority: 0.75, changefreq: 'monthly' },
      '/evaluacion-bsl23': { priority: 0.75, changefreq: 'monthly' },
      '/evaluacion-idp4': { priority: 0.75, changefreq: 'monthly' },
      
      // Specialized treatments
      '/tratamientos/patologia-dual': { priority: 0.7, changefreq: 'monthly' },
    }

    return {
      loc: path,
      changefreq: customConfig[path]?.changefreq || 'weekly',
      priority: customConfig[path]?.priority || 0.6,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `https://www.institutodbt.cl${path}`,
          hreflang: 'es-CL',
        },
      ],
    }
  },
}