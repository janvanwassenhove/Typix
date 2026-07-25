/**
 * Convert raw weights into integer percentages that always add up to exactly 100.
 *
 * Naive `Math.round(part / total * 100)` per key drifts: four keys at 12.5 each
 * render as 13/13/13/13 = 102%. This uses the largest-remainder (Hare) method so
 * the bars in a report are consistent with the total they claim to represent.
 *
 * Ties in the remainder are broken by the order of `keys`, so the result is
 * deterministic for a given input.
 */
export function toPercentages<K extends string | number>(
  weights: Record<K, number>,
  keys: readonly K[]
): Record<K, number> {
  const total = keys.reduce((sum, key) => sum + (weights[key] || 0), 0)
  const result = {} as Record<K, number>

  if (total <= 0) {
    keys.forEach(key => { result[key] = 0 })
    return result
  }

  const exact = keys.map(key => ((weights[key] || 0) / total) * 100)
  const floors = exact.map(Math.floor)
  let remaining = 100 - floors.reduce((sum, v) => sum + v, 0)

  const order = keys
    .map((key, i) => ({ i, key, remainder: exact[i] - floors[i] }))
    .sort((a, b) => (b.remainder - a.remainder) || (a.i - b.i))

  const bonus = new Set<number>()
  for (const entry of order) {
    if (remaining <= 0) break
    bonus.add(entry.i)
    remaining--
  }

  keys.forEach((key, i) => { result[key] = floors[i] + (bonus.has(i) ? 1 : 0) })
  return result
}

/**
 * Rank keys by score, descending. Ties fall back to the canonical order of
 * `keys` so that every part of a report (headline, wheel, combination label)
 * picks the same winner instead of each re-deriving its own.
 */
export function rankByScore<K extends string | number>(
  scores: Record<K, number>,
  keys: readonly K[]
): K[] {
  return keys
    .map((key, i) => ({ key, score: scores[key] || 0, i }))
    .sort((a, b) => (b.score - a.score) || (a.i - b.i))
    .map(entry => entry.key)
}
