import { Helmet } from "react-helmet-async";

const ORIGIN = "https://www.institutodbt.cl";
const LOGO = `${ORIGIN}/logo/logo-512.png`;

const DEFAULT_TITLE =
  "InstitutoDBT.cl | Centro de Alta Complejidad & Psiquiatría Computacional";
const DEFAULT_DESC =
  "InstitutoDBT.cl — Centro de Alta Complejidad y Psiquiatría Computacional. Único miembro institucional WDBTA en Chile. DBT de Fidelidad Total + Schema Therapy bajo dirección de la Dra. Josefina Cáceres, Ph.D.(c).";

/**
 * Site-wide default SEO tags for non-article routes (Landing, Admin, etc.).
 * Article pages override these from ArticlePage via Helmet.
 */
export default function SiteSeo() {
  return (
    <Helmet>
      <title>{DEFAULT_TITLE}</title>
      <meta name="description" content={DEFAULT_DESC} />
      <link rel="canonical" href={`${ORIGIN}/`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_CL" />
      <meta property="og:site_name" content="InstitutoDBT.cl" />
      <meta property="og:url" content={`${ORIGIN}/`} />
      <meta property="og:title" content={DEFAULT_TITLE} />
      <meta property="og:description" content={DEFAULT_DESC} />
      <meta property="og:image" content={LOGO} />
      <meta property="og:image:alt" content="Logo InstitutoDBT.cl" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={DEFAULT_TITLE} />
      <meta name="twitter:description" content={DEFAULT_DESC} />
      <meta name="twitter:image" content={LOGO} />
    </Helmet>
  );
}
