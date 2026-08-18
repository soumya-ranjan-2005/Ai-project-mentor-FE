// Central data store for the frontend.
//
// While VITE_USE_MOCK_DATA is true (the default), this context owns all
// projects, tasks and AI interactions in React state and exposes simple
// CRUD helpers. When the FastAPI backend is ready, set VITE_USE_MOCK_DATA to
// false and replace the bodies of these helpers with calls to the matching
// functions in src/services/api.js — the page components will not need to
// change because the function signatures stay the same.

import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { mockProjects, mockTasks, mockAIHistory } from '../data/mockData'

const AppDataContext = createContext(null)

// Small helper to generate ids like PRJ-004 or TSK-013
function nextId(prefix, items) {
  const nums = items
    .map((it) => parseInt(String(it.id).split('-')[1], 10))
    .filter((n) => !Number.isNaN(n))
  const max = nums.length ? Math.max(...nums) : 0
  return `${prefix}-${String(max + 1).padStart(3, '0')}`
}

export function AppDataProvider({ children }) {
  const [projects, setProjects] = useState(mockProjects)
  const [tasks, setTasks] = useState(mockTasks)
  const [aiHistory, setAiHistory] = useState(mockAIHistory)

  // ----- Project helpers -----
  const addProject = useCallback((data) => {
    const newProject = {
      id: nextId('PRJ', projects),
      name: data.name,
      description: data.description,
      techStack: data.techStack,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setProjects((prev) => [newProject, ...prev])
    return newProject
  }, [projects])

  const updateProject = useCallback((projectId, data) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, name: data.name, description: data.description, techStack: data.techStack }
          : p
      )
    )
  }, [])

  const deleteProject = useCallback((projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId))
    setTasks((prev) => prev.filter((t) => t.projectId !== projectId))
  }, [])

  // ----- Task helpers -----
  const addTask = useCallback((data) => {
    const today = new Date().toISOString().slice(0, 10)
    const newTask = {
      id: nextId('TSK', tasks),
      projectId: data.projectId,
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      aiGenerated: !!data.aiGenerated,
      createdAt: today,
      updatedAt: today,
    }
    setTasks((prev) => [newTask, ...prev])
    return newTask
  }, [tasks])

  const updateTask = useCallback((taskId, data) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              projectId: data.projectId ?? t.projectId,
              title: data.title ?? t.title,
              description: data.description ?? t.description,
              priority: data.priority ?? t.priority,
              status: data.status ?? t.status,
              aiGenerated: data.aiGenerated !== undefined ? !!data.aiGenerated : t.aiGenerated,
              updatedAt: new Date().toISOString().slice(0, 10),
            }
          : t
      )
    )
  }, [])

  const updateTaskStatus = useCallback((taskId, status) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status, updatedAt: new Date().toISOString().slice(0, 10) } : t
      )
    )
  }, [])

  const deleteTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }, [])

  // ----- AI helpers -----
  const addAIInteraction = useCallback((interaction) => {
    const newInteraction = {
      id: nextId('AI', aiHistory),
      createdAt: new Date().toISOString().slice(0, 10),
      ...interaction,
    }
    setAiHistory((prev) => [newInteraction, ...prev])
    return newInteraction
  }, [aiHistory])

  const deleteAIInteraction = useCallback((interactionId) => {
    setAiHistory((prev) => prev.filter((a) => a.id !== interactionId))
  }, [])

  // ----- Derived helpers shared across pages -----
  const getProject = useCallback((id) => projects.find((p) => p.id === id), [projects])

  const getTasksByProject = useCallback(
    (projectId) => tasks.filter((t) => t.projectId === projectId),
    [tasks]
  )

  const getTaskStats = useCallback((projectId) => {
    const list = projectId ? tasks.filter((t) => t.projectId === projectId) : tasks
    return {
      total: list.length,
      pending: list.filter((t) => t.status === 'Pending').length,
      inProgress: list.filter((t) => t.status === 'In Progress').length,
      completed: list.filter((t) => t.status === 'Completed').length,
    }
  }, [tasks])

  const getProjectProgress = useCallback(
    (projectId) => {
      const stats = getTaskStats(projectId)
      if (stats.total === 0) return 0
      return Math.round((stats.completed / stats.total) * 100)
    },
    [getTaskStats]
  )

  const value = useMemo(
    () => ({
      projects,
      tasks,
      aiHistory,
      addProject,
      updateProject,
      deleteProject,
      addTask,
      updateTask,
      updateTaskStatus,
      deleteTask,
      addAIInteraction,
      deleteAIInteraction,
      getProject,
      getTasksByProject,
      getTaskStats,
      getProjectProgress,
    }),
    [
      projects, tasks, aiHistory,
      addProject, updateProject, deleteProject,
      addTask, updateTask, updateTaskStatus, deleteTask,
      addAIInteraction, deleteAIInteraction,
      getProject, getTasksByProject, getTaskStats, getProjectProgress,
    ]
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within an AppDataProvider')
  return ctx
}
