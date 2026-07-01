import { Button, Card, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../context/AuthContext'
import { getImageUrl } from '../../services/tmdb'
import { toggleFavorite } from '../../store/slices/favoritesSlice'
import { selectFavoriteMoviesForUser } from '../../store/slices/favoritesSlice'

function MovieCard({ movie }) {
  const dispatch = useDispatch()
  const { currentUser } = useAuth()
  const favoriteMovies = useSelector((state) => selectFavoriteMoviesForUser(state, currentUser?.email))
  const isFavorite = favoriteMovies.some((item) => item.id === movie.id)

  const releaseYear = movie.releaseDate ? movie.releaseDate.slice(0, 4) : 'Coming soon'
  const posterUrl = getImageUrl(movie.posterPath)

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite({ userEmail: currentUser?.email, movie }))
  }

  return (
    <Col>
      <Card className="movie-card glass-panel h-100 overflow-hidden text-white">
        {posterUrl ? (
          <Card.Img src={posterUrl} alt={movie.title} className="movie-poster" />
        ) : (
          <div className="movie-poster-placeholder d-flex align-items-center justify-content-center px-3 text-center text-secondary">
            Poster not available
          </div>
        )}
        <Card.Body className="d-flex flex-column gap-3">
          <div>
            <div className="d-flex justify-content-between gap-3 align-items-start mb-2">
              <Card.Title className="mb-0 fs-5">{movie.title}</Card.Title>
              <span className="badge rounded-pill text-bg-warning text-dark">
                {movie.voteAverage ? movie.voteAverage.toFixed(1) : 'Not rated'}
              </span>
            </div>
            <p className="text-secondary mb-2">{releaseYear}</p>
            <Card.Text className="text-light">
              {movie.overview || 'Overview not available.'}
            </Card.Text>
          </div>
          <Button
            type="button"
            variant={isFavorite ? 'outline-light' : 'danger'}
            className="mt-auto"
            onClick={handleToggleFavorite}
          >
            {isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default MovieCard