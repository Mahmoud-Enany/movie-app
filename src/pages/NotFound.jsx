import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="fw-bold mb-3" style={{ fontSize: '6rem', color: 'var(--color-text-accent-soft)' }}>
        404
      </h1>
      <h2 className="mb-3" style={{ color: 'var(--color-text-primary)' }}>
        Page Not Found
      </h2>
      <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        Looks like this page doesn't exist.
      </p>
      <Link
        to="/"
        className="btn"
        style={{ color: 'var(--color-text-accent-soft)', border: '1px solid var(--color-text-accent-soft)' }}
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound