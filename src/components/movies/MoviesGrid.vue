<script setup>
  import { getGenres } from '@/utils/genres.js'
  import MovieCard from './MovieCard.vue'

  defineProps({
    movies: {
      type: Array,
      required: true,
    },
    genresMap: {
      type: Object,
      required: true,
    },
  })
</script>

<template>
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

          <MovieCard
            :genres="getGenres(movie.genre_ids, genresMap)"
            :movie="movie"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
