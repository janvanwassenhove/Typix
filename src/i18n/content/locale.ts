/**
 * Report body copy — the profile descriptions, traits, tips and so on — lives
 * beside the UI strings rather than inside the report components, so a report
 * can be read end to end in any supported language.
 */
export const LANGUAGES = ['en', 'nl', 'fr', 'de', 'es'] as const

export type Lang = typeof LANGUAGES[number]

export type Localized<T> = Record<Lang, T>

export function isLang(value: string): value is Lang {
  return (LANGUAGES as readonly string[]).includes(value)
}

/**
 * Fill `{name}` placeholders in a content string. The UI strings get this from
 * `t()`; content sentences that carry a value need the same treatment.
 */
export function interpolate(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (out, [name, value]) => out.split(`{${name}}`).join(String(value)),
    template
  )
}

/** Falls back to English for any language the content has not been written in. */
export function pickLocale<T>(content: Localized<T>, lang: string): T {
  return isLang(lang) ? content[lang] : content.en
}
