const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export function getImageUrl(path) {
  return path ? `${IMAGE_BASE_URL}${path}` : null
}

export async function searchMovies(query) {
  if (!API_KEY) {
    throw new Error('Movie search is not available right now.')
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    query,
    include_adult: 'false',
    language: 'en-US',
    page: '1',
  })

  const response = await fetch(`${BASE_URL}/search/movie?${params.toString()}`)

  if (!response.ok) {
    throw new Error('We could not load movie results right now.')
  }

  const data = await response.json()
  return data.results ?? []
}

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