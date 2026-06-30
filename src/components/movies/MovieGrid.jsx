import { Row } from 'react-bootstrap'
import MovieCard from './MovieCard'

function MovieGrid({ movies }) {
  return (
    <Row xs={1} md={2} xl={4} className="g-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Row>
  )
}

export default MovieGrid