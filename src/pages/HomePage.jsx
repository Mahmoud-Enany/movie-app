import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="hero-panel glass-panel rounded-5 p-4 p-lg-5">
      <div className="row align-items-center g-4 position-relative">
        <div className="col-lg-12 position-relative">
          <h1 className="display-4 fw-semibold text-white mb-3">
            Search TMDB titles and curate your favorites list.
          </h1>
          <div className="d-flex flex-wrap gap-3">
            <Link to="/search" className="btn btn-danger btn-lg">
              Start searching
            </Link>
            <Link to="/favorites" className="btn btn-outline-light btn-lg">
              View favorites
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage