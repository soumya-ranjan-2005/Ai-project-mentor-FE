// Dashboard page: summary cards, project progress, recent tasks, AI recommendation.

import StatCards from '../components/Dashboard/StatCards'
import ProjectProgress from '../components/Dashboard/ProjectProgress'
import RecentTasks from '../components/Dashboard/RecentTasks'
import AIRecommendedNextTask from '../components/Dashboard/AIRecommendedNextTask'
import { useAppData } from '../context/AppDataContext'

export default function DashboardPage() {
  const { projects, getTaskStats } = useAppData()
  const stats = {
    totalProjects: projects.length,
    ...getTaskStats(),
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <div className="subtitle">Overview of your projects, tasks and AI recommendations.</div>
        </div>
      </div>

      <StatCards stats={stats} />

      <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
        <ProjectProgress />
        <AIRecommendedNextTask />
      </div>

      <RecentTasks />
    </div>
  )
}
