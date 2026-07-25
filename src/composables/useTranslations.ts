import { computed, inject, type ComputedRef, type Ref } from 'vue'
import { translations } from '../i18n/translations'

export type TranslateVars = Record<string, string | number>

export interface UseTranslations {
  /**
   * Look up a UI string. `{name}` placeholders in the string are replaced from
   * `vars`, so a sentence can be translated as one unit instead of being
   * stitched together from fragments in the template.
   */
  t: (key: string, vars?: TranslateVars) => string
  /**
   * Reactive: reading `.value` inside a template or computed re-runs it when
   * the user switches language. The previous version returned a plain string
   * snapshot taken at setup time, which left question text stuck in whichever
   * language was active when the component mounted.
   */
  currentLanguage: ComputedRef<string>
}

export function useTranslations(): UseTranslations {
  const injected = inject<Ref<string> | undefined>('currentLanguage', undefined)

  const currentLanguage = computed(() => injected?.value || 'en')

  const t = (key: string, vars?: TranslateVars): string => {
    const langTranslations =
      translations[currentLanguage.value as keyof typeof translations] || translations.en
    let result: string = langTranslations[key as keyof typeof langTranslations] || key

    if (vars) {
      for (const [name, value] of Object.entries(vars)) {
        result = result.split(`{${name}}`).join(String(value))
      }
    }

    return result
  }

  return { t, currentLanguage }
}
