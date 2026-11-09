export function mergeWordEntries(words, quiz) {
  const titleKey = quiz === 'verbs' ? 'infinitive' : 'en'
  const groups = new Map()
  const result = []

  for (const word of words) {
    const title = word[titleKey]
    const key = typeof title === 'string' ? title.trim().replace(/\s+/g, ' ').toLowerCase() : ''
    let group = key ? groups.get(key) : undefined
    if (!group) {
      group = { values: new Map(), original: word }
      result.push(group)
      if (key) groups.set(key, group)
    }

    for (const [field, value] of Object.entries(word)) {
      if (typeof value !== 'string' || !value.trim()) continue
      if (!group.values.has(field)) group.values.set(field, new Map())
      const normalized = value.trim().replace(/\s+/g, ' ').toLowerCase()
      if (!group.values.get(field).has(normalized)) {
        group.values.get(field).set(normalized, value.trim())
      }
    }
  }

  return result.map(({ values, original }) => {
    const entry = { ...original }
    for (const [field, variants] of values) {
      const items = [...variants.values()]
      if (field === titleKey || field === 'pronunciation') entry[field] = items[0]
      else entry[field] = items.join(field === 'example' ? '<br>' : '; ')
      if ((quiz === 'verbs' && ['infinitive', 'past', 'past_participle'].includes(field)) ||
          (quiz !== 'verbs' && ['en', 'ru'].includes(field))) {
        entry[field] = entry[field].toLowerCase()
      }
    }
    return entry
  })
}
