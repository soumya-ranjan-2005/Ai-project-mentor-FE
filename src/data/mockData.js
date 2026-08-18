// Mock data for the AI Project Mentor frontend.
// Stored in one place so pages stay clean and so the data can later be
// replaced with real API calls from src/services/api.js.

export const mockProjects = [
  {
    id: 'PRJ-001',
    name: 'Student Placement Portal',
    description:
      'A campus placement portal where students can register, upload resumes, and apply for company drives. Admins can manage eligible companies and shortlist candidates.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'Ollama'],
    createdAt: '2026-07-04',
  },
  {
    id: 'PRJ-002',
    name: 'Hospital Appointment System',
    description:
      'A hospital booking system allowing patients to book, reschedule and cancel appointments with doctors by department and availability.',
    techStack: ['React', 'FastAPI', 'SQL Server'],
    createdAt: '2026-07-21',
  },
  {
    id: 'PRJ-003',
    name: 'AI Resume Mentor',
    description:
      'An AI-powered resume assistant that reviews uploaded resumes, suggests improvements, and generates tailored cover letters using a GPT-OSS model.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'GPT-OSS'],
    createdAt: '2026-08-02',
  },
]

export const mockTasks = [
  {
    id: 'TSK-001',
    projectId: 'PRJ-001',
    title: 'Design student registration form',
    description: 'Create a responsive registration form with validation for student personal and academic details.',
    priority: 'High',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-07-05',
    updatedAt: '2026-07-09',
  },
  {
    id: 'TSK-002',
    projectId: 'PRJ-001',
    title: 'Build company drive listing API',
    description: 'Implement a FastAPI endpoint that returns upcoming placement drives filtered by branch and year.',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2026-07-06',
    updatedAt: '2026-08-12',
  },
  {
    id: 'TSK-003',
    projectId: 'PRJ-001',
    title: 'Resume upload and parsing',
    description: 'Allow students to upload PDF resumes and extract text for AI screening.',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-07-10',
    updatedAt: '2026-07-10',
  },
  {
    id: 'TSK-004',
    projectId: 'PRJ-001',
    title: 'Admin dashboard for shortlisting',
    description: 'Create an admin view to shortlist candidates based on eligibility criteria.',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2026-07-15',
    updatedAt: '2026-07-15',
  },
  {
    id: 'TSK-005',
    projectId: 'PRJ-002',
    title: 'Doctor availability calendar',
    description: 'Build a weekly calendar UI showing doctor slots and booking status.',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: false,
    createdAt: '2026-07-22',
    updatedAt: '2026-08-14',
  },
  {
    id: 'TSK-006',
    projectId: 'PRJ-002',
    title: 'Patient authentication flow',
    description: 'Implement patient sign-up, login and JWT session handling.',
    priority: 'High',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-07-23',
    updatedAt: '2026-08-01',
  },
  {
    id: 'TSK-007',
    projectId: 'PRJ-002',
    title: 'Appointment booking endpoint',
    description: 'Create a FastAPI endpoint to book, reschedule and cancel appointments.',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-07-28',
    updatedAt: '2026-07-28',
  },
  {
    id: 'TSK-008',
    projectId: 'PRJ-003',
    title: 'Resume upload component',
    description: 'Build a drag-and-drop resume upload component with file type validation.',
    priority: 'Medium',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-08-03',
    updatedAt: '2026-08-10',
  },
  {
    id: 'TSK-009',
    projectId: 'PRJ-003',
    title: 'AI resume analysis prompt chain',
    description: 'Design a prompt chain that scores resume sections and suggests improvements using the GPT-OSS model.',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: true,
    createdAt: '2026-08-05',
    updatedAt: '2026-08-16',
  },
  {
    id: 'TSK-010',
    projectId: 'PRJ-003',
    title: 'Cover letter generation page',
    description: 'Create a page that takes a job description and generates a tailored cover letter.',
    priority: 'Low',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2026-08-06',
    updatedAt: '2026-08-06',
  },
  {
    id: 'TSK-011',
    projectId: 'PRJ-001',
    title: 'Email notification service',
    description: 'Send confirmation and reminder emails to students about upcoming drives.',
    priority: 'Low',
    status: 'Pending',
    aiGenerated: true,
    createdAt: '2026-07-18',
    updatedAt: '2026-07-18',
  },
  {
    id: 'TSK-012',
    projectId: 'PRJ-002',
    title: 'Department and doctor management',
    description: 'Admin CRUD screens for managing hospital departments and associated doctors.',
    priority: 'Medium',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-07-24',
    updatedAt: '2026-08-09',
  },
]

