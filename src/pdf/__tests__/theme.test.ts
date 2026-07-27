import { describe, expect, it } from 'vitest'
import { printable, rgb } from '../theme'
import { slug } from '../../composables/usePdfExport'
import { LANGUAGES } from '../../i18n/content/locale'
import { translations } from '../../i18n/translations'
import { discContent } from '../../i18n/content/disc'
import { enneagramContent } from '../../i18n/content/enneagram'
import { insightsContent } from '../../i18n/content/insights'

/**
 * jsPDF's built-in fonts encode text as WinAnsi (cp1252). Anything outside it
 * is dropped or mangled in the exported file, so the report copy has to survive
 * `printable()` with nothing left that WinAnsi cannot represent.
 */
const WINANSI_EXTRA = '€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ'

function isEncodable(text: string): boolean {
  return [...text].every(char => {
    const code = char.codePointAt(0) as number
    if (code >= 0x20 && code <= 0x7e) return true          // ASCII
    if (code >= 0xa0 && code <= 0xff) return true          // Latin-1 supplement
    return WINANSI_EXTRA.includes(char)
  })
}

function allStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) value.forEach(item => allStrings(item, out))
  else if (value && typeof value === 'object') Object.values(value).forEach(item => allStrings(item, out))
  return out
}

describe('printable', () => {
  it('replaces typographic punctuation the built-in fonts cannot encode', () => {
    expect(printable('other people’s pace')).toBe("other people's pace")
    expect(printable('“quoted”')).toBe('"quoted"')
    expect(printable('a — b')).toBe('a - b')
    expect(printable('wait…')).toBe('wait...')
  })

  it('leaves accented Latin characters alone', () => {
    expect(printable('Ennéagramme Größe Día')).toBe('Ennéagramme Größe Día')
  })
})

describe('report copy is exportable to PDF', () => {
  const sources: Array<[string, unknown]> = [
    ['ui', translations],
    ['disc', discContent],
    ['enneagram', enneagramContent],
    ['insights', insightsContent]
  ]

  it('survives the WinAnsi encoding used by the exported document', () => {
    for (const [name, source] of sources) {
      for (const text of allStrings(source)) {
        const encoded = printable(text)
        expect(isEncodable(encoded), `${name}: ${JSON.stringify(text)} -> ${JSON.stringify(encoded)}`).toBe(true)
      }
    }
  })

  it('covers every language', () => {
    expect(Object.keys(translations).sort()).toEqual([...LANGUAGES].sort())
  })
})

describe('rgb', () => {
  it('splits a hex colour into components jsPDF accepts', () => {
    expect(rgb('#1A4731')).toEqual([26, 71, 49])
    expect(rgb('FFFFFF')).toEqual([255, 255, 255])
  })
})

describe('slug', () => {
  it('makes a filename-safe name', () => {
    expect(slug('Alex Demo')).toBe('Alex-Demo')
    expect(slug('José Ramírez-Peña')).toBe('Jose-Ramirez-Pena')
    expect(slug('  ')).toBe('')
  })

  it('stays short enough for a filename', () => {
    expect(slug('a'.repeat(200)).length).toBeLessThanOrEqual(40)
  })
})
