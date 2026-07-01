import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import EmptyState from '../components/common/EmptyState'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import MovieGrid from '../components/movies/MovieGrid'
import { clearFavorites, selectFavoriteMoviesForUser } from '../store/slices/favoritesSlice'

function FavoritesPage() {
  const dispatch = useDispatch()
  const { currentUser } = useAuth()
  const { t } = useLanguage()
  const favoriteMovies = useSelector((state) => selectFavoriteMoviesForUser(state, currentUser?.email))

  return (
    <section className="d-grid gap-4">
      <div className="glass-panel rounded-5 p-4 p-lg-5 d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center">
        <div>
          <p className="section-title mb-2">{t('favorites')}</p>
          <h1 className="display-6 text-white mb-2">{t('favoritesTitle')}</h1>
          <p className="text-light mb-0">{t('favoritesCount', { count: favoriteMovies.length })}</p>
        </div>
        <Button
          type="button"
          variant="outline-light"
          onClick={() => dispatch(clearFavorites({ userEmail: currentUser?.email }))}
          disabled={favoriteMovies.length === 0}
        >
          Clear all
        </Button>
      </div>

      {favoriteMovies.length === 0 ? (
        <EmptyState title={t('favoritesEmptyTitle')} description={t('favoritesEmptyDescription')} />
      ) : (
        <MovieGrid movies={favoriteMovies} />
      )}
    </section>
  )
}

export default FavoritesPage