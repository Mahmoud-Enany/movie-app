const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const requestJson = async (path, params = {}) => {
  if (!API_KEY) {
    throw new Error('Movie service is not available right now.')
  }

  const searchParams = new URLSearchParams({ api_key: API_KEY, ...params })
  const response = await fetch(`${BASE_URL}${path}?${searchParams.toString()}`)

  if (!response.ok) {
    throw new Error('We could not load movie data right now.')
  }

  return response.json()
}

export function getImageUrl(path) {
  return path ? `${IMAGE_BASE_URL}${path}` : null
}

export async function searchMovies(query) {
  const data = await requestJson('/search/movie', {
    query,
    include_adult: 'false',
    language: 'en-US',
    page: '1',
  })

  return data.results ?? []
}

export const getPopularMovies = () => requestJson('/movie/popular')

export const getTopRatedMovies = () => requestJson('/movie/top_rated')

export const getUpcomingMovies = () => requestJson('/movie/upcoming')

export const getNowPlayingMovies = () => requestJson('/movie/now_playing')

export const getMovieDetails = (id) => requestJson(`/movie/${id}`)

export const getMovieTrailer = (id) => requestJson(`/movie/${id}/videos`)

export const getSimilarMovies = (id) => requestJson(`/movie/${id}/similar`)

export function normalizeMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    language: movie.original_language,
  }
}