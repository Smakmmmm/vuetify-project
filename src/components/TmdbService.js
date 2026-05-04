import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US',
  },
})

export default class TmdbService {
  async _request (url, data) {
    const response = await apiClient.get(url, { params: data })
    return response.data
  }

  getPopularMovies (page = 1) {
    return this._request('movie/popular', { page })
  }

  getImageUrl (path) {
    if (!path) {
      return 'null'
    }
    const baseUrl = 'https://image.tmdb.org/t/p/w500'
    return baseUrl + path
  }

  searchMovie (query, page = 1) {
    return this._request('search/movie', { query, page })
  }

  // getMovieDetails ()
}
