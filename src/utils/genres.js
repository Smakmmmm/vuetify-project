export function getGenres (ids, genresMap) {
  if (!ids || ids.length === 0) {
    return 'Неизвестно'
  }

  return ids
    .map(id => genresMap[id])
    .filter(Boolean)
    .join(', ')
}
