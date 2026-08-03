import { normalizeAnswers, type StoredAnswers } from './answers'
import { rankByScore, toPercentages } from './percentages'
import { profileSpread, spreadBand, type SpreadBand } from './profile'

export type ColorKey = 'Red' | 'Yellow' | 'Blue' | 'Green'

/** Canonical order — also the tie-break order used everywhere in the report. */
export const COLOR_KEYS: readonly ColorKey[] = ['Red', 'Yellow', 'Blue', 'Green'] as const

/** The wizard stores lowercase colour names on each option. */
const VALUE_TO_COLOR: Record<string, ColorKey> = {
  red: 'Red', yellow: 'Yellow', blue: 'Blue', green: 'Green'
}

/** Highest value on the 0..6 preference scale used by the persona chart. */
export const PREFERENCE_MAX = 6

export interface InsightsScores {
  counts: Record<ColorKey, number>
  /** Integer percentages, guaranteed to sum to 100 (or all 0 when unanswered). */
  percentages: Record<ColorKey, number>
  /** Percentages restated on the 0..6 preference scale used by the bar chart. */
  means: Record<ColorKey, number>
  answered: number
  hasAnswers: boolean
  dominant: ColorKey
  secondary: ColorKey
  ranking: ColorKey[]
}

function colorForAnswer(answer: { answerIndex: number; value?: unknown }): ColorKey | null {
  if (typeof answer.value === 'string') {
    const mapped = VALUE_TO_COLOR[answer.value.toLowerCase()]
    if (mapped) return mapped
  }
  return COLOR_KEYS[answer.answerIndex] ?? null
}

export function scoreInsights(stored: StoredAnswers): InsightsScores {
  const counts: Record<ColorKey, number> = { Red: 0, Yellow: 0, Blue: 0, Green: 0 }
  let answered = 0

  for (const answer of normalizeAnswers(stored)) {
    const color = colorForAnswer(answer)
    if (!color) continue
    counts[color]++
    answered++
  }

  const percentages = toPercentages(counts, COLOR_KEYS)
  const means = Object.fromEntries(
    COLOR_KEYS.map(c => [c, (percentages[c] / 100) * PREFERENCE_MAX])
  ) as Record<ColorKey, number>
  const ranking = rankByScore(counts, COLOR_KEYS)

  return {
    counts,
    percentages,
    means,
    answered,
    hasAnswers: answered > 0,
    dominant: ranking[0],
    secondary: ranking[1],
    ranking
  }
}

/**
 * Angle (radians, canvas convention: 0 = right, positive = clockwise) of the
 * centre of each colour's quadrant on the Insights wheel.
 *
 *   Blue | Red        Cool Blue    top-left
 *   -----+-----       Fiery Red    top-right
 *  Green | Yellow     Earth Green  bottom-left
 *                     Sunshine Yellow bottom-right
 */
export const COLOR_QUADRANT_CENTRE: Record<ColorKey, number> = {
  Red: -Math.PI / 4,
  Yellow: Math.PI / 4,
  Green: (3 * Math.PI) / 4,
  Blue: (-3 * Math.PI) / 4
}

/**
 * Where the "you are here" marker belongs on the wheel.
 *
 * Each colour pulls towards the centre of its own quadrant, weighted by its
 * share. Opposing energies (Red/Green, Yellow/Blue) therefore cancel, which is
 * the point of the wheel — but the marker still reaches the rim for a profile
 * concentrated in one colour, because the radius is normalised against the
 * strongest possible pull rather than left as a raw vector length.
 */
export function insightsWheelPosition(percentages: Record<ColorKey, number>): { angle: number; radius: number } {
  let x = 0
  let y = 0
  for (const color of COLOR_KEYS) {
    const share = (percentages[color] || 0) / 100
    x += Math.cos(COLOR_QUADRANT_CENTRE[color]) * share
    y += Math.sin(COLOR_QUADRANT_CENTRE[color]) * share
  }
  const magnitude = Math.sqrt(x * x + y * y)
  return { angle: Math.atan2(y, x), radius: Math.min(1, magnitude) }
}

/**
 * How concentrated the profile is, as the mean absolute deviation from an even
 * 25% split. 0 means perfectly even; 37.5 is the maximum, reached when a single
 * colour takes everything.
 */
export function energySpread(percentages: Record<ColorKey, number>): number {
  return profileSpread(percentages, COLOR_KEYS)
}

/** Kept as a named export because the wheel and the report both read it. */
export function energyBalance(percentages: Record<ColorKey, number>): SpreadBand {
  return spreadBand(percentages, COLOR_KEYS)
}
