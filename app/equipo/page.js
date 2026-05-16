import { Card, CardContent } from '@/components/ui/card'
import AgendarConsultaButton from '@/components/AgendarConsultaButton'

export const metadata = {
  title: 'Equipo Clínico - InstitutoDBT.cl',
  description: 'Psiquiatras, psicólogos y profesionales de salud dedicados a terapias basadas en evidencia. Liderado por la única Ph.D.(c) con afiliación WDBTA activa en Chile.',
  alternates: {
    canonical: 'https://institutodbtchile.cl/equipo',
  },
  openGraph: {
    title: 'Equipo Clínico | InstitutoDBT.cl',
    description: 'Equipo de especialistas en DBT con certificación WDBTA e ISST.',
    url: 'https://institutodbtchile.cl/equipo',
    images: [{
      url: 'https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/aecd20208fec4060be44c1b61f5f61a0_1697991434321.jpeg',
      width: 1200,
      height: 630,
    }],
  },
}

const direccion = [
  {
    initials: 'JCC',
    name: 'Josefina Cáceres Cortés, Ph.D.(c)',
    role: 'Directora Científica & Fundadora',
    description: 'Psicóloga clínica y directora de InstitutoDBT.cl. Única representante en Chile dentro del capítulo de investigación de la WDBTA. Formada y afiliada en terapia de esquemas, ISST. Su enfoque integra los aportes de Linehan, Bohus, Damasio, Porges, Siegel y Yi-Yuan Tang.',
    credentials: [
      'Ph.D.(c) — Formación doctoral en curso',
      'WDBTA Research Member — única en Chile',
      'Miembro Sociedad Española de Estudios de los Trastornos Límite de la Personalidad',
      'Certificación ISST — Schema Therapy',
      'Fundadora NexariaLabs · LaKaira AI'
    ],
    tags: ['WDBTA', 'ISST', 'APA', 'SEETLP', 'Ph.D.(c)'],
  },
  {
    initials: 'TV',
    name: 'Trahice Véliz Pérez',
    role: 'Subdirectora Clínica · Psicóloga',
    description: 'Especialista en DBT, Género, Psicología Criminal y Forense. Cofundadora Unidad Transitando del Instituto Psiquiátrico Dr. José Horwitz Barak.',
    credentials: [
      'Formación en Terapia de Esquemas Grupales — IMTE, México',
      'Formación completa DBT individual, grupal y familiar',
      'Formación DBT-SUD — trastornos uso de sustancias',
      'Socia activa Sociedad Española de DBT'
    ],
    tags: ['DBT', 'Schema Therapy', 'DBT-SUD', 'SEETP', 'MBCT'],
  }
]

const teamMembers = [
  {
    initials: 'LA',
    name: 'Dr. Luis Acuña San Martín',
    role: 'Médico Psiquiatra · Adicciones, Personalidad & Psicosis',
    description: 'Titulado en la Pontificia Universidad Católica de Chile (1992) y formado en el Instituto Psiquiátrico Dr. Horwitz Barak. Certificación CONACEM. Médico psiquiatra tratante en la Unidad de Corta Estadía Hospitalaria del Instituto Psiquiátrico. Autor y coautor de múltiples investigaciones; coeditor de la revista Psiquiatría y Salud Mental, de la Sociedad Chilena de Salud Mental.',
    tags: ['Psiquiatría', 'CONACEM', 'Adicciones']
  },
  {
    initials: 'FB',
    name: 'Fernanda Bizama Bustos',
    role: 'Psicóloga Clínica',
    description: 'Diplomado Clínico Adulto. Experiencia en adolescentes y adultos de alta complejidad. Atención en Hospital Militar de Santiago. Formación DBT-SUD para trastorno uso de sustancias.',
    tags: ['DBT', 'DBT-SUD']
  },
  {
    initials: 'FA',
    name: 'Francisca Alliende Kupfer',
    role: 'Psicóloga Infantojuvenil · Adultos',
    description: 'U. de los Andes, distinción. Máster Neurorehabilitación (ISEP, España). Certificación DBT — Asoc. Española. Especialista en desregulación emocional y autolesiones en población infantojuvenil.',
    tags: ['DBT', 'Infanto']
  },
  {
    initials: 'CJ',
    name: 'Catalina Jara Albetman',
    role: 'Psicóloga Clínica',
    description: 'U. del Desarrollo. Formación en psicología clínica y psico-jurídica. Diplomado en Psicología Jurídica, PUC. Curso RO DBT nivel 1. Experiencia en contextos penitenciarios y psiquiátricos.',
    tags: ['DBT', 'RO-DBT']
  },
  {
    initials: 'CS',
    name: 'Carolina Sánchez Ramírez',
    role: 'Trabajadora Social',
    description: 'Apoyo social y acompañamiento psicosocial a pacientes y familias. Coordinación de recursos comunitarios y trabajo interdisciplinario.',
    tags: ['Social']
  },
  {
    initials: 'OC',
    name: 'Olga Castillo Álvarez',
    role: 'Enfermera · Socióloga',
    description: 'Enfermera Universitaria y Socióloga. Actualmente en DBT Adicciones en Zentralinstitut für Seelische Gesundheit, Alemania. Dominio de alemán.',
    tags: ['Enfermería', 'DBT']
  },
  {
    initials: 'JL',
    name: 'Jorge Loyola Rodó',
    role: 'Analista de Sistemas',
    description: 'Soporte tecnológico e infraestructura digital del Instituto. Coordinación de plataformas clínicas y sistemas de gestión.',
    tags: ['TI']
  }
]

