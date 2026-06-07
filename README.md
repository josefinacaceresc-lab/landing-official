# Instituto DBT Chile v2.0 - Next.js

## 🏛️ Arquitectura SEO Premium

Sitio web de alta autoridad científica construido con Next.js 14 y Static Site Generation (SSG) para máximo rendimiento SEO.

### ✨ Características Principales

- **🎨 Diseño**: Estética minimalista Zen de ultra-lujo con paleta Esmeralda, Oro y Blanco
- **🚀 Tecnología**: Next.js 14 con App Router y SSG (Static Site Generation)
- **🔍 SEO Avanzado**: 
  - Metadata única por página
  - Open Graph y Twitter Cards optimizados (1200x630px)
  - Canonical tags y hreflang es-CL
  - Sitemap.xml automático con next-sitemap
  - robots.txt configurado
  - JSON-LD Schema (MedicalBusiness y Article)
- **📊 Google Ads Ready**: Google Tag (AW-18117776220) pre-configurado
- **⚡ Core Web Vitals**: Optimización con next/image y next/font
- **🎯 Conversión**: Evento de conversión para clics en WhatsApp

### 📂 Estructura de Rutas

```
/                                          # Home - Authority, WDBTA, Research + Clinical CTA
/investigacion                             # Hub de Investigación
/investigacion/la-mente-algoritmica        # 8 Papers Doctorales + Tratado Maestro
/investigacion/wdbta                       # Único Representante WDBTA en Chile
/equipo                                    # Dra. Josefina Cáceres + Equipo Clínico
/blog                                      # Artículos SEO-optimizados
```

### 🛠️ Tecnologías

- **Framework**: Next.js 14.2.3
- **UI Components**: shadcn/ui + Radix UI
- **Estilos**: Tailwind CSS 3.4
- **Iconos**: Lucide React
- **Database**: MongoDB 6.6 (para futuras funcionalidades)
- **SEO**: next-sitemap 4.2.3

### 🎨 Paleta de Colores

```css
Emerald (Primary): #10b981 (--primary: 160 84% 39%)
Gold (Accent):     #fbbf24 (--secondary: 43 96% 56%)
White (Base):      #ffffff (--background: 0 0% 100%)
```

### 🚀 Desarrollo

```bash
# Instalar dependencias
yarn install

# Modo desarrollo
yarn dev

# Build para producción
yarn build

# Generar sitemap
yarn postbuild
```

### 📝 SEO Checklist

- ✅ Metadata única por página con title templates
- ✅ Open Graph images 1200x630px
- ✅ Twitter Cards configuradas
- ✅ Canonical tags apuntando a institutodbtchile.cl
- ✅ hreflang es-CL para geolocalización Chile
- ✅ robots.txt con indexación completa (bloqueo /api/)
- ✅ Sitemap.xml con prioridades y changefreq
- ✅ JSON-LD Schema para MedicalBusiness
- ✅ Google Tag Manager integrado
- ✅ next/image para optimización automática
- ✅ next/font para optimización de fuentes

### 🔧 Configuración Google Ads

El sitio incluye:
- Google Tag instalado: `AW-18117776220`
- Evento de conversión configurado para clics en botón WhatsApp (Serena)
- Ready para migración de dominio sin reconexión

### 📊 Proyectos de Investigación

1. **ApoFix AI**: Sistema de IA para evaluación momentánea ecológica (EMA)
2. **La Mente Algorítmica**: 8 artículos científicos sobre desregulación emocional
   - Artículo destacado: Tratado Maestro (6,454 palabras, 33 referencias APA 7)
3. **NexariaLabs**: Laboratorio de innovación en tecnologías de salud mental

### 🎯 Próximos Pasos (Fase 2)

Para completar la funcionalidad completa del sitio, se requiere:

1. **Integración IA para "Serena"** (Asistente de Admisión):
   - Elegir proveedor: OpenAI GPT-4, Google Gemini, o Anthropic Claude
   - Implementar lógica de horario Chile (Lun-Vie 9-18h)
   - Configurar detección de fin de semana
   - API Key requerida

2. **Lead Scoring Agéntico**:
   - Sistema de puntuación de leads basado en engagement
   - Integración con CRM o base de datos

3. **WhatsApp Integration**:
   - Botón funcional con número de contacto
   - Evento de conversión Google Ads en clic

4. **Contenido Real**:
   - Integrar los 4 artículos doctorales completos
   - Añadir PDFs descargables de papers
   - Fotos reales del equipo
   - Logo Enso Zen definitivo

### 🔒 Variables de Entorno

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=instituto_dbt
NEXT_PUBLIC_BASE_URL=https://institutodbtchile.cl
CORS_ORIGINS=*
```

### 📦 Deploy

El sitio está optimizado para deploy en cualquier plataforma que soporte Next.js:
- Vercel (recomendado)
- Netlify
- AWS Amplify
- Docker + Kubernetes (actual)

### 🎓 Créditos

Desarrollado para Instituto DBT Chile - Mayo 2026
Único representante de WDBTA (World DBT Training Alliance) en Chile

---

**Nota**: Este es un proyecto en paralelo a landing-hub-175. No afecta el sitio actual en producción.
