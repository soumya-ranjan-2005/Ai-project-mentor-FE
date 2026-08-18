// Top header: page title, search, notifications, profile and the mobile
// menu button. The search box is a simple controlled input wired to the
// onSearch callback so pages can react to it.

import { Menu, Search, Bell } from 'lucide-react'

export default function Header({ title, onMenuClick, search, onSearchChange }) {
  return (
    <header className="header">
      <button
        className="mobile-menu-btn"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      <div className="header-title">{title}</div>

      <div className="header-search">
        <span className="search-icon">
          <Search size={16} />
        </span>
        <input
          type="search"
          placeholder="Search projects, tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search"
        />
      </div>

      <div className="header-actions">
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="badge-dot" />
        </button>
        <div className="user-chip" title="Demo user">
          <div className="user-avatar">AM</div>
          <span className="user-name">Alex Mentor</span>
        </div>
      </div>
    </header>
  )
}
