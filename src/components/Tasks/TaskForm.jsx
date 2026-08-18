// Reusable form for creating and editing a task. Used inside a modal.

import { useState } from 'react'

const PRIORITIES = ['Low', 'Medium', 'High']
const STATUSES = ['Pending', 'In Progress', 'Completed']

export default function TaskForm({ projects, initial, onSubmit, onCancel, submitLabel = 'Save Task' }) {
  const [form, setForm] = useState(() => ({
    projectId: initial?.projectId || (projects[0]?.id ?? ''),
    title: initial?.title || '',
    description: initial?.description || '',
    priority: initial?.priority || 'Medium',
    status: initial?.status || 'Pending',
    aiGenerated: initial?.aiGenerated || false,
  }))
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.projectId) e.projectId = 'Please select a project.'
    if (!form.title.trim()) e.title = 'Task title is required.'
    if (!form.description.trim()) e.description = 'Task description is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() })
  }

  function setField(name, value) {
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-project">Select Project</label>
          <select
            id="task-project"
            value={form.projectId}
            onChange={(e) => setField('projectId', e.target.value)}
            aria-invalid={!!errors.projectId}
          >
            <option value="">— Select a project —</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          {errors.projectId && <div className="form-error">{errors.projectId}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="task-title">Task Title</label>
          <input
            id="task-title"
            type="text"
            value={form.title}
            onChange={(e) => setField('title', e.target.value)}
            aria-invalid={!!errors.title}
          />
          {errors.title && <div className="form-error">{errors.title}</div>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="task-desc">Task Description</label>
        <textarea
          id="task-desc"
          rows={3}
          value={form.description}
          onChange={(e) => setField('description', e.target.value)}
          aria-invalid={!!errors.description}
        />
        {errors.description && <div className="form-error">{errors.description}</div>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            value={form.priority}
            onChange={(e) => setField('priority', e.target.value)}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="task-status">Status</label>
          <select
            id="task-status"
            value={form.status}
            onChange={(e) => setField('status', e.target.value)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={form.aiGenerated}
            onChange={(e) => setField('aiGenerated', e.target.checked)}
          />
          AI Generated
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary">{submitLabel}</button>
      </div>
    </form>
  )
}
