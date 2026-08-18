// Project details page: project info + per-project task list + add task.

import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Pencil, Sparkles, ListTodo } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import Modal from '../components/Common/Modal'
import ProgressBar from '../components/Common/ProgressBar'
import EmptyState from '../components/Common/EmptyState'
import { PriorityBadge, StatusBadge } from '../components/Common/Badge'
import TaskForm from '../components/Tasks/TaskForm'

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProject, getTasksByProject, getProjectProgress, addTask } = useAppData()

  const project = getProject(id)
  const tasks = getTasksByProject(id)
  const progress = getProjectProgress(id)

  const [taskModalOpen, setTaskModalOpen] = useState(false)

  if (!project) {
    return (
      <div className="card card-pad">
        <EmptyState
          icon={ListTodo}
          title="Project not found"
          message="The project you are looking for does not exist."
          action={
            <Link to="/projects" className="btn-primary">
              <ArrowLeft size={16} /> Back to Projects
            </Link>
          }
        />
      </div>
    )
  }

  function handleAddTask(data) {
    addTask({ ...data, projectId: id })
    setTaskModalOpen(false)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>{project.name}</h2>
          <div className="subtitle">{project.id} &middot; Created {project.createdAt}</div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={() => navigate('/projects')}>
            <ArrowLeft size={16} /> Return to Projects
          </button>
          <Link to="/ai-mentor" className="btn-secondary">
            <Sparkles size={16} /> Ask AI Mentor
          </Link>
          <Link to="/projects" className="btn-secondary">
            <Pencil size={16} /> Edit Project
          </Link>
          <button className="btn-primary" onClick={() => setTaskModalOpen(true)}>
            <Plus size={16} /> Add Task
          </button>
        </div>
      </div>

      <div className="card card-pad" style={{ marginBottom: '1.25rem' }}>
        <div className="form-row">
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Description</div>
            <p>{project.description}</p>
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Technology Stack</div>
            <div className="tech-stack">
              {project.techStack.map((t) => (
                <span className="tech-tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontWeight: 600 }}>Overall Progress</span>
            <span style={{ color: 'var(--text-muted)' }}>
              {tasks.filter((t) => t.status === 'Completed').length} / {tasks.length} tasks &middot; {progress}%
            </span>
          </div>
          <ProgressBar value={progress} />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Tasks</h3>
          <button className="btn-primary btn-sm" onClick={() => setTaskModalOpen(true)}>
            <Plus size={14} /> Add Task
          </button>
        </div>
        <div className="table-wrap">
          {tasks.length === 0 ? (
            <EmptyState
              icon={ListTodo}
              title="No tasks yet"
              message="Add the first task for this project."
              action={
                <button className="btn-primary btn-sm" onClick={() => setTaskModalOpen(true)}>
                  <Plus size={14} /> Add Task
                </button>
              }
            />
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Task</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr key={t.id}>
                    <td className="row-id">{t.id}</td>
                    <td style={{ fontWeight: 600 }}>{t.title}</td>
                    <td><PriorityBadge priority={t.priority} /></td>
                    <td><StatusBadge status={t.status} /></td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{t.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal open={taskModalOpen} title="Add Task" onClose={() => setTaskModalOpen(false)}>
        <TaskForm
          projects={[project]}
          initial={{ projectId: id }}
          onSubmit={handleAddTask}
          onCancel={() => setTaskModalOpen(false)}
          submitLabel="Save Task"
        />
      </Modal>
    </div>
  )
}
