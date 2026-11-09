import assert from 'node:assert/strict'
import { test } from 'node:test'
import { rules } from '../src/data/modalVerb.js'
import { filterModalVerbs } from '../src/data/modalVerbReference.js'

test('every modal verb has accessible examples and rules in each section', () => {
  assert.equal(rules.length, 11)
  for (const item of rules) {
    assert.ok(item.name)
    for (const section of ['times', 'uses', 'features']) {
      assert.ok(item[section].length, `${item.name}: ${section}`)
      for (const entry of item[section]) {
        assert.ok(entry.name)
        assert.ok(entry.example.length)
        for (const example of entry.example) assert.equal(typeof example.first, 'string')
      }
    }
    assert.ok(item.rules.length)
    for (const rule of item.rules) assert.ok(rule.name && rule.text)
  }
})

test('modal verb search supports both conjunctions, partial names and empty results', () => {
  assert.equal(filterModalVerbs(rules, '  ').length, 11)
  assert.deepEqual(filterModalVerbs(rules, ' CAN AND COULD ').map(item => item.name), ['Can и Could'])
  assert.deepEqual(filterModalVerbs(rules, 'can и could').map(item => item.name), ['Can и Could'])
  assert.deepEqual(filterModalVerbs(rules, 'ought').map(item => item.name), ['Should и Ought to'])
  assert.deepEqual(filterModalVerbs(rules, 'not a verb'), [])
})
