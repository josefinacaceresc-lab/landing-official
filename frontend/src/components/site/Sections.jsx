import {
  Landmark,
  Brain,
  Microscope,
  Cpu,
  Wind,
  Waves,
  HeartPulse,
  Handshake,
  Map,
} from "lucide-react";
import { PILLARS, PROGRAMS, MODULES, SCHEMAS } from "@/data/site";
import ProtocolMark from "@/components/site/ProtocolMark";

const ICONS = {
  landmark: Landmark,
  brain: Brain,
  microscope: Microscope,
  cpu: Cpu,
  wind: Wind,
  waves: Waves,
  "heart-pulse": HeartPulse,
  handshake: Handshake,
  map: Map,
};

export function PillarsSection() {
  return (
    <section className="section-pad sec-cream" id="diferenciacion">
      <div className="container-x">
        <div className="heading-center">
          <span className="label label-center">Por qué elegirnos</span>
          <h2 className="dbt-serif" style={{ marginTop: "1rem" }}>
            Un estándar científico sin precedentes en Chile
          </h2>
        </div>
        <div className="pillars-grid" data-testid="pillars-grid">
          {PILLARS.map((p) => {
            const I = ICONS[p.icon];
            return (
              <div
                key={p.title}
                className="pillar-card fade-up"
                data-testid={`pillar-${p.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span className="pillar-icon">
                  {I ? <I size={22} strokeWidth={1.5} /> : null}
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProgramsSection() {
  return (
    <section className="section-pad" id="clinica">
      <div className="container-x">
        <div className="heading-center">
          <span className="label label-center">Programas clínicos</span>
          <h2 className="dbt-serif" style={{ marginTop: "1rem" }}>
            Atención especializada en desregulación emocional
          </h2>
        </div>
        <div className="programs-grid" data-testid="programs-grid">
          {PROGRAMS.map((p) => (
            <article
              key={p.title}
              className="program-card fade-up"
              data-testid={`program-${p.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <span className="program-tag">{p.tag}</span>
              <h3 className="dbt-serif">{p.title}</h3>
              <p>{p.desc}</p>
              <div className="program-features">
                {p.features.map((f) => (
                  <div key={f} className="program-feature">
                    {f}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ModulesSection() {
  return (
    <section className="section-pad sec-navy" id="modulos">
      <div className="container-x">
        <div className="heading-center">
          <span className="label label-center">
            Los 4 módulos DBT + Schema Therapy
          </span>
          <h2 className="dbt-serif" style={{ marginTop: "1rem", color: "#fff" }}>
            Habilidades con evidencia científica
          </h2>
        </div>
        <div className="modules-grid" data-testid="modules-grid">
          {MODULES.map((m) => {
            const I = ICONS[m.icon];
            return (
              <div
                key={m.title}
                className="module-card fade-up"
                data-testid={`module-${m.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span className="module-icon">
                  {I ? <I size={22} strokeWidth={1.5} /> : null}
                </span>
                <h3 className="dbt-serif">{m.title}</h3>
                <p>{m.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SchemaSection() {
  return (
    <section className="section-pad sec-cream" id="schema">
      <div className="container-x">
        <div className="schema-grid">
          <div>
            <span className="label">Integración exclusiva</span>
            <h2 className="dbt-serif" style={{ marginTop: "1rem" }}>
              DBT + Schema Therapy
            </h2>
            <p style={{ marginTop: "1.2rem", color: "var(--ink-3)" }}>
              El Instituto DBT Chile es pionero en la integración de DBT con
              Schema Therapy bajo certificación ISST. Esta combinación permite
              abordar no solo la desregulación emocional del presente, sino
              también los esquemas tempranos que la perpetúan.
            </p>
            <p style={{ color: "var(--ink-3)" }}>
              El trabajo con modos esquemáticos complementa las habilidades DBT,
              ofreciendo una comprensión más profunda de los patrones de
              sufrimiento y mayor eficacia terapéutica.
            </p>
            <div className="seal-row" data-testid="schema-badges">
              <div
                className="seal-item seal-item--static"
                data-testid="schema-seal-wdbta"
                aria-label="Miembro institucional WDBTA"
              >
                <span className="seal-frame">
                  <img src="/logos/wdbta.png" alt="Logo WDBTA — World Dialectical Behavior Therapy Association · InstitutoDBT.cl miembro institucional" />
                </span>
                <span className="seal-text">
                  <span className="seal-title dbt-serif">WDBTA</span>
                  <span className="seal-sub">Miembro institucional</span>
                </span>
              </div>

              <div
                className="seal-item seal-item--static"
                data-testid="schema-seal-isst"
                aria-label="Certificación ISST"
              >
                <span className="seal-frame">
                  <img src="/logos/isst.jpg" alt="Logo ISST — International Society of Schema Therapy · Certificación InstitutoDBT.cl" />
                </span>
                <span className="seal-text">
                  <span className="seal-title dbt-serif">ISST</span>
                  <span className="seal-sub">Certificación</span>
                </span>
              </div>

              <div className="seal-item seal-item--static" data-testid="schema-seal-protocolo">
                <span className="seal-frame seal-frame--mono">
                  <ProtocolMark size={42} tone="gold" title="Protocolo DBT-ST exclusivo" />
                </span>
                <span className="seal-text">
                  <span className="seal-title dbt-serif">Protocolo DBT-ST</span>
                  <span className="seal-sub">Exclusivo · desarrollo propio</span>
                </span>
              </div>
            </div>
          </div>
          <div className="schema-card fade-up" data-testid="schema-card">
            <h3 className="dbt-serif">Esquemas abordados</h3>
            {SCHEMAS.map((s) => (
              <div key={s} className="schema-item">
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
