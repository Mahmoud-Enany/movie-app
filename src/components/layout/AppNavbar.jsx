import { useEffect, useState } from 'react'
import { Badge, Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import useThemeStore from '../../store/themeStore'
import { selectFavoriteCountForUser } from '../../store/slices/favoritesSlice'

function AppNavbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { currentUser, isAuthenticated, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const favoriteCount = useSelector((state) => selectFavoriteCountForUser(state, currentUser?.email))
  const [keyword, setKeyword] = useState(searchParams.get('q') ?? '')

  useEffect(() => {
    if (location.pathname === '/search') {
      setKeyword(searchParams.get('q') ?? '')
    }
  }, [location.pathname, searchParams])

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedKeyword = keyword.trim()

    if (!trimmedKeyword) {
      navigate('/search')
      return
    }

    navigate(`/search?q=${encodeURIComponent(trimmedKeyword)}`)
  }

  const buttonVariant = theme === 'dark' ? 'outline-light' : 'outline-dark'

  return (
    <Navbar expand="lg" className="app-navbar border-bottom">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-semibold text-white">
          {t('appName')}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" className="navbar-toggle bg-light" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto mb-3 mb-lg-0 align-items-lg-center gap-lg-1">
            <Nav.Link as={NavLink} to="/">
              {t('home')}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/search">
              {t('search')}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/favorites" className="d-inline-flex align-items-center gap-2">
              {t('favorites')}
              <Badge bg="danger" pill>
                {favoriteCount}
              </Badge>
            </Nav.Link>
            {isAuthenticated ? (
              <Nav.Link as={NavLink} to="/profile">
                {t('profile')}
              </Nav.Link>
            ) : null}
          </Nav>
          <Form className="d-flex flex-column flex-lg-row gap-2 me-lg-3 mb-3 mb-lg-0" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder={t('searchMovies')}
              className="search-input"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <Button type="submit" variant="danger">
              {t('search')}
            </Button>
          </Form>
          <div className="d-flex flex-wrap gap-2">
            <Button type="button" variant={buttonVariant} onClick={toggleTheme}>
              {theme === 'dark' ? t('lightTheme') : t('darkTheme')}
            </Button>
            <Button
              type="button"
              variant={buttonVariant}
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            >
              {language === 'en' ? t('arabic') : t('english')}
            </Button>
            {isAuthenticated ? (
              <>
                <Button type="button" variant="danger" onClick={logout}>
                  {t('logout')}
                </Button>
                <div className="navbar-user-chip d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2">
                  <span className="navbar-user-initial">{currentUser?.fullName?.slice(0, 1)?.toUpperCase() ?? 'U'}</span>
                  <span className="small fw-semibold text-white text-truncate">{currentUser?.fullName}</span>
                </div>
              </>
            ) : (
              <>
                <Button type="button" variant={buttonVariant} onClick={() => navigate('/login')}>
                  {t('login')}
                </Button>
                <Button type="button" variant="danger" onClick={() => navigate('/register')}>
                  {t('register')}
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar