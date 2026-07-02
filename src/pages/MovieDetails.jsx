import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails, getMovieTrailer, getSimilarMovies } from '../services/tmdb'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import MovieSection from '../components/MovieSection'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    Promise.all([
      getMovieDetails(id),
      getMovieTrailer(id),
      getSimilarMovies(id),
    ])
      .then(([movieData, trailerData, similarData]) => {
        setMovie(movieData)
        const youtubeTrailer = trailerData.results?.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        )
        setTrailer(youtubeTrailer)
        setSimilar(similarData.results?.slice(0, 6))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div>
      <div className="row mb-5">
        <div className="col-md-4 mb-4 mb-md-0">
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-100 rounded"
          />
        </div>
        <div className="col-md-8">
          <h1 className="fw-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            {movie.title}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            ⭐ {movie.vote_average?.toFixed(1)} &nbsp;|&nbsp;
            📅 {movie.release_date} &nbsp;|&nbsp;
            🕐 {movie.runtime} min
          </p>
          <div className="mb-3">
            {movie.genres?.map(genre => (
              <span
                key={genre.id}
                className="badge me-2"
                style={{ background: 'var(--panel-bg)', color: 'var(--color-text-accent-soft)', border: '1px solid var(--panel-border)' }}
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
            {movie.overview}
          </p>
        </div>
      </div>

      {trailer && (
        <div className="mb-5">
          <h2 className="mb-3 fw-bold" style={{ color: 'var(--color-text-primary)', fontSize: '1rem' }}>
            Trailer
          </h2>
          <div className="ratio ratio-16x9">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {similar.length > 0 && (
        <MovieSection title="Similar Movies" movies={similar} />
      )}
    </div>
  )
}

export default MovieDetails