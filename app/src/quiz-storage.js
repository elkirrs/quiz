export const STORAGE_KEY = 'word-quiz-learning-v1'

export function wordKey(word, quiz) {
  return quiz === 'verbs'
    ? JSON.stringify(['verbs', word.infinitive, word.past, word.past_participle, word.translation])
    : JSON.stringify(['words', word.en, word.ru, word.part_of_speech])
}

export function readLearningData(storage) {
  const raw = storage.getItem(STORAGE_KEY)
  if (!raw) return { favorites: {}, mistakes: {}, history: [], active: null, reviews: {} }
  const data = JSON.parse(raw)
  if (!data || typeof data !== 'object' || !data.favorites || !data.mistakes ||
      !Array.isArray(data.history) || !('active' in data)) {
    throw new Error('Saved learning data has an invalid format.')
  }
  if (data.active && (!data.active.settings || !data.active.state ||
      (data.active.settings.pairCount !== undefined &&
        (!Number.isInteger(data.active.settings.pairCount) ||
          data.active.settings.pairCount < 4 || data.active.settings.pairCount > 6)) ||
      !Array.isArray(data.active.state.usedIndexes) ||
      !Array.isArray(data.active.state.listWords) ||
      !Array.isArray(data.active.state.answerList) ||
      !Number.isFinite(Date.parse(data.active.state.startTime)) ||
      !Number.isFinite(Date.parse(data.active.state.savedAt)))) {
    throw new Error('Saved quiz progress has an invalid format.')
  }
  if (data.reviews === undefined) data.reviews = {}
  if (!data.reviews || typeof data.reviews !== 'object' || Array.isArray(data.reviews) ||
      Object.values(data.reviews).some(record => !record || !Number.isInteger(record.stage) ||
        record.stage < 0 || record.stage > 4 ||
        (record.learned !== undefined && typeof record.learned !== 'boolean') ||
        !Number.isFinite(Date.parse(record.dueAt)))) {
    throw new Error('Saved review data has an invalid format.')
  }
  return data
}

export function writeLearningData(storage, data) {
  storage.setItem(STORAGE_KEY, JSON.stringify(data))
}
