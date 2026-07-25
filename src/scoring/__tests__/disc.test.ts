import { describe, expect, it } from 'vitest'
import discQuestions from '../../data/disc-questions.json'
import {
  DISC_STYLES,
  DISC_WHEEL_SEGMENTS,
  discWheelPosition,
  scoreDisc,
  type DiscStyle
} from '../disc'

function answers(counts: Partial<Record<DiscStyle, number>>) {
  const stored: Record<number, { questionIndex: number; answerIndex: number; value: DiscStyle }> = {}
  let i = 0
  for (const style of DISC_STYLES) {
    for (let n = 0; n < (counts[style] || 0); n++) {
      stored[i] = { questionIndex: i, answerIndex: DISC_STYLES.indexOf(style), value: style }
      i++
    }
  }
  return stored
}

describe('scoreDisc', () => {
  it('counts each style and reports percentages that sum to 100', () => {
    const scores = scoreDisc(answers({ D: 20, I: 15, S: 8, C: 7 }))
    expect(scores.counts).toEqual({ D: 20, I: 15, S: 8, C: 7 })
    expect(scores.percentages).toEqual({ D: 40, I: 30, S: 16, C: 14 })
    expect(scores.answered).toBe(50)
    expect(scores.combination).toBe('D/I')
  })

  it('never produces NaN for an unanswered assessment', () => {
    const scores = scoreDisc({})
    expect(scores.hasAnswers).toBe(false)
    expect(scores.percentages).toEqual({ D: 0, I: 0, S: 0, C: 0 })
    for (const style of DISC_STYLES) {
      expect(Number.isNaN(scores.percentages[style])).toBe(false)
    }
  })

  it('reads legacy answers stored as bare option indices', () => {
    // Option order is D, I, S, C in every bundled question.
    const scores = scoreDisc({ 0: 0, 1: 0, 2: 1, 3: 2, 4: 3 })
    expect(scores.counts).toEqual({ D: 2, I: 1, S: 1, C: 1 })
    expect(scores.primary).toBe('D')
  })

  it('trusts the stored style over the option index', () => {
    // A question whose options are listed in a different order.
    const scores = scoreDisc({ 0: { questionIndex: 0, answerIndex: 0, value: 'C' } })
    expect(scores.counts.C).toBe(1)
    expect(scores.counts.D).toBe(0)
  })

  it('breaks ties consistently, so the headline style and the combination agree', () => {
    const scores = scoreDisc(answers({ D: 10, I: 10, S: 5, C: 5 }))
    expect(scores.primary).toBe('D')
    expect(scores.combination).toBe('D/I')
    expect(scores.combination.startsWith(scores.primary)).toBe(true)
  })

  it('produces a combination for every ordered pair of styles', () => {
    const seen = new Set<string>()
    for (const primary of DISC_STYLES) {
      for (const secondary of DISC_STYLES) {
        if (primary === secondary) continue
        const scores = scoreDisc(answers({ [primary]: 10, [secondary]: 5 } as Partial<Record<DiscStyle, number>>))
        expect(scores.combination).toBe(`${primary}/${secondary}`)
        seen.add(scores.combination)
      }
    }
    expect(seen.size).toBe(12)
  })
})

describe('discWheelPosition', () => {
  it('puts a single-style profile on that quadrant at full radius', () => {
    const { angle, radius } = discWheelPosition({ D: 100, I: 0, S: 0, C: 0 })
    expect(radius).toBeCloseTo(1, 6)
    expect(angle).toBeCloseTo(-Math.PI / 4, 6)
  })

  it('puts an even profile at the centre', () => {
    expect(discWheelPosition({ D: 25, I: 25, S: 25, C: 25 }).radius).toBeCloseTo(0, 6)
  })

  it('places an even split of two neighbours on the boundary between them', () => {
    expect(discWheelPosition({ D: 50, I: 50, S: 0, C: 0 }).angle).toBeCloseTo(0, 6)
  })

  it('keeps a clearly dominant style well off the centre', () => {
    // The old wheel drew this profile almost at the origin.
    expect(discWheelPosition({ D: 44, I: 24, S: 14, C: 18 }).radius).toBeGreaterThan(0.25)
  })
})

describe('wheel layout', () => {
  it('lists eight segments with each quadrant split between its two neighbours', () => {
    expect([...DISC_WHEEL_SEGMENTS]).toEqual(['D/C', 'D/I', 'I/D', 'I/S', 'S/I', 'S/C', 'C/S', 'C/D'])
  })
})

describe('question data', () => {
  it('tags every option with the style it scores, in every language', () => {
    for (const [lang, questions] of Object.entries(discQuestions)) {
      expect(questions.length, lang).toBe(50)
      for (const question of questions) {
        expect(question.options.map(o => o.value), lang).toEqual(['D', 'I', 'S', 'C'])
        for (const option of question.options) {
          expect(option.text.trim().length, lang).toBeGreaterThan(0)
        }
      }
    }
  })

  it('asks every question with its own answer options', () => {
    // 48 of the 50 questions used to share one generic set of options
    // ("Direct and results-focused", …), so only the question text varied and
    // the answers told the respondent nothing about what they were choosing.
    for (const [lang, questions] of Object.entries(discQuestions)) {
      const optionTexts = questions.flatMap(q => q.options.map(o => o.text))
      expect(new Set(optionTexts).size, `${lang} has repeated options`).toBe(optionTexts.length)
      expect(new Set(questions.map(q => q.text)).size, `${lang} has repeated questions`).toBe(questions.length)
    }
  })

  it('asks the same questions in the same order in every language', () => {
    const reference = discQuestions.en.length
    for (const [lang, questions] of Object.entries(discQuestions)) {
      expect(questions.length, lang).toBe(reference)
    }
  })
})
