import assert from 'node:assert/strict'
import { test } from 'node:test'
import { aspects, filterTenses, forms, periods, tenses } from '../src/data/tenseReference.js'

test('all twelve tenses have complete bilingual details and three forms', () => {
  assert.equal(tenses.length, 12)
  assert.equal(new Set(tenses.map(item => item.name)).size, 12)
  for (const aspect of aspects) {
    for (const period of periods) {
      const item = tenses.find(tense => tense.name === `${period} ${aspect}`)
      assert.ok(item, `${period} ${aspect}`)
      assert.equal(item.period, period)
      assert.equal(item.aspect, aspect)
      assert.equal(item.formulas.length, forms.length)
      for (const form of forms) {
        assert.ok(item.examples[form].en)
        assert.ok(item.examples[form].ru)
      }
      for (const language of ['en', 'ru']) assert.ok(item.use[language].length)
      assert.ok(item.markers)
      assert.doesNotMatch(item.markers, /untill/)
    }
  }
})

test('period and search filters work together and search localized explanations', () => {
  assert.equal(filterTenses(tenses, 'All', '', 'en').length, 12)
  assert.equal(filterTenses(tenses, 'Past', '', 'en').length, 4)
  assert.deepEqual(filterTenses(tenses, 'Present', ' perfect continuous ', 'en').map(item => item.name), ['Present Perfect Continuous'])
  assert.deepEqual(filterTenses(tenses, 'Past', 'tomorrow', 'en'), [])
  assert.ok(filterTenses(tenses, 'All', 'прогнозы', 'ru').some(item => item.name === 'Future Simple'))
  assert.ok(filterTenses(tenses, 'All', 'PROMISES', 'en').some(item => item.name === 'Future Simple'))
})
