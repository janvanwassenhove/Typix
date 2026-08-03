import { describe, expect, it } from 'vitest'
import insightsQuestions from '../../data/insights-questions.json'
import {
  COLOR_KEYS,
  energyBalance,
  energySpread,
  insightsWheelPosition,
  scoreInsights,
  type ColorKey
} from '../insights'

const VALUES: Record<ColorKey, string> = { Red: 'red', Yellow: 'yellow', Blue: 'blue', Green: 'green' }

function answers(counts: Partial<Record<ColorKey, number>>) {
  const stored: Record<number, { questionIndex: number; answerIndex: number; value: string }> = {}
  let i = 0
  for (const color of COLOR_KEYS) {
    for (let n = 0; n < (counts[color] || 0); n++) {
      stored[i] = { questionIndex: i, answerIndex: COLOR_KEYS.indexOf(color), value: VALUES[color] }
      i++
    }
  }
  return stored
}

describe('scoreInsights', () => {
  it('counts each colour and reports percentages that sum to 100', () => {
    const scores = scoreInsights(answers({ Red: 22, Yellow: 12, Blue: 9, Green: 7 }))
    expect(scores.counts).toEqual({ Red: 22, Yellow: 12, Blue: 9, Green: 7 })
    expect(COLOR_KEYS.reduce((sum, c) => sum + scores.percentages[c], 0)).toBe(100)
    expect(scores.dominant).toBe('Red')
  })

  it('keeps the headline colour and the profile position in agreement on a tie', () => {
    // Red and Blue tie at 26%; the dominant colour and the secondary must come
    // from the same ranking, not from two independent sorts.
    const scores = scoreInsights(answers({ Red: 13, Yellow: 12, Blue: 13, Green: 12 }))
    expect(scores.percentages.Red).toBe(scores.percentages.Blue)
    expect(scores.dominant).toBe('Red')
    expect(scores.secondary).toBe('Blue')
    expect(scores.ranking[0]).toBe(scores.dominant)
    expect(scores.ranking[1]).toBe(scores.secondary)
  })

  it('never produces NaN for an unanswered assessment', () => {
    const scores = scoreInsights({})
    expect(scores.hasAnswers).toBe(false)
    expect(scores.percentages).toEqual({ Red: 0, Yellow: 0, Blue: 0, Green: 0 })
    expect(scores.means).toEqual({ Red: 0, Yellow: 0, Blue: 0, Green: 0 })
  })

  it('reads legacy answers stored as bare option indices', () => {
    const scores = scoreInsights([0, 0, 1, 2, 3])
    expect(scores.counts).toEqual({ Red: 2, Yellow: 1, Blue: 1, Green: 1 })
  })

  it('trusts the stored colour over the option index', () => {
    const scores = scoreInsights({ 0: { questionIndex: 0, answerIndex: 0, value: 'green' } })
    expect(scores.counts.Green).toBe(1)
    expect(scores.counts.Red).toBe(0)
  })

  it('restates percentages on the 0-6 preference scale', () => {
    const scores = scoreInsights(answers({ Red: 50, Yellow: 50 }))
    expect(scores.means.Red).toBeCloseTo(3, 6)
    expect(scores.means.Blue).toBeCloseTo(0, 6)
  })
})

describe('insightsWheelPosition', () => {
  it('puts a single-colour profile on that quadrant at full radius', () => {
    const { angle, radius } = insightsWheelPosition({ Red: 100, Yellow: 0, Blue: 0, Green: 0 })
    expect(radius).toBeCloseTo(1, 6)
    // Red owns the top-right quadrant, whose centre is -45 degrees.
    expect(angle).toBeCloseTo(-Math.PI / 4, 6)
  })

  it('aims each colour at the centre of its own quadrant, not at a quadrant edge', () => {
    expect(insightsWheelPosition({ Red: 0, Yellow: 100, Blue: 0, Green: 0 }).angle).toBeCloseTo(Math.PI / 4, 6)
    expect(insightsWheelPosition({ Red: 0, Yellow: 0, Blue: 0, Green: 100 }).angle).toBeCloseTo(3 * Math.PI / 4, 6)
    expect(insightsWheelPosition({ Red: 0, Yellow: 0, Blue: 100, Green: 0 }).angle).toBeCloseTo(-3 * Math.PI / 4, 6)
  })

  it('puts an even profile at the centre', () => {
    expect(insightsWheelPosition({ Red: 25, Yellow: 25, Blue: 25, Green: 25 }).radius).toBeCloseTo(0, 6)
  })

  it('keeps a clearly dominant colour well off the centre', () => {
    // 44/24/18/14 previously landed at ~0.3 of the radius after the raw vector
    // sum went unnormalised.
    expect(insightsWheelPosition({ Red: 44, Yellow: 24, Blue: 18, Green: 14 }).radius).toBeGreaterThan(0.25)
  })
})

describe('energy balance', () => {
  it('reports zero spread for an even profile', () => {
    expect(energySpread({ Red: 25, Yellow: 25, Blue: 25, Green: 25 })).toBe(0)
    expect(energyBalance({ Red: 25, Yellow: 25, Blue: 25, Green: 25 })).toBe('balanced')
  })

  it('reports the maximum spread for a single-colour profile', () => {
    expect(energySpread({ Red: 100, Yellow: 0, Blue: 0, Green: 0 })).toBe(37.5)
    expect(energyBalance({ Red: 100, Yellow: 0, Blue: 0, Green: 0 })).toBe('focused')
  })

  it('sits in the middle band for a moderately tilted profile', () => {
    expect(energyBalance({ Red: 40, Yellow: 25, Blue: 20, Green: 15 })).toBe('moderate')
  })
})

describe('question data', () => {
  it('tags every option with the colour it scores, in every language', () => {
    for (const [lang, questions] of Object.entries(insightsQuestions)) {
      expect(questions.length, lang).toBe(50)
      for (const question of questions) {
        expect(question.options.map(o => o.value), lang).toEqual(['red', 'yellow', 'blue', 'green'])
      }
    }
  })
})
