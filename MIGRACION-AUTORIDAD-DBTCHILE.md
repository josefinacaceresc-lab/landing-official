# PLAN MAESTRO: Traspaso de Autoridad dbtchile.cl → institutodbtchile.cl

## ORDEN DE EJECUCIÓN (CRÍTICO — respetar el orden)

### PASO 1 — Verificar dbtchile.cl en Google Search Console (ANTES de redirigir)
1. Entrar a https://search.google.com/search-console → "Añadir propiedad" → tipo "Prefijo de URL" → `https://dbtchile.cl`
2. Método de verificación recomendado: **Etiqueta HTML** (meta tag).
3. Copiar el código que da Google y pegarlo en el WordPress antiguo:
   - wp-admin → Yoast SEO → Ajustes → Herramientas para webmasters → campo "Google" → pegar código → guardar.
4. Volver a Search Console y pulsar "Verificar".
> Si no se hace ANTES de las redirecciones, la verificación por etiqueta dejará de funcionar.

### PASO 2 — Implementar las redirecciones 301 (en el servidor del WordPress antiguo)
Editar el archivo `.htaccess` en la raíz del sitio (vía cPanel → Administrador de archivos, o FTP).
Pegar este bloque **AL PRINCIPIO del archivo, ANTES de la línea `# BEGIN WordPress`**:

```apache
# ============================================================
# MIGRACION 301 → institutodbtchile.cl (traspaso de autoridad)
# ============================================================
<IfModule mod_rewrite.c>
RewriteEngine On

# --- Excepciones: mantener acceso al admin y verificación de Google ---
RewriteCond %{REQUEST_URI} ^/(wp-admin|wp-login\.php|wp-json) [OR]
RewriteCond %{REQUEST_URI} ^/google[a-zA-Z0-9]+\.html$
RewriteRule ^ - [L]

# --- Redirecciones página a página (relevancia temática) ---
RewriteRule ^terapia-dbt-estandar/?$ https://institutodbtchile.cl/terapia-dbt [R=301,L]
RewriteRule ^terapia-de-orientacion-dbt-remote/?$ https://institutodbtchile.cl/terapia-dbt [R=301,L]
RewriteRule ^que-es-dbt-y-como-es-el-dispositivo-clinico-en-dbt-chile/?$ https://institutodbtchile.cl/terapia-dbt [R=301,L]
RewriteRule ^te-sientes-superado-por-tus-emociones-aprende-como-dbt-puede-transformar-tu-vida/?$ https://institutodbtchile.cl/terapia-dbt [R=301,L]

RewriteRule ^adicciones/?$ https://institutodbtchile.cl/dbt-y-adicciones [R=301,L]
RewriteRule ^dbt-sud-en-chile-primer-programa-de-terapia-dialectico-conductual-para-adicciones/?$ https://institutodbtchile.cl/dbt-y-adicciones [R=301,L]

RewriteRule ^terapia-dbt-ptsd-salud-mental-en-chile/?$ https://institutodbtchile.cl/dbt-trauma [R=301,L]
RewriteRule ^estudio-comparativo-dbt-vs-emdr-para-el-trauma-complejo/?$ https://institutodbtchile.cl/dbt-trauma [R=301,L]
RewriteRule ^dbt-chile-pioneros-terapia-grupal-para-trauma-complejo/?$ https://institutodbtchile.cl/dbt-trauma [R=301,L]
RewriteRule ^cuerpo-trauma-decision-mirada-neurobiopsicologica-desregulacion-emocional-impulsividad-en-personas-traumatizadas/?$ https://institutodbtchile.cl/dbt-trauma [R=301,L]

RewriteRule ^guia-rapida-tlp-el-termostato-roto-de-las-emociones/?$ https://institutodbtchile.cl/trastornos-de-personalidad [R=301,L]

RewriteRule ^family-parents-un-taller-que-transforma-familias-y-relaciones/?$ https://institutodbtchile.cl/tratamiento/dbt-infanto-juvenil [R=301,L]
RewriteRule ^dbtchile-presento-poster-de-family-parents-en-congreso-cientifico-sonepsyn-2024/?$ https://institutodbtchile.cl/tratamiento/dbt-infanto-juvenil [R=301,L]

RewriteRule ^dbt-chile-invitado-a-participar-en-la-planificacion-estrategica-global-de-the-world-dbt-association/?$ https://institutodbtchile.cl/investigacion/wdbta [R=301,L]
RewriteRule ^las-emociones-de-maturana-terapias-tercera-generacion-neurociencias/?$ https://institutodbtchile.cl/investigacion [R=301,L]

RewriteRule ^primer-hospital-de-dia-en-chile-con-enfoque-dbt-integral/?$ https://institutodbtchile.cl/tratamiento [R=301,L]
RewriteRule ^evaluacion-psiquiatrica/?$ https://institutodbtchile.cl/tratamiento [R=301,L]

RewriteRule ^blog/?$ https://institutodbtchile.cl/blog [R=301,L]
RewriteRule ^category/noticias/?$ https://institutodbtchile.cl/blog [R=301,L]

# --- Catch-all: todo lo demás va a la home del sitio nuevo ---
RewriteRule ^(.*)$ https://institutodbtchile.cl/ [R=301,L]
</IfModule>
# ============================================================
# FIN MIGRACION 301
# ============================================================
```

