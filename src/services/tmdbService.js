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

  searchMovie (query, page = 1) {
    return this._request('search/movie', { query, page })
  }

  getMoviesGenres () {
    return this._request('genre/movie/list')
  }
  // getMovieDetails ()
  // TODO разобраться какие методы писать сюда, а какие в utils
}
