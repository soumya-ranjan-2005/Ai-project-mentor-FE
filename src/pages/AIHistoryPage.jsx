// AI History page: table of previous AI interactions with filters, detail
// modal, and delete confirm dialog.

import { useState, useMemo } from 'react'
import { Eye, Trash2, History } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import { aiTaskTypes } from '../data/mockData'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import SuccessMessage from '../components/Common/SuccessMessage'
import EmptyState from '../components/Common/EmptyState'

export default function AIHistoryPage() {
  const { aiHistory, projects, getProject, deleteAIInteraction } = useAppData()
  const [detail, setDetail] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [success, setSuccess] = useState('')

  const [filters, setFilters] = useState({ project: '', taskType: '', date: '' })

  const filtered = useMemo(() => {
    return aiHistory.filter((a) => {
      if (filters.project && a.projectId !== filters.project) return false
      if (filters.taskType && a.taskType !== filters.taskType) return false
      if (filters.date && a.createdAt !== filters.date) return false
      return true
    })
  }, [aiHistory, filters])

  function setFilter(name, value) {
    setFilters((f) => ({ ...f, [name]: value }))
  }

  function handleDelete() {
    deleteAIInteraction(confirmId)
    setConfirmId(null)
    setSuccess('AI history deleted successfully.')
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>AI History</h2>
          <div className="subtitle">Previous AI mentor interactions and recommendations.</div>
        </div>
      </div>

      {success && <SuccessMessage message={success} onDismiss={() => setSuccess('')} />}

      <div className="card">
        <div className="card-pad">
          <div className="filters-bar">
            <div className="filter-group">
              <label htmlFor="h-project">Project</label>
              <select id="h-project" value={filters.project} onChange={(e) => setFilter('project', e.target.value)}>
                <option value="">All projects</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="h-type">AI Task Type</label>
              <select id="h-type" value={filters.taskType} onChange={(e) => setFilter('taskType', e.target.value)}>
                <option value="">All</option>
                {aiTaskTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="h-date">Date</label>
              <input
                id="h-date"
                type="date"
                value={filters.date}
                onChange={(e) => setFilter('date', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="table-wrap">
          {filtered.length === 0 ? (
            <EmptyState
              icon={History}
              title="No AI interactions found"
              message="Ask the AI Mentor a question to create your first interaction."
            />
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Project</th>
                  <th>Prompt</th>
                  <th>Response Preview</th>
                  <th>Task Type</th>
                  <th>Model</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => {
                  const project = getProject(a.projectId)
                  return (
                    <tr key={a.id}>
                      <td className="row-id">{a.id}</td>
                      <td>{project ? project.name : '—'}</td>
                      <td style={{ maxWidth: 200 }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {a.userPrompt}
                        </div>
                      </td>
                      <td style={{ maxWidth: 260, color: 'var(--text-muted)' }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {a.responsePreview}
                        </div>
                      </td>
                      <td><span className="badge badge-cyan">{a.taskType}</span></td>
                      <td>{a.modelName}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{a.createdAt}</td>
                      <td className="cell-actions">
                        <button className="btn-icon btn-sm" onClick={() => setDetail(a)} aria-label="View full response">
                          <Eye size={14} />
                        </button>
                        <button className="btn-icon danger btn-sm" onClick={() => setConfirmId(a.id)} aria-label="Delete interaction">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail modal showing the full structured response */}
      <Modal
        open={!!detail}
        title={detail ? `AI Interaction ${detail.id}` : ''}
        onClose={() => setDetail(null)}
        size="lg"
      >
        {detail && (
          <div className="ai-response">
            <div className="ai-section">
              <h4>Requirement Understanding</h4>
              <p>{detail.response.understanding}</p>
            </div>
            <div className="ai-section">
              <h4>Frontend Tasks</h4>
              <ul>{detail.response.frontendTasks.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
            <div className="ai-section">
              <h4>Backend Tasks</h4>
              <ul>{detail.response.backendTasks.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
            <div className="ai-section">
              <h4>Database Tasks</h4>
              <ul>{detail.response.databaseTasks.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
            <div className="ai-section">
              <h4>Testing Steps</h4>
              <ul>{detail.response.testingSteps.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
            <div className="ai-section">
              <h4>Possible Blockers</h4>
              <ul>{detail.response.blockers.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
            <div className="ai-section">
              <h4>Recommended Next Action</h4>
              <p style={{ fontWeight: 600 }}>{detail.response.nextAction}</p>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!confirmId}
        title="Delete AI History?"
        message="This will permanently remove the AI interaction. This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  )
}
