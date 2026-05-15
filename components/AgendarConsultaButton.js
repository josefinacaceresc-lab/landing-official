'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { openFastCapture } from '@/components/FastCaptureModal'

/**
 * CTA button that triggers the FastCaptureModal with business-hours awareness.
 * - Inside business hours: opens WhatsApp directly with pre-written message
 * - Outside business hours: shows the after-hours form to capture name+phone+email
 *
 * Use this button anywhere we want a "Schedule consultation" CTA — never link
 * directly to wa.me, because that bypasses the after-hours capture flow.
 */
export default function AgendarConsultaButton({
  source = 'cta-equipo',
  label = 'Agendar consulta',
  className = '',
  size = 'lg',
  variant = 'default',
}) {
  return (
    <Button
      type="button"
      onClick={() => openFastCapture(source)}
      size={size}
      variant={variant}
      className={className}
    >
      <MessageCircle className="w-5 h-5 mr-2" />
      {label}
    </Button>
  )
}
