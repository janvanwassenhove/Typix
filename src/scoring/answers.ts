/**
 * Answers are persisted to localStorage while the wizard runs, so the reports
 * have to cope with more than one shape:
 *
 *  - current  `{ "0": { questionIndex: 0, answerIndex: 2, value: "S" }, ... }`
 *  - legacy   `{ "0": 2, ... }`                (bare option index)
 *  - legacy   `[2, 0, 3, ...]`                 (array of option indices)
 *
 * Everything downstream works on `NormalizedAnswer[]`, so the shape handling
 * lives here instead of being re-implemented in each report.
 */
export interface NormalizedAnswer {
  questionIndex: number
  answerIndex: number
  value?: unknown
}

export type StoredAnswers = unknown

export function normalizeAnswers(stored: StoredAnswers): NormalizedAnswer[] {
  if (!stored || typeof stored !== 'object') return []

  const entries: Array<[string, unknown]> = Array.isArray(stored)
    ? stored.map((value, i) => [String(i), value])
    : Object.entries(stored as Record<string, unknown>)

  const answers: NormalizedAnswer[] = []

  for (const [key, raw] of entries) {
    const fallbackIndex = Number(key)

    if (typeof raw === 'number' && Number.isFinite(raw)) {
      answers.push({ questionIndex: fallbackIndex, answerIndex: raw })
      continue
    }

    if (raw && typeof raw === 'object') {
      const obj = raw as Record<string, unknown>
      const answerIndex = typeof obj.answerIndex === 'number' ? obj.answerIndex : null
      if (answerIndex === null || !Number.isFinite(answerIndex)) continue
      const questionIndex = typeof obj.questionIndex === 'number' && Number.isFinite(obj.questionIndex)
        ? obj.questionIndex
        : fallbackIndex
      answers.push({ questionIndex, answerIndex, value: obj.value })
    }
  }

  return answers.sort((a, b) => a.questionIndex - b.questionIndex)
}
