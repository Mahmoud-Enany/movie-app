import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import EmptyState from '../components/common/EmptyState'
import MovieGrid from '../components/movies/MovieGrid'
import { clearFavorites } from '../store/slices/favoritesSlice'

function FavoritesPage() {
  const dispatch = useDispatch()
  const favoriteMovies = useSelector((state) => state.favorites.items)

  return (
    <section className="d-grid gap-4">
      <div className="glass-panel rounded-5 p-4 p-lg-5 d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center">
        <div>
          <p className="section-title mb-2">Favorites</p>
          <h1 className="display-6 text-white mb-2">Your saved watchlist</h1>
          <p className="text-light mb-0">
            You have favorited {favoriteMovies.length} movie{favoriteMovies.length === 1 ? '' : 's'}.
          </p>
        </div>
        <Button type="button" variant="outline-light" onClick={() => dispatch(clearFavorites())} disabled={favoriteMovies.length === 0}>
          Clear all
        </Button>
      </div>

      {favoriteMovies.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Add movies from search results and they will appear here instantly."
        />
      ) : (
        <MovieGrid movies={favoriteMovies} />
      )}
    </section>
  )
}

export default FavoritesPage