function EmptyState({ title, description }) {
  return (
    <div className="empty-state glass-panel rounded-4 p-5 text-center text-secondary">
      <h2 className="h4 text-white mb-3">{title}</h2>
      <p className="mb-0">{description}</p>
    </div>
  )
}

export default EmptyState