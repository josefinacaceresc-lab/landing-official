const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  experimental: {
    // Remove if not using Server Components
    serverComponentsExternalPackages: ['mongodb'],
  },
  webpack(config, { dev }) {
    if (dev) {
      // Reduce CPU/memory from file watching
      config.watchOptions = {
        poll: 2000, // check every 2 seconds
        aggregateTimeout: 300, // wait before rebuilding
        ignored: ['**/node_modules'],
      };
    }
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
          { key: "Access-Control-Allow-Origin", value: process.env.CORS_ORIGINS || "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "*" },
        ],
      },
    ];
  },
  
  // CRITICAL: 301 Redirects to preserve 3 years of SEO authority from dbtchile.cl
  async redirects() {
    return [
      // ── Legacy "ugly" WordPress URLs → clean SEO paths (301) ──────────
      // The Dra. reported seeing /tlp_-_dbt/alta-gama in the wild (likely a Google-cached
      // legacy URL from the old dbtchile.cl WordPress site). Catch all variants.
      {
        source: '/tlp_-_dbt/alta-gama',
        destination: '/tratamiento/tlp-alta-gama',
        permanent: true,
      },
      {
        source: '/tlp_-_dbt/alta-gama/',
        destination: '/tratamiento/tlp-alta-gama',
        permanent: true,
      },
      {
        source: '/tlp_-_dbt/:slug*',
        destination: '/tratamiento/tlp-alta-gama',
        permanent: true,
      },
      {
        source: '/tlp-dbt/:slug*',
        destination: '/tratamiento/tlp-alta-gama',
        permanent: true,
      },
      {
        source: '/tratamiento/tlp',
        destination: '/tratamiento/tlp-alta-gama',
        permanent: true,
      },
      {
        source: '/tlp/alta-gama',
        destination: '/tratamiento/tlp-alta-gama',
        permanent: true,
      },
      {
        source: '/alta-gama',
        destination: '/tratamiento/tlp-alta-gama',
        permanent: true,
      },
      {
        source: '/alta-complejidad',
        destination: '/tratamientos/patologia-dual',
        permanent: true,
      },

      // Main pages - Core SEO authority
      {
        source: '/inicio',
        destination: '/',
        permanent: true, // 301
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      
      // DBT Programs - High traffic pages
      {
        source: '/terapia-dbt-estandar',
        destination: '/servicios/dbt-estandar',
        permanent: true,
      },
      {
        source: '/terapia-dbt-estandar/',
        destination: '/servicios/dbt-estandar',
        permanent: true,
      },
      {
        source: '/terapia-de-orientacion-dbt-remote',
        destination: '/servicios/dbt-remote',
        permanent: true,
      },
      {
        source: '/terapia-de-orientacion-dbt-remote/',
        destination: '/servicios/dbt-remote',
        permanent: true,
      },
      
      // Addictions/DBT-SUD - Specialized content
      {
        source: '/adicciones',
        destination: '/servicios/dbt-sud',
        permanent: true,
      },
      {
        source: '/adicciones/',
        destination: '/servicios/dbt-sud',
        permanent: true,
      },
      {
        source: '/dbt-sud-en-chile-primer-programa-de-terapia-dialectico-conductual-para-adicciones',
        destination: '/blog/dbt-sud-primer-programa-chile',
        permanent: true,
      },
      {
        source: '/dbt-sud-en-chile-primer-programa-de-terapia-dialectico-conductual-para-adicciones/',
        destination: '/blog/dbt-sud-primer-programa-chile',
        permanent: true,
      },
      
      // Hospital de día
      {
        source: '/primer-hospital-de-dia-en-chile-con-enfoque-dbt-integral',
        destination: '/servicios/hospital-dia-dbt',
        permanent: true,
      },
      {
        source: '/primer-hospital-de-dia-en-chile-con-enfoque-dbt-integral/',
        destination: '/servicios/hospital-dia-dbt',
        permanent: true,
      },
      
      // Psychiatric evaluation
      {
        source: '/evaluacion-psiquiatrica',
        destination: '/servicios/evaluacion-psiquiatrica',
        permanent: true,
      },
      {
        source: '/evaluacion-psiquiatrica/',
        destination: '/servicios/evaluacion-psiquiatrica',
        permanent: true,
      },
      
      // Blog posts - Content authority
      {
        source: '/que-es-dbt-y-como-es-el-dispositivo-clinico-en-dbt-chile',
        destination: '/blog/que-es-dbt-dispositivo-clinico',
        permanent: true,
      },
      {
        source: '/que-es-dbt-y-como-es-el-dispositivo-clinico-en-dbt-chile/',
        destination: '/blog/que-es-dbt-dispositivo-clinico',
        permanent: true,
      },
      {
        source: '/guia-rapida-tlp-el-termostato-roto-de-las-emociones',
        destination: '/blog/guia-rapida-tlp-termostato-emociones',
        permanent: true,
      },
      {
        source: '/guia-rapida-tlp-el-termostato-roto-de-las-emociones/',
        destination: '/blog/guia-rapida-tlp-termostato-emociones',
        permanent: true,
      },
      {
        source: '/cuerpo-trauma-decision-mirada-neurobiopsicologica-desregulacion-emocional-impulsividad-en-personas-traumatizadas',
        destination: '/blog/cuerpo-trauma-decision-neurobiologia',
        permanent: true,
      },
      {
        source: '/cuerpo-trauma-decision-mirada-neurobiopsicologica-desregulacion-emocional-impulsividad-en-personas-traumatizadas/',
        destination: '/blog/cuerpo-trauma-decision-neurobiologia',
        permanent: true,
      },
      
      // Team/About
      {
        source: '/nosotros',
        destination: '/equipo',
        permanent: true,
      },
      {
        source: '/quienes-somos',
        destination: '/equipo',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/equipo',
        permanent: true,
      },
      {
        source: '/staff',
        destination: '/equipo',
        permanent: true,
      },
      
      // Contact
      {
        source: '/contacto',
        destination: '/#contacto',
        permanent: true,
      },
      
      // Author archives (WordPress specific)
      {
        source: '/author/:slug*',
        destination: '/blog',
        permanent: true,
      },
      
      // WordPress category/tag archives
      {
        source: '/category/:slug*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/:slug*',
        destination: '/blog',
        permanent: true,
      },
      
      // WordPress pagination
      {
        source: '/page/:number',
        destination: '/blog',
        permanent: true,
      },
      
      // Servicios general
      {
        source: '/servicios',
        destination: '/',
        permanent: true,
      },
      
      // WordPress media/attachments (if any direct links exist)
      {
        source: '/wp-content/uploads/:path*',
        destination: '/media/:path*',
        permanent: true,
      },
      
      // Catch-all for WordPress admin/system pages (redirect to home)
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-includes/:path*',
        destination: '/',
        permanent: true,
      },
      
      // Feed redirects
      {
        source: '/feed',
        destination: '/',
        permanent: true,
      },
      {
        source: '/feed/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