**Alternativa sin tocar .htaccess** (si el hosting es Nginx o da miedo editar):
wp-admin → Plugins → Añadir nuevo → instalar **"Redirection"** (de John Godley) → crear las mismas reglas una a una (301) + una regla regex final `^/(.*)$` → `https://institutodbtchile.cl/`.

### PASO 3 — Probar
Abrir en modo incógnito:
- `https://dbtchile.cl/adicciones/` → debe aterrizar en `https://institutodbtchile.cl/dbt-y-adicciones`
- `https://dbtchile.cl/terapia-dbt-estandar/` → `https://institutodbtchile.cl/terapia-dbt`
- `https://dbtchile.cl/` → `https://institutodbtchile.cl/`
- `https://dbtchile.cl/wp-admin` → debe seguir mostrando el login de WordPress (NO redirigir)

### PASO 4 — Herramienta "Cambio de dirección" de Google (el traspaso oficial)
1. Search Console → seleccionar la propiedad `https://dbtchile.cl`
2. Ajustes (engranaje) → **"Cambio de dirección"**
3. Seleccionar como destino la propiedad de `institutodbtchile.cl`
4. Google validará las 301 y comenzará el traspaso formal de señales (tarda semanas; el efecto completo, 3–6 meses).

### PASO 5 — Mantenimiento (12+ meses)
- **NO cancelar el dominio dbtchile.cl**: las 301 deben permanecer activas mínimo 12 meses (ideal: para siempre). Si la agencia deja de renovar el dominio, la autoridad se pierde. Intentar traspasar la titularidad del dominio en NIC Chile (nic.cl → transferencia de dominio) cuanto antes.
- Actualizar Google Business Profile: si la ficha de Maps apunta a dbtchile.cl, cambiar el sitio web a institutodbtchile.cl.
- Actualizar el enlace en Instagram/Facebook/LinkedIn y directorios (doctoralia, etc.).

## ADVERTENCIAS
1. **El sitio antiguo dejará de mostrarse**: todo visitante de dbtchile.cl aterrizará en institutodbtchile.cl. Es el comportamiento deseado, pero irreversible mientras las reglas estén activas.
2. **Google Ads de la agencia**: si la agencia tiene campañas activas apuntando a dbtchile.cl, los anuncios podrían ser rechazados por "URL de destino no coincidente". Coordinar o pausar esas campañas.
3. **La agencia también tiene acceso**: podría revertir el .htaccess. Guardar copia del archivo y monitorear semanalmente que las 301 sigan activas.

## YA IMPLEMENTADO EN EL SITIO NUEVO (por el agente)
- Schema `MedicalClinic` y `Organization` con `sameAs: https://dbtchile.cl`, `alternateName: ["DBT Chile","DBTCHILE"]` y `foundingDate: 2021` → Google fusiona ambas marcas como una sola entidad.
