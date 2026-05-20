'use client'

/**
 * FastCaptureModal — RETIRED (June 2026 strip-down).
 *
 * The Serena dual/single modal was removed per Dra. Cáceres' final order:
 * every WhatsApp CTA is now a direct <a> link to wa.me/56930550750.
 *
 * This file is kept as a no-op shim ONLY to avoid breaking any stale import
 * (`import FastCaptureModal from '@/components/FastCaptureModal'`) that may
 * exist in older builds. The component renders nothing.
 *
 * `openFastCapture()` is also kept as a defensive no-op so any leftover
 * caller doesn't throw.
 */
export default function FastCaptureModal() {
  return null
}

export function openFastCapture() {
  // intentionally empty — see file header
}
