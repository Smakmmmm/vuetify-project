<template>
  <v-card>
    <v-layout>
      <MoviesGrid
        :genres-map="genresMap"
        :movies="movies"
      />
    </v-layout>
  </v-card>

  <MoviesPagination
    :page="page"
    :total-pages="totalPages"
    @update:page="page = $event"
  />
</template>

<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import MoviesGrid from '@/components/movies/MoviesGrid.vue'
  import MoviesPagination from '@/components/movies/MoviesPagination.vue'
  import { useMovies } from '@/composables/useMovies.js'
  import TmdbService from '@/services/tmdbService.js'

  const route = useRoute()

  const searchQuery = computed(
    () => route.query.query || '',
  )

  const service = new TmdbService()

  const {
    movies,
    page,
    totalPages,
    genresMap,
  } = useMovies(
    page => service.searchMovie(searchQuery.value, page),
    searchQuery,
  )
</script>
