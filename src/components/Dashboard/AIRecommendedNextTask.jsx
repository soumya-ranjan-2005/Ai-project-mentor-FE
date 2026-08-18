// "AI Recommended Next Task" section on the dashboard.

import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useAppData } from '../../context/AppDataContext'

// Picks the first pending high-priority task across projects as the mock
// recommendation. Purely local, no AI call.
export default function AIRecommendedNextTask() {
  const { tasks, getProject } = useAppData()

  const priorityRank = { High: 0, Medium: 1, Low: 2 }
  const candidate = [...tasks]
    .filter((t) => t.status !== 'Completed')
    .sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority])[0]

  const project = candidate ? getProject(candidate.projectId) : null

  return (
    <div className="card">
      <div className="card-header">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="ai-section-icon" style={{ background: 'var(--indigo-50)', color: 'var(--indigo-600)' }}>
            <Sparkles size={16} />
          </span>
          AI Recommended Next Task
        </h3>
      </div>
      <div className="card-pad">
        {candidate && project ? (
          <>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              Project
            </div>
            <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>{project.name}</div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              Recommended Task
            </div>
            <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>{candidate.title}</div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              Reason
            </div>
            <p style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>
              This is the highest-priority task that is not yet completed. Starting here keeps the
              project on its critical path.
            </p>

            <Link to="/ai-mentor" className="btn-primary btn-sm">
              View Recommendation <ArrowRight size={14} />
            </Link>
          </>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>
            All tasks are completed. Ask the AI Mentor for the next project plan.
          </p>
        )}
      </div>
    </div>
  )
}
