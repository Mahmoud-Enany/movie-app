import MovieCard from './MovieCard'

function MovieSection({ title, movies }) {
  return (
    <section className="mb-5">
      <h2
        className="mb-4 text-uppercase fw-bold"
        style={{
          color: 'var(--color-text-primary)',
          fontSize: 'var(--section-title-font-size)',
          letterSpacing: 'var(--section-title-letter-spacing)',
          borderLeft: '3px solid var(--color-text-accent-soft)',
          paddingLeft: '0.75rem',
        }}
      >
        {title}
      </h2>
      <div className="row">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default MovieSection