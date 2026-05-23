<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import router from '@/router'

  const route = useRoute()

  const searchQuery = computed({
    get: () => route.query.query || '',
    set: value => {
      if (!value.trim()) {
        router.push('/')
        return
      }

      router.replace({
        path: '/search/movie',
        query: {
          query: value,
        },
      })
    },
  })
</script>

<template>
  <v-app-bar :elevation="5">
    <v-app-bar-title>VIDEOSOS</v-app-bar-title>

    <v-btn />

    <template #append>
      <v-btn
        icon="mdi-heart"
        @click="router.push('/movie/favorites')"
      />

      <v-btn icon="mdi-dots-vertical" />
    </template>

    <!-- TODO Сделать поле поиска закругленным. Мб еще поработать со стилями!! -->
    <v-text-field
      v-model="searchQuery"
      flat
      hide-details
      label="Search"
      prepend-inner-icon="mdi-magnify"
      single-line
      variant="solo-filled"
    />
  </v-app-bar>
</template>
