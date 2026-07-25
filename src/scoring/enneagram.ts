import { normalizeAnswers, type StoredAnswers } from './answers'
import { rankByScore, toPercentages } from './percentages'

export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export const ENNEAGRAM_TYPES: readonly EnneagramType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const

/** Highest value on the agreement scale ("Completely agree"). */
export const LIKERT_MAX = 6

export interface EnneagramScores {
  /** Agreement summed per type, before normalisation. */
  raw: Record<EnneagramType, number>
  /**
   * Each type's agreement as a share of the maximum it could have scored.
   * Types are covered by different numbers of questions, so comparing raw sums
   * would favour whichever type happens to be asked about most often.
   */
  intensity: Record<EnneagramType, number>
  /** Intensity expressed as integer percentages summing to 100. */
  percentages: Record<EnneagramType, number>
  answered: number
  hasAnswers: boolean
  dominant: EnneagramType
  ranking: EnneagramType[]
  /** The stronger of the two neighbouring types — the classic "wing". */
  wing: EnneagramType
}

/** Neighbours on the circle; 9 wraps round to 1. */
export function wingsOf(type: EnneagramType): [EnneagramType, EnneagramType] {
  const left = (((type - 2 + 9) % 9) + 1) as EnneagramType
  const right = (((type % 9) + 1)) as EnneagramType
  return [left, right]
}

/**
 * Integration ("growth") and disintegration ("stress") partners, following the
 * standard Enneagram lines: 1-7-5-8-2-4-1 and 3-6-9-3.
 */
const INTEGRATION: Record<EnneagramType, EnneagramType> = { 1: 7, 2: 4, 3: 6, 4: 1, 5: 8, 6: 9, 7: 5, 8: 2, 9: 3 }
const DISINTEGRATION: Record<EnneagramType, EnneagramType> = { 1: 4, 2: 8, 3: 9, 4: 2, 5: 7, 6: 3, 7: 1, 8: 5, 9: 6 }

export function integrationOf(type: EnneagramType): EnneagramType { return INTEGRATION[type] }
export function disintegrationOf(type: EnneagramType): EnneagramType { return DISINTEGRATION[type] }

export interface EnneagramQuestion {
  type: number
  options: Array<{ text: string; value: number }>
}

/**
 * Score a completed Enneagram questionnaire.
 *
 * Every question belongs to exactly one type and is answered on a 0..6
 * agreement scale; a type's score is the agreement it collected relative to the
 * agreement it could have collected. That keeps all nine types reachable, which
 * a mapping from answer index to type cannot do with a 7-point scale.
 */
export function scoreEnneagram(stored: StoredAnswers, questions: EnneagramQuestion[]): EnneagramScores {
  const raw = Object.fromEntries(ENNEAGRAM_TYPES.map(t => [t, 0])) as Record<EnneagramType, number>
  const maxPerType = Object.fromEntries(ENNEAGRAM_TYPES.map(t => [t, 0])) as Record<EnneagramType, number>
  let answered = 0

  for (const answer of normalizeAnswers(stored)) {
    const question = questions[answer.questionIndex]
    const type = question?.type as EnneagramType | undefined
    if (!type || !ENNEAGRAM_TYPES.includes(type)) continue

    const agreement = typeof answer.value === 'number' && Number.isFinite(answer.value)
      ? answer.value
      : answer.answerIndex
    if (!Number.isFinite(agreement)) continue

    raw[type] += Math.max(0, Math.min(LIKERT_MAX, agreement))
    maxPerType[type] += LIKERT_MAX
    answered++
  }

  const intensity = Object.fromEntries(
    ENNEAGRAM_TYPES.map(t => [t, maxPerType[t] > 0 ? raw[t] / maxPerType[t] : 0])
  ) as Record<EnneagramType, number>

  const percentages = toPercentages(intensity, ENNEAGRAM_TYPES)
  const ranking = rankByScore(intensity, ENNEAGRAM_TYPES)

  const dominant = ranking[0]
  const [left, right] = wingsOf(dominant)
  const wing = intensity[left] >= intensity[right] ? left : right

  return {
    raw,
    intensity,
    percentages,
    answered,
    hasAnswers: answered > 0,
    dominant,
    ranking,
    wing
  }
}
