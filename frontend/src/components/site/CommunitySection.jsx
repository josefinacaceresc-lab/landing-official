import { Heart, Users, Sparkles } from "lucide-react";
import { whatsappUrl } from "@/data/site";

export default function CommunitySection() {
  return (
    <section
      className="section-pad community-sec"
      id="comunidad"
      data-testid="community-section"
    >
      <div className="container-x">
        {/* ─── Header ─── */}
        <div className="community-header">
          <span className="label">Nuestra comunidad</span>
          <h2 className="dbt-serif community-headline">
            Programas para <em>familias</em>
          </h2>
          <p className="community-sub">
            En InstitutoDBT.cl entendemos que la sanación no ocurre en
            aislamiento. Nuestro programa <strong>Family Parents</strong>
            ofrece un espacio terapéutico grupal donde madres, padres y
            cuidadores aprenden las mismas habilidades DBT que sus hijos,
            transformando el sistema familiar desde la regulación emocional
            compartida.
          </p>
        </div>

        {/* ─── Editorial split layout ─── */}
        <div className="community-grid">
          <figure className="community-frame community-frame--lead" data-testid="community-img-1">
            <span className="community-corner community-corner--tl" aria-hidden="true" />
            <span className="community-corner community-corner--br" aria-hidden="true" />
            <img
              src="/community/family-1.jpg"
              alt="Family Parents InstitutoDBT.cl — sesión grupal de habilidades DBT con familias y cuidadores"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="community-caption">
              <span className="label">Sesión grupal · Vitacura</span>
              <span className="community-caption-text dbt-serif">
                Skills training compartido
              </span>
            </figcaption>
          </figure>

          <div className="community-pillars">
            <article className="community-pillar" data-testid="community-pillar-1">
              <div className="community-pillar-icon">
                <Users size={18} strokeWidth={1.6} />
              </div>
              <h3 className="dbt-serif">Family Parents</h3>
              <p>
                Grupo psicoeducativo y vivencial dirigido a padres, madres y
                cuidadores. 8 sesiones que recorren mindfulness, regulación
                emocional, tolerancia al malestar y comunicación validante.
              </p>
            </article>

            <article className="community-pillar" data-testid="community-pillar-2">
              <div className="community-pillar-icon">
                <Heart size={18} strokeWidth={1.6} />
              </div>
              <h3 className="dbt-serif">Apoyo entre pares</h3>
              <p>
                Encuentros mensuales donde las familias comparten experiencias
                con pacientes en programa DBT. Un espacio confidencial,
                acompañado por nuestro equipo clínico.
              </p>
            </article>

            <article className="community-pillar" data-testid="community-pillar-3">
              <div className="community-pillar-icon">
                <Sparkles size={18} strokeWidth={1.6} />
              </div>
              <h3 className="dbt-serif">Continuidad terapéutica</h3>
              <p>
                Cuando la familia entrena las mismas habilidades que el
                paciente, la generalización en el hogar se multiplica. Ciencia
                aplicada al sistema completo.
              </p>
            </article>
          </div>

          <figure className="community-frame community-frame--sec" data-testid="community-img-2">
            <span className="community-corner community-corner--tr" aria-hidden="true" />
            <span className="community-corner community-corner--bl" aria-hidden="true" />
            <img
              src="/community/family-2.jpg"
              alt="Familias en programa DBT InstitutoDBT.cl — espacio de apoyo grupal y continuidad terapéutica"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="community-caption community-caption--right">
              <span className="label">Apoyo grupal mensual</span>
              <span className="community-caption-text dbt-serif">
                Comunidad de cuidado
              </span>
            </figcaption>
          </figure>
        </div>

        {/* ─── CTA ─── */}
        <div className="community-cta" data-testid="community-cta">
          <p className="community-cta-text">
            Las familias acreditadas en el programa acceden a tarifa
            preferencial y a la red de profesionales colaboradores de
            InstitutoDBT.cl.
          </p>
          <a
            href={whatsappUrl(
              "Hola, me gustaría recibir información sobre el programa Family Parents en InstitutoDBT.cl. Mi nombre es..."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="community-cta-btn"
            data-testid="community-cta-btn"
          >
            <i className="fa-brands fa-whatsapp" />
            <span>Solicitar información del programa</span>
          </a>
        </div>
      </div>
    </section>
  );
}
