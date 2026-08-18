// Reusable loading spinner. Use <LoadingSpinner /> for a centered block
// or <LoadingSpinner size="sm" inline /> for a small inline spinner.

export default function LoadingSpinner({ size, inline, message }) {
  const className = size === 'sm' ? 'spinner sm' : 'spinner'
  if (inline) {
    return <span className={className} role="status" aria-label="Loading" />
  }
  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <span className={className} />
      {message && <p>{message}</p>}
    </div>
  )
}
