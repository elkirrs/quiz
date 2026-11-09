import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { createServer } from 'vite'

const server = await createServer({
  appType: 'custom',
  server: { middlewareMode: true, hmr: false },
  ssr: { noExternal: ['vuetify'] },
})
const { default: component } = await server.ssrLoadModule('/src/components/QuizTable.vue')
after(() => server.close())

function createList(words, quiz = 'words') {
  const list = { ...component.data(), words, quiz, $t: key => key, $emit() {} }
  for (const [name, method] of Object.entries(component.methods)) list[name] = method.bind(list)
  for (const [name, getter] of Object.entries(component.computed)) {
    if (typeof getter === 'function') Object.defineProperty(list, name, { get: getter.bind(list) })
  }
  return list
}

test('word list searches text and examples, sorts and includes fields from later entries', () => {
  const words = [
    { en: 'Zebra', ru: 'Зебра', example: 'A <b>striped</b> animal.' },
    { en: 'Apple', ru: 'Яблоко', part_of_speech: 'n', pronunciation: '/ˈæpəl/' },
  ]
  const list = createList(words)
  assert.deepEqual(list.filteredWords.map(word => word.en), ['apple', 'zebra'])
  assert.ok(list.headers.some(header => header.key === 'part_of_speech'))
  assert.ok(list.headers.some(header => header.key === 'pronunciation'))
  list.search = ' STRIPED '
  assert.deepEqual(list.filteredWords.map(word => word.en), ['zebra'])
  list.search = null
  assert.equal(list.filteredWords.length, 2)
  assert.equal(words[0].en, 'Zebra')
})

test('irregular verb forms, translation and mobile pagination remain available', () => {
  const words = Array.from({ length: 25 }, (_, i) => ({
    infinitive: `Verb${String(i).padStart(2, '0')}`,
    past: 'WENT',
    past_participle: 'GONE',
    translation: 'идти',
  }))
  const list = createList(words, 'verbs')
  assert.equal(list.mobilePageCount, 2)
  list.mobilePage = 2
  assert.equal(list.mobileWords.length, 5)
  assert.equal(list.mobileWords[0].past, 'went')
  assert.deepEqual(list.mobileHeaders(list.mobileWords[0]).map(header => header.key), ['translation', 'past', 'past_participle'])
  list.search = 'gone'
  assert.equal(list.filteredWords.length, 25)
  list.search = 'unknown'
  assert.equal(list.filteredWords.length, 0)
})

test('searching or replacing words resets both pages', () => {
  const list = createList([])
  list.mobilePage = 3
  list.desktopPage = 4
  component.watch.search.call(list)
  assert.equal(list.mobilePage, 1)
  assert.equal(list.desktopPage, 1)
  list.mobilePage = 2
  list.desktopPage = 2
  component.watch.words.handler.call(list)
  assert.equal(list.mobilePage, 1)
  assert.equal(list.desktopPage, 1)
})

test('duplicate English entries are merged before filtering without losing different details', () => {
  const words = [
    { en: ' Book ', ru: 'Книга', part_of_speech: 'n', pronunciation: '/bʊk/', example: 'A <b>book</b>.' },
    { en: 'book', ru: 'бронировать', part_of_speech: 'v', example: 'Please <b>book</b> a room.' },
    { en: 'BOOK', ru: 'КНИГА', part_of_speech: 'n', example: 'A <b>book</b>.' },
    { en: 'books', ru: 'книги' },
  ]
  const list = createList(words)
  assert.equal(list.mergedWords.length, 2)
  const book = list.mergedWords[0]
  assert.equal(book.en, 'book')
  assert.equal(book.ru, 'книга; бронировать')
  assert.equal(book.part_of_speech, 'n; v')
  assert.equal(book.pronunciation, '/bʊk/')
  assert.equal(book.example, 'A <b>book</b>.<br>Please <b>book</b> a room.')
  list.search = 'room'
  assert.equal(list.filteredWords.length, 1)
  assert.equal(list.filteredWords[0].ru, 'книга; бронировать')
  assert.equal(words[0].en, ' Book ')
})

test('duplicate irregular verbs retain distinct forms and translations', () => {
  const list = createList([
    { infinitive: 'Read', past: 'read', past_participle: 'read', translation: 'читать' },
    { infinitive: 'read', past: 'READ', past_participle: 'read', translation: 'прочитать' },
    { infinitive: 'READ', past: 'read (rare)', past_participle: 'read', translation: 'читать' },
  ], 'verbs')
  assert.equal(list.mergedWords.length, 1)
  assert.equal(list.mergedWords[0].past, 'read; read (rare)')
  assert.equal(list.mergedWords[0].translation, 'читать; прочитать')
  list.search = 'прочитать'
  assert.equal(list.filteredWords.length, 1)
})

test('duplicate words use the first nonempty pronunciation without combining variants', () => {
  const list = createList([
    { en: 'read', ru: 'читать', pronunciation: '  ' },
    { en: 'Read', ru: 'прочитать', pronunciation: '/riːd/' },
    { en: 'READ', ru: 'читал', pronunciation: '/red/' },
  ])
  assert.equal(list.mergedWords.length, 1)
  assert.equal(list.mergedWords[0].pronunciation, '/riːd/')
  assert.equal(list.mergedWords[0].ru, 'читать; прочитать; читал')
  list.search = 'прочитать'
  assert.equal(list.filteredWords[0].pronunciation, '/riːd/')
})
