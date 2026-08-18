// Shared badge helpers so priority and status colours stay consistent
// across the tasks table, project details and dashboard.

export function PriorityBadge({ priority }) {
  const map = {
    High: 'badge-red',
    Medium: 'badge-orange',
    Low: 'badge-green',
  }
  const cls = map[priority] || 'badge-grey'
  return <span className={`badge ${cls}`}>{priority}</span>
}

export function StatusBadge({ status }) {
  const map = {
    Pending: 'badge-yellow',
    'In Progress': 'badge-blue',
    Completed: 'badge-green',
  }
  const cls = map[status] || 'badge-grey'
  return <span className={`badge ${cls}`}>{status}</span>
}
