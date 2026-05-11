import slugify from "slugify";

/**
 * Build a stable, SEO-friendly slug from a title + UUID.
 * Format: "kebab-case-title-<8-char-suffix>"
 * The suffix guarantees uniqueness even if two articles share a title.
 */
export function buildArticleSlug({ id, title }) {
  if (!title) return id || "";
  const base = slugify(title, {
    lower: true,
    strict: true,
    locale: "es",
    trim: true,
  }).slice(0, 80);
  const suffix = (id || "").replace(/-/g, "").slice(0, 8);
  return suffix ? `${base}-${suffix}` : base;
}

/** Inverse: pull the 8-char id suffix off a slug. */
export function extractIdSuffix(slug) {
  if (!slug) return "";
  const m = slug.match(/-([a-f0-9]{8})$/i);
  return m ? m[1] : "";
}

/** Find an article in a list given a URL slug. */
export function findArticleBySlug(articles, slug) {
  if (!articles?.length || !slug) return null;
  const suffix = extractIdSuffix(slug);
  if (suffix) {
    const byId = articles.find((a) =>
      (a.id || "").replace(/-/g, "").startsWith(suffix)
    );
    if (byId) return byId;
  }
  // Fallback: match against the rebuilt slug (handles legacy links)
  return articles.find((a) => buildArticleSlug(a) === slug) || null;
}

export function articlePath(article) {
  return `/foro/articulo/${buildArticleSlug(article)}`;
}
