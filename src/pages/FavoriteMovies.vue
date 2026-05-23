<template>
  <v-card>
    <v-layout>
      <MoviesGrid
        :genres-map="genresMap"
        :movies="favoritesStore.favoriteMovies"
      />
    </v-layout>
  </v-card>
</template>

<script setup>
  import MoviesGrid from '@/components/movies/MoviesGrid.vue'
  import { useGenres } from '@/composables/useGenres.js'
  import { useFavoriteMoviesStore } from '@/stores/favoriteMoviesStore.js'

  const favoritesStore = useFavoriteMoviesStore()

  const { genresMap } = useGenres()
</script>
