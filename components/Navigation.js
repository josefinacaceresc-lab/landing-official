'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE, CLINIC_PHONE_DISPLAY, CLINIC_PHONE_TEL } from '@/lib/whatsapp'
import { trackPhoneClick } from '@/lib/googleAdsTracking'

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [researchOpen, setResearchOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo - Official Vertical DBT Chile (white bg neutralized via mix-blend-multiply on pure-white nav) */}
          <Link href="/" className="flex items-center group pl-1 pr-2 py-1" aria-label="Instituto DBT Chile · Inicio">
            <img 
              src="https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/508ec6e06fbe47fd935a5e124ba0eae3_logodbt_vertical%2050-50.jpg" 
              alt="Instituto DBT Chile"
              width="160"
              height="80"
              draggable="false"
              className="h-20 w-auto object-contain select-none transition-transform duration-300 group-hover:scale-[1.03]"
              style={{ mixBlendMode: 'multiply', imageRendering: '-webkit-optimize-contrast' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#por-que" className="text-gray-700 hover:text-primary transition-colors font-medium">
              ¿Por qué?
            </Link>
            
            <Link href="/tratamiento" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Tratamiento
            </Link>
            
            <Link href="/esquema" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Esquema
            </Link>
            
            {/* Research Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors font-medium">
                Investigación
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2">
                  <Link href="/investigacion" className="block px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors">
                    <div className="font-semibold">Hub de Investigación</div>
                    <div className="text-sm text-gray-500">Todos los proyectos</div>
                  </Link>
                  <Link href="/investigacion/la-mente-algoritmica" className="block px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors">
                    <div className="font-semibold">La Mente Algorítmica</div>
                    <div className="text-sm text-gray-500">8 papers doctorales</div>
                  </Link>
                  <Link href="/investigacion/wdbta" className="block px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors">
                    <div className="font-semibold">WDBTA</div>
                    <div className="text-sm text-gray-500">Certificación internacional</div>
                  </Link>
                </div>
              </div>
            </div>
            
            <Link href="/foro" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Foro
            </Link>
            
            <Link href="/equipo" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Equipo
            </Link>
            
            <Link
              href="/evaluacion-idp4"
              className="text-sm text-gray-600 hover:text-primary transition-colors font-medium"
            >
              IDP-4
            </Link>

            {/* Phone — visible CTA in header (Desktop) */}
            <a
              href={`tel:${CLINIC_PHONE_TEL}`}
              onClick={() => trackPhoneClick('header_desktop')}
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              aria-label={`Llamar al Instituto DBT Chile ${CLINIC_PHONE_DISPLAY}`}
            >
              <Phone className="w-4 h-4" strokeWidth={1.8} />
              <span className="tracking-tight">{CLINIC_PHONE_DISPLAY}</span>
            </a>

            <Button
              asChild
              className="rounded-none px-6 bg-primary hover:bg-primary/90 text-white text-sm font-medium tracking-wide transition-colors"
            >
              <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
                Valoración inicial
              </a>
            </Button>
          </div>

          {/* Mobile right cluster: phone + menu button */}
          <div className="flex items-center gap-1 md:hidden">
            <a
              href={`tel:${CLINIC_PHONE_TEL}`}
              onClick={() => trackPhoneClick('header_mobile')}
              className="flex items-center justify-center w-10 h-10 rounded-full text-primary hover:bg-primary/10 transition-colors"
              aria-label={`Llamar al Instituto DBT Chile ${CLINIC_PHONE_DISPLAY}`}
            >
              <Phone className="w-5 h-5" strokeWidth={2} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-primary"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              <Link href="/" className="block text-gray-700 hover:text-primary font-medium">
                Inicio
              </Link>
              
              <div>
                <button
                  onClick={() => setResearchOpen(!researchOpen)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-primary font-medium"
                >
                  Investigación
                  <ChevronDown className={`w-4 h-4 transition-transform ${researchOpen ? 'rotate-180' : ''}`} />
                </button>
                {researchOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link href="/investigacion" className="block text-gray-600 hover:text-primary">
                      Hub de Investigación
                    </Link>
                    <Link href="/investigacion/la-mente-algoritmica" className="block text-gray-600 hover:text-primary">
                      La Mente Algorítmica
                    </Link>
                    <Link href="/investigacion/wdbta" className="block text-gray-600 hover:text-primary">
                      WDBTA
                    </Link>
                  </div>
                )}
              </div>
              
              <Link href="/equipo" className="block text-gray-700 hover:text-primary font-medium">
                Equipo
              </Link>
              <Link href="/blog" className="block text-gray-700 hover:text-primary font-medium">
                Blog
              </Link>
              
              <Button
                asChild
                onClick={() => setIsOpen(false)}
                className="w-full rounded-full bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20"
              >
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
                  Agendar Consulta
                </a>
              </Button>

              {/* Phone in mobile menu */}
              <a
                href={`tel:${CLINIC_PHONE_TEL}`}
                onClick={() => { trackPhoneClick('mobile_menu'); setIsOpen(false) }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-gray-300 text-gray-700 hover:border-primary hover:text-primary transition-colors font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar · {CLINIC_PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}