import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/Index.vue'
import MovieDetails from '@/pages/MovieDetails.vue'
import MovieSearch from '@/pages/MovieSearch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },
    {
      path: 'search/movie',
      name: 'search-movie',
      component: MovieSearch,
      props: true,
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: MovieDetails,
      props: true,
    },
  ],
})

export default router
