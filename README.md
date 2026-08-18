# AI Project Mentor

A beginner-friendly full-stack training application where users can manage software projects, track development tasks, and ask an AI mentor to break requirements into actionable tasks.

## Application objective

AI Project Mentor helps learners practise the full development workflow:

- Create and manage software projects.
- Add development tasks to a project.
- Update task priorities and statuses.
- View project progress through a dashboard.
- Ask an AI mentor to break requirements into development tasks.
- View previous AI interactions.

This repository currently contains **only the frontend**. It runs entirely on realistic mock data, so no backend or database is required to try it locally.

## Technology stack

**Frontend (this repo)**

- HTML5
- CSS3
- JavaScript ES6+ (plain JS + JSX, no TypeScript)
- React.js (functional components + hooks)
- Vite (React build tool)
- React Router DOM (navigation)
- Axios (prepared for future backend calls)

**Planned backend technologies (not included here)**

- Python
- FastAPI REST APIs
- SQL Server database
- Ollama Cloud API using a GPT-OSS model

> The Ollama API key and database credentials belong only in the future Python backend. They are never referenced or exposed in this frontend.

## Current frontend features

- Responsive sidebar + header layout with collapsible mobile navigation
- Dashboard with summary cards, project progress, recent tasks, and AI recommendation
- Projects page with create / edit / delete (mock CRUD via local state)
- Project details page with per-project task list
- Tasks page with filters, search, status badges, and CRUD
- AI Mentor page with a mock structured AI response
- AI History page with filters and detail view
- Reusable UI components: LoadingSpinner, ErrorMessage, SuccessMessage, EmptyState, ConfirmDialog
- Form validation with inline messages
- Confirmation dialogs before deletes
- Loading, success, and error states throughout

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Folder structure

```
src/
  components/
    Layout/        Sidebar, header, and app shell
    Dashboard/     Dashboard-specific cards and sections
    Projects/      Project cards, forms, and confirm dialogs
    Tasks/         Task table, forms, filters, and badges
    AI/            AI mentor response sections and history views
    Common/        Reusable UI: spinner, messages, empty state, dialog
  pages/           One file per route (Dashboard, Projects, Tasks, AI, etc.)
  services/
    api.js         Axios instance + reusable API functions for the future backend
  data/
    mockData.js    Realistic mock projects, tasks, and AI interactions
  context/
    AppDataContext.jsx  Local CRUD state shared across pages
  styles/
    global.css     Design system: colours, typography, layout helpers
  App.jsx          Routes
  main.jsx         React entry point
```

## Environment variables

Copy `.env.example` to `.env` and adjust if needed:

| Variable | Description | Default |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Base URL of the future FastAPI backend | `http://127.0.0.1:8000` |
| `VITE_USE_MOCK_DATA` | `true` uses mock data; `false` calls the real backend | `true` |

Never add `OLLAMA_API_KEY`, database usernames, database passwords, or SQL Server connection strings to this frontend. Those values live only in the Python backend.

## Future FastAPI integration plan

`src/services/api.js` already exposes functions that map 1:1 to the planned endpoints:

| Frontend function | Future endpoint |
| --- | --- |
| `checkBackendHealth()` | `GET /api/health` |
| `getDashboardStatistics()` | `GET /api/dashboard` |
| `getProjects()` | `GET /api/projects` |
| `createProject(data)` | `POST /api/projects` |
| `getProjectById(id)` | `GET /api/projects/{id}` |
| `updateProject(id, data)` | `PUT /api/projects/{id}` |
| `deleteProject(id)` | `DELETE /api/projects/{id}` |
| `getTasks()` | `GET /api/tasks` |
| `createTask(data)` | `POST /api/tasks` |
| `updateTask(id, data)` | `PUT /api/tasks/{id}` |
| `updateTaskStatus(id, status)` | `PATCH /api/tasks/{id}/status` |
| `deleteTask(id)` | `DELETE /api/tasks/{id}` |
| `generateAIPlan(data)` | `POST /api/ai/plan` |
| `getAIHistory(projectId)` | `GET /api/ai/history/{projectId}` |

To switch from mock data to the real backend:

1. Start the FastAPI server.
2. Set `VITE_USE_MOCK_DATA=false` in `.env`.
3. The app will automatically start calling the API functions in `src/services/api.js`.
