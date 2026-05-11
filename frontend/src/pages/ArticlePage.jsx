import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, FileText, Download } from "lucide-react";

import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import {
  articlePath,
  findArticleBySlug,
} from "@/lib/articleSlug";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const ORIGIN = "https://www.institutodbt.cl";

const fmtDate = (iso) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("es-CL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

const stripMd = (text, max = 320) => {
  if (!text) return "";
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_>`~]+/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
};

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    axios
      .get(`${API}/articles?limit=200`)
      .then((res) => {
        if (!alive) return;
        const found = findArticleBySlug(res.data || [], slug);
        if (found) {
          setArticle(found);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.warn("ArticlePage fetch failed", err);
        if (alive) setError(true);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  // ── SEO head ────────────────────────────────────────────
  const seoTitle = article
    ? `${article.title} — InstitutoDBT.cl`
    : "Artículo — InstitutoDBT.cl";
  const seoDesc = article
    ? stripMd(article.summary || article.content || "", 320)
    : "Publicación clínica del Instituto DBT Chile.";
  const canonical = article
    ? `${ORIGIN}${articlePath(article)}`
    : `${ORIGIN}/foro`;
  const coverAbs = article?.cover_url
    ? article.cover_url.startsWith("http")
      ? article.cover_url
      : `${process.env.REACT_APP_BACKEND_URL}${article.cover_url}`
    : `${ORIGIN}/logo/logo-512.png`;

  const jsonLd = article && {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: stripMd(article.summary || "", 320),
    image: [coverAbs],
    datePublished: article.article_date,
    dateModified: article.updated_at || article.article_date,
    author: {
      "@type": "Person",
      name: article.author || "InstitutoDBT.cl",
    },
    publisher: {
      "@type": "Organization",
      name: "InstitutoDBT.cl",
      logo: {
        "@type": "ImageObject",
        url: `${ORIGIN}/logo/logo-512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    articleSection: article.category,
    inLanguage: "es-CL",
  };

  return (
    <div className="App" data-testid="article-page-root">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_CL" />
        <meta property="og:site_name" content="InstitutoDBT.cl" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:image" content={coverAbs} />
        <meta property="article:author" content={article?.author || "InstitutoDBT.cl"} />
        {article?.article_date && (
          <meta property="article:published_time" content={article.article_date} />
        )}
        {article?.category && (
          <meta property="article:section" content={article.category} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <meta name="twitter:image" content={coverAbs} />
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
      </Helmet>

      <Navbar />

      <main>
        <section className="article-page" data-testid="article-detail">
          <div className="container-x">
            <Link
              to="/#foro"
              className="article-back"
              data-testid="article-back-link"
            >
              <ArrowLeft size={16} /> Volver al foro
            </Link>

            {loading && (
              <div className="article-loading">Cargando publicación…</div>
            )}

            {error && !loading && (
              <div className="article-missing">
                <h1 className="dbt-serif">Artículo no encontrado</h1>
                <p>
                  Este enlace ya no está disponible. Vuelve al{" "}
                  <Link to="/#foro">foro</Link> para ver las publicaciones
                  vigentes.
                </p>
              </div>
            )}

            {article && (
              <article className="article-body">
                <header className="article-head">
                  {article.category && (
                    <span className="article-category label">
                      {article.category}
                    </span>
                  )}
                  <h1 className="dbt-serif article-title">{article.title}</h1>
                  <div className="article-meta">
                    {article.author && (
                      <span className="article-author">{article.author}</span>
                    )}
                    {article.article_date && (
                      <span className="article-date">
                        <Calendar size={13} />
                        <time dateTime={article.article_date}>
                          {fmtDate(article.article_date)}
                        </time>
                      </span>
                    )}
                  </div>
                  {article.summary && (
                    <p className="article-lead">{article.summary}</p>
                  )}
                </header>

                {article.cover_url && (
                  <figure className="article-cover">
                    <img
                      src={
                        article.cover_url.startsWith("http")
                          ? article.cover_url
                          : `${process.env.REACT_APP_BACKEND_URL}${article.cover_url}`
                      }
                      alt={`${article.title} — InstitutoDBT.cl publicación de ${article.author}`}
                      loading="eager"
                      decoding="async"
                    />
                  </figure>
                )}

                {article.content && article.content.trim() && (
                  <div className="article-content foro-modal-md">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {article.content}
                    </ReactMarkdown>
                  </div>
                )}

                {article.pdf_url && (
                  <div className="article-pdf-card">
                    <FileText size={18} />
                    <div>
                      <div className="article-pdf-name">
                        {article.pdf_name || "Documento PDF"}
                      </div>
                      <a
                        href={
                          article.pdf_url.startsWith("http")
                            ? article.pdf_url
                            : `${process.env.REACT_APP_BACKEND_URL}${article.pdf_url}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="article-pdf-link"
                      >
                        <Download size={14} /> Descargar PDF
                      </a>
                    </div>
                  </div>
                )}
              </article>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
