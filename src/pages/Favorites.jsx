import { useSelector, useDispatch } from 'react-redux'
import { removeFromFavorites } from '../store/favoritesSlice'
import { Link } from 'react-router-dom'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function Favorites() {
  const favorites = useSelector(state => state.favorites.movies)
  const dispatch = useDispatch()

  if (favorites.length === 0) {
    return (
      <div className="text-center py-5">
        <p style={{ color: 'var(--color-text-secondary)' }}>
          No favorites yet. Go add some movies! 🎬
        </p>
        <Link to="/" className="btn mt-3" style={{ color: 'var(--color-text-accent-soft)', border: '1px solid var(--color-text-accent-soft)' }}>
          Browse Movies
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="fw-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
        ❤️ My Favorites ({favorites.length})
      </h1>
      <div className="row">
        {favorites.map(movie => (
          <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
            <div className="rounded overflow-hidden" style={{ background: 'var(--panel-bg)' }}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-100"
                />
              </Link>
              <div className="p-2">
                <p className="mb-1 text-truncate" style={{ color: 'var(--color-text-primary)', fontSize: '0.85rem' }}>
                  {movie.title}
                </p>
                <button
                  onClick={() => dispatch(removeFromFavorites(movie.id))}
                  className="btn btn-sm w-100 mt-1"
                  style={{ color: 'var(--color-text-error)', border: '1px solid var(--color-text-error)', fontSize: '0.75rem' }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites