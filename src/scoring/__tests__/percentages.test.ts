import { describe, expect, it } from 'vitest'
import { rankByScore, toPercentages } from '../percentages'

const KEYS = ['a', 'b', 'c', 'd'] as const

describe('toPercentages', () => {
  it('always sums to 100', () => {
    const cases: Array<Record<'a' | 'b' | 'c' | 'd', number>> = [
      { a: 1, b: 1, c: 1, d: 1 },
      { a: 1, b: 1, c: 1, d: 0 },
      { a: 17, b: 16, c: 9, d: 8 },
      { a: 1, b: 0, c: 0, d: 0 },
      { a: 3, b: 3, c: 3, d: 2 }
    ]
    for (const weights of cases) {
      const percentages = toPercentages(weights, KEYS)
      const total = KEYS.reduce((sum, key) => sum + percentages[key], 0)
      expect(total, JSON.stringify(weights)).toBe(100)
    }
  })

  it('splits an even distribution evenly instead of rounding to 102%', () => {
    expect(toPercentages({ a: 1, b: 1, c: 1, d: 1 }, KEYS)).toEqual({ a: 25, b: 25, c: 25, d: 25 })
    expect(toPercentages({ a: 1, b: 1, c: 1, d: 0 }, KEYS)).toEqual({ a: 34, b: 33, c: 33, d: 0 })
  })

  it('returns zeroes rather than NaN when nothing was answered', () => {
    expect(toPercentages({ a: 0, b: 0, c: 0, d: 0 }, KEYS)).toEqual({ a: 0, b: 0, c: 0, d: 0 })
  })

  it('gives the leftover point to the largest remainder', () => {
    // 5/9, 2/9, 1/9, 1/9 -> 55.6, 22.2, 11.1, 11.1
    expect(toPercentages({ a: 5, b: 2, c: 1, d: 1 }, KEYS)).toEqual({ a: 56, b: 22, c: 11, d: 11 })
  })
})

describe('rankByScore', () => {
  it('breaks ties using the canonical key order', () => {
    expect(rankByScore({ a: 5, b: 5, c: 1, d: 1 }, KEYS)).toEqual(['a', 'b', 'c', 'd'])
    expect(rankByScore({ a: 1, b: 5, c: 5, d: 1 }, KEYS)).toEqual(['b', 'c', 'a', 'd'])
  })

  it('orders strongest first', () => {
    expect(rankByScore({ a: 1, b: 4, c: 3, d: 2 }, KEYS)).toEqual(['b', 'c', 'd', 'a'])
  })
})
