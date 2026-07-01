import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ background: 'var(--panel-bg)', backdropFilter: `blur(var(--panel-blur))`, borderBottom: '1px solid var(--panel-border)' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: 'var(--color-text-primary)' }}>
          🎬 MovieApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: 'var(--color-text-secondary)' }}>
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar