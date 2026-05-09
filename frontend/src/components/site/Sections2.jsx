import { Cpu, ArrowUpRight } from "lucide-react";
import {
  PUBLICATIONS,
  TESTIMONIALS,
  SITE,
  DIRECCION,
  EQUIPO_CLINICO,
  CERTIFICATIONS,
} from "@/data/site";

export function ResearchSection() {
  return (
    <section className="section-pad sec-navy" id="ciencia">
      <div className="container-x" style={{ textAlign: "center" }}>
        <span className="label label-center">Investigación aplicada</span>
        <h2
          className="dbt-serif"
          style={{ color: "#fff", marginTop: "0.8rem", marginBottom: "1rem" }}
        >
          Capítulo de Investigación WDBTA
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            maxWidth: 580,
            margin: "0 auto 3rem",
            fontSize: 15,
          }}
        >
          InstitutoDBT.cl es miembro activo del capítulo de investigación
          de la WDBTA, participando en estudios sobre eficacia de DBT en
          población latinoamericana.
        </p>

        <a
          href={SITE.researchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="research-card fade-up"
          data-testid="research-card-lakaira"
        >
          <div className="research-header">
            <span className="research-icon">
              <Cpu size={28} strokeWidth={1.5} />
            </span>
            <div style={{ textAlign: "left" }}>
              <span className="label" style={{ marginBottom: "0.3rem" }}>
                NexariaLabs · IA Clínica
              </span>
              <h3
                className="dbt-serif"
                style={{ color: "#fff", fontSize: "1.6rem", marginTop: "0.4rem" }}
              >
                LaKaira AI
              </h3>
            </div>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              textAlign: "left",
              fontSize: 14,
              marginBottom: "1.5rem",
              lineHeight: 1.8,
            }}
          >
            Sistema de inteligencia artificial para manejo de desregulación
            emocional. Basado en los principios de DBT, Principio de Energía
            Libre (Friston) y teoría de la información. Primer proyecto de IA
            clínica DBT en América Latina.
          </p>
          <div
            className="research-tag-row"
            style={{ justifyContent: "flex-start" }}
          >
            <span className="research-tag">Free Energy Principle</span>
            <span className="research-tag">DBT Framework</span>
            <span
              className="research-tag"
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              Ver proyecto
              <ArrowUpRight size={12} strokeWidth={2} />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}

