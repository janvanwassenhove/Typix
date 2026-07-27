/**
 * Print styling for the exported reports.
 *
 * The on-screen report leans on large saturated blocks, which look right on a
 * backlit screen and heavy on paper. The PDF uses the same brand colours but
 * as accents on white, which is what a printed deliverable needs.
 */

/** All measurements are millimetres, matching jsPDF's unit. */
export interface PageGeometry {
  width: number
  height: number
  margin: { top: number; bottom: number; left: number; right: number }
}

export const PAGE: PageGeometry = {
  width: 210,
  height: 297,
  margin: { top: 26, bottom: 20, left: 20, right: 20 }
}

export const CONTENT_WIDTH = PAGE.width - PAGE.margin.left - PAGE.margin.right

export const COLORS = {
  brand: '#1A4731',
  accent: '#F9A607',
  ink: '#1B2620',
  body: '#3D4A43',
  muted: '#7A8983',
  rule: '#DFE5E2',
  panel: '#F4F7F5',
  white: '#FFFFFF'
} as const

export const TYPE: Record<
  'coverTitle' | 'coverSubtitle' | 'sectionTitle' | 'subheading' | 'body' | 'small' | 'micro',
  number
> = {
  coverTitle: 30,
  coverSubtitle: 12,
  sectionTitle: 14,
  subheading: 11,
  body: 10,
  small: 8.5,
  micro: 7.5
}

/** Vertical rhythm, so sections do not each invent their own spacing. */
export const SPACE: Record<
  'afterSectionTitle' | 'afterParagraph' | 'betweenSections' | 'lineHeight',
  number
> = {
  afterSectionTitle: 5,
  afterParagraph: 4.5,
  betweenSections: 9,
  lineHeight: 1.45
}

export function rgb(hex: string): [number, number, number] {
  const value = hex.replace('#', '')
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16)
  ]
}

/**
 * jsPDF's built-in fonts encode text as WinAnsi, which covers the Latin
 * alphabets we ship but not the typographic punctuation in the copy. Mapping
 * those few characters keeps the output clean without embedding a font file
 * (which would add hundreds of kilobytes to the bundle for four glyphs).
 */
const SUBSTITUTIONS: Array<[RegExp, string]> = [
  [/[‘’‛]/g, "'"],
  [/[“”]/g, '"'],
  [/…/g, '...'],
  [/[‒–]/g, '-'],
  [/—/g, '-'],
  [/ /g, ' '],
  [/•/g, '-']
]

export function printable(text: string): string {
  return SUBSTITUTIONS.reduce((out, [pattern, replacement]) => out.replace(pattern, replacement), text)
}
