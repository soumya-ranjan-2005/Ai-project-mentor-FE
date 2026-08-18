// Summary stat cards shown at the top of the dashboard.

import { FolderKanban, ListTodo, Clock, Loader, CheckCircle2 } from 'lucide-react'

export default function StatCards({ stats }) {
  const cards = [
    { label: 'Total Projects', value: stats.totalProjects, icon: FolderKanban, color: 'indigo' },
    { label: 'Total Tasks', value: stats.totalTasks, icon: ListTodo, color: 'blue' },
    { label: 'Pending Tasks', value: stats.pending, icon: Clock, color: 'amber' },
    { label: 'In Progress', value: stats.inProgress, icon: Loader, color: 'cyan' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'green' },
  ]

  return (
    <div className="stat-grid">
      {cards.map((c) => {
        const Icon = c.icon
        return (
          <div className="stat-card" key={c.label}>
            <div className={`stat-icon ${c.color}`}>
              <Icon size={22} />
            </div>
            <div>
              <div className="stat-value">{c.value}</div>
              <div className="stat-label">{c.label}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
