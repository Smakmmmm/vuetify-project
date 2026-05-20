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
  import { ref, watch } from 'vue'
  import MoviesGrid from '@/components/movies/MoviesGrid.vue'
  import MoviesPagination from '@/components/movies/MoviesPagination.vue'
  import { useMovies } from '@/composables/useMovies.js'
  import router from '@/router/index.js'
  import TmdbService from '@/services/tmdbService.js'

  const searchQuery = ref('')

  const service = new TmdbService()
  const {
    movies,
    page,
    totalPages,
    genresMap,
  } = useMovies(service.getPopularMovies.bind(service))

  watch(searchQuery, () => {
    if (!String(searchQuery.value).trim()) {
      return
    }

    router.push({
      path: '/search/movie',
      query: {
        query: searchQuery.value,
      },
    })
  })
</script>
