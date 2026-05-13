import { useEffect, useRef, useState } from "react";
import { X, Moon, Sunrise } from "lucide-react";
import { getKarinaStatus } from "@/lib/karinaHours";

/**
 * Serena · Zen welcome modal with name + RUT capture (capture-first).
 *
 * onConfirm signature: (name, rut, { status }) => void
 *
 * Karina availability (Chile TZ):
 *   • "open"        → Mon–Fri 10:00–18:00 — immediate handoff
 *   • "after-hours" → Mon–Fri outside 10–18 — response next morning
 *   • "weekend"     → Sat & Sun full day — response Monday morning
 */

// Soft RUT validation (Chilean): allows formats like 12.345.678-9, 12345678-K, 8 dígitos + DV
const RUT_RE = /^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}-?[0-9Kk]$/;

function looksLikeRut(value) {
  return RUT_RE.test(value.trim());
}

// Pretty-print as user types: 12345678-9 → 12.345.678-9
function formatRut(value) {
  const raw = value.replace(/[^0-9Kk]/g, "").toUpperCase();
  if (!raw) return "";
  if (raw.length === 1) return raw;
  const body = raw.slice(0, -1);
  const dv = raw.slice(-1);
  const bodyFormatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${bodyFormatted}-${dv}`;
}

export default function SerenaModal({ open, onClose, onConfirm }) {
  const closeBtnRef = useRef(null);
  const nameRef = useRef(null);
  const [name, setName] = useState("");
  const [rut, setRut] = useState("");
  const [status, setStatus] = useState("open");

  useEffect(() => {
    if (!open) return;
    setStatus(getKarinaStatus());
    setName("");
    setRut("");
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    setTimeout(() => nameRef.current?.focus(), 120);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const trimmedName = name.trim();
  const trimmedRut = rut.trim();
  const nameValid = trimmedName.length >= 2;
  const rutValid = looksLikeRut(trimmedRut);
  const valid = nameValid && rutValid;
  const isOnline = status === "open";

  const submit = () => {
    if (!valid) return;
    onConfirm(trimmedName, trimmedRut, { status });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (valid) submit();
    }
  };

  if (!open) return null;

  // ── Status-aware CTA label ────────────────────────────────
  const firstName = trimmedName.split(" ")[0] || "";
  const ctaLabel = (() => {
    if (!valid) {
      if (status === "weekend") return "Dejar mensaje para Karina (lunes)";
      if (status === "after-hours") return "Dejar mensaje a Karina";
      return "Continuar a WhatsApp";
    }
    if (status === "weekend") return `Dejar mensaje a Karina como ${firstName}`;
    if (status === "after-hours")
      return `Dejar mensaje a Karina como ${firstName}`;
    return `Continuar a WhatsApp como ${firstName}`;
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
          Para darte prioridad en la agenda de <strong>Karina</strong>, ingresa
          tu Nombre y RUT. Así ella podrá preparar tu evaluación con toda tu
          información lista.
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
              <strong>Karina</strong> se encuentra descansando para brindarte la
              mejor atención mañana. Sé que la necesidad puede surgir a
              cualquier hora — <em>no estás sola en esto</em>. Tu mensaje queda
              registrado y será atendido{" "}
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
              <strong>Karina</strong> se encuentra en su descanso de fin de
              semana. Sé que pueden surgir momentos difíciles —{" "}
              <em>te leo y tu mensaje no se perderá</em>. Te contactaremos{" "}
              <strong>el lunes a partir de las 10:00 AM</strong>.
            </p>
          </div>
        )}

        <label className="serena-field" htmlFor="serena-name">
          <span className="serena-field-label">Nombre completo</span>
          <input
            ref={nameRef}
            id="serena-name"
            type="text"
            className="serena-input"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="given-name"
            maxLength={120}
            data-testid="serena-name-input"
          />
        </label>

        <label className="serena-field" htmlFor="serena-rut">
          <span className="serena-field-label">RUT</span>
          <input
            id="serena-rut"
            type="text"
            inputMode="text"
            className="serena-input"
            placeholder="12.345.678-9"
            value={rut}
            onChange={(e) => setRut(formatRut(e.target.value))}
            onKeyDown={onKeyDown}
            autoComplete="off"
            maxLength={14}
            aria-describedby="serena-rut-hint"
            data-testid="serena-rut-input"
          />
          <span id="serena-rut-hint" className="serena-field-hint">
            Tu información es confidencial · gestionada bajo secreto profesional
            de salud.
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
            ? "Te conectaremos con Karina ahora mismo."
            : "Tu mensaje queda registrado y será atendido prioritariamente."}
        </p>
      </div>
    </div>
  );
}
