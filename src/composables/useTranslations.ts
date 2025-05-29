import { computed, inject } from 'vue'
import { translations } from '../i18n/translations'

export function useTranslations() {
  const currentLanguage = inject<{ value: string }>('currentLanguage')
  
  const t = computed(() => {
    return (key: string): string => {
      const lang = currentLanguage?.value || 'en'
      const langTranslations = translations[lang as keyof typeof translations] || translations.en
      return langTranslations[key as keyof typeof langTranslations] || key
    }
  })

  return {
    t: t.value,
    currentLanguage: currentLanguage?.value || 'en'
  }
}
