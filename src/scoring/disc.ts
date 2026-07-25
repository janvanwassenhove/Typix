import { normalizeAnswers, type StoredAnswers } from './answers'
import { rankByScore, toPercentages } from './percentages'

export type DiscStyle = 'D' | 'I' | 'S' | 'C'

/** Canonical order — also the tie-break order used everywhere in the report. */
export const DISC_STYLES: readonly DiscStyle[] = ['D', 'I', 'S', 'C'] as const

/**
 * Combination key, e.g. `D/I`. Only the 12 ordered pairs of *different* styles
 * are valid: the primary and secondary come from a ranking, so they can never
 * be the same style.
 */
export type DiscCombination = {
  [P in DiscStyle]: { [S in Exclude<DiscStyle, P>]: `${P}/${S}` }[Exclude<DiscStyle, P>]
}[DiscStyle]

export interface DiscScores {
  /** Number of times each style was picked. */
  counts: Record<DiscStyle, number>
  /** Integer percentages, guaranteed to sum to 100 (or all 0 when unanswered). */
  percentages: Record<DiscStyle, number>
  answered: number
  hasAnswers: boolean
  primary: DiscStyle
  secondary: DiscStyle
  combination: DiscCombination
  /** Styles ordered strongest → weakest, with deterministic tie-breaking. */
  ranking: DiscStyle[]
}

function isDiscStyle(value: unknown): value is DiscStyle {
  return typeof value === 'string' && (DISC_STYLES as readonly string[]).includes(value)
}

/**
 * Resolve which DISC style an answer expressed.
 *
 * Answers written by the current wizard carry the style explicitly. Older
 * answers only stored the option index, which relies on every question listing
 * its options in D, I, S, C order — true for the bundled question set, but not
 * something new questions should have to guarantee.
 */
function styleForAnswer(answer: { answerIndex: number; value?: unknown }): DiscStyle | null {
  if (isDiscStyle(answer.value)) return answer.value
  return DISC_STYLES[answer.answerIndex] ?? null
}

export function scoreDisc(stored: StoredAnswers): DiscScores {
  const counts: Record<DiscStyle, number> = { D: 0, I: 0, S: 0, C: 0 }
  let answered = 0

  for (const answer of normalizeAnswers(stored)) {
    const style = styleForAnswer(answer)
    if (!style) continue
    counts[style]++
    answered++
  }

  const percentages = toPercentages(counts, DISC_STYLES)
  const ranking = rankByScore(counts, DISC_STYLES)
  const primary = ranking[0]
  const secondary = ranking[1]

  return {
    counts,
    percentages,
    answered,
    hasAnswers: answered > 0,
    primary,
    secondary,
    combination: `${primary}/${secondary}` as DiscCombination,
    ranking
  }
}

/**
 * Angle (radians, canvas convention: 0 = right, positive = clockwise) of the
 * centre of each style's quadrant on the DISC wheel.
 *
 *   C | D      C: top-left     D: top-right
 *   --+--
 *   S | I      S: bottom-left  I: bottom-right
 */
export const DISC_QUADRANT_CENTRE: Record<DiscStyle, number> = {
  D: -Math.PI / 4,
  I: Math.PI / 4,
  S: (3 * Math.PI) / 4,
  C: (-3 * Math.PI) / 4
}

/**
 * The eight wheel segments, clockwise from the top. Each quadrant is split in
 * two: the half nearest the neighbouring quadrant carries that neighbour as the
 * secondary style, which is what makes `D/I` sit next to `I/D`.
 */
export const DISC_WHEEL_SEGMENTS: readonly DiscCombination[] = [
  'D/C', 'D/I', 'I/D', 'I/S', 'S/I', 'S/C', 'C/S', 'C/D'
] as const

/**
 * Direction of the marker on the wheel for a given score distribution.
 *
 * Each style pulls towards the centre of its own quadrant with a weight equal
 * to its share, so a pure profile lands on its quadrant's centre line and a
 * flat profile lands in the middle. Returns the angle plus a 0..1 radius,
 * where 1 means "all of the preference sits in a single style".
 */
export function discWheelPosition(percentages: Record<DiscStyle, number>): { angle: number; radius: number } {
  let x = 0
  let y = 0
  for (const style of DISC_STYLES) {
    const share = (percentages[style] || 0) / 100
    x += Math.cos(DISC_QUADRANT_CENTRE[style]) * share
    y += Math.sin(DISC_QUADRANT_CENTRE[style]) * share
  }
  const magnitude = Math.sqrt(x * x + y * y)
  // A single style at 100% produces a magnitude of exactly 1, so the raw
  // magnitude is already normalised to the 0..1 range we want.
  return { angle: Math.atan2(y, x), radius: Math.min(1, magnitude) }
}
