// Not Found page for unknown routes.

import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="card card-pad" style={{ textAlign: 'center' }}>
      <div className="empty-state">
        <div className="empty-icon">
          <Compass size={28} />
        </div>
        <h3>Page not found</h3>
        <p>The page you are looking for does not exist or has moved.</p>
        <Link to="/" className="btn-primary">Back to Dashboard</Link>
      </div>
    </div>
  )
}
