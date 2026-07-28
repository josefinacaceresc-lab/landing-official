// ─── Cache-bust marker ────────────────────────────────────────────────────
// Unique per deploy: forces all JS bundles, HTML, and chunks to receive a
// brand-new hash on every build. Without this, the platform may serve stale
// /admin bundles after a deploy and leave the page blank (recurring issue).
const BUILD_ID = (typeof process !== 'undefined' && process.env.BUILD_ID)
  || Date.now().toString()

const nextConfig = {
  output: 'standalone',
  // Force fresh bundles each deploy (cache-busting at the framework level)
  generateBuildId: async () => BUILD_ID,
  // Make BUILD_ID readable from the client (used to display version in /admin)
  env: {
    NEXT_PUBLIC_BUILD_ID: BUILD_ID,
  },
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
    // Keep compiled pages in memory for 5 minutes in dev so navigation in
    // the preview doesn't re-compile routes on every visit (was 10s).
    maxInactiveAge: 300000,
    pagesBufferLength: 5,
  },
  async headers() {
    return [
      // ── No-cache for admin panel (prevents stale bundles after deploys) ──
      // This was the root cause of the "blank /admin after deploy" bug.
      // Forces browsers + CDN to always fetch fresh HTML/JS for admin routes.
      {
        source: "/admin",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
          { key: "Surrogate-Control", value: "no-store" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
          { key: "Surrogate-Control", value: "no-store" },
        ],
      },
      {
        source: "/api/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
      // ── Global headers (existing) ──
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
  
  // 301 Redirects — preserves legacy URLs.
  async redirects() {
    return [
      // ── TEST IDP-4 ELIMINADO (falsos positivos) — 301 permanente a home ──
      // Se eliminó todo el flujo del test (/evaluacion-idp4 y /autoevaluacion).
      {
        source: '/autoevaluacion',
        destination: '/',
        permanent: true,
      },
      {
        source: '/autoevaluacion/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/evaluacion-idp4',
        destination: '/',
        permanent: true,
      },
      {
        source: '/evaluacion-idp4/:path*',
        destination: '/',
        permanent: true,
      },

      // ── Consolidación SEO: /blog → /foro (hub único de contenido) ──────
      // El /blog tenía enlaces rotos (404) y canibalizaba keywords con el Foro.
      // 301 permanente: consolida la autoridad histórica de /blog en /foro.
      {
        source: '/blog',
        destination: '/foro',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/foro',
        permanent: true,
      },

      // ── Legacy "ugly" WordPress URLs → clean SEO paths (301) ──────────
      // The Dra. reported seeing /tlp_-_dbt/alta-gama in the wild (likely a Google-cached
      // legacy URL). Catch all variants.
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

      // ── Legacy /terapia_dbt/* (WordPress viejo, cacheado por Google) ──
      // Resultado obsoleto "Plataforma de IA Lakaira" en /terapia_dbt/especialistas.
      // Específica primero, luego comodín.
      {
        source: '/terapia_dbt/especialistas',
        destination: '/equipo',
        permanent: true,
      },
      {
        source: '/terapia_dbt/especialistas/',
        destination: '/equipo',
        permanent: true,
      },
      {
        source: '/terapia_dbt',
        destination: '/terapia-dbt',
        permanent: true,
      },
      {
        source: '/terapia_dbt/:slug*',
        destination: '/terapia-dbt',
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
      // (Redirect legacy eliminado: la página vive ahora en /evaluacion-psiquiatrica
      // como hub clínico dedicado — ver /app/app/evaluacion-psiquiatrica/page.js)
      
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
