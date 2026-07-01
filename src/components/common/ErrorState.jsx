function ErrorState({ message }) {
  return (
    <div className="glass-panel rounded-4 border border-danger-subtle p-4 text-center">
      <h2 className="h4 text-danger mb-3">We could not load this right now</h2>
      <p className="text-light mb-0">{message}</p>
    </div>
  )
}

export default ErrorState