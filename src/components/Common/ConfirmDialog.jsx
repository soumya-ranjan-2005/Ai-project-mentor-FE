// Reusable confirmation dialog. Rendered as a modal so the user must
// confirm or cancel before a destructive action (e.g. delete) runs.

import { AlertTriangle } from 'lucide-react'

export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) {
  if (!open) return null
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 id="confirm-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              className="ai-section-icon"
              style={{ background: 'var(--error-light)', color: 'var(--error)' }}
            >
              <AlertTriangle size={16} />
            </span>
            {title}
          </h3>
        </div>
        <div className="modal-body">
          <p style={{ color: 'var(--text)' }}>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
