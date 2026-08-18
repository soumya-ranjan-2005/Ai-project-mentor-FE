// Application routes. The AppDataProvider wraps everything so every page
// can read and update the shared mock-data state.

import { Routes, Route } from 'react-router-dom'
import { AppDataProvider } from './context/AppDataContext'
import AppLayout from './components/Layout/AppLayout'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import TasksPage from './pages/TasksPage'
import AIMentorPage from './pages/AIMentorPage'
import AIHistoryPage from './pages/AIHistoryPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <AppDataProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/ai-mentor" element={<AIMentorPage />} />
          <Route path="/ai-history" element={<AIHistoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AppDataProvider>
  )
}

export default App
