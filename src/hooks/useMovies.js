import { useState, useEffect } from 'react'

function useMovies(fetchFn) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchFn()
      .then(data => {
        setMovies(data.results)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { movies, loading, error }
}

export default useMovies