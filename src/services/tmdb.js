const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const getPopularMovies = () => {
  return fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    .then(res => res.json())
}

export const getTopRatedMovies = () => {
  return fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
    .then(res => res.json())
}

export const getUpcomingMovies = () => {
  return fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
    .then(res => res.json())
}

export const getNowPlayingMovies = () => {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
    .then(res => res.json())
}

export const getMovieDetails = (id) => {
  return fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    .then(res => res.json())
}

export const getMovieTrailer = (id) => {
  return fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
    .then(res => res.json())
}

export const getSimilarMovies = (id) => {
  return fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`)
    .then(res => res.json())
}