<script setup>
  import { onMounted, ref } from 'vue'
  import MovieCard from '@/components/movies/MovieCard.vue'
  import TmdbService from '@/services/tmdbService.js'
  import { getGenres } from '@/utils/genres.js'

  const props = defineProps({
    movieId: {
      type: String,
      required: true,
    },
    genresMap: {
      type: Object,
      required: true,
    },
  })

  const recommendationMovies = ref([])
  const service = new TmdbService()

  onMounted(async () => {
    const data = await service.getMovieRecommendations(props.movieId)
    recommendationMovies.value = data.results
  })
</script>

<template>
  <v-slide-group
    class="px-4"
    show-arrows
  >
    <v-slide-group-item
      v-for="movie in recommendationMovies"
      :key="movie.id"
    >
      <div
        class="mr-4"
        style="width: 196px"
      >
        <MovieCard
          :genres="getGenres(movie.genre_ids, genresMap)"
          :movie="movie"
        />
      </div>
    </v-slide-group-item>
  </v-slide-group>
</template>
