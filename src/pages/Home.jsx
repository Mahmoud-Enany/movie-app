import useMovies from '../hooks/useMovies'
import MovieSection from '../components/MovieSection'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from '../services/tmdb'

function Home() {
  const { movies: popular, loading: l1, error: e1 } = useMovies(getPopularMovies)
  const { movies: topRated, loading: l2, error: e2 } = useMovies(getTopRatedMovies)
  const { movies: upcoming, loading: l3, error: e3 } = useMovies(getUpcomingMovies)
  const { movies: nowPlaying, loading: l4, error: e4 } = useMovies(getNowPlayingMovies)

  const loading = l1 || l2 || l3 || l4
  const error = e1 || e2 || e3 || e4

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div>
      <MovieSection title="Now Playing" movies={nowPlaying} />
      <MovieSection title="Popular" movies={popular} />
      <MovieSection title="Top Rated" movies={topRated} />
      <MovieSection title="Upcoming" movies={upcoming} />
    </div>
  )
}

export default Home