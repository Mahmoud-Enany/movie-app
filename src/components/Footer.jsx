function Footer() {
  return (
    <footer
      className="text-center py-4 mt-5"
      style={{
        borderTop: '1px solid var(--panel-border)',
        color: 'var(--color-text-secondary)',
        background: 'var(--panel-bg)',
      }}
    >
      <p className="mb-0">
        Made with ❤️ using{' '}
        <span style={{ color: 'var(--color-text-accent-soft)' }}>TMDB API</span>
      </p>
    </footer>
  )
}

export default Footer