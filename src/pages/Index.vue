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
  import { ref, watch } from 'vue'
  import HomeAppBar from '@/components/HomeAppBar.vue'
  import MoviesGrid from '@/components/movies/MoviesGrid.vue'
  import MoviesPagination from '@/components/movies/MoviesPagination.vue'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'
  import TmdbService from '@/components/TmdbService.js'
  import { useMovies } from '@/composables/useMovies.js'
  import router from '@/router/Index.js'

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