export default function EquipoPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 text-sm font-semibold text-emerald-700 uppercase tracking-wider">Quiénes somos</div>
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
              Las personas que te <em className="font-serif italic text-emerald-700">acompañan</em>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Psiquiatras, psicólogos y profesionales de salud dedicados a terapias basadas en evidencia. Liderado por la única Ph.D.(c) con afiliación WDBTA activa en Chile.
            </p>
          </div>
        </div>
      </section>

      {/* Dirección - Featured Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-serif font-light text-emerald-700">01</span>
                <div>
                  <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Dirección</div>
                  <div className="text-sm text-gray-600">Liderazgo científico y clínico del Instituto</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {direccion.map((member, index) => (
                <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-shadow bg-white">
                  <CardContent className="p-8">
                    <div className="mb-6 relative w-32 h-32 mx-auto rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center border-2 border-emerald-300">
                      <span className="text-4xl font-serif font-light text-emerald-700">{member.initials}</span>
                    </div>
                    
                    <div className="text-center mb-4">
                      <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-2">{member.role}</div>
                      <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">
                        {member.name}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {member.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      {member.credentials.map((cred, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-emerald-600 mt-1">•</span>
                          <span>{cred}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Clinical Team */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-serif font-light text-emerald-700">02</span>
                <div>
                  <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Equipo clínico</div>
                  <div className="text-sm text-gray-600">Psicólogos, médicos y profesionales de salud</div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                  <CardContent className="p-6">
                    <div className="mb-4 relative w-20 h-20 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center border border-emerald-200">
                      <span className="text-2xl font-serif font-light text-emerald-700">{member.initials}</span>
                    </div>
                    
                    <h4 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h4>
                    <p className="text-sm text-emerald-600 font-medium mb-4">{member.role}</p>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {member.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {member.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-20">
              <div className="mb-8 text-center">
                <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Certificaciones & afiliaciones internacionales</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  { acronym: 'WDBTA', name: 'World DBT Association' },
                  { acronym: 'ISST', name: 'International Society of Schema Therapy' },
                  { acronym: 'APA', name: 'American Psychological Association' },
                  { acronym: 'SEETP', name: 'Soc. Española Estudios Trastorno Personalidad' },
                  { acronym: 'Zepp', name: 'Zepp Foundation' }
                ].map((cert, idx) => (
                  <div key={idx} className="text-center p-4 bg-gradient-to-br from-emerald-50 to-white rounded-lg border border-emerald-100">
                    <div className="text-2xl font-serif font-semibold text-emerald-700 mb-2">{cert.acronym}</div>
                    <div className="text-xs text-gray-600 leading-tight">{cert.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-6">
              ¿Listo para <span className="font-semibold">Comenzar</span>?
            </h2>
            <p className="text-xl mb-8 text-emerald-50">
              Agenda tu primera sesión con nuestro equipo especializado
            </p>
            <AgendarConsultaButton
              source="cta-equipo"
              label="Agendar consulta · WhatsApp"
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50 px-12 py-6 text-lg font-semibold rounded-lg shadow-lg"
            />
            <p className="text-sm text-emerald-100 mt-4">
              Lun–Jue · 10:00–19:00 · Vie · 10:00–16:00 (Santiago)
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
