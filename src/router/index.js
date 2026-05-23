import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/MainLayout.vue'
import FavoriteMovies from '@/pages/FavoriteMovies.vue'
import MovieDetails from '@/pages/MovieDetails.vue'
import MovieSearch from '@/pages/MovieSearch.vue'
import PopularMovies from '@/pages/PopularMovies.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main-layout',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: PopularMovies,
        },
        {
          path: 'search/movie',
          name: 'search-movie',
          component: MovieSearch,
          props: true,
        },
        {
          path: 'movie/:id',
          name: 'movie-detail',
          component: MovieDetails,
          props: true,
        },
        {
          path: 'movie/favorites',
          name: 'movie-favorites',
          component: FavoriteMovies,
        },
      ],
    },
  ],
})

export default router
