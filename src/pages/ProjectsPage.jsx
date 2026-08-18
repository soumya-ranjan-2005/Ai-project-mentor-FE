// Projects page: responsive cards, create/edit modal, delete confirm dialog.

import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { Plus, Eye, Pencil, Trash2, FolderKanban } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import Modal from '../components/Common/Modal'
import ConfirmDialog from '../components/Common/ConfirmDialog'
import SuccessMessage from '../components/Common/SuccessMessage'
import EmptyState from '../components/Common/EmptyState'
import ProgressBar from '../components/Common/ProgressBar'
import ProjectForm from '../components/Projects/ProjectForm'

export default function ProjectsPage() {
  const { globalSearch = '' } = useOutletContext() || {}
  const { projects, getTasksByProject, getProjectProgress, addProject, updateProject, deleteProject } =
    useAppData()

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [success, setSuccess] = useState('')

  const filtered = projects.filter((p) => {
    if (!globalSearch) return true
    const q = globalSearch.toLowerCase()
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.techStack.join(',').toLowerCase().includes(q)
    )
  })

  function openCreate() {
    setEditing(null)
    setModalOpen(true)
  }

  function openEdit(project) {
    setEditing(project)
    setModalOpen(true)
  }

  function handleSubmit(data) {
    if (editing) {
      updateProject(editing.id, data)
      setSuccess('Project updated successfully.')
    } else {
      addProject(data)
      setSuccess('Project created successfully.')
    }
    setModalOpen(false)
  }

  function handleDelete() {
    deleteProject(confirmId)
    setConfirmId(null)
    setSuccess('Project deleted successfully.')
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Projects</h2>
          <div className="subtitle">Manage your software projects and their tasks.</div>
        </div>
        <button className="btn-primary" onClick={openCreate}>
          <Plus size={16} /> Create Project
        </button>
      </div>

      {success && <SuccessMessage message={success} onDismiss={() => setSuccess('')} />}

      {filtered.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={FolderKanban}
            title="No projects found"
            message="Create your first project to get started."
            action={
              <button className="btn-primary" onClick={openCreate}>
                <Plus size={16} /> Create Project
              </button>
            }
          />
        </div>
      ) : (
        <div className="project-grid">
          {filtered.map((p) => {
            const taskCount = getTasksByProject(p.id).length
            const progress = getProjectProgress(p.id)
            return (
              <div className="project-card" key={p.id}>
                <div className="pc-header">
                  <div>
                    <div className="row-id">{p.id}</div>
                    <div className="pc-title">{p.name}</div>
                  </div>
                </div>
                <p className="pc-desc">{p.description}</p>
                <div className="tech-stack">
                  {p.techStack.map((t) => (
                    <span className="tech-tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="pc-stats">
                  <span>{taskCount} tasks</span>
                  <span>Created {p.createdAt}</span>
                </div>
                <ProgressBar value={progress} />
                <div className="pc-actions">
                  <Link to={`/projects/${p.id}`} className="btn-secondary btn-sm">
                    <Eye size={14} /> View
                  </Link>
                  <button className="btn-secondary btn-sm" onClick={() => openEdit(p)}>
                    <Pencil size={14} /> Edit
                  </button>
                  <button className="btn-icon danger btn-sm" onClick={() => setConfirmId(p.id)} aria-label="Delete project">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editing ? 'Edit Project' : 'Create Project'}
        onClose={() => setModalOpen(false)}
      >
        <ProjectForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          submitLabel={editing ? 'Update Project' : 'Save Project'}
        />
      </Modal>

      <ConfirmDialog
        open={!!confirmId}
        title="Delete Project?"
        message="This will permanently remove the project and all of its tasks. This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
      />
    </div>
  )
}
