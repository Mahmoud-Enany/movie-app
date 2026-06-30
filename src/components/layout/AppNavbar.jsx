import { useEffect, useState } from 'react'
import { Badge, Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

function AppNavbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const favoriteCount = useSelector((state) => state.favorites.items.length)
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

  return (
    <Navbar expand="lg" className="border-bottom border-secondary-subtle bg-black bg-opacity-25">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-semibold text-white">
          MovieScope
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" className="bg-light" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto mb-3 mb-lg-0">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/search">
              Search
            </Nav.Link>
            <Nav.Link as={NavLink} to="/favorites" className="d-inline-flex align-items-center gap-2">
              Favorites
              <Badge bg="danger" pill>
                {favoriteCount}
              </Badge>
            </Nav.Link>
          </Nav>
          <Form className="d-flex gap-2" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search movies"
              className="search-input"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <Button type="submit" variant="danger">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar