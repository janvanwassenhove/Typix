import { describe, expect, it } from 'vitest'
import {
  concentration,
  maxSpread,
  profileSpread,
  separationBand,
  separationPoints,
  spreadBand
} from '../profile'
import { DISC_STYLES } from '../disc'
import { ENNEAGRAM_TYPES } from '../enneagram'
import { COLOR_KEYS } from '../insights'

const FOUR = ['a', 'b', 'c', 'd'] as const
const even4 = { a: 25, b: 25, c: 25, d: 25 }
const single4 = { a: 100, b: 0, c: 0, d: 0 }

describe('profileSpread', () => {
  it('is zero for an even profile and maximal for a single-key one', () => {
    expect(profileSpread(even4, FOUR)).toBe(0)
    expect(profileSpread(single4, FOUR)).toBe(maxSpread(4))
    expect(maxSpread(4)).toBe(37.5)
  })
})

describe('concentration', () => {
  it('rescales so profiles with different key counts compare', () => {
    expect(concentration(even4, FOUR)).toBe(0)
    expect(concentration(single4, FOUR)).toBe(1)

    // The same "everything in one key" shape reads as 1 for nine keys too,
    // even though its raw spread is roughly half as large.
    const single9 = Object.fromEntries(ENNEAGRAM_TYPES.map((t, i) => [t, i === 0 ? 100 : 0])) as Record<number, number>
    expect(profileSpread(single9, ENNEAGRAM_TYPES)).toBeLessThan(maxSpread(4))
    expect(concentration(single9, ENNEAGRAM_TYPES)).toBeCloseTo(1, 10)
  })
})

describe('spreadBand', () => {
  it('keeps the thresholds the Insights report already used', () => {
    // 7.5 and 15 points of raw spread were the old boundaries for four keys.
    expect(spreadBand({ a: 25, b: 25, c: 25, d: 25 }, FOUR)).toBe('balanced')
    expect(spreadBand({ a: 40, b: 25, c: 20, d: 15 }, FOUR)).toBe('moderate')
    expect(spreadBand({ a: 60, b: 20, c: 12, d: 8 }, FOUR)).toBe('focused')
  })

  it('reads a flat nine-type profile as balanced', () => {
    const flat = Object.fromEntries(ENNEAGRAM_TYPES.map(t => [t, 11])) as Record<number, number>
    expect(spreadBand(flat, ENNEAGRAM_TYPES)).toBe('balanced')
  })
})

describe('separation', () => {
  it('measures the gap between the top two in percentage points', () => {
    expect(separationPoints({ a: 40, b: 28, c: 20, d: 12 }, ['a', 'b', 'c', 'd'])).toBe(12)
  })

  it('never reports a negative gap', () => {
    expect(separationPoints({ a: 10, b: 40 }, ['a', 'b'])).toBe(0)
  })

  it('judges the gap against the even share, not in absolute points', () => {
    // 5 points is close for four keys (even share 25)...
    expect(separationBand({ D: 30, I: 25, S: 25, C: 20 }, ['D', 'I', 'S', 'C'], DISC_STYLES)).toBe('close')
    // ...but decisive across nine, where the even share is 11.
    const nine = { 1: 20, 2: 15, 3: 9, 4: 9, 5: 9, 6: 9, 7: 9, 8: 10, 9: 10 }
    expect(separationBand(nine, [1, 2, 3, 4, 5, 6, 7, 8, 9], ENNEAGRAM_TYPES)).toBe('distinct')
  })

  it('calls a dead heat tied', () => {
    expect(separationBand({ Red: 26, Yellow: 25, Blue: 25, Green: 24 }, ['Red', 'Yellow', 'Blue', 'Green'], COLOR_KEYS))
      .toBe('tied')
  })

  it('calls a runaway leader distinct', () => {
    expect(separationBand({ Red: 60, Yellow: 20, Blue: 12, Green: 8 }, ['Red', 'Yellow', 'Blue', 'Green'], COLOR_KEYS))
      .toBe('distinct')
  })
})
