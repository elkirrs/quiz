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
after(() => server.close())

function createQuiz() {
  const quiz = {
    ...component.data(),
    settings: { quiz: 'words', trans: 'ru-en', mode: 'list', lastMistake: true, units: [] },
    countAnswerOptions: 10,
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

test('selected answer count determines the minimum number of words', () => {
  const emitted = []
  const settings = {
    ...settingsComponent.data(),
    xs: true,
    selectedQuiz: 'words',
    selectedTrans: 'ru-en',
    selectedMod: 'list',
    levels: ['level'],
    units: ['level/unit'],
    countWords: 3,
    $emit(name, value) { emitted.push([name, value]) },
  }
  settingsComponent.methods.startQuiz.call(settings)
  assert.equal(emitted.length, 0)
  assert.match(settings.snackbar.text, /at least 4 words/)
  settings.countWords = 4
  settingsComponent.methods.startQuiz.call(settings)
  assert.equal(emitted.at(-1)[1].countAnswerOptions, 4)
})
