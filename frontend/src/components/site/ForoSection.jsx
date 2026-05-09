import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpRight, Calendar, FileText, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function fmtDate(art) {
  if (art?.article_date) {
    try {
      const d = new Date(art.article_date);
      if (!isNaN(d)) {
        return d.toLocaleDateString("es-CL", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      }
    } catch (err) {
      console.warn("fmtDate parse failed", err);
    }
    return art.article_date;
  }
  if (art?.created_at) {
    return new Date(art.created_at).toLocaleDateString("es-CL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return "";
}

function buildSrc(url) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `${process.env.REACT_APP_BACKEND_URL}${url}`;
}

export default function ForoSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    let alive = true;
    const fetchArticles = async (retries = 2) => {
      try {
        const res = await axios.get(`${API}/articles?limit=50`, { timeout: 12000 });
        if (alive) setArticles(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        if (retries > 0) {
          setTimeout(() => fetchArticles(retries - 1), 1500);
          return;
        }
        if (alive) setArticles([]);
      } finally {
        if (alive) setLoading(false);
      }
    };
    fetchArticles();
    return () => {
      alive = false;
    };
  }, []);

  // ESC closes modal
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section
      className="section-pad sec-cream"
      id="foro"
      data-testid="foro-section"
    >
      <div className="container-x">
        <div className="foro-header">
          <span className="label">Foro · Comunidad</span>
          <h2 className="dbt-serif foro-headline">
            Artículos & <em>reflexiones</em>
          </h2>
          <p className="foro-sub">
            Publicaciones, reflexiones clínicas y aportes del equipo de
            InstitutoDBT.cl y colaboradores invitados.
          </p>
        </div>

        {loading ? (
          <div className="foro-empty" data-testid="foro-loading">
            <span className="label label-center">Cargando…</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="foro-empty" data-testid="foro-empty">
            <span className="label label-center">Próximamente</span>
            <p>
              Aún no hay artículos publicados. El foro abrirá con sus
              primeras entradas pronto.
            </p>
          </div>
        ) : (
          <div className="foro-grid" data-testid="foro-grid">
            {articles.map((a) => (
              <article
                key={a.id}
                className="foro-card"
                data-testid={`foro-card-${a.id}`}
                onClick={() => setActive(a)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(a);
                  }
                }}
              >
                <div className="foro-card-cover">
                  {a.cover_url ? (
                    <img
                      src={buildSrc(a.cover_url)}
                      alt={a.title}
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                    />
                  ) : (
                    <div className="foro-card-cover-fallback">
                      <span className="dbt-serif">DBT</span>
                    </div>
                  )}
                  {a.category && (
                    <span className="foro-card-cat">{a.category}</span>
                  )}
                  {a.pdf_url && (
                    <span className="foro-card-pdf-badge" aria-label="PDF disponible">
                      <FileText size={12} strokeWidth={2} /> PDF
                    </span>
                  )}
                </div>
                <div className="foro-card-body">
                  <h3 className="dbt-serif">{a.title}</h3>
                  <div className="foro-card-meta">
                    <span>{a.author}</span>
                    <span className="foro-card-meta-sep">·</span>
                    <span className="foro-card-meta-date">
                      <Calendar size={11} strokeWidth={1.8} />
                      {fmtDate(a)}
                    </span>
                  </div>
                  {a.summary && (
                    <p className="foro-card-summary">{a.summary}</p>
                  )}
                  <span className="foro-card-link">
                    Leer artículo
                    <ArrowUpRight size={13} strokeWidth={1.8} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div
          className="foro-modal"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={(e) => {
            if (e.target.classList.contains("foro-modal")) setActive(null);
          }}
          data-testid="foro-modal"
        >
          <article className="foro-modal-card">
            <button
              type="button"
              className="foro-modal-close"
              onClick={() => setActive(null)}
              aria-label="Cerrar"
              data-testid="foro-modal-close"
            >
              ×
            </button>
            {active.cover_url && (
              <div className="foro-modal-cover">
                <img src={buildSrc(active.cover_url)} alt={active.title} />
              </div>
            )}
            <div className="foro-modal-body">
              {active.category && (
                <span className="foro-modal-cat">{active.category}</span>
              )}
              <h2 className="dbt-serif foro-modal-title">{active.title}</h2>
              <div className="foro-modal-meta">
                <span>{active.author}</span>
                <span className="foro-card-meta-sep">·</span>
                <span>{fmtDate(active)}</span>
              </div>
              {active.pdf_url && (
                <div className="foro-modal-pdf-actions" data-testid="foro-modal-pdf">
                  <a
                    href={buildSrc(active.pdf_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="foro-modal-pdf-btn foro-modal-pdf-btn--primary"
                    download={active.pdf_name || undefined}
                    data-testid="foro-modal-pdf-download"
                  >
                    <Download size={14} strokeWidth={1.8} />
                    <span>Descargar PDF</span>
                  </a>
                  <a
                    href={buildSrc(active.pdf_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="foro-modal-pdf-btn"
                    data-testid="foro-modal-pdf-view"
                  >
                    <FileText size={14} strokeWidth={1.8} />
                    <span>Abrir en nueva pestaña</span>
                  </a>
                </div>
              )}
              {active.content && active.content.trim() && (
                <div className="foro-modal-content foro-modal-md">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {active.content}
                  </ReactMarkdown>
                </div>
              )}
              {active.pdf_url && (
                <div className="foro-modal-pdf-embed" data-testid="foro-modal-pdf-embed">
                  <iframe
                    src={buildSrc(active.pdf_url) + "#view=FitH"}
                    title={active.title}
                    aria-label={`Vista previa del PDF: ${active.title}`}
                  />
                </div>
              )}
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
