<script setup>
  import { getImageUrl } from '../TmdbService.js'

  defineProps({
    movie: {
      type: Object,
      required: true,
    },
    genres: {
      type: Map,
      required: true,
    },
  })
</script>

<template>
  <v-card class="mx-auto">
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
  </v-card>
</template>
