'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/whatsapp'

/**
 * Agendar Consulta CTA — strip-down mode (June 2026).
 *
 * Direct <a> link to wa.me styled as a shadcn <Button>. No modal, no API
 * tracking. The `source` and unused props are kept for backwards-compat with
 * call sites that still pass them.
 */
export default function AgendarConsultaButton({
  // eslint-disable-next-line no-unused-vars
  source = 'cta-equipo',
  label = 'Agendar consulta',
  message = WHATSAPP_DEFAULT_MESSAGE,
  className = '',
  size = 'lg',
  variant = 'default',
}) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="w-5 h-5 mr-2" />
        {label}
      </a>
    </Button>
  )
}
