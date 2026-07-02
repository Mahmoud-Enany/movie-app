function ErrorMessage({ message }) {
  return (
    <div className="text-center py-5">
      <p style={{ color: 'var(--color-text-error)' }}>⚠️ {message}</p>
    </div>
  )
}

export default ErrorMessage