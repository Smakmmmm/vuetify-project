import { onMounted, ref } from 'vue'
import TmdbService from '@/services/tmdbService.js'

export function useGenres () {
  const service = new TmdbService()

  /** @type {import('vue').Ref<Object<number, string>>} */
  const genresMap = ref({})

  onMounted(async () => {
    const data = await service.getMoviesGenres()

    if (data && data.genres) {
      for (const genre of data.genres) {
        genresMap.value[genre.id] = genre.name
      }
    }
  })

  return { genresMap }
}
