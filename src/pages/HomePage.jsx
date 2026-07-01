import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import useThemeStore from '../store/themeStore'

function HomePage() {
  const { isAuthenticated, currentUser } = useAuth()
  const { t } = useLanguage()
  const theme = useThemeStore((state) => state.theme)

  return (
    <section className="hero-panel glass-panel rounded-5 p-4 p-lg-5">
      <div className="row align-items-center g-4 position-relative">
        <div className="col-lg-8 position-relative">
          <p className="section-title mb-2">{t('welcomeSection')}</p>
          <h1 className="display-4 fw-semibold text-white mb-3">{t('heroTitle')}</h1>
          <p className="lead text-light mb-4">{t('heroSubtitle')}</p>
          {isAuthenticated ? (
            <p className="text-secondary mb-4">{t('welcomeBack')} {currentUser?.fullName}</p>
          ) : (
            <p className="text-secondary mb-4">{t('signInPrompt')}</p>
          )}
          <div className="d-flex flex-wrap gap-3">
            <Link to="/search" className="btn btn-danger btn-lg">
              {t('search')}
            </Link>
            <Link to="/favorites" className={`btn btn-lg ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}>
              {t('favorites')}
            </Link>
            {!isAuthenticated ? (
              <Link to="/login" className={`btn btn-lg ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}>
                {t('login')}
              </Link>
            ) : (
              <Link to="/profile" className={`btn btn-lg ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}>
                {t('profile')}
              </Link>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="glass-panel rounded-4 p-4 h-100">
            <p className="section-title mb-2">{t('settings')}</p>
            <div className="d-grid gap-3 text-light">
              <div>
                <div className="text-secondary small">{t('theme')}</div>
                <div className="fw-semibold text-white">{theme === 'dark' ? t('darkTheme') : t('lightTheme')}</div>
              </div>
              <div>
                <div className="text-secondary small">{t('language')}</div>
                <div className="fw-semibold text-white">{t('activeLanguage')}</div>
              </div>
              <div>
                <div className="text-secondary small">{t('authStatus')}</div>
                <div className="fw-semibold text-white">{isAuthenticated ? t('signedIn') : t('guestMode')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage