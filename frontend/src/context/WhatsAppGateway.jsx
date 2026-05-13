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

const WA_TEMPLATE =
  "Hola Karina, soy [Nombre]. Me interesa el tratamiento de alta complejidad.";

function buildWaMessage(name) {
  return WA_TEMPLATE.replace("[Nombre]", name || "[Nombre]");
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
    async (payload, opts = {}) => {
      const status = opts.status || "open";
      const shouldRedirect = opts.redirect !== false && status === "open";
      const name = (payload?.name || "").trim();
      const phone = (payload?.phone || "").trim();
      const email = (payload?.email || "").trim() || null;

      // 1. Capture-first: persist BEFORE redirect, so we have the data even
      //    if the user never sends the WhatsApp message.
      try {
        await axios.post(
          `${API}/whatsapp-handoff`,
          {
            name,
            phone,
            email,
            source: state.source,
            referrer: window.location.href,
            handoff_status: status,
          },
          { timeout: 8000 }
        );
      } catch (err) {
        // Even if persistence fails we still proceed — UX first.
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

      // 3a. Business hours → open WhatsApp immediately.
      if (shouldRedirect) {
        window.open(
          whatsappUrl(buildWaMessage(name)),
          "_blank",
          "noopener,noreferrer"
        );
        closeGateway();
        return;
      }

      // 3b. After-hours / weekend → SerenaModal handles the confirmation UI.
      //     No WhatsApp redirect; modal will auto-close after showing the
      //     "solicitud recibida" message.
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
