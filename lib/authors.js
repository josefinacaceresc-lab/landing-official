/**
 * Fuente única de datos institucionales de autoría.
 * ─────────────────────────────────────────────────────────────────────────
 * Toda referencia académica a la autoría (nombre, ORCID, afiliaciones,
 * credenciales, membresías) debe consumirse desde este archivo para
 * garantizar consistencia editorial y semántica.
 *
 * Reglas críticas:
 *   - Josefina Cáceres Cortés es Ph.D.(c), NO Ph.D. finalizado.
 *   - WDBTA = participación internacional en investigación (NO certificación).
 *   - APA = membresía profesional (NO acreditación).
 *   - ISST = membresía profesional (NO certificación).
 *   - AEDBT = certificación profesional real de especialista en DBT.
 */

export const josefinaCaceres = {
  id: 'josefina-caceres-cortes',
  name: 'Josefina Cáceres Cortés',
  givenName: 'Josefina',
  familyName: 'Cáceres Cortés',
  honorificSuffix: 'Ph.D.(c)',
  displayName: 'Josefina Cáceres Cortés, Ph.D.(c)',
  alternateDisplayName: 'Dra.(c) Josefina Cáceres Cortés',
  academicStatus: 'Candidata a doctorado en Psicología Clínica y de la Salud',
  role: 'Directora clínica y científica',
  jobTitle: 'Directora clínica y científica de Instituto DBT Chile',
  affiliations: [
    'Instituto DBT Chile',
    'NEXARYALABS — Laboratorio de Ciencias Cognitivas',
  ],
  affiliationShort: 'Instituto DBT Chile · NEXARYALABS',
  orcid: '0009-0001-9148-4244',
  orcidUrl: 'https://orcid.org/0009-0001-9148-4244',
  personId: 'https://institutodbtchile.cl/#josefina-caceres-cortes',
  profileUrl: 'https://institutodbtchile.cl/equipo',

  // Formación académica
  education: [
    'Psicóloga clínica',
    'Magíster en Psicología Clínica',
    'Candidata a doctorado en Psicología Clínica y de la Salud',
  ],

  // Certificaciones profesionales reales (NO membresías ni participaciones)
  certifications: [
    {
      name: 'Certificación como especialista en Terapia Dialéctico-Conductual',
      recognizedBy: 'Asociación Española de DBT',
      category: 'Certificación profesional',
    },
  ],

  // Membresías profesionales
  memberships: [
    {
      name: 'American Psychological Association — Division 49',
      alternateName: 'Society of Group Psychology and Group Psychotherapy',
      shortName: 'APA · División 49',
    },
    {
      name: 'International Society of Schema Therapy',
      alternateName: 'ISST',
      shortName: 'ISST',
    },
  ],

  // Participación internacional en investigación (NO certificaciones)
  internationalParticipation: [
    {
      organization: 'World Dialectical Behavior Therapy Association',
      alternateName: 'WDBTA',
      events: ['Barcelona 2023', 'Amberes 2024'],
      description: 'Participación internacional en investigación WDBTA',
    },
  ],

  // Resumen curricular institucional (versión canónica)
  curriculumSummary:
    'Josefina Cáceres Cortés, Ph.D.(c), es psicóloga clínica, Magíster en Psicología Clínica, candidata a doctorado en Psicología Clínica y de la Salud, y directora clínica y científica de Instituto DBT Chile. Cuenta con formación especializada y certificación como especialista en Terapia Dialéctico-Conductual por la Asociación Española de DBT. Ha participado en actividades internacionales de investigación de la World Dialectical Behavior Therapy Association —WDBTA— en Barcelona 2023 y Amberes 2024. Es miembro de la American Psychological Association —APA—, División 49: Society of Group Psychology and Group Psychotherapy, y miembro de la International Society of Schema Therapy —ISST—. Dirige el desarrollo clínico e investigativo del modelo integrado de Instituto DBT Chile, basado en Terapia Dialéctico-Conductual y Terapia de Esquemas, junto con las líneas de investigación desarrolladas en NEXARYALABS — Laboratorio de Ciencias Cognitivas.',
}

// Índice de autores por id para consumo desde papers.js / articulos.js
export const authorsById = {
  'josefina-caceres-cortes': josefinaCaceres,
}

export function getAuthorById(id) {
  return authorsById[id] || null
}

export default josefinaCaceres
