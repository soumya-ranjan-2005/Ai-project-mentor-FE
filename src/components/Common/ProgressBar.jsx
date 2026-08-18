// Reusable progress bar. variant controls colour: blue (default), green, amber, red.

export default function ProgressBar({ value, variant }) {
  const v = Math.max(0, Math.min(100, value || 0))
  const cls = variant ? `progress-bar ${variant}` : 'progress-bar'
  return (
    <div className="progress" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
      <div className={cls} style={{ width: `${v}%` }} />
    </div>
  )
}
