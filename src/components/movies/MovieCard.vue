<script setup>
  import { getImageUrl } from '@/utils/tmdb.js'

  defineProps({
    movie: {
      type: Object,
      required: true,
    },
    genres: {
      type: String,
      required: true,
    },
  })
</script>

<template>
  <v-card class="mx-auto">
    <v-img
      cover
      height="400px"
      :src="getImageUrl(movie.poster_path, 'w500')"
    />

    <v-card-title>
      {{ movie.title }}
    </v-card-title>

    <v-card-subtitle>
      Дата выхода: {{ movie.release_date }}
    </v-card-subtitle>

    <v-card-subtitle>
      Жанры: {{ genres }}
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
        {{ Number(movie.vote_average).toFixed(1) }}
      </v-chip>
    </v-card-actions>
  </v-card>
</template>
