/**
 * Shape-of-the-result measures that apply to any of the three assessments.
 *
 * A report used to present its top result as settled. These two numbers say how
 * settled it actually is: how far the leader sits ahead of the runner-up, and
 * how concentrated the profile is overall. Both are arithmetic on the
 * percentages that are already reported — no extra questions, no norm group.
 */

/** How concentrated a profile is, from an even split (0) to all in one key (1). */
export type SpreadBand = 'balanced' | 'moderate' | 'focused'

/** How firmly the top result outranks the one behind it. */
export type SeparationBand = 'tied' | 'close' | 'distinct'

/** The share each key would hold if the answers were spread evenly. */
export function evenShare(keyCount: number): number {
  return 100 / keyCount
}

/**
 * The largest mean absolute deviation possible, reached when a single key takes
 * everything. Needed to compare a 4-key profile with a 9-key one: the same
 * concentration produces a much smaller raw spread when there are more keys.
 */
export function maxSpread(keyCount: number): number {
  return (200 * (keyCount - 1)) / (keyCount * keyCount)
}

/** Mean absolute deviation from an even split, in percentage points. */
export function profileSpread<K extends string | number>(
  percentages: Record<K, number>,
  keys: readonly K[]
): number {
  const even = evenShare(keys.length)
  const total = keys.reduce((sum, key) => sum + Math.abs((percentages[key] || 0) - even), 0)
  return total / keys.length
}

/** `profileSpread` rescaled to 0..1 so profiles of different sizes compare. */
export function concentration<K extends string | number>(
  percentages: Record<K, number>,
  keys: readonly K[]
): number {
  const max = maxSpread(keys.length)
  return max > 0 ? Math.min(1, profileSpread(percentages, keys) / max) : 0
}

export function spreadBand<K extends string | number>(
  percentages: Record<K, number>,
  keys: readonly K[]
): SpreadBand {
  const value = concentration(percentages, keys)
  if (value < 0.2) return 'balanced'
  if (value < 0.4) return 'moderate'
  return 'focused'
}

/** Gap between the top two results, in percentage points. */
export function separationPoints<K extends string | number>(
  percentages: Record<K, number>,
  ranking: readonly K[]
): number {
  if (ranking.length < 2) return 0
  return Math.max(0, (percentages[ranking[0]] || 0) - (percentages[ranking[1]] || 0))
}

/**
 * Whether the leader is far enough ahead to be treated as *the* result.
 *
 * Measured against the even share, because a 5-point gap means something very
 * different when the average key holds 25% than when it holds 11%.
 */
export function separationBand<K extends string | number>(
  percentages: Record<K, number>,
  ranking: readonly K[],
  keys: readonly K[]
): SeparationBand {
  const relative = separationPoints(percentages, ranking) / evenShare(keys.length)
  if (relative < 0.15) return 'tied'
  if (relative < 0.4) return 'close'
  return 'distinct'
}
