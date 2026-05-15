<template>
  <HomeAppBar v-model:search-text="searchQuery" />

  <v-card>
    <v-layout>
      <NavigationDrawer />

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
  import { computed, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import HomeAppBar from '@/components/HomeAppBar.vue'
  import MoviesGrid from '@/components/movies/MoviesGrid.vue'
  import MoviesPagination from '@/components/movies/MoviesPagination.vue'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'
  import { useMovies } from '@/composables/useMovies.js'
  import router from '@/router/index.js'
  import TmdbService from '@/services/tmdbService.js'

  const route = useRoute()

  const searchQuery = computed({
    get: () => route.query.query || '',
    set: value => {
      router.replace({
        path: '/search/movie',
        query: {
          query: value,
        },
      })
    },
  })

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

  watch(searchQuery, value => {
    if (!String(value).trim()) {
      router.replace({
        path: '/',
      })
    }
  })
</script>
