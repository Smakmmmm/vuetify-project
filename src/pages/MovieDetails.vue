<template>
  <HomeAppBar v-model:search-text="searchQuery" />

  <v-card>
    <v-layout>
      <NavigationDrawer />

      <v-container>
        <v-row>
          <v-col
            cols="12"
            lg="3"
            md="4"
          >
            <v-img
              cover
              height="500px"
              :src="getImageUrl(movie.poster_path)"
            />
          </v-col>

          <v-col
            cols="12"
            lg="9"
            md="8"
          >
            INFO
          </v-col>
        </v-row>
      </v-container>
    </v-layout>
  </v-card>
</template>

<script setup>
  import { useRoute } from 'vue-router'
  import HomeAppBar from '@/components/HomeAppBar.vue'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'
  import { getImageUrl } from '@/utils/tmdb.js'

  const route = useRoute()

  const movieId = route.params.id
</script>
