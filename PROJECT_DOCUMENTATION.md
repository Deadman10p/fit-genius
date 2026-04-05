# Fit Genius Full Stack Documentation

## Project Overview

Fit Genius is a complete AI-driven fitness and nutrition coaching platform built as a full-stack application:

- **Backend**: FastAPI with Python, Supabase-style authentication, AI model abstraction, and extensive business logic.
- **Frontend**: React + TypeScript with Tailwind CSS, providing a modern UI for onboarding, workouts, nutrition, coaching, gamification, and admin management.
- **Deployment**: Docker Compose for full-stack orchestration including backend, frontend, PostgreSQL, and Redis.

This documentation covers project architecture, features, integration details, configuration, and launch instructions.

## Repository Structure

```
/workspaces/
├── fit-genius/                # FastAPI backend project
│   ├── app/
│   │   ├── main.py            # FastAPI application entrypoint
│   │   ├── config/            # Configuration and environment handling
│   │   ├── models/            # Pydantic domain models
│   │   ├── routers/           # API route definitions (11 routers)
│   │   ├── services/          # Business logic and services
│   │   ├── utils/             # Utility helpers
│   │   └── tests/             # Test scaffolding
│   ├── requirements.txt       # Backend dependencies
│   ├── Dockerfile             # Backend container image
│   └── README.md              # Backend documentation
│
├── myfit-quest-pro/          # React frontend project
│   ├── src/
│   │   ├── pages/             # Page views
│   │   ├── components/        # Reusable UI components
│   │   ├── services/          # API integration layer
│   │   ├── types/             # TypeScript type definitions
│   │   ├── hooks/             # React hooks (auth, state)
│   │   └── App.tsx            # Client routing and layout
│   ├── package.json
│   ├── Dockerfile             # Frontend container image
│   └── README.md              # Frontend documentation
│
├── docker-compose.yml        # Root stack orchestration
├── .env.example              # Environment template for local and Docker
├── INTEGRATION_GUIDE.md      # Existing integration instructions
├── PROJECT_DOCUMENTATION.md  # This consolidated documentation file
└── .gitignore                # Ignored files for both backend and frontend
```

## What Has Been Done

### Backend

- Built a reusable **model-agnostic AI service layer** supporting:
  - `phi3-mini` (local Ollama)
  - `gemma4` (local Ollama)
  - `gemma4-cloud` (cloud endpoint)
- Implemented **40+ API endpoints** across 11 feature routers:
  - Onboarding and profile management
  - Workout generation and logging
  - Nutrition planning and meal logging
  - AI coach chat and voice coaching
  - Gamification (XP, badges, challenges, leaderboards)
  - Gym finder using OpenStreetMap
  - Push notification preferences and notification management
  - Admin analytics, user management, announcements, feedback
  - Payment integration with Lemon Squeezy
- Added security features:
  - Supabase-style JWT authentication
  - Admin auth with bcrypt + role-based access
  - Rate limiting middleware
  - Signal Protocol-ready chat architecture
- Provided documentation files:
  - `README.md`
  - `ARCHITECTURE.md`
  - `EXTERNAL_SERVICES.md`
  - `IMPLEMENTATION_SUMMARY.md`
  - `INSTRUCTIONS.md`
  - `INTEGRATION_GUIDE.md`

### Frontend

- Created a **React + TypeScript** frontend application.
- Added **Tailwind CSS** styling and responsive layout.
- Implemented core routes and pages for:
  - Home / landing page
  - Login / registration
  - Dashboard
  - Workouts
  - Nutrition
  - AI Coach
  - Gamification
  - Profile
  - Admin panel
- Built a **service layer** for API integration with the backend.
- Created **auth state management** with protected routes.
- Added a frontend Dockerfile ready for containerized deployment.

## Architecture

### Backend Architecture

- `app/main.py` initializes FastAPI, mounts routers, and starts the server.
- `app/config/` defines environment-driven settings and AI model mapping.
- `app/models/` contains Pydantic request and response schemas.
- `app/routers/` organizes domain features into modular API endpoints.
- `app/services/` implements core business logic for AI, auth, and Supabase integration.
- `app/utils/` provides middleware and helpers like rate limiting.

### Frontend Architecture

- `src/App.tsx` configures routes and global layout.
- `src/hooks/useAuth.tsx` manages authentication state and token storage.
- `src/components/` includes reusable UI controls and route protection.
- `src/pages/` contains screen-level views for the major app areas.
- `src/services/api.ts` is the single client for all backend API calls.
- `src/types/api.ts` defines shared data structures for the client.

## Integration Strategy

### API Connectivity

- Frontend reads the backend URL from `REACT_APP_API_URL`.
- Backend exposes its API on `http://localhost:8000` in local development.
- Frontend calls backend endpoints such as:
  - `/login`, `/register`
  - `/profile`, `/onboarding/submit`
  - `/workouts/generate`, `/nutrition/generate`
  - `/coach/chat`, `/gamification/profile`
  - `/admin/*`

### Docker Compose

The root `docker-compose.yml` defines a multi-service stack:

- `postgres` - PostgreSQL database
- `redis` - Redis cache
- `backend` - FastAPI application
- `frontend` - React application

### Local Dev Workflow

1. Set up environment variables in `.env` from `.env.example`.
2. Start the backend and frontend with Docker Compose:
   ```bash
   docker compose up --build
   ```
3. Visit the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`
   - Backend docs: `http://localhost:8000/docs`

## Key Configuration

### Root `.env.example`

This file includes configuration for both services:

- `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- `REDIS_URL`
- `OLLAMA_ENDPOINT`, `GEMMA4_CLOUD_ENDPOINT`
- `CHROMADB_ENDPOINT`, `LEMON_SQUEEZY_API_KEY`, `FIREBASE_PROJECT_ID`
- `ADMIN_EMAIL`
- `REACT_APP_API_URL`

### Frontend `.env`

The frontend is configured with:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_ENV=development
```

## Running the Full Stack

### Option 1: Docker Compose

From `/workspaces`:

```bash
docker compose up --build
```

### Option 2: Local Development

#### Backend

```bash
cd /workspaces/fit-genius
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python -m uvicorn app.main:app --reload
```

#### Frontend

```bash
cd /workspaces/myfit-quest-pro
npm install
cp .env.example .env
npm start
```

## Architecture Notes

### AI Model Support

The backend supports switching AI models via configuration:

- `phi3-mini` - local Ollama model
- `gemma4` - local Ollama model
- `gemma4-cloud` - cloud-hosted Gemma 4

### Authentication

- User authentication through Supabase JWT.
- Admin login through a separate bcrypt-hashed password and role-based token.
- `ProtectedRoute` on the frontend redirects unauthenticated users to login.

### Admin Access

Admin routes and features are protected both in the backend and frontend. The frontend includes an admin page scaffold, and the backend exposes admin analytics, user management, and announcements.

## Next Steps

1. **Verify backend service availability** at `http://localhost:8000`.
2. **Confirm frontend uses `REACT_APP_API_URL`** and points to the backend.
3. **Add production-ready environment values** for Supabase, Ollama, Firebase, and Lemon Squeezy.
4. **Expand frontend pages** with real data rendering and user workflows.
5. **Add end-to-end tests** for API and UI flows.

## References

- `fit-genius/README.md` — Backend-specific documentation
- `myfit-quest-pro/README.md` — Frontend-specific documentation
- `INTEGRATION_GUIDE.md` — Deployment and integration instructions

---

This file is the consolidated project documentation for Fit Genius. It summarizes the work completed, provides architecture and integration details, and explains how to run the full stack locally or via Docker.