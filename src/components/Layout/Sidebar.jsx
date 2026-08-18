// Application sidebar. On desktop it is a fixed column; on mobile it slides
// in when the header menu button is pressed.

import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Sparkles,
  History,
  GraduationCap,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/tasks', label: 'Tasks', icon: ListTodo },
  { to: '/ai-mentor', label: 'AI Mentor', icon: Sparkles },
  { to: '/ai-history', label: 'AI History', icon: History },
]

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Primary navigation">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <GraduationCap size={20} />
        </div>
        <h1>AI Project Mentor</h1>
        <div className="brand-sub">Learn. Build. Ship.</div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Menu</div>
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        Frontend demo &middot; mock data mode
      </div>
    </aside>
  )
}
