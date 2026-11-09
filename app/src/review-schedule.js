export const REVIEW_INTERVALS = [1, 3, 7, 14]

export function isReviewDue(record, now = Date.now()) {
  return !record || Date.parse(record.dueAt) <= now
}

export function nextReview(record, correct, now = Date.now()) {
  const stage = correct ? Math.min((record?.stage ?? 0) + 1, REVIEW_INTERVALS.length) : 0
  const days = correct ? REVIEW_INTERVALS[stage - 1] : 1
  return {
    stage,
    learned: correct || !!record?.learned || (record?.stage ?? 0) > 0,
    dueAt: new Date(now + days * 86400000).toISOString(),
  }
}
