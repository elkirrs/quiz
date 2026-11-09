export function filterModalVerbs(items, search) {
  const query = search.trim().toLocaleLowerCase()
  return items.filter(item => {
    const name = item.name.toLocaleLowerCase()
    return name.includes(query) || name.replaceAll(' и ', ' and ').includes(query)
  })
}
