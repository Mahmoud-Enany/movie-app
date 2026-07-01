import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="glass-panel rounded-5 p-5 text-center">
      <p className="section-title mb-3">404</p>
      <h1 className="display-5 text-white mb-3">We could not find that page</h1>
      <p className="text-secondary mb-4">The page you are looking for is not available.</p>
      <Link to="/" className="btn btn-danger btn-lg">
        Go to home
      </Link>
    </section>
  )
}

export default NotFoundPage