export function PublicationsSection() {
  return (
    <section className="section-pad" id="publicaciones">
      <div className="container-x">
        <span className="label">Producción científica</span>
        <h2 className="dbt-serif" style={{ marginTop: "0.8rem" }}>
          Publicaciones — Cáceres Cortés, J.
        </h2>
        <div className="publications-list" data-testid="publications-list">
          {PUBLICATIONS.map((p) => (
            <div
              key={p.title}
              className="pub-item fade-up"
              data-testid={`pub-${p.year}`}
            >
              <div className="pub-year dbt-serif">{p.year}</div>
              <div>
                <div className="pub-title">{p.title}</div>
                <div className="pub-journal">{p.journal}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamSection() {
  return (
    <section className="section-pad sec-cream" id="equipo" data-testid="equipo-section">
      <div className="container-x">
        {/* ─── Header ─── */}
        <div className="team-header">
          <span className="label">Quiénes somos</span>
          <h2 className="dbt-serif team-headline">
            Las personas que te <em>acompañan</em>
          </h2>
          <p className="team-sub">
            Psiquiatras, psicólogos y profesionales de salud dedicados a
            terapias basadas en evidencia. Liderado por la única Ph.D.(c) con
            afiliación WDBTA activa en Chile.
          </p>
        </div>

        {/* ─── Tier 1 — DIRECCIÓN ─── */}
        <div className="tier-marker">
          <span className="tier-number dbt-serif">01</span>
          <div className="tier-title">
            <span className="label">Dirección</span>
            <span className="tier-caption">
              Liderazgo científico y clínico del Instituto
            </span>
          </div>
          <div className="tier-rule" aria-hidden="true" />
        </div>

        <div className="direccion-grid">
          {DIRECCION.map((leader, idx) => (
            <article
              key={leader.initials}
              className={`direccion-card direccion-card--${idx === 0 ? "primary" : "secondary"} fade-up`}
              data-testid={`direccion-card-${leader.initials.toLowerCase()}`}
            >
              <div className="direccion-portrait" aria-hidden="true">
                <span className="direccion-portrait-corner direccion-portrait-corner--tl" />
                <span className="direccion-portrait-corner direccion-portrait-corner--tr" />
                <span className="direccion-portrait-corner direccion-portrait-corner--bl" />
                <span className="direccion-portrait-corner direccion-portrait-corner--br" />
                <span className="direccion-initials dbt-serif">
                  {leader.initials}
                </span>
                <span className="direccion-photo-hint">Agregar foto</span>
              </div>

              <div className="direccion-body">
                <span className="label direccion-role">{leader.role}</span>
                <h3 className="dbt-serif direccion-name">{leader.name}</h3>
                <p className="direccion-bio">{leader.bio}</p>

                <ul className="direccion-credentials" role="list">
                  {leader.credentials.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>

                <div className="direccion-tags">
                  {leader.tags.map((t, i) => (
                    <span key={t} className="hallmark">
                      <span className="hallmark-text dbt-serif">{t}</span>
                      {i < leader.tags.length - 1 && (
                        <span className="hallmark-dot" aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ─── Tier 2 — EQUIPO CLÍNICO ─── */}
        <div className="tier-marker tier-marker--spaced">
          <span className="tier-number dbt-serif">02</span>
          <div className="tier-title">
            <span className="label">Equipo clínico</span>
            <span className="tier-caption">
              Psicólogos, médicos y profesionales de salud
            </span>
          </div>
          <div className="tier-rule" aria-hidden="true" />
        </div>

        <div className="clinico-grid" data-testid="equipo-clinico-grid">
          {EQUIPO_CLINICO.map((m) => (
            <article
              key={m.initials}
              className="clinico-card fade-up"
              data-testid={`equipo-card-${m.initials.toLowerCase()}`}
            >
              <div className="clinico-initials-wrap">
                <span className="clinico-initials dbt-serif">{m.initials}</span>
                <span className="clinico-corner" aria-hidden="true" />
              </div>
              <h4 className="clinico-name dbt-serif">{m.name}</h4>
              <div className="clinico-role">{m.role}</div>
              <div className="clinico-bio-sep" aria-hidden="true" />
              <p className="clinico-bio">{m.bio}</p>
              <div className="clinico-tags">
                {m.tags.map((t, i) => (
                  <span key={t} className="hallmark hallmark--sm">
                    <span className="hallmark-text dbt-serif">{t}</span>
                    {i < m.tags.length - 1 && (
                      <span className="hallmark-dot" aria-hidden="true">·</span>
                    )}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* ─── Tier 3 — CERTIFICATIONS STRIP ─── */}
        <div className="certifications-strip" data-testid="certifications-strip">
          <div className="certifications-heading">
            <span className="label">Certificaciones & afiliaciones internacionales</span>
          </div>
          <div className="certifications-items">
            {CERTIFICATIONS.map((c) => (
              <div
                key={c.acronym}
                className="certification-plaque"
                data-testid={`certification-${c.acronym.toLowerCase()}`}
              >
                <div className="certification-acronym dbt-serif">
                  {c.acronym}
                </div>
                <div className="certification-rule" aria-hidden="true" />
                <div className="certification-name">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section-pad" id="testimonios">
      <div className="container-x">
        <div className="heading-center">
          <span className="label label-center">Experiencias</span>
          <h2 className="dbt-serif" style={{ marginTop: "1rem" }}>
            Qué dicen nuestros pacientes
          </h2>
        </div>
        <div className="testimonials-grid" data-testid="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.author || `testimonial-${i}`}
              className="testimonial-card fade-up"
              data-testid={`testimonial-${i}`}
            >
              <div className="testimonial-text">{t.text}</div>
              <div className="testimonial-author">{t.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
