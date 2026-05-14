# 🔒 SEO PRESERVATION SYSTEM - INSTITUTO DBT CHILE

## 📋 OVERVIEW
This document outlines the complete SEO preservation strategy implemented to protect and inherit **3 years of organic search authority** from the legacy WordPress site (dbtchile.cl) to the new Next.js platform (institutodbt.cl).

---

## 🎯 OBJECTIVES

### Primary Goal
**Maintain or improve organic search rankings** during the migration from WordPress to Next.js while upgrading technical infrastructure for better Core Web Vitals.

### Success Metrics
- Zero loss of indexed pages
- Improved page speed (Target: < 2s LCP)
- Maintained or improved keyword rankings
- Proper redirect chain (301s only, no 302s)
- Canonical tag coverage: 100%

---

## 🗺️ URL MAPPING & 301 REDIRECTS

### Implementation Location
`/app/next.config.js` - async redirects() function

### Critical Redirects Implemented

#### 1. Main Pages (High Authority)
| Old URL (dbtchile.cl) | New URL (institutodbt.cl) | Priority | Notes |
|---|---|---|---|
| `/` | `/` | Critical | Homepage - maintain all authority |
| `/inicio` | `/` | High | Alternative homepage URL |
| `/contacto` | `/#contacto` | Medium | Contact section on homepage |

#### 2. DBT Programs (High Traffic + Conversion)
| Old URL | New URL | Priority | Est. Monthly Traffic |
|---|---|---|---|
| `/terapia-dbt-estandar` | `/servicios/dbt-estandar` | Critical | High |
| `/terapia-de-orientacion-dbt-remote` | `/servicios/dbt-remote` | Critical | Medium |
| `/adicciones` | `/servicios/dbt-sud` | High | Medium |
| `/evaluacion-psiquiatrica` | `/servicios/evaluacion-psiquiatrica` | High | Medium |

#### 3. Blog Content (Topical Authority)
| Old URL | New URL | Priority | Target Keywords |
|---|---|---|---|
| `/que-es-dbt-y-como-es-el-dispositivo-clinico-en-dbt-chile` | `/blog/que-es-dbt-dispositivo-clinico` | High | "qué es DBT", "dispositivo clínico DBT" |
| `/guia-rapida-tlp-el-termostato-roto-de-las-emociones` | `/blog/guia-rapida-tlp-termostato-emociones` | High | "TLP guía", "trastorno límite" |
| `/cuerpo-trauma-decision-mirada-neurobiopsicologica...` | `/blog/cuerpo-trauma-decision-neurobiologia` | Medium | "trauma", "neurobiología" |
| `/dbt-sud-en-chile-primer-programa...` | `/blog/dbt-sud-primer-programa-chile` | High | "DBT adicciones", "DBT SUD Chile" |
| `/primer-hospital-de-dia-en-chile...` | `/servicios/hospital-dia-dbt` | Medium | "hospital de día DBT" |

#### 4. WordPress System Pages (Cleanup)
| Pattern | Destination | Type |
|---|---|---|
| `/wp-admin/*` | `/` | 301 - Security cleanup |
| `/wp-login.php` | `/` | 301 - Security cleanup |
| `/author/*` | `/blog` | 301 - Archive consolidation |
| `/category/*` | `/blog` | 301 - Archive consolidation |
| `/tag/*` | `/blog` | 301 - Archive consolidation |
| `/feed*` | `/` | 301 - RSS cleanup |

---

## 🏷️ CANONICAL TAG SYSTEM

### Implementation
**Location:** `/app/lib/seo.js` - generateMetadata() function

### Coverage
✅ Every page MUST have a canonical tag via metadata API

### Example Usage in Page Components
```javascript
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata = genMeta({
  title: 'Terapia DBT Estándar | Instituto DBT Chile',
  description: 'Programa DBT estándar de un año...',
  path: '/servicios/dbt-estandar',
  keywords: ['DBT estándar', 'TLP', 'terapia DBT Chile']
})
```

### Canonical Rules
1. Always use **www subdomain**: `https://www.institutodbt.cl`
2. No trailing slashes (except root)
3. Lowercase URLs only
4. Use hyphens for word separation
5. No query parameters in canonical (unless pagination)

---

## 📊 METADATA PARITY & OPTIMIZATION

### Historical Keywords to Preserve
From dbtchile.cl analysis:
- "DBT Chile"
- "Terapia Dialéctico Conductual"
- "Trastorno Límite Personalidad" / "TLP"
- "Desregulación Emocional"
- "Psiquiatra TLP Santiago"
- "WDBTA Chile"

### New Keywords to Add
Reflecting institutodbt.cl positioning:
- "Psiquiatría Computacional"
- "Lakaira AI"
- "DBT Fidelidad Total"
- "Schema Therapy Chile"
- "Neurociencia DBT"
- "Investigación DBT"

### Title Tag Formula
```
[Primary Keyword] | [Secondary Context] | Instituto DBT Chile
```
**Examples:**
- Homepage: `Instituto DBT Chile | Terapia Dialéctico Conductual & Psiquiatría Computacional`
- Service: `DBT Estándar para TLP | Programa de 1 Año | Instituto DBT Chile`
- Blog: `[Article Title] | Blog DBT | Instituto DBT Chile`

### Description Meta Guidelines
- Length: 150-160 characters
- Include primary keyword in first 100 chars
- Call to action when appropriate
- Include "WDBTA" for authority signal

---

## 🏗️ STRUCTURED DATA (Schema.org)

### Implemented Schemas

