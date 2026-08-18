// "Project Progress" section of the dashboard.

import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import ProgressBar from '../Common/ProgressBar'
import { useAppData } from '../../context/AppDataContext'

export default function ProjectProgress() {
  const { projects, getTasksByProject, getProjectProgress } = useAppData()

  return (
    <div className="card">
      <div className="card-header">
        <h3>Project Progress</h3>
        <Link to="/projects" className="btn-ghost btn-sm">
          View all <ChevronRight size={14} />
        </Link>
      </div>
      <div className="card-pad">
        {projects.map((p) => {
          const taskCount = getTasksByProject(p.id).length
          const progress = getProjectProgress(p.id)
          return (
            <div key={p.id} style={{ marginBottom: '1.1rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.4rem',
                }}
              >
                <Link to={`/projects/${p.id}`} style={{ fontWeight: 600, color: 'var(--text-strong)' }}>
                  {p.name}
                </Link>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {taskCount} tasks &middot; {progress}%
                </span>
              </div>
              <div className="tech-stack" style={{ marginBottom: '0.5rem' }}>
                {p.techStack.map((t) => (
                  <span className="tech-tag" key={t}>{t}</span>
                ))}
              </div>
              <ProgressBar value={progress} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
