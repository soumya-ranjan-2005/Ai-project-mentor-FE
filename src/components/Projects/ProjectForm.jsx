// Reusable form for creating and editing a project. Used inside a modal.

import { useState } from 'react'

const EMPTY = { name: '', description: '', techStack: '' }

export default function ProjectForm({ initial, onSubmit, onCancel, submitLabel = 'Save Project' }) {
  const [form, setForm] = useState(() => ({
    name: initial?.name || '',
    description: initial?.description || '',
    techStack: Array.isArray(initial?.techStack) ? initial.techStack.join(', ') : '',
  }))
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Project name is required.'
    if (!form.description.trim()) e.description = 'Description is required.'
    if (!form.techStack.trim()) e.techStack = 'Technology stack is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean),
    })
  }

  function setField(name, value) {
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="proj-name">Project Name</label>
        <input
          id="proj-name"
          type="text"
          value={form.name}
          onChange={(e) => setField('name', e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'proj-name-err' : undefined}
        />
        {errors.name && <div className="form-error" id="proj-name-err">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="proj-desc">Project Description</label>
        <textarea
          id="proj-desc"
          rows={4}
          value={form.description}
          onChange={(e) => setField('description', e.target.value)}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'proj-desc-err' : undefined}
        />
        {errors.description && <div className="form-error" id="proj-desc-err">{errors.description}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="proj-stack">Technology Stack</label>
        <input
          id="proj-stack"
          type="text"
          value={form.techStack}
          onChange={(e) => setField('techStack', e.target.value)}
          placeholder="React, FastAPI, SQL Server"
          aria-invalid={!!errors.techStack}
          aria-describedby={errors.techStack ? 'proj-stack-err' : 'proj-stack-hint'}
        />
        {errors.techStack ? (
          <div className="form-error" id="proj-stack-err">{errors.techStack}</div>
        ) : (
          <div className="form-hint" id="proj-stack-hint">Comma-separated, e.g. React, FastAPI, SQL Server.</div>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary">{submitLabel}</button>
      </div>
    </form>
  )
}
