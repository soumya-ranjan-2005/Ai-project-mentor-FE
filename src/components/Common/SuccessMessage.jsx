// Reusable success alert. Dismissible when onDismiss is provided.

import { CheckCircle2, X } from 'lucide-react'

export default function SuccessMessage({ message, onDismiss }) {
  if (!message) return null
  return (
    <div className="alert alert-success" role="status">
      <CheckCircle2 size={18} aria-hidden="true" />
      <span>{message}</span>
      {onDismiss && (
        <button className="alert-close" onClick={onDismiss} aria-label="Dismiss message">
          <X size={16} />
        </button>
      )}
    </div>
  )
}
