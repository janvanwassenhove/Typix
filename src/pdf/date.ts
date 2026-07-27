/**
 * The cover carries the date the report was produced. It is formatted in the
 * language the report is written in, falling back to ISO if the runtime does
 * not know the locale.
 */
export function reportDate(language: string, date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat(language, { dateStyle: 'long' }).format(date)
  } catch {
    return date.toISOString().slice(0, 10)
  }
}
