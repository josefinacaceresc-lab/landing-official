import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`nav-root ${scrolled ? "is-scrolled" : ""}`}
        data-testid="site-header"
      >
        <div className="nav-inner">
          <a
            href="#inicio"
            className="nav-brand"
            aria-label={SITE.brandName}
            data-testid="nav-brand-link"
            onClick={close}
          >
            <span className="nav-brand-mark" aria-hidden="true">
              <img
                src="/logo/logo.png"
                alt=""
                width="42"
                height="42"
                loading="eager"
                decoding="async"
              />
            </span>
            <span className="nav-brand-text">
              <span className="brand-name dbt-serif">{SITE.brandName}</span>
              <span className="brand-sub">
                Único miembro WDBTA · {SITE.brandSub}
              </span>
            </span>
          </a>

          <nav
            className="nav-links"
            role="navigation"
            aria-label="Menú principal"
          >
            {NAV_ITEMS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                data-testid={`nav-link-${n.label.toLowerCase()}`}
              >
                {n.label}
              </a>
            ))}
            <a href="#contacto" className="nav-cta" data-testid="nav-cta-consultar">
              Consultar
            </a>
          </nav>

          <button
            type="button"
            className="nav-hamburger"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            data-testid="nav-hamburger"
          >
            {open ? (
              <X size={26} color="rgba(255,255,255,0.9)" />
            ) : (
              <>
                <span /><span /><span />
              </>
            )}
          </button>
        </div>
      </header>

      <nav
        className={`nav-mobile ${open ? "is-open" : ""}`}
        aria-label="Menú móvil"
        data-testid="nav-mobile"
      >
        {NAV_ITEMS.map((n) => (
          <a
            key={n.href}
            href={n.href}
            onClick={close}
            data-testid={`nav-mobile-link-${n.label.toLowerCase()}`}
          >
            {n.label}
          </a>
        ))}
        <a href="#contacto" onClick={close} data-testid="nav-mobile-link-contacto">
          Contacto
        </a>
      </nav>
    </>
  );
}

// eslint-disable-next-line no-unused-vars
const _icons = Menu;
