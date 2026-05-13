/**
 * Time-zone aware availability helpers for Karina (admission coordinator).
 * All checks are performed in Chile (America/Santiago) regardless of the
 * user's device timezone.
 *
 * Schedule:
 *   • Mon–Fri 10:00–18:59 CL  → "open"
 *   • Mon–Fri 19:00–09:59 CL  → "after-hours"
 *   • Sat & Sun (full day)    → "weekend"
 */

const TZ = "America/Santiago";

export const KARINA_OPEN_HOUR = 10;
export const KARINA_CLOSE_HOUR = 19;

const WEEKDAY_TO_NUM = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/** Returns { hour: 0-23, dayOfWeek: 0-6 (0=Sun) } in Chile time. */
export function getChileNow(now = new Date()) {
  try {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      hour: "2-digit",
      hour12: false,
      weekday: "short",
    });
    const parts = fmt.formatToParts(now);
    const hourStr = parts.find((p) => p.type === "hour")?.value;
    const wkStr = parts.find((p) => p.type === "weekday")?.value;
    const hour = Number.isFinite(parseInt(hourStr, 10))
      ? parseInt(hourStr, 10) % 24
      : now.getHours();
    const dayOfWeek = WEEKDAY_TO_NUM[wkStr] ?? now.getDay();
    return { hour, dayOfWeek };
  } catch {
    return { hour: now.getHours(), dayOfWeek: now.getDay() };
  }
}

/**
 * Returns one of: "open" | "after-hours" | "weekend"
 */
export function getKarinaStatus(now = new Date()) {
  const { hour, dayOfWeek } = getChileNow(now);
  if (dayOfWeek === 0 || dayOfWeek === 6) return "weekend";
  if (hour >= KARINA_OPEN_HOUR && hour < KARINA_CLOSE_HOUR) return "open";
  return "after-hours";
}

/** Convenience boolean (kept for callers that just need online/offline). */
export function isKarinaOnline(now = new Date()) {
  return getKarinaStatus(now) === "open";
}
