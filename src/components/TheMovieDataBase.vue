<template>
  <HomeAppBar v-model:search-text="searchQuery" />
  <!--TODO разделить популярные филмы и поиск
  TODO то есть популярные будут по: /, а поисковые по /search-->
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
  />
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue'
  import HomeAppBar from '@/components/HomeAppBar.vue'
  import MoviesGrid from '@/components/movies/MoviesGrid.vue'
  import MoviesPagination from '@/components/movies/MoviesPagination.vue'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'
  import TmdbService from '@/components/TmdbService.js'

  /** @type {import('vue').Ref<Object<number, string>>} */
  const genresMap = ref({})
  const service = new TmdbService()
  const movies = ref([])
  const page = ref(1)
  const totalPages = ref(1)

  /* onMounted(async () => {
    const data = await service.getMoviesGenres()

    if (data && data.genres) {
      for (const g of data.genres) {
        genresMap.value[g.id] = g.name
      }
    }
  }) */

  const searchQuery = ref('')
  let timer = null

  async function loadMovies () {
    try {
      const data = await (searchQuery.value ? service.searchMovie(searchQuery.value, page.value) : service.getPopularMovies(page.value))

      movies.value = data.results

      totalPages.value = Math.min(data.total_pages, 500)
    } catch (error) {
      console.error(error)
    }
  }

  watch(searchQuery, () => {
    page.value = 1
    clearTimeout(timer)
    timer = setTimeout(() => {
      loadMovies()
    }, 500)
  })

  watch(page, loadMovies, { immediate: true })
</script>
