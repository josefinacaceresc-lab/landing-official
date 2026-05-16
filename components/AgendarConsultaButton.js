'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { openWhatsAppOrCapture } from '@/lib/whatsapp'

/**
 * Hybrid CTA — opens WhatsApp directly during business hours,
 * shows the Serena off-hours intake modal outside business hours.
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
    <Button
      type="button"
      onClick={() => openWhatsAppOrCapture(source, message)}
      size={size}
      variant={variant}
      className={className}
    >
      <MessageCircle className="w-5 h-5 mr-2" />
      {label}
    </Button>
  )
}
