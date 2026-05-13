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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full border-3 border-emerald-600 flex items-center justify-center bg-white group-hover:bg-emerald-50 transition-colors">
              <div className="w-8 h-8 rounded-full border-3 border-amber-500" />
            </div>
            <div className="hidden md:block">
              <div className="text-xl font-light text-gray-900">
                Instituto <span className="font-semibold text-emerald-600">DBT</span>
              </div>
              <div className="text-xs text-gray-600">Chile</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Inicio
            </Link>
            
            {/* Research Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                Investigación
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2">
                  <Link href="/investigacion" className="block px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                    <div className="font-semibold">Hub de Investigación</div>
                    <div className="text-sm text-gray-500">Todos los proyectos</div>
                  </Link>
                  <Link href="/investigacion/la-mente-algoritmica" className="block px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                    <div className="font-semibold">La Mente Algorítmica</div>
                    <div className="text-sm text-gray-500">8 papers doctorales</div>
                  </Link>
                  <Link href="/investigacion/wdbta" className="block px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                    <div className="font-semibold">WDBTA</div>
                    <div className="text-sm text-gray-500">Certificación internacional</div>
                  </Link>
                </div>
              </div>
            </div>
            
            <Link href="/equipo" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Equipo
            </Link>
            <Link href="/tratamientos/patologia-dual" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Patología Dual
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Blog
            </Link>
            
            <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
              <Link href="/autoevaluacion">
                Test Gratuito
              </Link>
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Agendar Consulta
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-emerald-600"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              <Link href="/" className="block text-gray-700 hover:text-emerald-600 font-medium">
                Inicio
              </Link>
              
              <div>
                <button
                  onClick={() => setResearchOpen(!researchOpen)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-emerald-600 font-medium"
                >
                  Investigación
                  <ChevronDown className={`w-4 h-4 transition-transform ${researchOpen ? 'rotate-180' : ''}`} />
                </button>
                {researchOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link href="/investigacion" className="block text-gray-600 hover:text-emerald-600">
                      Hub de Investigación
                    </Link>
                    <Link href="/investigacion/la-mente-algoritmica" className="block text-gray-600 hover:text-emerald-600">
                      La Mente Algorítmica
                    </Link>
                    <Link href="/investigacion/wdbta" className="block text-gray-600 hover:text-emerald-600">
                      WDBTA
                    </Link>
                  </div>
                )}
              </div>
              
              <Link href="/equipo" className="block text-gray-700 hover:text-emerald-600 font-medium">
                Equipo
              </Link>
              <Link href="/blog" className="block text-gray-700 hover:text-emerald-600 font-medium">
                Blog
              </Link>
              
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Agendar Consulta
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}