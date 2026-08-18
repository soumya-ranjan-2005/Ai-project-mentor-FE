// Axios service layer for the future Python FastAPI backend.
//
// The frontend currently runs on mock data (see src/data/mockData.js and
// src/context/AppDataContext.jsx). These functions are prepared so that when
// VITE_USE_MOCK_DATA is set to false the same UI can call the real backend with
// almost no changes to the pages.
//
// IMPORTANT: No AI or database credentials are ever referenced here. The
// Ollama API key stays in the Python backend only.

import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

// Shared axios instance. Every function below uses this so the base URL,
// timeout and future interceptors live in one place.
const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// ---------- Health ----------
export async function checkBackendHealth() {
  const res = await apiClient.get('/api/health')
  return res.data
}

// ---------- Dashboard ----------
export async function getDashboardStatistics() {
  const res = await apiClient.get('/api/dashboard')
  return res.data
}

// ---------- Projects ----------
export async function getProjects() {
  const res = await apiClient.get('/api/projects')
  return res.data
}

export async function getProjectById(projectId) {
  const res = await apiClient.get(`/api/projects/${projectId}`)
  return res.data
}

export async function createProject(projectData) {
  const res = await apiClient.post('/api/projects', projectData)
  return res.data
}

export async function updateProject(projectId, projectData) {
  const res = await apiClient.put(`/api/projects/${projectId}`, projectData)
  return res.data
}

export async function deleteProject(projectId) {
  const res = await apiClient.delete(`/api/projects/${projectId}`)
  return res.data
}

// ---------- Tasks ----------
export async function getTasks() {
  const res = await apiClient.get('/api/tasks')
  return res.data
}

export async function createTask(taskData) {
  const res = await apiClient.post('/api/tasks', taskData)
  return res.data
}

export async function updateTask(taskId, taskData) {
  const res = await apiClient.put(`/api/tasks/${taskId}`, taskData)
  return res.data
}

export async function updateTaskStatus(taskId, status) {
  const res = await apiClient.patch(`/api/tasks/${taskId}/status`, { status })
  return res.data
}

export async function deleteTask(taskId) {
  const res = await apiClient.delete(`/api/tasks/${taskId}`)
  return res.data
}

// ---------- AI Mentor ----------
export async function generateAIPlan(requestData) {
  const res = await apiClient.post('/api/ai/plan', requestData)
  return res.data
}

export async function getAIHistory(projectId) {
  const res = await apiClient.get(`/api/ai/history/${projectId}`)
  return res.data
}

export default apiClient
