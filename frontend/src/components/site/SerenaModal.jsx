import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

/**
 * Serena · Welcome modal (Zen) with name capture
 * Soft, human, premium handoff before opening WhatsApp.
 */
export default function SerenaModal({ open, onClose, onConfirm }) {
  const closeBtnRef = useRef(null);
  const inputRef = useRef(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    setTimeout(() => inputRef.current?.focus(), 120);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Reset name when modal opens fresh (after close)
  useEffect(() => {
    if (open) setName("");
  }, [open]);

  const trimmed = name.trim();
  const valid = trimmed.length >= 2;

  const submit = () => {
    if (!valid) return;
    onConfirm(trimmed);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  if (!open) return null;

  return (
    <div
      className="serena-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="serena-title"
      data-testid="serena-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="serena-card">
        <button
          ref={closeBtnRef}
          type="button"
          className="serena-close"
          aria-label="Cerrar"
          data-testid="serena-close-btn"
          onClick={onClose}
        >
          <X size={18} strokeWidth={1.6} />
        </button>

        <div className="serena-mark" aria-hidden="true">
          <span className="serena-mark-ring" />
          <img
            src="/logo/logo.png"
            alt=""
            width="76"
            height="76"
            decoding="async"
          />
        </div>

        <p className="serena-eyebrow label">Asistente de Admisión</p>
        <h3 id="serena-title" className="serena-title dbt-serif">
          Bienvenida al <em>InstitutoDBT.cl</em>
        </h3>
        <p className="serena-subtitle dbt-serif">
          Soy <strong>Serena</strong>, tu asistente de admisión.
        </p>

        <div className="serena-rule" aria-hidden="true" />

        <p className="serena-message">
          Entiendo que dar este paso requiere valentía. Estoy aquí para
          facilitarte el camino. Cuéntame tu nombre y te presentaré con{" "}
          <strong>Karina</strong>, nuestra asistente humana, para que te reciba
          con toda tu información lista.
        </p>

        <label className="serena-field" htmlFor="serena-name">
          <span className="serena-field-label">
            ¿Cómo te gustaría que te llamemos?
          </span>
          <input
            ref={inputRef}
            id="serena-name"
            type="text"
            className="serena-input"
            placeholder="Escribe tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="given-name"
            maxLength={60}
            aria-describedby="serena-field-hint"
            data-testid="serena-name-input"
          />
          <span id="serena-field-hint" className="serena-field-hint">
            Solo tu nombre — sin apellidos ni datos sensibles.
          </span>
        </label>

        <button
          type="button"
          className="serena-cta"
          data-testid="serena-confirm-btn"
          onClick={submit}
          disabled={!valid}
          aria-disabled={!valid}
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true" />
          <span>
            {valid
              ? `Presentarme a Karina como ${trimmed.split(" ")[0]}`
              : "Hablar con Karina en WhatsApp"}
          </span>
        </button>

        <p className="serena-foot">
          Tu información es confidencial y se gestiona bajo secreto profesional.
        </p>
      </div>
    </div>
  );
}
