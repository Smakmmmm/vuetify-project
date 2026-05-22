// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoriteMoviesStore = defineStore('favorites', () => {
  const favoriteMovies = ref([])

  function addFavorite (movie) {
    if (isFavorite(movie.id)) {
      return
    }

    favoriteMovies.value.push(movie)

    save()
  }

  function removeFavorite (movieId) {
    favoriteMovies.value = favoriteMovies.value.filter(movie => movie.id !== movieId)

    save()
  }

  function isFavorite (movieId) {
    return favoriteMovies.value.some(movie => movie.id === movieId)
  }

  function save () {
    localStorage.setItem(
      'favorites',
      JSON.stringify(
        favoriteMovies.value,
      ),
    )
  }

  function load () {
    favoriteMovies.value = JSON.parse(
      localStorage.getItem(
        'favorites',
      ) || '[]',
    )
  }

  load()

  return {
    favoriteMovies,
    addFavorite,
    removeFavorite,
    isFavorite,
  }
})
