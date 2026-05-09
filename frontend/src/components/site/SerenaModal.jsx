import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/**
 * Serena · Welcome modal (Zen)
 * Soft, human, premium handoff before opening WhatsApp.
 */
export default function SerenaModal({ open, onClose, onConfirm }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Focus close for a11y
    setTimeout(() => closeBtnRef.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

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
          facilitarte el camino. Presiona el botón de abajo para que{" "}
          <strong>Karina</strong>, nuestra asistente humana, te reciba con toda
          tu información lista.
        </p>

        <button
          type="button"
          className="serena-cta"
          data-testid="serena-confirm-btn"
          onClick={onConfirm}
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true" />
          <span>Hablar con Karina en WhatsApp</span>
        </button>

        <p className="serena-foot">
          Tu información es confidencial y se gestiona bajo secreto profesional.
        </p>
      </div>
    </div>
  );
}
