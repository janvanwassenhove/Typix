import { describe, expect, it } from 'vitest'
import { translations } from '../translations'
import { LANGUAGES, interpolate, pickLocale, type Localized } from '../content/locale'
import { discContent } from '../content/disc'
import { enneagramContent } from '../content/enneagram'
import { insightsContent } from '../content/insights'
import { profileContent } from '../content/profile'
import { DISC_STYLES } from '../../scoring/disc'
import { ENNEAGRAM_TYPES } from '../../scoring/enneagram'
import { COLOR_KEYS } from '../../scoring/insights'

/**
 * Walk an object and collect a path for every string leaf, so two locales can
 * be compared structurally rather than field by field.
 */
function stringPaths(value: unknown, prefix = ''): string[] {
  if (typeof value === 'string') return [prefix]
  if (Array.isArray(value)) return value.flatMap((item, i) => stringPaths(item, `${prefix}[${i}]`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => stringPaths(child, prefix ? `${prefix}.${key}` : key))
  }
  return []
}

function expectSameShapeAcrossLanguages<T>(name: string, content: Localized<T>) {
  const reference = stringPaths(content.en).sort()
  expect(reference.length, `${name} has no content`).toBeGreaterThan(0)

  for (const lang of LANGUAGES) {
    const paths = stringPaths(content[lang]).sort()
    expect(paths, `${name}/${lang}`).toEqual(reference)
    for (const path of paths) {
      const text = path
        .split(/[.[\]]/)
        .filter(Boolean)
        .reduce<any>((node, key) => node[key], content[lang])
      expect(String(text).trim().length, `${name}/${lang}/${path} is empty`).toBeGreaterThan(0)
    }
  }
}

describe('UI strings', () => {
  it('defines the same keys in every language', () => {
    const reference = Object.keys(translations.en).sort()
    for (const lang of LANGUAGES) {
      expect(Object.keys(translations[lang]).sort(), lang).toEqual(reference)
    }
  })

  it('has no empty translations', () => {
    for (const lang of LANGUAGES) {
      for (const [key, value] of Object.entries(translations[lang])) {
        expect(value.trim().length, `${lang}/${key}`).toBeGreaterThan(0)
      }
    }
  })

  it('keeps placeholders consistent across languages', () => {
    const placeholders = (text: string) => (text.match(/\{\w+\}/g) || []).sort()
    for (const [key, english] of Object.entries(translations.en)) {
      for (const lang of LANGUAGES) {
        const translated = translations[lang][key as keyof typeof translations.en]
        expect(placeholders(translated), `${lang}/${key}`).toEqual(placeholders(english))
      }
    }
  })
})

describe('report content', () => {
  it('covers every DISC style and all twelve combinations, in every language', () => {
    for (const lang of LANGUAGES) {
      const content = discContent[lang]
      expect(Object.keys(content.styles).sort(), lang).toEqual([...DISC_STYLES].sort())
      expect(Object.keys(content.combinations).length, lang).toBe(12)
      for (const primary of DISC_STYLES) {
        for (const secondary of DISC_STYLES) {
          if (primary === secondary) continue
          const key = `${primary}/${secondary}` as keyof typeof content.combinations
          expect(content.combinations[key], `${lang} ${key}`).toBeTruthy()
        }
      }
    }
    expectSameShapeAcrossLanguages('disc', discContent)
  })

  it('covers all nine Enneagram types in every language', () => {
    for (const lang of LANGUAGES) {
      for (const type of ENNEAGRAM_TYPES) {
        expect(enneagramContent[lang][type], `${lang} type ${type}`).toBeTruthy()
      }
    }
    expectSameShapeAcrossLanguages('enneagram', enneagramContent)
  })

  it('covers all four colour energies and twelve positions in every language', () => {
    for (const lang of LANGUAGES) {
      const content = insightsContent[lang]
      expect(Object.keys(content.colors).sort(), lang).toEqual([...COLOR_KEYS].sort())
      for (const primary of COLOR_KEYS) {
        for (const secondary of COLOR_KEYS) {
          if (primary === secondary) continue
          expect(content.positions[`${primary}-${secondary}`], `${lang} ${primary}-${secondary}`).toBeTruthy()
        }
      }
    }
    expectSameShapeAcrossLanguages('insights', insightsContent)
  })

  it('covers every profile band and centre in every language', () => {
    for (const lang of LANGUAGES) {
      const content = profileContent[lang]
      expect(Object.keys(content.shape).sort(), lang).toEqual(['balanced', 'focused', 'moderate'])
      expect(Object.keys(content.separation).sort(), lang).toEqual(['close', 'distinct', 'tied'])
      expect(Object.keys(content.centres).sort(), lang).toEqual(['gut', 'head', 'heart'])
    }
    expectSameShapeAcrossLanguages('profile', profileContent)
  })

  it('keeps the separation placeholders in every language', () => {
    // A missing {gap} would leave the sentence claiming a lead it never states.
    for (const lang of LANGUAGES) {
      for (const [band, template] of Object.entries(profileContent[lang].separation)) {
        for (const name of ['first', 'second', 'gap']) {
          expect(template, `${lang}/${band}`).toContain(`{${name}}`)
        }
      }
    }
  })
})

describe('interpolate', () => {
  it('fills every occurrence of a placeholder', () => {
    expect(interpolate('{a} and {b}, {a} again', { a: 'x', b: 2 })).toBe('x and 2, x again')
  })

  it('leaves an unknown placeholder alone rather than blanking it', () => {
    expect(interpolate('{a} {b}', { a: 'x' })).toBe('x {b}')
  })
})

describe('pickLocale', () => {
  it('returns the requested language', () => {
    expect(pickLocale(discContent, 'nl')).toBe(discContent.nl)
  })

  it('falls back to English for an unknown language', () => {
    expect(pickLocale(discContent, 'pt')).toBe(discContent.en)
  })
})