export const mockAIHistory = [
  {
    id: 'AI-001',
    projectId: 'PRJ-001',
    taskType: 'Break Requirement into Tasks',
    userPrompt:
      'We need a student placement portal with registration, resume upload, company drives and shortlisting.',
    responsePreview:
      'Requirement understood. Suggested 6 frontend tasks, 5 backend tasks and 3 database tasks. Key blocker: resume parsing accuracy.',
    modelName: 'GPT-OSS 20B',
    createdAt: '2026-07-04',
    response: {
      understanding:
        'The portal must let students register, upload resumes, view company drives and be shortlisted by admins.',
      frontendTasks: [
        'Student registration form with validation',
        'Resume upload component with PDF preview',
        'Company drive listing page with filters',
        'Admin shortlisting dashboard',
      ],
      backendTasks: [
        'Student auth endpoints (signup, login, JWT)',
        'Company drive CRUD endpoints',
        'Resume upload and text extraction endpoint',
        'Shortlisting endpoint with eligibility rules',
      ],
      databaseTasks: [
        'Students table with academic fields',
        'Companies and drives tables with relations',
        'Applications junction table',
      ],
      testingSteps: [
        'Unit test auth and drive endpoints',
        'Integration test resume upload flow',
        'Manual test shortlisting rules',
      ],
      blockers: [
        'Resume parsing accuracy may vary across PDF formats',
        'High traffic during drive deadlines may need caching',
      ],
      nextAction: 'Start with the student registration form and auth endpoints.',
    },
  },
  {
    id: 'AI-002',
    projectId: 'PRJ-002',
    taskType: 'Generate Project Plan',
    userPrompt:
      'Plan a hospital appointment system with patient login, doctor availability and booking management.',
    responsePreview:
      'Project plan generated across 4 phases: setup, patient module, doctor module, booking module. Estimated 8 weeks.',
    modelName: 'GPT-OSS 20B',
    createdAt: '2026-07-21',
    response: {
      understanding:
        'A booking system connecting patients to doctors by department and availability, with reschedule and cancel flows.',
      frontendTasks: [
        'Patient login and registration screens',
        'Doctor availability calendar',
        'Booking confirmation modal',
      ],
      backendTasks: [
        'Patient and doctor auth endpoints',
        'Availability slot CRUD endpoints',
        'Booking, reschedule and cancel endpoints',
      ],
      databaseTasks: [
        'Patients, doctors and departments tables',
        'Appointments table with status tracking',
      ],
      testingSteps: [
        'Test slot conflict prevention',
        'Test reschedule and cancel flows',
      ],
      blockers: [
        'Time zone handling for appointments',
        'Concurrent booking race conditions',
      ],
      nextAction: 'Set up the database schema and patient auth first.',
    },
  },
  {
    id: 'AI-003',
    projectId: 'PRJ-003',
    taskType: 'Recommend Next Task',
    userPrompt: 'What should I build next for the AI Resume Mentor?',
    responsePreview:
      'Recommended next task: build the AI resume analysis prompt chain. Reason: core feature that unblocks cover letter generation.',
    modelName: 'GPT-OSS 20B',
    createdAt: '2026-08-06',
    response: {
      understanding:
        'The resume upload is complete. The next highest-value task is the AI analysis that powers suggestions and cover letters.',
      frontendTasks: [
        'Analysis results display with section scores',
        'Suggestion cards with accept / dismiss actions',
      ],
      backendTasks: [
        'Prompt chain endpoint for resume analysis',
        'Suggestion storage endpoint',
      ],
      databaseTasks: [
        'Resume analyses table',
        'Suggestions table linked to analyses',
      ],
      testingSteps: [
        'Test prompt chain with sample resumes',
        'Verify suggestion relevance',
      ],
      blockers: [
        'GPT-OSS response latency may need streaming',
        'Token cost for long resumes',
      ],
      nextAction: 'Build the AI resume analysis prompt chain next.',
    },
  },
  {
    id: 'AI-004',
    projectId: 'PRJ-001',
    taskType: 'Identify Project Blockers',
    userPrompt: 'What blockers should I watch out for in the placement portal?',
    responsePreview:
      'Identified 4 blockers: resume parsing, drive traffic, email delivery, and data privacy compliance.',
    modelName: 'GPT-OSS 20B',
    createdAt: '2026-08-10',
    response: {
      understanding:
        'The user wants a risk-focused review of the placement portal before the next sprint.',
      frontendTasks: [
        'Add loading states for resume parsing',
        'Add graceful error UI for failed emails',
      ],
      backendTasks: [
        'Add retry queue for email notifications',
        'Add rate limiting on drive listing endpoint',
      ],
      databaseTasks: [
        'Add indexes on drive eligibility columns',
        'Archive past drives to keep the table lean',
      ],
      testingSteps: [
        'Load test the drive listing endpoint',
        'Test email retry behaviour',
      ],
      blockers: [
        'Resume parsing accuracy across PDF formats',
        'Traffic spikes during drive deadlines',
        'Email deliverability and spam filtering',
        'Personal data privacy compliance',
      ],
      nextAction: 'Prioritise resume parsing accuracy and drive endpoint caching.',
    },
  },
]

// AI task type options shown on the AI Mentor page
export const aiTaskTypes = [
  { value: 'Generate Project Plan', label: 'Generate Project Plan', desc: 'Full phased plan' },
  { value: 'Break Requirement into Tasks', label: 'Break Requirement into Tasks', desc: 'Frontend / backend / DB' },
  { value: 'Recommend Next Task', label: 'Recommend Next Task', desc: 'Next best action' },
  { value: 'Identify Project Blockers', label: 'Identify Project Blockers', desc: 'Risk review' },
  { value: 'Explain Implementation', label: 'Explain Implementation', desc: 'How to build it' },
  { value: 'Generate Testing Checklist', label: 'Generate Testing Checklist', desc: 'QA steps' },
]
