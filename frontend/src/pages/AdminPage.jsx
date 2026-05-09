import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Trash2, Pencil, Plus, LogOut, Image as ImageIcon, ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "dbt_admin_token";

const TOASTER_OPTIONS = {
  style: {
    background: "#0E2333",
    border: "1px solid rgba(191,160,106,0.4)",
    color: "#fff",
    borderRadius: 0,
    fontFamily: "DM Sans, sans-serif",
  },
};

const EMPTY_FORM = {
  id: null,
  title: "",
  author: "",
  summary: "",
  content: "",
  category: "",
  cover_url: "",
  pdf_url: "",
  pdf_name: "",
  article_date: "",
};

function buildSrc(url) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `${process.env.REACT_APP_BACKEND_URL}${url}`;
}

export default function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [pin, setPin] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [articles, setArticles] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const fileRef = useRef(null);
  const pdfRef = useRef(null);

  const authHeaders = useCallback(
    () => ({ Authorization: `Bearer ${token}` }),
    [token]
  );

  const loadArticles = useCallback(async () => {
    setLoadingList(true);
    try {
      const res = await axios.get(`${API}/articles?limit=100`);
      setArticles(res.data || []);
    } catch (e) {
      toast.error("No se pudieron cargar los artículos");
    } finally {
      setLoadingList(false);
    }
  }, []);

  // Validate session on mount
  useEffect(() => {
    if (!token) return;
    axios
      .get(`${API}/admin/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        loadArticles();
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken("");
      });
  }, [token, loadArticles]);

  // ─── Login ───
  const onLogin = async (e) => {
    e.preventDefault();
    if (!pin.trim()) {
      toast.error("Ingresa el PIN");
      return;
    }
    setLoginLoading(true);
    try {
      const res = await axios.post(`${API}/admin/login`, { pin: pin.trim() });
      localStorage.setItem(TOKEN_KEY, res.data.token);
      setToken(res.data.token);
      setPin("");
      toast.success("Bienvenida 👋");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "PIN incorrecto");
    } finally {
      setLoginLoading(false);
    }
  };

  const onLogout = async () => {
    try {
      await axios.post(`${API}/admin/logout`, {}, { headers: authHeaders() });
    } catch (err) {
      console.warn("Logout request failed", err);
    }
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setForm(EMPTY_FORM);
  };

  // ─── Form handlers ───
  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const startEdit = (a) => {
    setForm({
      id: a.id,
      title: a.title || "",
      author: a.author || "",
      summary: a.summary || "",
      content: a.content || "",
      category: a.category || "",
      cover_url: a.cover_url || "",
      pdf_url: a.pdf_url || "",
      pdf_name: a.pdf_name || "",
      article_date: a.article_date || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => setForm(EMPTY_FORM);

  const onUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await axios.post(`${API}/admin/upload`, fd, {
        headers: {
          ...authHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      setForm((f) => ({ ...f, cover_url: res.data.url }));
      toast.success("Imagen subida");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "No se pudo subir la imagen");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const onUploadPdf = async (file) => {
    if (!file) return;
    if (!/\.pdf$/i.test(file.name)) {
      toast.error("Solo archivos PDF");
      return;
    }
    setUploadingPdf(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await axios.post(`${API}/admin/upload`, fd, {
        headers: {
          ...authHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      setForm((f) => ({
        ...f,
        pdf_url: res.data.url,
        pdf_name: res.data.original_name || file.name,
      }));
      toast.success("PDF subido");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "No se pudo subir el PDF");
    } finally {
      setUploadingPdf(false);
      if (pdfRef.current) pdfRef.current.value = "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.title.trim().length < 2) {
      toast.error("Título demasiado corto");
      return;
    }
    if (form.author.trim().length < 2) {
      toast.error("Indica el autor");
      return;
    }
    if (!form.content.trim() && !form.pdf_url) {
      toast.error("Agrega el contenido del artículo o sube un PDF");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      summary: form.summary.trim() || null,
      content: form.content.trim(),
      category: form.category.trim() || null,
      cover_url: form.cover_url.trim() || null,
      pdf_url: form.pdf_url.trim() || null,
      pdf_name: form.pdf_name.trim() || null,
      article_date: form.article_date.trim() || null,
    };
    try {
      if (form.id) {
        await axios.put(`${API}/articles/${form.id}`, payload, {
          headers: authHeaders(),
        });
        toast.success("Artículo actualizado");
      } else {
        await axios.post(`${API}/articles`, payload, {
          headers: authHeaders(),
        });
        toast.success("Artículo publicado");
      }
      resetForm();
      loadArticles();
    } catch (err) {
      const detail = err?.response?.data?.detail;
      let msg = "Error al guardar";
      if (typeof detail === "string") {
        msg = detail;
      } else if (Array.isArray(detail) && detail[0]) {
        const first = detail[0];
        const fieldRaw = Array.isArray(first.loc) ? first.loc[first.loc.length - 1] : "";
        const field = String(fieldRaw || "campo").replace(/_/g, " ");
        msg = `${field}: ${first.msg}`;
      }
      console.error("Article save failed", err?.response?.status, detail);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (a) => {
    if (!window.confirm(`¿Eliminar "${a.title}"? Esta acción no se puede deshacer.`)) return;
    try {
      await axios.delete(`${API}/articles/${a.id}`, { headers: authHeaders() });
      toast.success("Eliminado");
      loadArticles();
      if (form.id === a.id) resetForm();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "No se pudo eliminar");
    }
  };

  // ═══ Login screen ═══
  if (!token) {
    return (
      <div className="admin-shell admin-login" data-testid="admin-login">
        <Toaster position="top-center" theme="dark" toastOptions={TOASTER_OPTIONS} />
        <form className="admin-login-card" onSubmit={onLogin}>
          <span className="label label-center">Acceso administrativo</span>
          <h1 className="dbt-serif admin-login-title">
            Panel <em>Foro</em>
          </h1>
          <p className="admin-login-sub">
            Ingresa tu PIN para gestionar artículos del foro.
          </p>
          <input
            type="password"
            inputMode="numeric"
            autoComplete="off"
            placeholder="PIN"
            className="admin-input admin-pin-input"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            data-testid="admin-pin-input"
            autoFocus
          />
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={loginLoading}
            data-testid="admin-login-submit"
          >
            {loginLoading ? "Verificando…" : "Entrar"}
          </button>
          <Link to="/" className="admin-login-back">
            <ArrowLeft size={13} /> Volver al sitio
          </Link>
        </form>
      </div>
    );
  }

  // ═══ Admin panel ═══
  return (
    <div className="admin-shell" data-testid="admin-panel">
      <Toaster position="top-center" theme="dark" toastOptions={TOASTER_OPTIONS} />

      <header className="admin-bar">
        <div className="admin-bar-inner">
          <div className="admin-bar-brand">
            <span className="admin-bar-mark dbt-serif">D</span>
            <div>
              <div className="admin-bar-name dbt-serif">Panel Foro</div>
              <div className="admin-bar-sub">InstitutoDBT.cl</div>
            </div>
          </div>
          <div className="admin-bar-actions">
            <Link to="/" className="admin-bar-link" data-testid="admin-back-site">
              <ArrowLeft size={14} /> Ver sitio
            </Link>
            <button
              type="button"
              className="admin-bar-link"
              onClick={onLogout}
              data-testid="admin-logout-btn"
            >
              <LogOut size={14} /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-grid">
          {/* ─── FORM ─── */}
          <section className="admin-card" data-testid="admin-form-card">
            <div className="admin-card-head">
              <span className="label">{form.id ? "Editar" : "Crear"}</span>
              <h2 className="dbt-serif admin-card-title">
                {form.id ? "Editar artículo" : "Nuevo artículo"}
              </h2>
            </div>
            <form onSubmit={onSubmit} className="admin-form">
              <div className="admin-field">
                <label htmlFor="af-title" className="admin-label">Título *</label>
                <input id="af-title" name="title" type="text" className="admin-input" value={form.title} onChange={onChange} required data-testid="admin-input-title" />
              </div>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label htmlFor="af-author" className="admin-label">Autor *</label>
                  <input id="af-author" name="author" type="text" className="admin-input" value={form.author} onChange={onChange} required data-testid="admin-input-author" />
                </div>
                <div className="admin-field">
                  <label htmlFor="af-date" className="admin-label">Fecha</label>
                  <input id="af-date" name="article_date" type="date" className="admin-input" value={form.article_date} onChange={onChange} data-testid="admin-input-date" />
                </div>
              </div>
              <div className="admin-field">
                <label htmlFor="af-cat" className="admin-label">Categoría</label>
                <input id="af-cat" name="category" type="text" className="admin-input" value={form.category} onChange={onChange} placeholder="DBT · Schema Therapy · Investigación…" data-testid="admin-input-category" />
              </div>
              <div className="admin-field">
                <label htmlFor="af-summary" className="admin-label">Resumen</label>
                <textarea id="af-summary" name="summary" className="admin-textarea" rows={2} value={form.summary} onChange={onChange} placeholder="2-3 líneas que aparecerán en la tarjeta del foro" data-testid="admin-input-summary" />
              </div>
              <div className="admin-field">
                <label className="admin-label">Imagen de portada</label>
                {form.cover_url ? (
                  <div className="admin-cover-preview">
                    <img
                      src={buildSrc(form.cover_url)}
                      alt="Portada"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const sib = e.target.nextElementSibling;
                        if (sib) sib.style.display = "flex";
                      }}
                    />
                    <div
                      className="admin-cover-broken"
                      style={{ display: "none" }}
                    >
                      ⚠ La imagen no se puede previsualizar (¿subiste un PDF aquí por error?)
                      <br />
                      <small>{form.cover_url}</small>
                    </div>
                    <div className="admin-cover-actions">
                      <label className="admin-cover-replace">
                        <ImageIcon size={14} />
                        <span>{uploading ? "Subiendo…" : "Reemplazar"}</span>
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => onUpload(e.target.files?.[0])}
                          hidden
                        />
                      </label>
                      <button
                        type="button"
                        className="admin-cover-remove"
                        onClick={() => setForm((f) => ({ ...f, cover_url: "" }))}
                        data-testid="admin-cover-remove"
                      >
                        Quitar imagen
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="admin-upload" data-testid="admin-upload-label">
                    <ImageIcon size={18} strokeWidth={1.5} />
                    <span>{uploading ? "Subiendo…" : "Subir imagen (JPG/PNG/WEBP)"}</span>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => onUpload(e.target.files?.[0])}
                      hidden
                      data-testid="admin-upload-input"
                    />
                  </label>
                )}
              </div>
              <div className="admin-field">
                <label className="admin-label">Artículo PDF (opcional)</label>
                {form.pdf_url ? (
                  <div className="admin-pdf-preview" data-testid="admin-pdf-preview">
                    <FileText size={20} strokeWidth={1.5} />
                    <div className="admin-pdf-meta">
                      <a
                        href={buildSrc(form.pdf_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-pdf-name"
                      >
                        {form.pdf_name || "documento.pdf"}
                      </a>
                      <span className="admin-pdf-hint">Adjunto · click para previsualizar</span>
                    </div>
                    <div className="admin-cover-actions">
                      <label className="admin-cover-replace">
                        <FileText size={14} />
                        <span>{uploadingPdf ? "Subiendo…" : "Reemplazar"}</span>
                        <input
                          ref={pdfRef}
                          type="file"
                          accept="application/pdf,.pdf"
                          onChange={(e) => onUploadPdf(e.target.files?.[0])}
                          hidden
                        />
                      </label>
                      <button
                        type="button"
                        className="admin-cover-remove"
                        onClick={() => setForm((f) => ({ ...f, pdf_url: "", pdf_name: "" }))}
                        data-testid="admin-pdf-remove"
                      >
                        Quitar PDF
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="admin-upload" data-testid="admin-pdf-upload-label">
                    <FileText size={18} strokeWidth={1.5} />
                    <span>{uploadingPdf ? "Subiendo PDF…" : "Subir artículo en PDF (máx 25MB)"}</span>
                    <input
                      ref={pdfRef}
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={(e) => onUploadPdf(e.target.files?.[0])}
                      hidden
                      data-testid="admin-pdf-upload-input"
                    />
                  </label>
                )}
              </div>
              <div className="admin-field">
                <label htmlFor="af-content" className="admin-label">
                  Contenido {form.pdf_url ? "(opcional con PDF)" : "*"}
                </label>
                <textarea
                  id="af-content"
                  name="content"
                  className="admin-textarea admin-textarea-tall"
                  rows={14}
                  value={form.content}
                  onChange={onChange}
                  placeholder={
                    form.pdf_url
                      ? "Si ya subiste el PDF, puedes dejar vacío o escribir un resumen / intro corto."
                      : "Escribe tu artículo. Doble salto de línea = nuevo párrafo."
                  }
                  data-testid="admin-input-content"
                />
              </div>
              <div className="admin-form-actions">
                {form.id && (
                  <button type="button" onClick={resetForm} className="admin-btn admin-btn-ghost">
                    Cancelar edición
                  </button>
                )}
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving} data-testid="admin-submit-btn">
                  {saving ? "Guardando…" : (form.id ? "Actualizar" : <span style={{display:"inline-flex",alignItems:"center",gap:8}}><Plus size={14} /> Publicar</span>)}
                </button>
              </div>
            </form>
          </section>

          {/* ─── LIST ─── */}
          <section className="admin-card admin-list-card" data-testid="admin-list-card">
            <div className="admin-card-head">
              <span className="label">Publicados</span>
              <h2 className="dbt-serif admin-card-title">
                {articles.length} {articles.length === 1 ? "artículo" : "artículos"}
              </h2>
            </div>
            {loadingList ? (
              <div className="admin-empty">Cargando…</div>
            ) : articles.length === 0 ? (
              <div className="admin-empty">Aún no hay artículos. Crea el primero.</div>
            ) : (
              <ul className="admin-list">
                {articles.map((a) => (
                  <li key={a.id} className="admin-list-item" data-testid={`admin-list-item-${a.id}`}>
                    {a.cover_url && (
                      <div className="admin-list-thumb">
                        <img src={buildSrc(a.cover_url)} alt="" />
                      </div>
                    )}
                    <div className="admin-list-body">
                      <div className="admin-list-title dbt-serif">{a.title}</div>
                      <div className="admin-list-meta">
                        {a.author}
                        {a.category && <> · <span>{a.category}</span></>}
                      </div>
                    </div>
                    <div className="admin-list-actions">
                      <button type="button" className="admin-icon-btn" onClick={() => startEdit(a)} aria-label="Editar" data-testid={`admin-edit-${a.id}`}>
                        <Pencil size={14} />
                      </button>
                      <button type="button" className="admin-icon-btn admin-icon-btn-danger" onClick={() => onDelete(a)} aria-label="Eliminar" data-testid={`admin-delete-${a.id}`}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
