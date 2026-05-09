import { useEffect, useState } from "react";
import axios from "axios";
import { whatsappUrl } from "@/data/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/**
 * Floating WhatsApp button — premium emerald, "Admisión Inmediata" badge,
 * pulse halo, scroll-triggered reveal, click tracking.
 */
export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = () => {
    // Google Ads — fire conversion event on WhatsApp CTA click
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      try {
        window.gtag("event", "conversion", {
          send_to: "AW-18117776220/v-x9CJiSg-sZELyLidw_",
          event_category: "engagement",
          event_label: "whatsapp_floating_cta",
        });
      } catch {
        /* no-op: gtag failure must not block navigation */
      }
    }

    // Internal telemetry — fire & forget
    try {
      axios.post(
        `${API}/whatsapp-click`,
        { source: "floating-cta", referrer: window.location.href },
        { timeout: 4000 }
      );
    } catch {
      /* no-op: telemetry only */
    }
  };

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Solicitar admisión por WhatsApp"
      className={`wa-premium ${visible ? "wa-premium--visible" : ""}`}
      data-testid="whatsapp-float-btn"
      onClick={onClick}
    >
      <span className="wa-premium-tag" aria-hidden="true">
        Admisión inmediata
      </span>
      <span className="wa-premium-btn">
        <span className="wa-premium-pulse" aria-hidden="true" />
        <span className="wa-premium-pulse wa-premium-pulse--late" aria-hidden="true" />
        <i className="fa-brands fa-whatsapp wa-premium-icon" aria-hidden="true" />
      </span>
    </a>
  );
}
