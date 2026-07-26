/**
 * Email sending helper for Instituto DBT Chile.
 *
 * STRATEGY:
 *  - If RESEND_API_KEY env var is set → send via Resend REST API (recommended)
 *  - Else if SMTP_* env vars are set → (TODO: nodemailer; queued for now)
 *  - Else → returns { sent:false, queued:true } so the lead is still saved
 *           and the message is preserved in MongoDB for manual follow-up.
 *
 * This means the UX is NEVER broken — the consultante always sees a
 * success state, and Cáceres Cortés can activate real email by just adding the
 * RESEND_API_KEY to .env (zero code changes).
 */

const FROM_DEFAULT = 'Instituto DBT Chile <serena@institutodbtchile.cl>'
const TO_DEFAULT = 'contacto@dbtchile.cl'

export async function sendSerenaEmail({ name, phone, message, sourceContext, mode }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const FROM = process.env.SERENA_EMAIL_FROM || FROM_DEFAULT
  const TO = process.env.SERENA_EMAIL_TO || TO_DEFAULT

  const safe = (v) => (v == null ? '' : String(v))
  const subject = `🟢 Nuevo Lead Serena · ${safe(name)}`
  const text = [
    'Nuevo lead capturado desde Serena (Modal Dual):',
    '',
    `Nombre: ${safe(name)}`,
    `WhatsApp: +${safe(phone)}`,
    `Origen: ${safe(sourceContext) || 'general'}`,
    `Modo: ${safe(mode) || 'business-hours'}`,
    '',
    'Mensaje del consultante:',
    safe(message) || '(sin mensaje, eligió WhatsApp)',
    '',
    '— Sistema Serena v2 · institutodbtchile.cl',
  ].join('\n')

  const html = `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f5f5f5;padding:24px;color:#111">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
    <div style="background:linear-gradient(135deg,#10b981,#059669);color:#fff;padding:20px 24px">
      <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.85">Instituto DBT Chile · Serena v2</div>
      <div style="font-size:22px;font-weight:600;margin-top:4px">🟢 Nuevo Lead Capturado</div>
    </div>
    <div style="padding:24px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#6b7280;width:120px">Nombre</td><td style="font-weight:600">${safe(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280">WhatsApp</td><td style="font-weight:600"><a href="https://wa.me/${safe(phone)}" style="color:#059669;text-decoration:none">+${safe(phone)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#6b7280">Origen</td><td>${safe(sourceContext) || 'general'}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280">Modo</td><td>${safe(mode) || 'business-hours'}</td></tr>
      </table>
      ${message ? `<div style="margin-top:16px;padding:14px;background:#f9fafb;border-left:3px solid #10b981;border-radius:6px"><div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#6b7280;margin-bottom:6px">Mensaje del consultante</div><div style="white-space:pre-wrap;color:#111">${safe(message).replace(/</g, '&lt;')}</div></div>` : ''}
      <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;text-align:center">Sistema Serena v2 · ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}</div>
    </div>
  </div>
</body></html>`

  // ── Resend path ─────────────────────────────────────────────────────
  if (RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM,
          to: [TO],
          subject,
          text,
          html,
          reply_to: process.env.SERENA_EMAIL_REPLYTO || undefined,
        }),
      })
      if (res.ok) {
        const data = await res.json().catch(() => ({}))
        return { sent: true, queued: false, provider: 'resend', id: data.id || null }
      }
      const err = await res.text().catch(() => '')
      console.error('[Serena Email] Resend error:', res.status, err)
      return { sent: false, queued: true, provider: 'resend', error: `Resend ${res.status}: ${err.slice(0, 200)}` }
    } catch (e) {
      console.error('[Serena Email] Resend exception:', e?.message)
      return { sent: false, queued: true, provider: 'resend', error: e?.message || 'unknown' }
    }
  }

  // ── No provider configured → queue only ─────────────────────────────
  return { sent: false, queued: true, provider: 'none', error: 'No email provider configured. Add RESEND_API_KEY to .env to activate.' }
}
