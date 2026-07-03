import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../context/AuthContext'
import { selectFavoriteMoviesForUser, toggleFavorite } from '../store/slices/favoritesSlice'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function MovieCard({ movie }) {
  const dispatch = useDispatch()
  const { currentUser } = useAuth()
  const favoriteMovies = useSelector((state) => selectFavoriteMoviesForUser(state, currentUser?.email))
  const isFavorite = favoriteMovies.some((item) => item.id === movie.id)

  const favoriteMoviePayload = {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    language: movie.original_language,
  }

  const handleFavoriteToggle = (event) => {
    event.preventDefault()
    event.stopPropagation()

    dispatch(toggleFavorite({ userEmail: currentUser?.email, movie: favoriteMoviePayload }))
  }

  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
      <div
        className="rounded overflow-hidden"
        style={{
          transition: `transform var(--transition-fast), box-shadow var(--transition-fast)`,
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = `translateY(var(--movie-card-hover-y))`
          e.currentTarget.style.boxShadow = `var(--movie-card-hover-shadow)`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <Link to={`/movie/${movie.id}`} className="text-decoration-none">
          {movie.poster_path ? (
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-100"
              style={{ display: 'block' }}
            />
          ) : (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                height: '250px',
                background: `linear-gradient(135deg, var(--movie-placeholder-bg-start), var(--movie-placeholder-bg-end))`,
                color: 'var(--color-text-secondary)',
                fontSize: '0.85rem',
              }}
            >
              No Image
            </div>
          )}
          <div className="p-2" style={{ background: 'var(--panel-bg)' }}>
            <p
              className="mb-1 fw-semibold text-truncate"
              style={{ color: 'var(--color-text-primary)', fontSize: '0.85rem' }}
            >
              {movie.title}
            </p>
            <p className="mb-0" style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>
              ⭐ {movie.vote_average?.toFixed(1)}
            </p>
          </div>
        </Link>
        <div className="px-2 pb-2" style={{ background: 'var(--panel-bg)' }}>
          <button
            type="button"
            className={`btn btn-sm w-100 ${isFavorite ? 'btn-outline-light' : 'btn-danger'}`}
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieCard