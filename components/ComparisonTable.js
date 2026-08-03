/**
 * ComparisonTable — Semantic HTML table optimized for GEO
 * ─────────────────────────────────────────────────────────────────────────
 * Purpose:
 *   Render machine-readable comparison tables using native semantic HTML
 *   (<table>, <thead>, <tbody>, <th>, <td>, <caption>). Optimized for
 *   extraction by generative AI crawlers (GPTBot, PerplexityBot,
 *   Google-Extended, ClaudeBot).
 *
 * Design rules:
 *   - Native HTML semantics only (no <div>-based grid emulation).
 *   - Server-rendered by default (no "use client").
 *   - Sober medical aesthetic: slate palette, subtle borders, alt rows.
 *   - Horizontal scroll on mobile via overflow-x-auto.
 *
 * Props:
 *   - caption: string  — semantic <caption> title.
 *   - headers: string[] — column headers.
 *   - rows: Array<{ criterio: string, col1: string, col2: string, col3?: string }>
 */

import React from 'react'

export default function ComparisonTable({ caption, headers = [], rows = [] }) {
  return (
    <div className="my-8 w-full overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse text-sm text-slate-700">
        <caption className="p-4 font-bold text-base text-slate-900 bg-slate-50 border-b border-slate-200 text-left">
          {caption}
        </caption>
        <thead>
          <tr className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-200">
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="p-3.5 border-r last:border-r-0 border-slate-200 align-top"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
            >
              <th
                scope="row"
                className="p-3.5 font-medium border-r border-b border-slate-200 text-slate-900 text-left align-top"
              >
                {row.criterio}
              </th>
              <td className="p-3.5 border-r border-b border-slate-200 align-top">
                {row.col1}
              </td>
              <td className="p-3.5 border-r border-b border-slate-200 align-top last:border-r-0">
                {row.col2}
              </td>
              {row.col3 && (
                <td className="p-3.5 border-b border-slate-200 align-top">
                  {row.col3}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
