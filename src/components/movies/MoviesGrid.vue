<script setup>
  import MovieCard from './MovieCard.vue'

  const props = defineProps({
    movies: {
      type: Array,
      required: true,
    },
    genresMap: {
      type: Object,
      required: true,
    },
  })

  function getGenre (ids) {
    if (!ids || ids.length === 0) {
      return 'Неизвестно'
    }

    return ids
      .map(id => props.genresMap[id])
      .filter(Boolean)
      .join(', ')
  }
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
            :genres="getGenre(movie.genre_ids)"
            :movie="movie"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
