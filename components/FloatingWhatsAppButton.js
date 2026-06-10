'use client'

import { useEffect, useState } from 'react'
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/whatsapp'

/**
 * Floating WhatsApp CTA — bottom-right corner, site-wide (hidden on /admin).
 *
 * Strip-down mode (June 2026): pure <a href="https://wa.me/..."> link with
 * a pre-filled message. No modal, no API tracking, no business-hours logic.
 */
export default function FloatingWhatsAppButton() {
  const [pathHidden, setPathHidden] = useState(false)

  useEffect(() => {
    const checkPath = () => {
      if (typeof window === 'undefined') return
      const p = window.location.pathname || ''
      setPathHidden(p.startsWith('/admin'))
    }
    checkPath()
    window.addEventListener('popstate', checkPath)
    const interval = setInterval(checkPath, 1500)
    return () => {
      window.removeEventListener('popstate', checkPath)
      clearInterval(interval)
    }
  }, [])

  if (pathHidden) return null

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`

  // Defensive analytics ping — fires immediately on tap, regardless of
  // whether the global FastCaptureModal interceptor catches the click.
  // The modal will *also* fire its own conversion event after lead capture;
  // duplicate `whatsapp_click` events are harmless and de-duplicated by GA4.
  const handleClick = async () => {
    try {
      const { trackWhatsAppClick } = await import('@/lib/googleAdsTracking')
      trackWhatsAppClick('floating_button')
    } catch (_) { /* never block the WA link */ }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar por WhatsApp con el equipo clínico del Instituto DBT Chile"
      data-source="floating_button"
      onClick={handleClick}
      className="fixed z-40 bottom-6 right-6 group"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* Desktop: pill with label · Mobile: circle only */}
      <span className="relative flex items-center gap-2 md:gap-2.5 px-3.5 md:px-5 py-3 md:py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5a] text-white shadow-lg hover:shadow-xl transition-all">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 md:w-5 md:h-5 shrink-0"
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.823 11.823 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.687-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.518 5.273l-.999 3.648 3.97-.62zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01a1.093 1.093 0 0 0-.793.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
        </svg>
        {/* Label visible from md+ */}
        <span className="hidden md:inline text-sm font-medium tracking-wide whitespace-nowrap">
          Habla con nuestro equipo clínico
        </span>
        {/* Pulse ring for attention */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" style={{ animationDuration: '2.5s' }} />
      </span>
    </a>
  )
}
