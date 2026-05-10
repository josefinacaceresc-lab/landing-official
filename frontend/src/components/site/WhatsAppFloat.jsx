import { useEffect, useState } from "react";
import axios from "axios";
import { whatsappUrl } from "@/data/site";
import SerenaModal from "./SerenaModal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SERENA_TEMPLATE =
  "Hola Karina, soy [Nombre]. Serena me recibió en la web y me gustaría coordinar una evaluación en InstitutoDBT.cl para el programa de alta complejidad.";

const PREFIX_AFTER_HOURS =
  "[Contacto Fuera de Horario · Mensaje recibido durante la noche]\n\n";
const PREFIX_WEEKEND =
  "[Contacto Fin de Semana · Mensaje recibido durante el descanso de Karina]\n\n";

const buildSerenaMessage = (name, status) => {
  let prefix = "";
  if (status === "after-hours") prefix = PREFIX_AFTER_HOURS;
  else if (status === "weekend") prefix = PREFIX_WEEKEND;
  return prefix + SERENA_TEMPLATE.replace("[Nombre]", name);
};

/**
 * Floating WhatsApp button — premium emerald, "Admisión Inmediata" badge,
 * pulse halo, scroll-triggered reveal.
 * On click → opens Serena welcome modal (warm handoff, not cold jump).
 */
export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [serenaOpen, setSerenaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onOpenSerena = (e) => {
    e.preventDefault();
    setSerenaOpen(true);
    // Track engagement on the floating CTA tap
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      try {
        window.gtag("event", "serena_modal_open", {
          event_category: "engagement",
          event_label: "whatsapp_floating_cta",
        });
      } catch {
        /* no-op */
      }
    }
    try {
      axios.post(
        `${API}/whatsapp-click`,
        { source: "floating-cta-serena", referrer: window.location.href },
        { timeout: 4000 }
      );
    } catch {
      /* no-op */
    }
  };

  const onConfirmHandoff = (name, opts = {}) => {
    const status = opts.status || "open";
    // Google Ads conversion — fires only when user actually proceeds to WhatsApp
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      try {
        window.gtag("event", "conversion", {
          send_to: "AW-18117776220/v-x9CJiSg-sZELyLidw_",
          event_category: "engagement",
          event_label: `whatsapp_serena_handoff_${status}`,
        });
      } catch {
        /* no-op */
      }
    }
    const safeName = (name || "").trim() || "[Nombre]";
    window.open(
      whatsappUrl(buildSerenaMessage(safeName, status)),
      "_blank",
      "noopener,noreferrer"
    );
    setSerenaOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Solicitar admisión por WhatsApp"
        className={`wa-premium ${visible ? "wa-premium--visible" : ""}`}
        data-testid="whatsapp-float-btn"
        onClick={onOpenSerena}
      >
        <span className="wa-premium-tag" aria-hidden="true">
          Admisión inmediata
        </span>
        <span className="wa-premium-btn">
          <span className="wa-premium-pulse" aria-hidden="true" />
          <span
            className="wa-premium-pulse wa-premium-pulse--late"
            aria-hidden="true"
          />
          <i
            className="fa-brands fa-whatsapp wa-premium-icon"
            aria-hidden="true"
          />
        </span>
      </button>

      <SerenaModal
        open={serenaOpen}
        onClose={() => setSerenaOpen(false)}
        onConfirm={onConfirmHandoff}
      />
    </>
  );
}
