function normalizeText(text) {
  return text.toLowerCase().replace(/[’`]/g, "'")
    .replace(/[^\p{L}\p{N}']+/gu, ' ').replace(/\s+/g, ' ').trim()
}

export function gapExample(word) {
  if (typeof word.example !== 'string' || typeof word.en !== 'string') return null
  const variants = word.en.split(',').map(value => value.trim())
  if (variants.some(value => !value || /[()[\]<>]/.test(value))) return null
  const text = new DOMParser().parseFromString(word.example, 'text/html').body.textContent
  const answers = []
  let masked = text
  for (const variant of variants.sort((a, b) => b.length - a.length)) {
    const escaped = variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(`(^|[^\\p{L}\\p{N}])(${escaped})(?=$|[^\\p{L}\\p{N}])`, 'giu')
    let found = false
    masked = masked.replace(pattern, (_, prefix) => {
      found = true
      return `${prefix}_____`
    })
    if (found) answers.push(variant)
  }
  return answers.length ? {question: masked, answers} : null
}

export function pairTokens(value) {
  return value.split(/[,;/]/).flatMap(part => [
    part.replace(/\([^)]*\)/g, ''),
    ...Array.from(part.matchAll(/\(([^()]*)\)/g), match => match[1]),
  ]).map(normalizeText).filter(Boolean)
}

export function pairConflicts(first, second) {
  const english = pairTokens(first.en)
  const russian = pairTokens(first.ru)
  return pairTokens(second.en).some(value => english.includes(value)) ||
    pairTokens(second.ru).some(value => russian.includes(value))
}
