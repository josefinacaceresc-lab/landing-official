import { useEffect, useState } from "react";
import { useWhatsAppGateway } from "@/context/WhatsAppGateway";

/**
 * Floating WhatsApp button — premium emerald, "Admisión Inmediata" badge,
 * pulse halo, scroll-triggered reveal.
 * Click opens the global Serena gateway (capture-first flow: name + RUT).
 */
export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const { openGateway } = useWhatsAppGateway();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Solicitar admisión por WhatsApp"
      className={`wa-premium ${visible ? "wa-premium--visible" : ""}`}
      data-testid="whatsapp-float-btn"
      onClick={() => openGateway("floating-cta")}
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
  );
}
