import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer } from 'vite'

const server = await createServer({
  appType: 'custom',
  server: { middlewareMode: true },
  ssr: { noExternal: ['vuetify'] },
})
const { default: component } = await server.ssrLoadModule('/src/components/QuizQuestion.vue')
const { default: settingsComponent } = await server.ssrLoadModule('/src/components/QuizSettings.vue')
const {wordKey, readLearningData, writeLearningData} = await server.ssrLoadModule('/src/quiz-storage.js')
const {allWords} = await server.ssrLoadModule('/src/data/words/index.js')
after(() => server.close())

function createQuiz() {
  const quiz = {
    ...component.data(),
    settings: { quiz: 'words', trans: 'ru-en', mode: 'list', lastMistake: true, units: [] },
    countAnswerOptions: 10,
    favorites: {},
    mistakes: {},
    $emit() {},
  }
  for (const [name, method] of Object.entries(component.methods)) {
    quiz[name] = method.bind(quiz)
  }
  for (const [name, getter] of Object.entries(component.computed)) {
    Object.defineProperty(quiz, name, { get: getter.bind(quiz) })
  }
  return quiz
}

test('reviewing mistakes deduplicates words and starts a clean quiz with original distractors', () => {
  const quiz = createQuiz()
  const word = { en: 'book', ru: 'книга', part_of_speech: 'n' }
  quiz.reviewWords = [word]
  quiz.optionWords = [word, { en: 'table', ru: 'стол', part_of_speech: 'n' }]
  quiz.loadWords()

  for (let attempt = 0; attempt < 2; attempt++) {
    quiz.userAnswer = 'wrong'
    quiz.checkAnswer()
    quiz.answerSubmitted = false
    quiz.isBtnContinue = false
  }

  assert.equal(quiz.mistakenWords.length, 1)
  assert.equal(quiz.stats.incorrect, 2)
  quiz.reviewMistakes()
  assert.equal(quiz.stats.total, 1)
  assert.equal(quiz.stats.attempt, 0)
  assert.equal(quiz.answerList.length, 0)
  assert.equal(quiz.mistakenWords.length, 0)
  assert.deepEqual(new Set(quiz.options), new Set(['book', 'table']))
})

test('English pronunciation uses the English word in either direction', () => {
  const quiz = createQuiz()
  quiz.listWords = [{ en: 'book', ru: 'книга', part_of_speech: 'n' }]
  const originalWindow = globalThis.window
  const spoken = []
  globalThis.window = {
    SpeechSynthesisUtterance: class {
      constructor(text) { this.text = text }
    },
    speechSynthesis: { speak(utterance) { spoken.push(utterance) } },
  }
  try {
    quiz.speakCorrectAnswer()
    quiz.settings.trans = 'en-ru'
    quiz.speakCorrectAnswer()
    assert.deepEqual(spoken.map(item => [item.text, item.lang]), [
      ['book', 'en-US'],
      ['book', 'en-US'],
    ])
    spoken[0].onerror()
    assert.match(quiz.speechError, /Unable to play/)
    globalThis.window.speechSynthesis = undefined
    quiz.speakCorrectAnswer()
    assert.match(quiz.speechError, /not supported/)
  } finally {
    globalThis.window = originalWindow
  }
})

test('English pronunciation includes all irregular verb forms', () => {
  const quiz = createQuiz()
  quiz.settings.quiz = 'verbs'
  quiz.listWords = [{ infinitive: 'go', past: 'went', past_participle: 'gone', translation: 'идти' }]
  const originalWindow = globalThis.window
  let spoken
  globalThis.window = {
    SpeechSynthesisUtterance: class {
      constructor(text) { this.text = text }
    },
    speechSynthesis: { speak(utterance) { spoken = utterance } },
  }
  try {
    quiz.speakCorrectAnswer()
    assert.equal(spoken.text, 'go, went, gone')
    assert.equal(spoken.lang, 'en-US')
  } finally {
    globalThis.window = originalWindow
  }
})

test('keyboard shortcuts respect input, overlays, modifiers and buttons', () => {
  const quiz = createQuiz()
  const originalDocument = globalThis.document
  const originalHTMLElement = globalThis.HTMLElement
  class Element {
    constructor(tag = 'body', isContentEditable = false) {
      this.tag = tag
      this.isContentEditable = isContentEditable
    }
    matches(selector) { return selector.split(', ').includes(this.tag) }
    closest() { return this.tag === 'button' ? this : null }
  }
  globalThis.HTMLElement = Element
  let overlay = false
  globalThis.document = { querySelector: () => overlay ? {} : null }
  const calls = []
  quiz.options = ['one', 'two']
  quiz.handleMultipleChoice = option => calls.push(option)
  quiz.checkAnswer = () => calls.push('check')
  quiz.nextWord = () => calls.push('next')
  const press = (key, target = new Element(), extra = {}) => {
    let prevented = false
    quiz.handleKey({ key, target, preventDefault() { prevented = true }, ...extra })
    return prevented
  }
  try {
    assert.equal(press('1'), true)
    assert.equal(press('2', new Element('input')), false)
    assert.equal(press('2', new Element(), { ctrlKey: true }), false)
    assert.equal(press('2', new Element(), { repeat: true }), false)
    assert.equal(press('9'), false)
    assert.equal(press('0'), false)
    quiz.options = Array.from({ length: 10 }, (_, index) => `option ${index + 1}`)
    assert.equal(press('0'), true)
    overlay = true
    assert.equal(press('2'), false)
    assert.equal(press('Enter'), false)
    overlay = false
    assert.equal(press('Enter', new Element('button')), false)
    assert.equal(press('Enter', new Element('textarea')), false)
    quiz.settings.mode = 'manual'
    assert.equal(press('Enter', new Element('input')), true)
    quiz.isBtnAnswer = false
    quiz.isBtnContinue = true
    assert.equal(press('Enter'), true)
    assert.deepEqual(calls, ['one', 'option 10', 'check', 'next'])
  } finally {
    globalThis.document = originalDocument
    globalThis.HTMLElement = originalHTMLElement
  }
})

