// App shell: sidebar + header + routed page content. Manages the mobile
// sidebar open/close state and the global search string.

import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

// Map route path -> header title
const titles = {
  '/': 'Dashboard',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/ai-mentor': 'AI Mentor',
  '/ai-history': 'AI History',
}

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const location = useLocation()

  // Pick a title: known route, or "Project Details" for /projects/:id
  const title =
    titles[location.pathname] ||
    (location.pathname.startsWith('/projects/') ? 'Project Details' : 'Page')

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div
          className="scrim show"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className="main-area">
        <Header
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
          search={search}
          onSearchChange={setSearch}
        />
        <main className="page">
          <Outlet context={{ globalSearch: search }} />
        </main>
      </div>
    </div>
  )
}
