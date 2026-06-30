import { Button, Card, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getImageUrl } from '../../services/tmdb'
import { toggleFavorite } from '../../store/slices/favoritesSlice'

function MovieCard({ movie }) {
  const dispatch = useDispatch()
  const isFavorite = useSelector((state) => state.favorites.items.some((item) => item.id === movie.id))

  const releaseYear = movie.releaseDate ? movie.releaseDate.slice(0, 4) : 'TBA'
  const posterUrl = getImageUrl(movie.posterPath)

  return (
    <Col>
      <Card className="movie-card glass-panel h-100 overflow-hidden text-white">
        {posterUrl ? (
          <Card.Img src={posterUrl} alt={movie.title} className="movie-poster" />
        ) : (
          <div className="movie-poster-placeholder d-flex align-items-center justify-content-center px-3 text-center text-secondary">
            Poster unavailable
          </div>
        )}
        <Card.Body className="d-flex flex-column gap-3">
          <div>
            <div className="d-flex justify-content-between gap-3 align-items-start mb-2">
              <Card.Title className="mb-0 fs-5">{movie.title}</Card.Title>
              <span className="badge rounded-pill text-bg-warning text-dark">
                {movie.voteAverage ? movie.voteAverage.toFixed(1) : 'N/A'}
              </span>
            </div>
            <p className="text-secondary mb-2">{releaseYear}</p>
            <Card.Text className="text-light">
              {movie.overview || 'No overview available for this title yet.'}
            </Card.Text>
          </div>
          <Button
            type="button"
            variant={isFavorite ? 'outline-light' : 'danger'}
            className="mt-auto"
            onClick={() => dispatch(toggleFavorite(movie))}
          >
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default MovieCard