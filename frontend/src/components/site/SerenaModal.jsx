import { useEffect, useRef, useState } from "react";
import { X, Moon, Sunrise } from "lucide-react";
import { getKarinaStatus } from "@/lib/karinaHours";

/**
 * Serena · Welcome modal (Zen) with name capture and time-aware empathy.
 * Three states for Karina's availability (Chile time):
 *   • "open"        → Mon–Fri 10:00–18:00, immediate handoff
 *   • "after-hours" → Mon–Fri outside 10–18, response next morning
 *   • "weekend"     → Sat & Sun full day, response Monday morning
 */
export default function SerenaModal({ open, onClose, onConfirm }) {
  const closeBtnRef = useRef(null);
  const inputRef = useRef(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("open");

  useEffect(() => {
    if (!open) return;
    setStatus(getKarinaStatus());
    setName("");
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

  const trimmed = name.trim();
  const valid = trimmed.length >= 2;
  const isOnline = status === "open";

  const submit = () => {
    if (!valid) return;
    onConfirm(trimmed, { status });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  if (!open) return null;

  // ── Status-aware copy ────────────────────────────────────────────
  const ctaLabel = (() => {
    const firstName = trimmed.split(" ")[0];
    if (!valid) {
      if (status === "weekend") return "Dejar mensaje para Karina (lunes)";
      if (status === "after-hours") return "Dejar mensaje a Karina";
      return "Hablar con Karina en WhatsApp";
    }
    if (status === "weekend") return `Dejar mensaje a Karina como ${firstName}`;
    if (status === "after-hours")
      return `Dejar mensaje a Karina como ${firstName}`;
    return `Presentarme a Karina como ${firstName}`;
  })();

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

        {status === "after-hours" && (
          <div
            className="serena-offhours"
            role="status"
            aria-live="polite"
            data-testid="serena-offhours-after"
          >
            <span className="serena-offhours-icon" aria-hidden="true">
              <Moon size={15} strokeWidth={1.7} />
            </span>
            <p className="serena-offhours-text">
              <strong>Karina</strong>, nuestra coordinadora humana, se encuentra
              descansando en este momento para brindarte la mejor atención
              mañana. Sé que la necesidad puede surgir a cualquier hora —{" "}
              <em>no estás sola en esto</em>. Puedes dejarle tu mensaje ahora y
              ella te responderá{" "}
              <strong>prioritariamente a partir de las 10:00 AM</strong>.
            </p>
          </div>
        )}

        {status === "weekend" && (
          <div
            className="serena-offhours serena-offhours--weekend"
            role="status"
            aria-live="polite"
            data-testid="serena-offhours-weekend"
          >
            <span className="serena-offhours-icon" aria-hidden="true">
              <Sunrise size={15} strokeWidth={1.7} />
            </span>
            <p className="serena-offhours-text">
              <strong>Karina</strong>, nuestra coordinadora humana, se encuentra
              en su descanso de fin de semana para recargar energías y
              brindarte la mejor atención. Sé que el fin de semana también
              pueden surgir momentos difíciles —{" "}
              <em>te leo y tu mensaje no se perderá</em>. Déjale aquí tu nombre
              y consulta, y ella te contactará de forma prioritaria{" "}
              <strong>el lunes a partir de las 10:00 AM</strong>.
            </p>
          </div>
        )}

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
          data-status={status}
          onClick={submit}
          disabled={!valid}
          aria-disabled={!valid}
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true" />
          <span>{ctaLabel}</span>
        </button>

        <p className="serena-foot">
          {isOnline
            ? "Tu información es confidencial y se gestiona bajo secreto profesional."
            : "Tu mensaje queda registrado y será atendido prioritariamente."}
        </p>
      </div>
    </div>
  );
}
