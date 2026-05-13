import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { SITE } from "@/data/site";
import { useWhatsAppGateway } from "@/context/WhatsAppGateway";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { openGateway } = useWhatsAppGateway();

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onWhatsAppClick = (e) => {
    e.preventDefault();
    openGateway("contact-section");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      toast.error("Por favor ingresa tu nombre completo");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      toast.error("Por favor ingresa un email válido");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API}/contact`, {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        program: form.program.trim() || null,
        message: form.message.trim() || null,
      });
      const status = res?.data?.email_status;
      if (status === "sent") {
        toast.success("¡Gracias! Hemos recibido tu consulta y enviado la notificación.");
      } else {
        toast.success("¡Gracias! Tu consulta fue registrada. Te contactaremos a la brevedad.");
      }
      // Google Ads conversion — successful lead from contact form
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        try {
          window.gtag("event", "conversion", {
            send_to: "AW-18117776220/v-x9CJiSg-sZELyLidw_",
            event_category: "lead",
            event_label: "contact_form_submitted",
          });
        } catch {
          /* no-op */
        }
      }
      setForm({ name: "", email: "", phone: "", program: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Hubo un problema al enviar. Intenta por WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="section-pad sec-navy"
      id="contacto"
      data-testid="contact-section"
    >
      <div className="container-x">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="label">Estamos aquí para ayudarte</span>
            <h2 className="dbt-serif" style={{ marginTop: "0.8rem", color: "#fff" }}>
              Solicita tu consulta
            </h2>
            <p style={{ marginTop: "1rem" }}>
              Da el primer paso. Nuestro equipo responde en menos de 24 horas
              hábiles.
            </p>

            <button
              type="button"
              className="contact-whatsapp"
              data-testid="contact-whatsapp-btn"
              onClick={onWhatsAppClick}
            >
              <i className="fa-brands fa-whatsapp" style={{ fontSize: 20 }} />
              WhatsApp · {SITE.whatsappDisplay}
            </button>

            <div className="contact-item" data-testid="contact-phone">
              <Phone size={16} strokeWidth={1.6} /> {SITE.phone}
            </div>
            <div className="contact-item" data-testid="contact-email">
              <Mail size={16} strokeWidth={1.6} /> {SITE.email}
            </div>
            <div className="contact-item" data-testid="contact-address">
              <MapPin size={16} strokeWidth={1.6} /> {SITE.address}
            </div>
          </div>

          <form
            className="contact-form-wrapper"
            onSubmit={onSubmit}
            data-testid="contact-form"
            noValidate
          >
            <div className="cf-field">
              <label htmlFor="cf-name" className="cf-label">
                Nombre completo *
              </label>
              <input
                id="cf-name"
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                className="cf-input"
                placeholder="Tu nombre"
                required
                data-testid="contact-input-name"
              />
            </div>
            <div className="cf-field">
              <label htmlFor="cf-email" className="cf-label">
                Email *
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                className="cf-input"
                placeholder="tu@email.com"
                required
                data-testid="contact-input-email"
              />
            </div>
            <div className="cf-field">
              <label htmlFor="cf-phone" className="cf-label">
                Teléfono
              </label>
              <input
                id="cf-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={onChange}
                className="cf-input"
                placeholder="+56 9 XXXX XXXX"
                data-testid="contact-input-phone"
              />
            </div>
            <div className="cf-field">
              <label htmlFor="cf-program" className="cf-label">
                Programa de interés
              </label>
              <input
                id="cf-program"
                name="program"
                type="text"
                value={form.program}
                onChange={onChange}
                className="cf-input"
                placeholder="DBT adultos, DBT adolescentes, Schema Therapy…"
                data-testid="contact-input-program"
              />
            </div>
            <div className="cf-field">
              <label htmlFor="cf-message" className="cf-label">
                Mensaje
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={4}
                value={form.message}
                onChange={onChange}
                className="cf-textarea"
                placeholder="Cuéntanos brevemente cómo podemos ayudarte…"
                data-testid="contact-input-message"
              />
            </div>
            <button
              type="submit"
              className="cf-submit"
              disabled={loading}
              data-testid="contact-submit-btn"
            >
              {loading ? "Enviando…" : (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
                  Enviar mensaje <ArrowRight size={14} />
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
