import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer } from 'vite'

const server = await createServer({
  appType: 'custom',
  server: { middlewareMode: true, hmr: false },
  ssr: { noExternal: ['vuetify'] },
})
const { default: component } = await server.ssrLoadModule('/src/components/QuizResult.vue')
after(() => server.close())

function createResults(answerList) {
  const result = { ...component.data(), answerList, $t: key => key, $emit() {} }
  for (const [name, method] of Object.entries(component.methods)) result[name] = method.bind(result)
  for (const [name, getter] of Object.entries(component.computed)) {
    if (typeof getter === 'function') Object.defineProperty(result, name, { get: getter.bind(result) })
  }
  return result
}

test('answer results preserve attempts and format verb forms without mutating data', () => {
  const answers = [
    { answer: { question: 'go', correctAnswer: ['gone', 'go', 'went'] }, input: ['went', 'go', 'gone'], isCorrect: true },
    { answer: { question: 'go', correctAnswer: 'идти' }, input: 'ошибка', isCorrect: false },
  ]
  const results = createResults(answers)
  assert.equal(results.flattenedAnswers.length, 2)
  assert.deepEqual(results.flattenedAnswers[0], {
    question: 'go', correctAnswer: 'go, gone, went', userAnswer: 'go, gone, went', isCorrect: true,
  })
  assert.equal(results.flattenedAnswers[1].isCorrect, false)
  assert.deepEqual(answers[0].answer.correctAnswer, ['gone', 'go', 'went'])
  results.search = ' ОШИБКА '
  assert.equal(results.filteredAnswers.length, 1)
  assert.equal(results.filteredAnswers[0].correctAnswer, 'идти')
  results.search = null
  assert.equal(results.filteredAnswers.length, 2)
})

test('answer results paginate and reset both pages on search and new answers', () => {
  const results = createResults(Array.from({ length: 25 }, (_, i) => ({
    answer: { question: `word${i}`, correctAnswer: 'answer' }, input: 'answer', isCorrect: true,
  })))
  assert.equal(results.mobilePageCount, 2)
  results.mobilePage = 2
  assert.equal(results.mobileAnswers.length, 5)
  results.desktopPage = 3
  component.watch.search.call(results)
  assert.equal(results.mobilePage, 1)
  assert.equal(results.desktopPage, 1)
  results.mobilePage = 2
  results.desktopPage = 2
  component.watch.answerList.call(results)
  assert.equal(results.mobilePage, 1)
  assert.equal(results.desktopPage, 1)
  results.search = 'no match'
  assert.equal(results.filteredAnswers.length, 0)
})
