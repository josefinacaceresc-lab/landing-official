import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full border-3 border-emerald-400 flex items-center justify-center bg-white/10">
                <div className="w-8 h-8 rounded-full border-3 border-amber-400" />
              </div>
              <div>
                <div className="text-lg font-light">
                  Instituto <span className="font-semibold text-emerald-400">DBT</span>
                </div>
                <div className="text-xs text-gray-400">Chile</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Terapia Dialéctico Conductual de excelencia internacional. Único representante WDBTA en Chile.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Navegación</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/investigacion" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Investigación
                </Link>
              </li>
              <li>
                <Link href="/equipo" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Equipo
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Investigación */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Investigación</h3>
            <ul className="space-y-2">
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
                <a href="https://dbt-wdbta.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  World DBT Training Alliance
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-1 text-emerald-400 flex-shrink-0" />
                <span>Chile</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 mt-1 text-emerald-400 flex-shrink-0" />
                <a href="mailto:contacto@dbtchile.cl" className="hover:text-emerald-400 transition-colors">
                  contacto@dbtchile.cl
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 mt-1 text-emerald-400 flex-shrink-0" />
                <span>Lun-Vie 9:00-18:00 hrs</span>
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