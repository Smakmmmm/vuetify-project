<template>
  <v-card>
    <v-layout>
      <div class="w-100">
        <v-img
          v-if="movie?.backdrop_path"
          class="mb-6 rounded-lg"
          cover
          height="400px"
          :src="getImageUrl(movie.backdrop_path, 'w1280')"
        />

        <v-container v-if="movie">

          <v-row>
            <v-col
              cols="12"
              lg="3"
              md="4"
            >
              <v-img
                cover
                height="500px"
                :src="getImageUrl(movie.poster_path, 'w500')"
              />
            </v-col>

            <v-col
              cols="12"
              lg="9"
              md="8"
            >
              <v-card-title class="text-headline-large">
                {{ movie.title }}
              </v-card-title>

              <v-chip
                v-for="genre in movie.genres"
                :key="genre.id"
                class="ml-4"
              >
                {{ genre.name }}
              </v-chip>

              <v-card-subtitle class="mt-2">
                {{ movie.release_date }}
              </v-card-subtitle>

              <v-card-text>
                {{ movie.overview }}
              </v-card-text>

              <v-card-title class="text-headline-small">
                About the film
              </v-card-title>

              <v-card-subtitle>
                Production Companies {{ movie.production_companies.map(companies => companies.name).join(', ') }}
              </v-card-subtitle>

              <v-card-subtitle>
                Rating {{ movie.vote_average.toFixed(1) }}  •  {{ movie.vote_count }} ratings
              </v-card-subtitle>

              <v-card-subtitle>
                Time {{ movie.runtime }} minutes
              </v-card-subtitle>

              <v-card-subtitle
                class="mt-10"
              >
                <v-btn
                  @click="
                    favoritesStore.isFavorite(movie.id)
                      ? favoritesStore.removeFavorite(movie.id)
                      : favoritesStore.addFavorite(movie)
                  "
                >
                  Добавить в избранное
                </v-btn>
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-container>

        <div class="px-15">
          <MovieRecommendations
            class="mt-6 mb-10"
            :genres-map="genresMap"
            :movie-id="movieId"
          />
        </div>
      </div>
    </v-layout>
  </v-card>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import MovieRecommendations from '@/components/movies/MovieRecommendations.vue'
  import { useGenres } from '@/composables/useGenres.js'
  import tmdbService from '@/services/tmdbService.js'
  import { useFavoriteMoviesStore } from '@/stores/favoriteMoviesStore.js'
  import { getImageUrl } from '@/utils/tmdb.js'

  const route = useRoute()

  const movieId = String(route.params.id)

  const movie = ref(null)

  const service = new tmdbService()

  onMounted(async () => {
    movie.value = await service.getMovieDetails(movieId)
  })

  const { genresMap } = useGenres()

  const favoritesStore = useFavoriteMoviesStore()
</script>
