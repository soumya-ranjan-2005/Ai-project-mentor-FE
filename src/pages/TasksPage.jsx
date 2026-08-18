// Tasks page: table with filters, search, status badges, CRUD, status change.

import { useState, useMemo } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Plus, Pencil, Trash2, ListTodo } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import SuccessMessage from '../components/Common/SuccessMessage'
import EmptyState from '../components/Common/EmptyState'
import { PriorityBadge, StatusBadge } from '../components/Common/Badge'
import TaskForm from '../components/Tasks/TaskForm'

const STATUSES = ['Pending', 'In Progress', 'Completed']

export default function TasksPage() {
  const { globalSearch = '' } = useOutletContext() || {}
  const { projects, tasks, getProject, addTask, updateTask, updateTaskStatus, deleteTask } =
    useAppData()

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [success, setSuccess] = useState('')

  const [filters, setFilters] = useState({ project: '', priority: '', status: '', search: '' })

  // Header search also filters task titles
  const searchTerm = (filters.search || globalSearch || '').toLowerCase()

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (filters.project && t.projectId !== filters.project) return false
      if (filters.priority && t.priority !== filters.priority) return false
      if (filters.status && t.status !== filters.status) return false
      if (searchTerm && !t.title.toLowerCase().includes(searchTerm)) return false
      return true
    })
  }, [tasks, filters, searchTerm])

  function openCreate() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(task) {
    setEditing(task)
    setModalOpen(true)
  }

  function handleSubmit(data) {
    if (editing) {
      updateTask(editing.id, data)
      setSuccess('Task updated successfully.')
    } else {
      addTask(data)
      setSuccess('Task created successfully.')
    }
    setModalOpen(false)
  }

  function handleDelete() {
    deleteTask(confirmId)
    setConfirmId(null)
    setSuccess('Task deleted successfully.')
  }

  function setFilter(name, value) {
    setFilters((f) => ({ ...f, [name]: value }))
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Tasks</h2>
          <div className="subtitle">All development tasks across your projects.</div>
        </div>
        <button className="btn-primary" onClick={openCreate}>
          <Plus size={16} /> Add Task
        </button>
      </div>

      {success && <SuccessMessage message={success} onDismiss={() => setSuccess('')} />}

      <div className="card">
        <div className="card-pad">
          <div className="filters-bar">
            <div className="filter-group">
              <label htmlFor="f-project">Project</label>
              <select id="f-project" value={filters.project} onChange={(e) => setFilter('project', e.target.value)}>
                <option value="">All projects</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="f-priority">Priority</label>
              <select id="f-priority" value={filters.priority} onChange={(e) => setFilter('priority', e.target.value)}>
                <option value="">All</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="f-status">Status</label>
              <select id="f-status" value={filters.status} onChange={(e) => setFilter('status', e.target.value)}>
                <option value="">All</option>
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="filter-group search-group">
              <label htmlFor="f-search">Search task title</label>
              <input
                id="f-search"
                type="search"
                placeholder="Search by title..."
                value={filters.search}
                onChange={(e) => setFilter('search', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="table-wrap">
          {filtered.length === 0 ? (
            <EmptyState
              icon={ListTodo}
              title="No tasks found"
              message="Try adjusting filters or add a new task."
              action={
                <button className="btn-primary btn-sm" onClick={openCreate}>
                  <Plus size={14} /> Add Task
                </button>
              }
            />
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Project</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>AI</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => {
                  const project = getProject(t.projectId)
                  return (
                    <tr key={t.id}>
                      <td className="row-id">{t.id}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{t.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: 280 }}>
                          {t.description}
                        </div>
                      </td>
                      <td>
                        <Link to={`/projects/${t.projectId}`}>{project ? project.name : '—'}</Link>
                      </td>
                      <td><PriorityBadge priority={t.priority} /></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <StatusBadge status={t.status} />
                          <label className="visually-hidden" style={{ position: 'absolute', left: '-9999px' }}>
                            Change status
                          </label>
                          <select
                            aria-label={`Change status for ${t.title}`}
                            value={t.status}
                            onChange={(e) => updateTaskStatus(t.id, e.target.value)}
                            style={{
                              width: 'auto',
                              padding: '0.25rem 0.4rem',
                              fontSize: '0.78rem',
                              border: '1px solid var(--border)',
                              borderRadius: '6px',
                              background: 'var(--surface)',
                            }}
                          >
                            {STATUSES.map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td>
                        {t.aiGenerated ? (
                          <span className="badge badge-indigo">AI</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{t.updatedAt}</td>
                      <td className="cell-actions">
                        <button className="btn-icon btn-sm" onClick={() => openEdit(t)} aria-label={`Edit ${t.title}`}>
                          <Pencil size={14} />
                        </button>
                        <button
                          className="btn-icon danger btn-sm"
                          onClick={() => setConfirmId(t.id)}
                          aria-label={`Delete ${t.title}`}
                        >
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

      <Modal open={modalOpen} title={editing ? 'Edit Task' : 'Add Task'} onClose={() => setModalOpen(false)} size="lg">
        <TaskForm
          projects={projects}
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          submitLabel={editing ? 'Update Task' : 'Save Task'}
        />
      </Modal>

      <ConfirmDialog
        open={!!confirmId}
        title="Delete Task?"
        message="This will permanently remove the task. This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  )
}
