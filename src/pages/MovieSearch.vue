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
  />
</template>

<script setup>
  import { ref } from 'vue'
  import HomeAppBar from '@/components/HomeAppBar.vue'
  import MoviesGrid from '@/components/movies/MoviesGrid.vue'
  import MoviesPagination from '@/components/movies/MoviesPagination.vue'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'

  const searchQuery = ref('')
</script>
