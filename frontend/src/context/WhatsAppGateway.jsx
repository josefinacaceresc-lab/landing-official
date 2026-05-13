import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { whatsappUrl } from "@/data/site";
import SerenaModal from "@/components/site/SerenaModal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HANDOFF_TEMPLATE =
  "Hola Karina, soy [Nombre] (RUT: [RUT]). Me interesa el tratamiento de alta complejidad.";

const PREFIX_AFTER_HOURS =
  "[Contacto Fuera de Horario · Mensaje recibido durante la noche]\n\n";
const PREFIX_WEEKEND =
  "[Contacto Fin de Semana · Mensaje recibido durante el descanso de Karina]\n\n";

function buildHandoffMessage(name, rut, status) {
  let prefix = "";
  if (status === "after-hours") prefix = PREFIX_AFTER_HOURS;
  else if (status === "weekend") prefix = PREFIX_WEEKEND;
  return (
    prefix + HANDOFF_TEMPLATE.replace("[Nombre]", name).replace("[RUT]", rut)
  );
}

const WhatsAppGatewayContext = createContext({
  openGateway: () => {},
});

export function useWhatsAppGateway() {
  return useContext(WhatsAppGatewayContext);
}

export function WhatsAppGatewayProvider({ children }) {
  const [state, setState] = useState({ open: false, source: "floating-cta" });

  const openGateway = useCallback((source = "floating-cta") => {
    setState({ open: true, source });
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      try {
        window.gtag("event", "serena_modal_open", {
          event_category: "engagement",
          event_label: source,
        });
      } catch {
        /* no-op */
      }
    }
    try {
      axios.post(
        `${API}/whatsapp-click`,
        { source, referrer: window.location.href },
        { timeout: 4000 }
      );
    } catch {
      /* no-op */
    }
  }, []);

  const closeGateway = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  const onConfirmHandoff = useCallback(
    async (name, rut, opts = {}) => {
      const status = opts.status || "open";
      const cleanName = (name || "").trim();
      const cleanRut = (rut || "").trim().toUpperCase().replace(/\s+/g, "");

      // 1. Capture-first: persist BEFORE redirect, so we have the data even
      //    if the user never sends the WhatsApp message.
      try {
        await axios.post(
          `${API}/whatsapp-handoff`,
          {
            name: cleanName,
            rut: cleanRut,
            source: state.source,
            referrer: window.location.href,
            handoff_status: status,
          },
          { timeout: 8000 }
        );
      } catch (err) {
        // Even if persistence fails we still proceed to WhatsApp — user UX first.
        console.warn("WhatsApp handoff capture failed", err);
      }

      // 2. Google Ads conversion
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        try {
          window.gtag("event", "conversion", {
            send_to: "AW-18117776220/v-x9CJiSg-sZELyLidw_",
            event_category: "lead",
            event_label: `whatsapp_serena_handoff_${status}`,
          });
        } catch {
          /* no-op */
        }
      }

      // 3. Open WhatsApp with prefilled message
      window.open(
        whatsappUrl(buildHandoffMessage(cleanName || "[Nombre]", cleanRut || "[RUT]", status)),
        "_blank",
        "noopener,noreferrer"
      );

      closeGateway();
    },
    [state.source, closeGateway]
  );

  const value = useMemo(() => ({ openGateway }), [openGateway]);

  return (
    <WhatsAppGatewayContext.Provider value={value}>
      {children}
      <SerenaModal
        open={state.open}
        onClose={closeGateway}
        onConfirm={onConfirmHandoff}
      />
    </WhatsAppGatewayContext.Provider>
  );
}
