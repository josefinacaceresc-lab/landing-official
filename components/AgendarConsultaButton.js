'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/whatsapp'

/**
 * Zero-friction CTA button — opens WhatsApp directly in a new tab
 * with the pre-filled message. No modal, no name capture.
 *
 * EMERGENCY FLOW (May 2026): one click = one WhatsApp message.
 */
export default function AgendarConsultaButton({
  source = 'cta-equipo',
  label = 'Agendar consulta',
  message,
  className = '',
  size = 'lg',
  variant = 'default',
}) {
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a
        href={getWhatsAppUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        data-cta-source={source}
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        {label}
      </a>
    </Button>
  )
}
