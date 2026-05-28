# TaskFlow Web

React + Vite frontend for TaskFlow API.

## Setup

```bash
npm install
npm run dev    # Start dev server on port 5173
npm test       # Run tests
npm run build  # Build for production
npm run preview # Preview production build
```

## Environment

- `VITE_API_URL` — TaskFlow API base URL (default: `http://localhost:3001`)

```bash
VITE_API_URL=http://api.example.com npm run dev
```

## Features

- List tasks
- Create task
- Edit task
- Delete task
- Filter by status (todo, in_progress, done)

## Component Structure

- `App.jsx` — Main component
- `components/TaskForm.jsx` — Create/edit form
- `components/TaskList.jsx` — List of tasks
- `components/TaskCard.jsx` — Single task card
- `api/tasks.js` — API client wrapper
