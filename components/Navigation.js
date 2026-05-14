'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [researchOpen, setResearchOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Official Vertical DBT Chile */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="https://customer-assets.emergentagent.com/wingman/b9932b1d-f12b-47b0-abb0-8ea617673486/attachments/6cd050e7093b4cce801d2e4ad64e6605_logodbt_vertical%2050-50.jpg" 
              alt="Instituto DBT Chile"
              className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
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
            
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-white">
              <Link href="/autoevaluacion">
                Test Gratuito
              </Link>
            </Button>
            <Button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-fast-capture', { detail: { source: 'nav-desktop' } }))}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Agendar Consulta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  window.dispatchEvent(new CustomEvent('open-fast-capture', { detail: { source: 'nav-mobile' } }))
                }}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Agendar Consulta
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}