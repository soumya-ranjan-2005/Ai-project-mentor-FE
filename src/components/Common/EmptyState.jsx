// Reusable empty state. Use inside cards or tables when there is nothing to show.

export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="empty-state">
      {Icon && (
        <div className="empty-icon" aria-hidden="true">
          <Icon size={28} />
        </div>
      )}
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action}
    </div>
  )
}
