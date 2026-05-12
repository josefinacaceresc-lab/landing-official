/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://institutodbt.cl',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    additionalSitemaps: [
      'https://institutodbt.cl/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq per route
    const customConfig = {
      '/': { priority: 1.0, changefreq: 'daily' },
      '/investigacion': { priority: 0.9, changefreq: 'weekly' },
      '/investigacion/la-mente-algoritmica': { priority: 0.9, changefreq: 'weekly' },
      '/investigacion/wdbta': { priority: 0.8, changefreq: 'monthly' },
      '/equipo': { priority: 0.8, changefreq: 'monthly' },
      '/blog': { priority: 0.7, changefreq: 'daily' },
    }

    return {
      loc: path,
      changefreq: customConfig[path]?.changefreq || 'weekly',
      priority: customConfig[path]?.priority || 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `https://institutodbt.cl${path}`,
          hreflang: 'es-CL',
        },
      ],
    }
  },
}