import { computed, inject, type ComputedRef, type Ref } from 'vue'
import { translations } from '../i18n/translations'

export interface UseTranslations {
  t: (key: string) => string
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

  const t = (key: string): string => {
    const langTranslations =
      translations[currentLanguage.value as keyof typeof translations] || translations.en
    return langTranslations[key as keyof typeof langTranslations] || key
  }

  return { t, currentLanguage }
}
