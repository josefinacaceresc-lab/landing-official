/**
 * AcademicAuthor — Bloque reutilizable de autoría académica.
 * ─────────────────────────────────────────────────────────────────────────
 * Renderiza el bloque canónico:
 *   Josefina Cáceres Cortés, Ph.D.(c)
 *   Instituto DBT Chile · NEXARYALABS
 *   ORCID: 0009-0001-9148-4244
 *   DOI: 10.xxxx/xxxxxxxx  (solo si se pasa como prop)
 *
 * Consume datos desde /lib/authors.js — nunca hardcodear valores aquí.
 *
 * Props:
 *   - author: objeto de autor (default: josefinaCaceres).
 *   - showAffiliation: bool (default true).
 *   - showOrcid: bool (default true).
 *   - doi: string opcional (solo si el artículo tiene DOI confirmado).
 *   - compact: bool para densidad reducida.
 *   - variant: 'default' | 'card' | 'inline'.
 */

import React from 'react'
import { josefinaCaceres } from '@/lib/authors'

export default function AcademicAuthor({
  author = josefinaCaceres,
  showAffiliation = true,
  showOrcid = true,
  doi = null,
  compact = false,
  variant = 'default',
  className = '',
}) {
  const isCard = variant === 'card'
  const isInline = variant === 'inline'

  const containerClass = isCard
    ? `academic-author rounded-xl border border-slate-200 bg-slate-50/60 p-5 md:p-6 ${className}`
    : isInline
      ? `academic-author inline-flex flex-col ${className}`
      : `academic-author ${compact ? 'text-sm' : ''} ${className}`

  return (
    <div className={containerClass} itemScope itemType="https://schema.org/Person">
      <p className={compact ? 'text-sm text-slate-900 font-semibold' : 'text-base md:text-lg text-slate-900 font-semibold'}>
        <span itemProp="name">{author.name}</span>
        {author.honorificSuffix && (
          <span itemProp="honorificSuffix">, {author.honorificSuffix}</span>
        )}
      </p>

      {showAffiliation && (
        <p className={`${compact ? 'text-xs' : 'text-sm'} text-slate-600 mt-0.5`}>
          <span itemProp="affiliation">{author.affiliationShort}</span>
        </p>
      )}

      {showOrcid && (
        <p className={`${compact ? 'text-xs' : 'text-sm'} mt-1`}>
          <a
            href={author.orcidUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver ORCID de ${author.name}`}
            className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 border-b border-emerald-300/70 hover:border-emerald-600 pb-0.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1 rounded-sm"
          >
            <span aria-hidden="true" className="inline-block w-3.5 h-3.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center leading-none" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>iD</span>
            <span itemProp="identifier" itemScope itemType="https://schema.org/PropertyValue">
              <meta itemProp="propertyID" content="ORCID" />
              <span>ORCID: </span>
              <span itemProp="value">{author.orcid}</span>
              <meta itemProp="url" content={author.orcidUrl} />
            </span>
          </a>
        </p>
      )}

      {doi && (
        <p className={`${compact ? 'text-xs' : 'text-sm'} mt-1`}>
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar DOI del artículo: ${doi}`}
            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 border-b border-slate-300 hover:border-slate-600 pb-0.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-1 rounded-sm"
          >
            <span>DOI: {doi}</span>
          </a>
        </p>
      )}
    </div>
  )
}