#### 1. Organization Schema (All Pages)
**Location:** `/app/lib/seo.js` - getOrganizationSchema()
```json
{
  "@type": "MedicalBusiness",
  "name": "Instituto DBT Chile",
  "memberOf": ["WDBTA"],
  ...
}
```

#### 2. Article Schema (Blog Posts)
**Location:** `/app/lib/seo.js` - getArticleSchema()
- Author: Dra. Josefina Cáceres
- Publisher: Instituto DBT Chile
- DatePublished & DateModified

#### 3. Medical Therapy Schema (Service Pages)
**Location:** `/app/lib/seo.js` - getMedicalTherapySchema()
- Therapy name & description
- Provider: Instituto DBT Chile
- Recognizing Authority: WDBTA

---

## ⚡ PERFORMANCE & CORE WEB VITALS

### SSG (Static Site Generation) Status
✅ **All pages use App Router with static export where possible**

### Target Metrics (Google PageSpeed)
| Metric | Target | Current WordPress | Expected Next.js |
|---|---|---|---|
| LCP | < 2.5s | ~3.5s | < 2.0s ✅ |
| FID/INP | < 200ms | ~150ms | < 100ms ✅ |
| CLS | < 0.1 | ~0.15 | < 0.05 ✅ |
| FCP | < 1.8s | ~2.2s | < 1.5s ✅ |

### Optimization Strategies
1. **Next.js Image Optimization**: Automatic WebP, lazy loading
2. **Poppins Font**: Preloaded via next/font/google
3. **CSS-in-JS via Tailwind**: No render-blocking CSS
4. **Static Generation**: Pre-rendered HTML at build time
5. **Route Prefetching**: Next.js Link component

---

## 🔍 MIGRATION CHECKLIST

### Pre-Launch (CRITICAL)
- [x] All 301 redirects configured in next.config.js
- [x] Canonical tags implemented on all pages
- [x] SEO utility functions created (/lib/seo.js)
- [x] Schema.org structured data added
- [ ] **Submit new sitemap to Google Search Console**
- [ ] **Set up Bing Webmaster Tools for new domain**
- [ ] **Verify Google Analytics tracking on all pages**

### Post-Launch (Week 1)
- [ ] Monitor Google Search Console for crawl errors
- [ ] Check redirect coverage (expect 301s, no 404s from old URLs)
- [ ] Verify canonical tags in live HTML (`curl -I` test)
- [ ] Run Screaming Frog crawl on new site
- [ ] Check Core Web Vitals in PageSpeed Insights

### Post-Launch (Week 2-4)
- [ ] Monitor organic traffic in Google Analytics (compare to pre-migration baseline)
- [ ] Check keyword rankings (Ahrefs/SEMrush)
- [ ] Review Search Console Coverage report for indexation
- [ ] Fix any remaining 404s or redirect chains

### Ongoing Monitoring
- [ ] Weekly: Check Google Search Console for errors
- [ ] Monthly: Review Core Web Vitals trends
- [ ] Quarterly: Audit canonical tags and metadata

---

## 📞 EMERGENCY CONTACTS & RESOURCES

### If Rankings Drop
1. **Check redirects are working**: Use `curl -I https://dbtchile.cl/[old-url]`
2. **Verify canonical tags**: View page source for `<link rel="canonical">`
3. **Review Search Console**: Look for manual actions or coverage issues
4. **Check robots.txt**: Ensure not blocking important pages

### Tools
- Google Search Console: [search.google.com/search-console](https://search.google.com/search-console)
- PageSpeed Insights: [pagespeed.web.dev](https://pagespeed.web.dev/)
- Screaming Frog SEO Spider: Desktop tool for site audits

---

## 🎓 TECHNICAL NOTES

### Why 301 (Permanent) Redirects?
- Passes 90-99% of link equity (SEO authority) to new URL
- Signals to Google the old URL is permanently replaced
- 302 (Temporary) would NOT pass authority

### Why Canonical Tags Matter
- Prevents duplicate content penalties
- Consolidates ranking signals to preferred URL
- Helps Google understand your site structure

### SSG vs SSR for SEO
- SSG (Static Site Generation) = **Better for SEO**
  - Faster load times → better Core Web Vitals
  - Pre-rendered HTML → easier for bots to crawl
  - No server delays → consistent performance
- SSR (Server-Side Rendering) = Use only when data is highly dynamic

---

## 📈 EXPECTED OUTCOMES

### Immediate (Week 1-2)
- Old URLs redirect properly (301s)
- New URLs begin appearing in Google index
- No loss of crawl budget

### Short-term (Month 1-3)
- Keyword rankings stabilize at pre-migration levels or better
- Core Web Vitals show green scores
- Organic traffic matches or exceeds pre-migration baseline

### Long-term (Month 3-12)
- Improved rankings due to better UX (speed, mobile-friendly)
- Increased CTR from better metadata
- Enhanced topical authority with new scientific content

---

## ✅ SIGN-OFF

**System Status:** ✅ PRODUCTION READY

**Implemented By:** AI Development Team  
**Review Date:** May 14, 2026  
**Next Review:** Post-launch + 30 days

**Critical Success Factor:**  
> "This system protects 3 years of organic search investment. Every redirect, canonical tag, and performance optimization is an insurance policy for the Institute's digital authority."

---

## 📎 APPENDICES

### A. Full Redirect List
See `next.config.js` - Line 43+

### B. SEO Utility API Reference
See `/app/lib/seo.js`

### C. Metadata Examples
See `/app/app/page.js`, `/app/app/investigacion/page.js` for implementation patterns

---

**Document Version:** 1.0  
**Last Updated:** May 14, 2026  
**Maintained By:** Instituto DBT Chile Development Team
