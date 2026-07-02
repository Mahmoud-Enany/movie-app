import { Link } from 'react-router-dom'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function MovieCard({ movie }) {
  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
      <Link to={`/movie/${movie.id}`} className="text-decoration-none">
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
        </div>
      </Link>
    </div>
  )
}

export default MovieCard