test('correct answers do not add words to the review list', () => {
  const quiz = createQuiz()
  quiz.reviewWords = [{ en: 'book', ru: 'книга', part_of_speech: 'n' }]
  quiz.optionWords = [...quiz.reviewWords]
  quiz.loadWords()
  quiz.userAnswer = 'book'
  quiz.checkAnswer()
  clearTimeout(quiz.nextWordTimeout)
  assert.equal(quiz.mistakenWords.length, 0)
})

test('remaining count excludes an incorrect answer when retrying is disabled', () => {
  const quiz = createQuiz()
  quiz.settings.lastMistake = false
  quiz.reviewWords = [{ en: 'book', ru: 'книга', part_of_speech: 'n' }]
  quiz.optionWords = [...quiz.reviewWords]
  quiz.loadWords()
  quiz.userAnswer = 'wrong'
  quiz.checkAnswer()
  assert.equal(quiz.stats.remained, 0)
  assert.equal(quiz.mistakenWords.length, 1)
})

test('mobile answer option count is passed to the quiz and desktop retains ten options', () => {
  const emitted = []
  const settings = {
    ...settingsComponent.data(),
    xs: true,
    selectedQuiz: 'words',
    selectedTrans: 'ru-en',
    selectedMod: 'list',
    levels: ['level'],
    units: ['level/unit'],
    countWords: 10,
    favorites: {},
    mistakes: {},
    getSelectedWords() { return Array.from({ length: 10 }, (_, index) => ({ en: `answer ${index}`, ru: `слово ${index}` })) },
    $emit(name, value) { emitted.push([name, value]) },
  }
  assert.equal(settings.mobileAnswerOptions, 4)
  for (let count = 4; count <= 10; count++) {
    settings.mobileAnswerOptions = count
    settingsComponent.methods.startQuiz.call(settings)
    const quizSettings = emitted.at(-1)[1]
    assert.equal(quizSettings.countAnswerOptions, count)
    const quiz = createQuiz()
    quiz.countAnswerOptions = quizSettings.countAnswerOptions
    quiz.optionWords = Array.from({ length: 10 }, (_, index) => ({ en: `answer ${index}`, ru: `слово ${index}` }))
    const options = quiz.generateOptions('answer 0')
    assert.equal(options.length, count)
    assert.ok(options.includes('answer 0'))
  }
  settings.xs = false
  settingsComponent.methods.startQuiz.call(settings)
  assert.equal(emitted.at(-1)[1].countAnswerOptions, 10)
})

test('a small favorite selection remains usable with fewer distractors', () => {
  const emitted = []
  const settings = {
    ...settingsComponent.data(),
    xs: true,
    selectedQuiz: 'words',
    selectedTrans: 'ru-en',
    selectedMod: 'list',
    levels: ['level'],
    units: ['level/unit'],
    countWords: 1,
    favorites: {},
    mistakes: {},
    getSelectedWords() { return [{ en: 'book', ru: 'книга' }] },
    $emit(name, value) { emitted.push([name, value]) },
  }
  settingsComponent.methods.startQuiz.call(settings)
  assert.equal(emitted.at(-1)[1].countAnswerOptions, 4)
})

test('favorite and difficult filters are passed through settings', () => {
  const word = { en: 'book', ru: 'книга' }
  const key = wordKey(word, 'words')
  const emitted = []
  const settings = {
    ...settingsComponent.data(), xs: true, selectedQuiz: 'words', selectedMod: 'manual',
    selectedTrans: 'ru-en', levels: [], units: [], favorites: {[key]: true}, mistakes: {[key]: 1},
    getSelectedWords() { return [word] }, $emit(name, value) { emitted.push([name, value]) },
  }
  settings.wordFilter = 'difficult'
  settingsComponent.methods.startQuiz.call(settings)
  assert.equal(emitted.length, 0)
  assert.match(settings.snackbar.text, /No words/)
  settings.mistakes[key] = 2
  settingsComponent.methods.startQuiz.call(settings)
  assert.equal(emitted.at(-1)[1].wordFilter, 'difficult')
  settings.wordFilter = 'favorites'
  settingsComponent.methods.startQuiz.call(settings)
  assert.equal(emitted.at(-1)[1].wordFilter, 'favorites')
})

