// "Recent Tasks" table on the dashboard.

import { Link } from 'react-router-dom'
import { Inbox } from 'lucide-react'
import { PriorityBadge, StatusBadge } from '../Common/Badge'
import EmptyState from '../Common/EmptyState'
import { useAppData } from '../../context/AppDataContext'

export default function RecentTasks() {
  const { tasks, projects, getProject } = useAppData()

  // Sort by updatedAt desc and take 6
  const recent = [...tasks]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 6)

  return (
    <div className="card">
      <div className="card-header">
        <h3>Recent Tasks</h3>
        <Link to="/tasks" className="btn-ghost btn-sm">View all</Link>
      </div>
      <div className="table-wrap">
        {recent.length === 0 ? (
          <EmptyState icon={Inbox} title="No tasks yet" message="Tasks will appear here once created." />
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Project</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((t) => {
                const project = getProject(t.projectId)
                return (
                  <tr key={t.id}>
                    <td>
                      <Link to={`/projects/${t.projectId}`} style={{ fontWeight: 600 }}>
                        {t.title}
                      </Link>
                    </td>
                    <td>{project ? project.name : '—'}</td>
                    <td><PriorityBadge priority={t.priority} /></td>
                    <td><StatusBadge status={t.status} /></td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{t.updatedAt}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
