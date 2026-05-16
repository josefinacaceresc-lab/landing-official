'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { openWhatsAppOrCapture } from '@/lib/whatsapp'

/**
 * Floating WhatsApp CTA — bottom-right corner, visible site-wide except in
 * the admin panel. Routes through openWhatsAppOrCapture so it follows the
 * SAME hybrid logic (direct WhatsApp in business hours, Serena modal off-hours).
 *
 * - Pulses softly to grab attention without being aggressive.
 * - Tooltip on hover shows quick context.
 * - Hidden during scroll-up to avoid covering content (mobile-friendly).
 */
export default function FloatingWhatsAppButton() {
  const [hidden, setHidden] = useState(false)
  const [pathHidden, setPathHidden] = useState(false)

  useEffect(() => {
    // Hide on /admin, /admin/*, and printable views
    const checkPath = () => {
      if (typeof window === 'undefined') return
      const p = window.location.pathname || ''
      setPathHidden(p.startsWith('/admin'))
    }
    checkPath()
    window.addEventListener('popstate', checkPath)
    // also re-check on Next.js client navigation
    const interval = setInterval(checkPath, 1500)
    return () => {
      window.removeEventListener('popstate', checkPath)
      clearInterval(interval)
    }
  }, [])

  if (pathHidden) return null

  const handleClick = () => {
    openWhatsAppOrCapture('floating-button')
  }

  return (
    <>
      {/* Pulse ring — subtle */}
      <button
        type="button"
        onClick={handleClick}
        aria-label="Conversar por WhatsApp con Instituto DBT Chile"
        className={`fixed z-40 bottom-5 right-5 sm:bottom-6 sm:right-6 group transition-opacity ${
          hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping" />
        <span className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#1ebe5a] text-white shadow-2xl shadow-emerald-900/30 transition-all hover:scale-105 active:scale-95">
          {/* Official-style WhatsApp icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 sm:w-8 sm:h-8"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.823 11.823 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.687-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.518 5.273l-.999 3.648 3.97-.62zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01a1.093 1.093 0 0 0-.793.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
          </svg>
        </span>
        {/* Tooltip on desktop */}
        <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-sm font-medium px-3 py-1.5 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Habla con nosotros
        </span>
      </button>
    </>
  )
}