test('quiz state restores an incorrect attempt without counting it again', () => {
  const quiz = createQuiz()
  const events = []
  quiz.$emit = (name, value) => events.push([name, value])
  quiz.reviewWords = [{ en: 'book', ru: 'книга', part_of_speech: 'n' }]
  quiz.optionWords = [...quiz.reviewWords]
  quiz.loadWords()
  quiz.userAnswer = 'wrong'
  quiz.checkAnswer()
  const state = JSON.parse(JSON.stringify(events.filter(([name]) => name === 'checkpoint').at(-1)[1]))
  const restored = createQuiz()
  const restoredEvents = []
  restored.$emit = (name, value) => restoredEvents.push([name, value])
  restored.restoreState(state)
  assert.equal(restored.stats.incorrect, 1)
  assert.equal(restored.answerList.length, 1)
  assert.equal(restored.isBtnContinue, true)
  assert.equal(restoredEvents.filter(([name]) => name === 'mistake').length, 0)
  assert.equal(events.filter(([name]) => name === 'mistake').length, 1)
})

test('learning data round trips and malformed data is rejected', () => {
  let value = null
  const storage = { getItem() { return value }, setItem(key, data) { value = data } }
  const data = readLearningData(storage)
  data.favorites.book = true
  data.mistakes.book = 2
  data.history.push({ score: 80 })
  writeLearningData(storage, data)
  assert.deepEqual(readLearningData(storage), data)
  value = '{"history":[]}'
  assert.throws(() => readLearningData(storage), /invalid format/)
})

test('filtered quizzes retain distractors from the selected units', () => {
  const [level, units] = Object.entries(allWords)[0]
  const [unit, words] = Object.entries(units).find(([, list]) => list.length >= 10)
  const quiz = createQuiz()
  quiz.settings = { quiz: 'words', trans: 'ru-en', mode: 'list', lastMistake: false,
    levels: [level], units: [`${level}/${unit}`], wordFilter: 'favorites' }
  quiz.favorites[wordKey(words[0], 'words')] = true
  quiz.loadWords()
  assert.equal(quiz.stats.total, 1)
  assert.ok(quiz.options.length > 1)
  assert.ok(quiz.options.includes(quiz.splitWord(words[0].en)))
  delete quiz.favorites[wordKey(words[0], 'words')]
  quiz.restartQuiz()
  assert.equal(quiz.stats.total, 1)
  assert.equal(quiz.currentWord.en, words[0].en)
})

test('study cards restore and start the same quiz', () => {
  const [level, units] = Object.entries(allWords)[0]
  const [unit, words] = Object.entries(units).find(([, list]) => list.length >= 3)
  const quiz = createQuiz()
  const events = []
  quiz.$emit = (name, value) => events.push([name, value])
  quiz.settings = {quiz: 'words', trans: 'ru-en', mode: 'manual', lastMistake: true,
    levels: [level], units: [`${level}/${unit}`], wordFilter: 'all', studyFirst: true}
  quiz.loadWords()
  assert.equal(quiz.studyWords.length, words.length)
  quiz.changeStudyIndex(1)
  const state = JSON.parse(JSON.stringify(events.filter(([name]) => name === 'checkpoint').at(-1)[1]))
  const restored = createQuiz()
  restored.settings = quiz.settings
  restored.restoreState(state)
  assert.equal(restored.studying, true)
  assert.equal(restored.studyIndex, 1)
  restored.startStudiedQuiz()
  assert.equal(restored.studying, false)
  assert.equal(restored.stats.total, words.length)
  assert.deepEqual(restored.studyWords, quiz.studyWords)
})

test('study card pronunciation uses the displayed word and verb forms', () => {
  const quiz = createQuiz()
  const originalWindow = globalThis.window
  const spoken = []
  globalThis.window = {
    SpeechSynthesisUtterance: class { constructor(text) { this.text = text } },
    speechSynthesis: { speak(utterance) { spoken.push(utterance) } },
  }
  try {
    quiz.studyWords = [{ en: 'book', ru: 'книга' }, { en: 'table', ru: 'стол' }]
    quiz.speakEnglish(quiz.studyWords[0])
    quiz.changeStudyIndex(1)
    quiz.speakEnglish(quiz.studyWords[quiz.studyIndex])
    quiz.settings.quiz = 'verbs'
    quiz.speakEnglish({ infinitive: 'go', past: 'went', past_participle: 'gone' })
    assert.deepEqual(spoken.map(item => [item.text, item.lang]), [
      ['book', 'en-US'], ['table', 'en-US'], ['go, went, gone', 'en-US'],
    ])
    spoken[2].onerror()
    assert.match(quiz.speechError, /Unable to play/)
    globalThis.window.speechSynthesis = undefined
    quiz.speakEnglish(quiz.studyWords[0])
    assert.match(quiz.speechError, /not supported/)
  } finally {
    globalThis.window = originalWindow
  }
})
