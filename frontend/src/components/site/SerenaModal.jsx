import { useEffect, useMemo, useRef, useState } from "react";
import { X, Moon, Sunrise } from "lucide-react";
import { getKarinaStatus } from "@/lib/karinaHours";

/**
 * Serena · Schedule-aware capture modal.
 *
 * Two flows:
 *   1. "open"        → Mon–Fri 10:00–18:59 CL
 *                      Fields: Name + Phone
 *                      CTA: "Conectar ahora"
 *                      Behavior: save lead, then redirect to WhatsApp.
 *   2. "after-hours" / "weekend"
 *                      Fields: Name + Phone + Email (optional)
 *                      CTA: "Enviar solicitud de contacto"
 *                      Behavior: save lead as `after_hours_lead`, no WA redirect,
 *                      show confirmation toast in-modal.
 *
 * onConfirm signature: (payload, opts) => Promise<void>
 *   payload = { name, phone, email }
 *   opts    = { status, redirect }   // redirect=true → caller opens WhatsApp
 */

function digitsOf(value) {
  return (value || "").replace(/[^\d]/g, "");
}

function formatPhone(value) {
  const raw = (value || "").replace(/[^\d+]/g, "");
  if (!raw) return "";
  const plus = raw.startsWith("+") ? "+" : "";
  let d = raw.replace(/\+/g, "");
  if (plus === "+" && d.startsWith("56")) {
    const cc = d.slice(0, 2);
    const rest = d.slice(2);
    const a = rest.slice(0, 1);
    const b = rest.slice(1, 5);
    const c = rest.slice(5, 9);
    return [`+${cc}`, a && ` ${a}`, b && ` ${b}`, c && ` ${c}`]
      .filter(Boolean)
      .join("");
  }
  d = d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  return `${plus}${d}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SerenaModal({ open, onClose, onConfirm }) {
  const closeBtnRef = useRef(null);
  const nameRef = useRef(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("open");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStatus(getKarinaStatus());
    setName("");
    setPhone("");
    setEmail("");
    setSubmitting(false);
    setSubmitted(false);
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

  const isOnline = status === "open";

  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();
  const trimmedEmail = email.trim();

  const nameValid = trimmedName.length >= 2;
  const phoneValid = digitsOf(trimmedPhone).length >= 8;
  // Email is optional in after-hours; if provided, must look valid.
  const emailValid = trimmedEmail === "" || EMAIL_RE.test(trimmedEmail);

  const valid = nameValid && phoneValid && emailValid;

  const submit = async () => {
    if (!valid || submitting) return;
    setSubmitting(true);
    try {
      await onConfirm(
        {
          name: trimmedName,
          phone: trimmedPhone,
          email: trimmedEmail || null,
        },
        { status, redirect: isOnline }
      );
      if (isOnline) {
        // Caller already redirected. Modal will close via parent.
        return;
      }
      // After-hours: show confirmation, auto-close after a moment.
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2600);
    } catch {
      setSubmitting(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (valid) submit();
    }
  };

  const heading = useMemo(() => {
    if (isOnline) {
      return "Conéctate ahora con Karina para tu admisión inmediata.";
    }
    return "Karina está fuera de su horario clínico (10:00 – 19:00). Déjanos tus datos y te contactaremos a primera hora de mañana.";
  }, [isOnline]);

  if (!open) return null;

  return (
    <div
      className="serena-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="serena-title"
      data-testid="serena-modal"
      data-mode={isOnline ? "open" : "after-hours"}
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

        {submitted ? (
          <div
            className="serena-message"
            role="status"
            aria-live="polite"
            data-testid="serena-submitted"
          >
            <strong>Solicitud recibida.</strong> Karina te contactará{" "}
            {status === "weekend"
              ? "el lunes a partir de las 10:00 AM."
              : "mañana a primera hora (10:00 AM)."}{" "}
            Gracias por confiar en el Instituto.
          </div>
        ) : (
          <>
            <p className="serena-message">{heading}</p>

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
                  Tu mensaje queda registrado y será atendido{" "}
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
                  Te contactaremos{" "}
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

            <label className="serena-field" htmlFor="serena-phone">
              <span className="serena-field-label">Teléfono</span>
              <input
                id="serena-phone"
                type="tel"
                inputMode="tel"
                className="serena-input"
                placeholder="+56 9 1234 5678"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                onKeyDown={onKeyDown}
                autoComplete="tel"
                maxLength={24}
                data-testid="serena-phone-input"
              />
            </label>

            {!isOnline && (
              <label className="serena-field" htmlFor="serena-email">
                <span className="serena-field-label">
                  Email <span className="serena-field-optional">(opcional)</span>
                </span>
                <input
                  id="serena-email"
                  type="email"
                  inputMode="email"
                  className="serena-input"
                  placeholder="tucorreo@ejemplo.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="email"
                  maxLength={160}
                  data-testid="serena-email-input"
                />
                <span className="serena-field-hint">
                  Tu información es confidencial · gestionada bajo secreto
                  profesional de salud.
                </span>
              </label>
            )}

            {isOnline && (
              <span className="serena-field-hint serena-field-hint--standalone">
                Tu información es confidencial · gestionada bajo secreto
                profesional de salud.
              </span>
            )}

            <button
              type="button"
              className="serena-cta"
              data-testid="serena-confirm-btn"
              data-status={status}
              onClick={submit}
              disabled={!valid || submitting}
              aria-disabled={!valid || submitting}
            >
              {isOnline && (
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
              )}
              <span>
                {submitting
                  ? "Enviando…"
                  : isOnline
                  ? "Conectar ahora"
                  : "Enviar solicitud de contacto"}
              </span>
            </button>

            <p className="serena-foot">
              {isOnline
                ? "Te conectaremos con Karina ahora mismo."
                : "Tu mensaje queda registrado y será atendido prioritariamente."}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
