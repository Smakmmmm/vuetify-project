<template>
  <HomeAppBar v-model:search-text="searchQuery" />
  <!--TODO разделить популярные филмы и поиск
  TODO то есть популярные будут по: /, а поисковые по /search-->
  <v-card>
    <v-layout>
      <NavigationDrawer />

      <v-main class="fill-height">
        <v-container>
          <v-row>
            <v-col
              v-for="movie in movies"
              :key="movie.id"
              cols="12"
              lg="3"
              md="4"
              sm="6"
            >
              <!--<v-card class="mx-auto">
                <v-img
                  cover
                  height="400px"
                  :src="service.getImageUrl(movie.poster_path)"
                />

                <v-card-title>
                  {{ movie.title }}
                </v-card-title>

                <v-card-subtitle>
                  Дата выхода: {{ movie.release_date }}
                </v-card-subtitle>

                <v-card-subtitle>
                  Жанры: {{ getGenre(movie.genre_ids) }}
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    color="primary"
                    :to="'/movie/' + movie.id"
                    variant="text"
                  >
                    Подробнее
                  </v-btn>

                  <v-spacer />

                  <v-chip color="orange" size="small">
                    {{ movie.vote_average.toFixed(1) }}
                  </v-chip>
                </v-card-actions>
              </v-card>-->
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>

  <!--<div class="text-center">
    <v-pagination
      v-model="page"
      :length="totalPages"
      rounded="circle"
      :total-visible="7"
    />
  </div>-->
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue'
  import HomeAppBar from '@/components/HomeAppBar.vue'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'
  import TmdbService from '@/components/TmdbService.js'

  /** @type {import('vue').Ref<Object<number, string>>} */
  const genresMap = ref({})
  const service = new TmdbService()
  const movies = ref([])
  const page = ref(1)
  const totalPages = ref(1)

  onMounted(async () => {
    const data = await service.getMoviesGenres()

    if (data && data.genres) {
      for (const g of data.genres) {
        genresMap.value[g.id] = g.name
      }
    }
  })

  function getGenre (ids) {
    if (!ids || ids.length === 0) {
      return 'Неизвестно'
    }

    return ids
      .map(id => genresMap.value[id])
      .filter(Boolean)
      .join(', ')
  }

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
