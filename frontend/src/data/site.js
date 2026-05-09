export const SITE = {
  brandName: "InstitutoDBT.cl",
  brandLegacy: "Instituto DBT Chile",
  brandSub: "Vitacura · Santiago",
  phone: "22 848 0652",
  email: "contacto@institutodbt.cl",
  address: "El Coihue 3776, Vitacura, Santiago",
  whatsappNumber: "56930550750",
  whatsappDisplay: "+56 9 3055 0750",
  whatsappMessage:
    "Hola, me gustaría solicitar una evaluación de alta complejidad en InstitutoDBT.cl. Mi nombre es...",
  researchUrl: "https://www.nexaryalabs.cl",
};

export const whatsappUrl = (msg) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    msg || SITE.whatsappMessage
  )}`;

export const NAV_ITEMS = [
  { href: "#diferenciacion", label: "Por qué" },
  { href: "#clinica", label: "Tratamiento" },
  { href: "#schema", label: "Schema" },
  { href: "#ciencia", label: "Investigación" },
  { href: "#foro", label: "Foro" },
  { href: "#equipo", label: "Equipo" },
];

export const PILLARS = [
  {
    icon: "landmark",
    title: "Miembro WDBTA",
    text: "Único miembro institucional de la World DBT Association en Chile. Estándares internacionales en cada tratamiento.",
  },
  {
    icon: "brain",
    title: "DBT + Schema Therapy",
    text: "Integración exclusiva certificada ISST. Protocolo propio para desregulación emocional profunda.",
  },
  {
    icon: "microscope",
    title: "Dirección Ph.D.(c)",
    text: "Dirigido por la Dra.(c) Josefina Cáceres Cortés, con formación doctoral en curso y publicaciones científicas.",
  },
  {
    icon: "cpu",
    title: "LaKaira AI",
    text: "Plataforma clínica de inteligencia artificial para apoyo en regulación emocional. Proyecto NexariaLabs.",
  },
];

export const PROGRAMS = [
  {
    tag: "Adultos · Presencial/Online",
    title: "DBT Estándar Adultos",
    desc: "Programa completo de 12 meses con los 4 módulos DBT. La intervención más validada para TLP y desregulación emocional.",
    features: [
      "Sesión individual semanal de 50 min",
      "Grupo de entrenamiento en habilidades",
      "Coaching telefónico en crisis",
      "Reunión de equipo de consulta",
      "Modalidad presencial u online",
    ],
  },
  {
    tag: "Adultos · Solo Online",
    title: "DBT Remoto Adultos",
    desc: "Programa DBT completo en modalidad 100% remota. Ideal para personas fuera de Santiago o con movilidad reducida.",
    features: [
      "Plataforma videoconferencia segura",
      "Grupo de habilidades en línea",
      "Diarios de registro digitales",
      "Acceso a materiales del programa",
      "Soporte técnico incluido",
    ],
  },
  {
    tag: "Adolescentes · 14-18 años",
    title: "DBT Adolescentes",
    desc: "Protocolo DBT adaptado para adolescentes con desregulación emocional, autolesiones o conductas de riesgo.",
    features: [
      "Terapia individual para el adolescente",
      "Sesiones multifamiliares obligatorias",
      "Grupo de habilidades para cuidadores",
      "Coordinación con colegio si necesario",
      "Protocolo de seguridad activo",
    ],
  },
  {
    tag: "Indicaciones clínicas",
    title: "Condiciones tratadas",
    desc: "InstitutoDBT.cl trata condiciones asociadas a desregulación emocional con evidencia científica consolidada.",
    features: [
      "Trastorno de personalidad límite (TLP)",
      "Trauma complejo y TEPT",
      "Autolesiones y conductas suicidas",
      "Trastornos de la conducta alimentaria",
      "Depresión y ansiedad refractaria",
    ],
  },
];

export const MODULES = [
  {
    icon: "wind",
    title: "Mindfulness",
    text: "Conciencia plena del momento presente. La habilidad central que sustenta todas las demás.",
  },
  {
    icon: "waves",
    title: "Tolerancia al malestar",
    text: "Estrategias para sobrevivir crisis sin empeorar la situación.",
  },
  {
    icon: "heart-pulse",
    title: "Regulación emocional",
    text: "Comprender, reducir y modificar emociones intensas y dolorosas.",
  },
  {
    icon: "handshake",
    title: "Efectividad interpersonal",
    text: "Habilidades para mantener relaciones y poner límites saludables.",
  },
  {
    icon: "map",
    title: "Schema Therapy",
    text: "Exploración de esquemas tempranos inadaptativos integrada al trabajo DBT.",
  },
];

export const SCHEMAS = [
  "Abandono / Inestabilidad",
  "Desconfianza / Abuso",
  "Privación emocional",
  "Imperfección / Vergüenza",
  "Fracaso",
  "Dependencia / Incompetencia",
  "Grandiosidad / Derechos",
  "Autocontrol insuficiente",
];

export const PUBLICATIONS = [
  {
    year: "2024",
    title: "DBT-PTSD: Adaptación latinoamericana del protocolo para trauma complejo",
    journal: "InstitutoDBT.cl — Working Paper",
  },
  {
    year: "2023",
    title:
      "Integración de DBT y Schema Therapy: un protocolo para desregulación emocional severa",
    journal: "Revista Latinoamericana de Psicología Clínica",
  },
  {
    year: "2022",
    title: "DBT-SUD: Primer programa estructurado para trastornos adictivos en Chile",
    journal: "Congreso WDBTA — Presentación",
  },
  {
    year: "2021",
    title:
      "Validación de la Dialectical Behavior Therapy en población adolescente chilena",
    journal: "Psykhe — Revista de Psicología",
  },
];

export const TEAM = [
  [
    "JCC",
    "Josefina Cáceres Cortés, Ph.D.(c)",
    "Directora Científica y Fundadora",
    "Psicóloga, Ph.D.(c) Pionera DBT Chile. Miembro WDBTA, certificación ISST. Directora científica del proyecto LaKaira AI.",
  ],
  [
    "TV",
    "Trahice Véliz",
    "Subdirectora Clínica",
    "Psicóloga clínica especialista en DBT. Subdirectora clínica del Instituto.",
  ],
  [
    "FB",
    "Fernanda Bizama",
    "Psicóloga Clínica DBT",
    "Especialista en DBT estándar y programa de adolescentes.",
  ],
  [
    "FA",
    "Francisca Alliende Kupfer",
    "Psicóloga Clínica DBT-ST",
    "Especialidad en integración DBT y Schema Therapy.",
  ],
  [
    "CJ",
    "Catalina Jara Albetman",
    "Psicóloga Clínica",
    "Programa DBT adultos y grupos de entrenamiento en habilidades.",
  ],
];

export const DIRECCION = [
  {
    initials: "JCC",
    name: "Josefina Cáceres Cortés, Ph.D.(c)",
    role: "Directora Científica & Fundadora",
    bio: "Psicóloga clínica y directora de InstitutoDBT.cl. Única representante en Chile dentro del capítulo de investigación de la WDBTA. Formada y afiliada en terapia de esquemas, ISST. Su enfoque integra los aportes de Linehan, Bohus, Damasio, Porges, Siegel y Yi-Yuan Tang.",
    credentials: [
      "Ph.D.(c) — Formación doctoral en curso",
      "WDBTA Research Member — única en Chile",
      "Certificación ISST — Schema Therapy",
      "Fundadora NexariaLabs · LaKaira AI",
    ],
    tags: ["WDBTA", "ISST", "APA", "Ph.D.(c)"],
  },
  {
    initials: "TV",
    name: "Trahice Véliz",
    role: "Subdirectora Clínica · Psicóloga",
    bio: "Especialista en DBT, Género, Psicología Criminal y Forense. Cofundadora Unidad Transitando del Instituto Psiquiátrico Dr. José Horwitz Barak.",
    credentials: [
      "Máster Psicología Criminal — Univ. Europea, España",
      "Formación completa DBT individual, grupal y familiar",
      "Formación DBT-SUD — trastornos uso de sustancias",
      "Socia activa Sociedad Española de DBT",
    ],
    tags: ["DBT", "DBT-SUD", "SEETP", "MBCT"],
  },
];

export const EQUIPO_CLINICO = [
  {
    initials: "LA",
    name: "Dr. Luis Acuña San Martín",
    role: "Médico Psiquiatra · Adicciones, Personalidad & Psicosis",
    bio: "Titulado en la Pontificia Universidad Católica de Chile (1992) y formado en el Instituto Psiquiátrico Dr. Horwitz Barak. Certificación CONACEM. Médico psiquiatra tratante en la Unidad de Corta Estadía Hospitalaria del Instituto Psiquiátrico. Autor y coautor de múltiples investigaciones; coeditor de la revista Psiquiatría y Salud Mental, de la Sociedad Chilena de Salud Mental.",
    tags: ["Psiquiatría", "CONACEM", "Adicciones"],
  },
  {
    initials: "FB",
    name: "Fernanda Bizama",
    role: "Psicóloga Clínica",
    bio: "Diplomado Clínico Adulto. Experiencia en adolescentes y adultos de alta complejidad. Atención en Hospital Militar de Santiago. Formación DBT-SUD para trastorno uso de sustancias.",
    tags: ["DBT", "DBT-SUD"],
  },
  {
    initials: "FA",
    name: "Francisca Alliende Kupfer",
    role: "Psicóloga Infantojuvenil · Adultos",
    bio: "U. de los Andes, distinción. Máster Neurorehabilitación (ISEP, España). Certificación DBT — Asoc. Española. Especialista en desregulación emocional y autolesiones en población infantojuvenil.",
    tags: ["DBT", "Infanto"],
  },
  {
    initials: "CJ",
    name: "Catalina Jara Albetman",
    role: "Psicóloga Clínica",
    bio: "U. del Desarrollo. Formación en psicología clínica y psico-jurídica. Diplomado en Psicología Jurídica, PUC. Curso RO DBT nivel 1. Experiencia en contextos penitenciarios y psiquiátricos.",
    tags: ["DBT", "RO-DBT"],
  },
  {
    initials: "CS",
    name: "Carolina Sánchez Ramírez",
    role: "Trabajadora Social",
    bio: "Apoyo social y acompañamiento psicosocial a pacientes y familias. Coordinación de recursos comunitarios y trabajo interdisciplinario.",
    tags: ["Social"],
  },
  {
    initials: "OC",
    name: "Olga Castillo Álvarez",
    role: "Enfermera · Socióloga",
    bio: "Enfermera Universitaria y Socióloga. Actualmente en DBT Adicciones en Zentralinstitut für Seelische Gesundheit, Alemania. Dominio de alemán.",
    tags: ["Enfermería", "DBT"],
  },
  {
    initials: "JL",
    name: "Jorge Loyola Rodó",
    role: "Analista de Sistemas",
    bio: "Soporte tecnológico e infraestructura digital del Instituto. Coordinación de plataformas clínicas y sistemas de gestión.",
    tags: ["TI"],
  },
];

export const CERTIFICATIONS = [
  { acronym: "WDBTA", name: "World DBT Association" },
  { acronym: "ISST", name: "International Society of Schema Therapy" },
  { acronym: "APA", name: "American Psychological Association" },
  { acronym: "SEETP", name: "Soc. Española Estudios Trastorno Personalidad" },
  { acronym: "Zepp", name: "Zepp Foundation" },
];

export const TESTIMONIALS = [
  {
    text: "InstitutoDBT.cl cambió mi relación conmigo misma. Después de años de tratamientos que no funcionaban, aquí encontré herramientas reales que puedo usar cada día.",
    author: "Virginia · Programa DBT Adultos",
  },
  {
    text: "La integración con Schema Therapy fue clave para entender de dónde venían mis patrones. El equipo es excepcionalmente profesional y humano a la vez.",
    author: "María José · DBT + Schema Therapy",
  },
  {
    text: "Para mi hija adolescente fue una experiencia transformadora. El trabajo con la familia nos dio herramientas a todos. Hoy tiene una vida que no imaginábamos posible.",
    author: "Valentina · Madre, Programa Adolescentes",
  },
];

export const HERO_STATS = [
  { num: "15+", label: "Años en DBT" },
  { num: "WDBTA", label: "Miembro institucional" },
  { num: "2", label: "Terapias integradas" },
  { num: "AI", label: "LaKaira · Tecnología clínica" },
];
