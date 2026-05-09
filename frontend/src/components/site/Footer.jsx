import { NAV_ITEMS, SITE, CERTIFICATIONS } from "@/data/site";
import WhatsAppFloat from "./WhatsAppFloat";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="footer-root" data-testid="site-footer">
        <div className="footer-inner">
          {/* ─── Certifications strip (museum plaque style) ─── */}
          <div className="footer-certs" data-testid="footer-certifications">
            <div className="footer-certs-label">
              <span className="label">Certificaciones & afiliaciones</span>
            </div>
            <div className="footer-certs-list">
              {CERTIFICATIONS.map((c) => (
                <div
                  key={c.acronym}
                  className="footer-cert"
                  data-testid={`footer-cert-${c.acronym.toLowerCase()}`}
                >
                  <span className="footer-cert-acronym dbt-serif">
                    {c.acronym}
                  </span>
                  <span className="footer-cert-rule" aria-hidden="true" />
                  <span className="footer-cert-name">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="footer-divider" aria-hidden="true" />

          <div className="footer-brand">
            <span className="footer-brand-mark">D</span>
            <div>
              <div className="footer-brand-name dbt-serif">{SITE.brandName}</div>
              <div className="footer-brand-sub">
                Único miembro institucional WDBTA en Chile · {SITE.brandSub}
              </div>
            </div>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                data-testid={`footer-link-${n.label.toLowerCase()}`}
              >
                {n.label}
              </a>
            ))}
            <a href="#contacto" data-testid="footer-link-contacto">
              Contacto
            </a>
          </nav>

          <div className="footer-copy">
            © {year} {SITE.brandName} · Josefina Cáceres Cortés, Ph.D.(c) · Todos los derechos reservados.
          </div>
        </div>
      </footer>

      <WhatsAppFloat />
    </>
  );
}
