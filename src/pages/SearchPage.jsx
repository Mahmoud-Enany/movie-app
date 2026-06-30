import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import EmptyState from '../components/common/EmptyState'
import ErrorState from '../components/common/ErrorState'
import LoadingSpinner from '../components/common/LoadingSpinner'
import MovieGrid from '../components/movies/MovieGrid'
import { normalizeMovie, searchMovies } from '../services/tmdb'

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [queryInput, setQueryInput] = useState(searchParams.get('q') ?? '')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const query = searchParams.get('q')?.trim() ?? ''

  useEffect(() => {
    setQueryInput(query)
  }, [query])

  useEffect(() => {
    let ignore = false

    if (!query) {
      setMovies([])
      setError('')
      return () => {
        ignore = true
      }
    }

    async function loadMovies() {
      setIsLoading(true)
      setError('')

      try {
        const results = await searchMovies(query)

        if (!ignore) {
          setMovies(results.map(normalizeMovie))
        }
      } catch (caughtError) {
        if (!ignore) {
          setMovies([])
          setError(caughtError.message)
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadMovies()

    return () => {
      ignore = true
    }
  }, [query])

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedQuery = queryInput.trim()

    if (!trimmedQuery) {
      setSearchParams({})
      return
    }

    setSearchParams({ q: trimmedQuery })
  }

  return (
    <section className="d-grid gap-4">
      <div className="glass-panel rounded-5 p-4 p-lg-5">
        <p className="section-title mb-2">Search</p>
        <h1 className="display-6 text-white mb-3">Find movies by title</h1>
        <Form onSubmit={handleSubmit} className="row g-3">
          <div className="col-lg-9">
            <Form.Control
              value={queryInput}
              onChange={(event) => setQueryInput(event.target.value)}
              placeholder="Try Inception, Interstellar, Dune..."
              className="search-input form-control-lg"
            />
          </div>
          <div className="col-lg-3 d-grid">
            <Button type="submit" variant="danger" size="lg">
              Search movies
            </Button>
          </div>
        </Form>
      </div>

      {isLoading && <LoadingSpinner />}
      {!isLoading && error && <ErrorState message={error} />}
      {!isLoading && !error && !query && (
        <EmptyState
          title="Start with a movie title"
          description="Type your favorite movie..."
        />
      )}
      {!isLoading && !error && query && movies.length === 0 && (
        <EmptyState
          title="No results found"
          description={`No movies matched "${query}". Try a broader title or different spelling.`}
        />
      )}
      {!isLoading && !error && movies.length > 0 && (
        <div className="d-grid gap-3">
          <div>
            <p className="section-title mb-2">Results</p>
            <h2 className="h3 text-white mb-0">
              {movies.length} titles found for "{query}"
            </h2>
          </div>
          <MovieGrid movies={movies} />
        </div>
      )}
    </section>
  )
}

export default SearchPage