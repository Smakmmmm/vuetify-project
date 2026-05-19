import { ref, watch } from 'vue'
import { useGenres } from './useGenres.js'

export function useMovies (loader, dependency) {
  /** @type {import('vue').Ref<Object<number, string>>} */
  const { genresMap } = useGenres()

  const movies = ref([])
  const page = ref(1)
  const totalPages = ref(1)

  async function loadMovies () {
    try {
      const data = await loader(page.value)

      movies.value = data.results

      totalPages.value = Math.min(data.total_pages, 500)
    } catch (error) {
      console.error(error)
    }
  }

  watch(page, loadMovies, { immediate: true })

  let timer = null

  if (dependency) {
    watch(dependency, async () => {
      clearTimeout(timer)

      timer = setTimeout(() => {
        if (page.value !== 1) {
          page.value = 1
          return
        }

        loadMovies()
      }, 500)
    })
  }

  return {
    movies,
    page,
    totalPages,
    genresMap,
  }
}
