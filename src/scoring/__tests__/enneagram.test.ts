import { describe, expect, it } from 'vitest'
import questionData from '../../data/enneagram-questions.json'
import {
  ENNEAGRAM_TYPES,
  LIKERT_MAX,
  centreOf,
  typesInCentre,
  disintegrationOf,
  integrationOf,
  scoreEnneagram,
  wingsOf,
  type EnneagramQuestion,
  type EnneagramType
} from '../enneagram'

const questions = questionData.en as EnneagramQuestion[]

function answerAll(agreement: (question: EnneagramQuestion, index: number) => number) {
  const stored: Record<number, { questionIndex: number; answerIndex: number; value: number }> = {}
  questions.forEach((question, i) => {
    const value = agreement(question, i)
    stored[i] = { questionIndex: i, answerIndex: value, value }
  })
  return stored
}

describe('question data', () => {
  it('assigns every question to exactly one type, in every language', () => {
    for (const [lang, langQuestions] of Object.entries(questionData)) {
      expect(langQuestions.length, lang).toBe(50)
      langQuestions.forEach((question, i) => {
        expect(ENNEAGRAM_TYPES, `${lang}#${i}`).toContain(question.type as EnneagramType)
        expect(question.options.map(o => o.value), `${lang}#${i}`).toEqual([0, 1, 2, 3, 4, 5, 6])
      })
    }
  })

  it('covers all nine types', () => {
    const covered = new Set(questions.map(q => q.type))
    expect([...covered].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('keeps the same question order across languages, so the type mapping lines up', () => {
    for (const [lang, langQuestions] of Object.entries(questionData)) {
      langQuestions.forEach((question, i) => {
        expect(question.type, `${lang}#${i}`).toBe(questions[i].type)
      })
    }
  })
})

describe('scoreEnneagram', () => {
  it('reaches every type, including 8 and 9', () => {
    // The old index-modulo scoring could only ever produce types 1..7.
    for (const target of ENNEAGRAM_TYPES) {
      const stored = answerAll(question => (question.type === target ? LIKERT_MAX : 0))
      expect(scoreEnneagram(stored, questions).dominant).toBe(target)
    }
  })

  it('does not let the agreement level itself decide the type', () => {
    const allAgree = scoreEnneagram(answerAll(() => LIKERT_MAX), questions)
    const allNeutral = scoreEnneagram(answerAll(() => 3), questions)
    // Answering the same way to everything expresses no preference, so every
    // type must come out level rather than one of them "winning".
    const values = ENNEAGRAM_TYPES.map(t => allAgree.intensity[t])
    expect(Math.max(...values) - Math.min(...values)).toBeCloseTo(0, 10)
    expect(allNeutral.percentages).toEqual(allAgree.percentages)
  })

  it('corrects for types being covered by different numbers of questions', () => {
    const counts = new Map<number, number>()
    questions.forEach(q => counts.set(q.type, (counts.get(q.type) || 0) + 1))
    // The bundled set is deliberately uneven, which is what makes the
    // normalisation matter.
    expect(new Set(counts.values()).size).toBeGreaterThan(1)

    const stored = answerAll(question => (question.type === 2 || question.type === 6 ? LIKERT_MAX : 0))
    const scores = scoreEnneagram(stored, questions)
    // Type 2 has fewer questions than type 6, yet full agreement on both must
    // score them equally.
    expect(scores.intensity[2]).toBeCloseTo(scores.intensity[6], 10)
  })

  it('reports percentages that sum to 100', () => {
    const scores = scoreEnneagram(answerAll((_q, i) => i % (LIKERT_MAX + 1)), questions)
    const total = ENNEAGRAM_TYPES.reduce((sum, t) => sum + scores.percentages[t], 0)
    expect(total).toBe(100)
  })

  it('returns an empty, NaN-free result when nothing was answered', () => {
    const scores = scoreEnneagram({}, questions)
    expect(scores.hasAnswers).toBe(false)
    expect(scores.answered).toBe(0)
    for (const type of ENNEAGRAM_TYPES) {
      expect(Number.isNaN(scores.percentages[type])).toBe(false)
    }
  })

  it('reads legacy answers stored as bare Likert indices', () => {
    const legacy: Record<number, number> = {}
    questions.forEach((question, i) => { legacy[i] = question.type === 4 ? LIKERT_MAX : 0 })
    expect(scoreEnneagram(legacy, questions).dominant).toBe(4)
  })

  it('picks the stronger neighbour as the wing', () => {
    const stored = answerAll(question => {
      if (question.type === 5) return LIKERT_MAX
      if (question.type === 6) return 4
      return 0
    })
    const scores = scoreEnneagram(stored, questions)
    expect(scores.dominant).toBe(5)
    expect(scores.wing).toBe(6)
  })
})

describe('response pattern', () => {
  it('flags agreeing with nearly everything, because it flattens the ranking', () => {
    const scores = scoreEnneagram(answerAll(() => LIKERT_MAX), questions)
    expect(scores.responseMean).toBe(LIKERT_MAX)
    expect(scores.responseStyle).toBe('agreeable')
  })

  it('flags disagreeing with nearly everything', () => {
    const scores = scoreEnneagram(answerAll(() => 0), questions)
    expect(scores.responseStyle).toBe('reserved')
  })

  it('flags answers that barely vary', () => {
    const scores = scoreEnneagram(answerAll(() => 3), questions)
    expect(scores.responseSpread).toBe(0)
    expect(scores.responseStyle).toBe('uniform')
  })

  it('says nothing when the answers actually discriminate', () => {
    // A realistic pattern: strong agreement on one type, some on its wing,
    // mild disagreement elsewhere.
    const scores = scoreEnneagram(
      answerAll(question => (question.type === 5 ? 6 : question.type === 4 ? 4 : 2)),
      questions
    )
    expect(scores.responseStyle).toBe('varied')
  })

  it('still reports "reserved" when a strong preference sits among 45 rejections', () => {
    // Agreeing with five statements and rejecting the rest is a real signal
    // about how the questionnaire was answered, not a false positive.
    const scores = scoreEnneagram(answerAll(question => (question.type === 5 ? 6 : 1)), questions)
    expect(scores.dominant).toBe(5)
    expect(scores.responseStyle).toBe('reserved')
  })

  it('reports a spread of zero for an unanswered assessment rather than NaN', () => {
    const scores = scoreEnneagram({}, questions)
    expect(scores.responseMean).toBe(0)
    expect(scores.responseSpread).toBe(0)
  })
})

describe('centres of intelligence', () => {
  it('groups the types the standard way', () => {
    expect(typesInCentre('gut')).toEqual([8, 9, 1].sort((a, b) => a - b))
    expect(typesInCentre('heart')).toEqual([2, 3, 4])
    expect(typesInCentre('head')).toEqual([5, 6, 7])
  })

  it('places every type in exactly one centre', () => {
    const seen = ENNEAGRAM_TYPES.map(centreOf)
    expect(seen).toHaveLength(9)
    expect(new Set(seen)).toEqual(new Set(['gut', 'heart', 'head']))
  })
})

describe('symbol geometry', () => {
  it('wraps the wings around the circle', () => {
    expect(wingsOf(1)).toEqual([9, 2])
    expect(wingsOf(9)).toEqual([8, 1])
    expect(wingsOf(5)).toEqual([4, 6])
  })

  it('follows the standard integration and disintegration lines', () => {
    // 1-7-5-8-2-4-1 and 3-6-9-3
    expect(ENNEAGRAM_TYPES.map(integrationOf)).toEqual([7, 4, 6, 1, 8, 9, 5, 2, 3])
    expect(ENNEAGRAM_TYPES.map(disintegrationOf)).toEqual([4, 8, 9, 2, 7, 3, 1, 5, 6])
  })

  it('makes integration and disintegration exact inverses of each other', () => {
    for (const type of ENNEAGRAM_TYPES) {
      expect(disintegrationOf(integrationOf(type))).toBe(type)
      expect(integrationOf(disintegrationOf(type))).toBe(type)
    }
  })
})
