import Link from 'next/link'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

// Single source of truth — physical address & directions
const ADDRESS_LINE_1 = 'El Coihue 3776'
const ADDRESS_LINE_2 = 'Vitacura, Santiago'
const ADDRESS_FULL = 'El Coihue 3776, Vitacura, Santiago'
const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS_FULL)}&output=embed`
const MAPS_LINK = `https://maps.google.com/?q=${encodeURIComponent(ADDRESS_FULL)}`

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          {/* Brand + Address + Map — wider left column */}
          <div className="md:col-span-5">
            {/* Logo on a white patch so mix-blend-multiply neutralises the JPG bg */}
            <div className="inline-block bg-white rounded-lg p-3 shadow-md mb-4">
              <img
                src="https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/508ec6e06fbe47fd935a5e124ba0eae3_logodbt_vertical%2050-50.jpg"
                alt="Instituto DBT Chile"
                width="160"
                height="80"
                draggable="false"
                className="h-16 w-auto object-contain select-none"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>

            {/* NexariaLabs sub-brand link */}
            <div className="mb-5">
              <a
                href="https://www.nexaryalabs.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                NexariaLabs <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-xs text-gray-500 mt-0.5">Laboratorio de inteligencia clínica</p>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Terapia Dialéctico Conductual de excelencia internacional. Único representante WDBTA en Chile.
            </p>

            {/* Address block + Google Maps */}
            <div className="mb-3">
              <div className="flex items-start gap-2 mb-3">
                <MapPin className="w-4 h-4 mt-1 text-emerald-400 flex-shrink-0" />
                <div className="text-sm">
                  <div className="text-white font-semibold">{ADDRESS_LINE_1}</div>
                  <div className="text-gray-400">{ADDRESS_LINE_2}</div>
                </div>
              </div>

              {/* Compact map embed */}
              <div className="rounded-lg overflow-hidden border border-gray-700 shadow-md">
                <iframe
                  src={MAPS_EMBED_URL}
                  width="100%"
                  height="180"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Instituto DBT Chile — El Coihue 3776, Vitacura"
                  className="block grayscale-[0.2] contrast-[0.95]"
                  style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg)' }}
                />
              </div>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Ver en Google Maps <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/tratamiento" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Tratamiento
                </Link>
              </li>
              <li>
                <Link href="/esquema" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Esquema
                </Link>
              </li>
              <li>
                <Link href="/foro" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Foro
                </Link>
              </li>
              <li>
                <Link href="/equipo" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Equipo
                </Link>
              </li>
            </ul>
          </div>

          {/* Investigación */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Investigación</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/investigacion" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Hub de Investigación
                </Link>
              </li>
              <li>
                <Link href="/investigacion/la-mente-algoritmica" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  La Mente Algorítmica
                </Link>
              </li>
              <li>
                <Link href="/investigacion/wdbta" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  WDBTA Chile
                </Link>
              </li>
              <li>
                <Link href="/evaluacion-idp4" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Evaluación IDP-4
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 mt-1 text-emerald-400 flex-shrink-0" />
                <a href="mailto:contacto@dbtchile.cl" className="hover:text-emerald-400 transition-colors break-all">
                  contacto@dbtchile.cl
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 mt-1 text-emerald-400 flex-shrink-0" />
                <a
                  href="https://wa.me/56930550750"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  +56 9 3055 0750
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <span className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Lun–Vie · 10:00–19:00 hrs</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Instituto DBT Chile. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="/privacidad" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
