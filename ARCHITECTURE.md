# Fit Genius Backend Architecture

## Project Overview

A complete FastAPI backend for a personalized AI fitness and nutrition coaching app with integrated authentication, gamification, payment processing, and admin controls.

## Tech Stack

- **Framework**: FastAPI
- **AUTH**: Supabase JWT + Admin bcrypt hashing
- **Database**: Supabase (PostgreSQL)
- **AI Model Service**: Ollama (local) + Cloud endpoints
- **RAG Vector Store**: ChromaDB
- **E2E Encryption**: Signal Protocol
- **Push Notifications**: Firebase Cloud Messaging
- **Payments**: Lemon Squeezy
- **Caching**: Redis
- **Rate Limiting**: Custom middleware

## Project Structure

```
/workspaces/fit-genius/
├── app/
│   ├── main.py                 # FastAPI app instance
│   ├── config/                 # Configuration and settings
│   │   └── __init__.py        # MODEL_CONFIG, API keys, environment vars
│   ├── models/                 # Pydantic models for requests/responses
│   │   ├── user.py            # User auth models
│   │   ├── profile.py          # Onboarding and profile models
│   │   ├── workout.py          # Workout plans and sessions
│   │   ├── nutrition.py        # Meal plans and food data
│   │   ├── coach.py            # Coach chat models
│   │   ├── notification.py     # Push notifications
│   │   ├── gamification.py     # XP, badges, challenges
│   │   ├── feedback.py         # User feedback
│   │   ├── admin.py            # Admin analytics
│   │   ├── payment.py          # Subscription models
│   │   ├── gym.py              # Gym location data
│   │   └── __init__.py         # Model exports
│   ├── routers/                # API endpoint routers
│   │   ├── onboarding.py       # POST /onboarding/submit
│   │   ├── profile.py          # GET/PATCH /profile/*
│   │   ├── workouts.py         # Workout generation and logging
│   │   ├── nutrition.py        # Meal plan generation
│   │   ├── coach.py            # Coach chat (text and voice)
│   │   ├── gyms.py             # Gym finder via Overpass API
│   │   ├── gamification.py     # XP, levels, badges, challenges
│   │   ├── notifications.py    # Push notification management
│   │   ├── admin.py            # Admin endpoints
│   │   ├── feedback.py         # User feedback submission
│   │   ├── payments.py         # Lemon Squeezy integration
│   │   └── __init__.py         # Router exports
│   ├── services/               # Business logic
│   │   ├── supabase_service.py # Database operations
│   │   ├── auth_service.py     # JWT validation, admin auth
│   │   └── ai_service.py       # AI model abstraction layer
│   ├── utils/                  # Helper utilities
│   │   ├── rate_limit.py       # Rate limiting middleware
│   │   └── __init__.py
│   └── tests/                  # Test suite
├── requirements.txt            # Python dependencies
├── Dockerfile                  # Docker containerization
├── docker-compose.yml          # Local development stack
├── .env.example                # Environment variable template
└── README.md                   # Setup instructions
```

## Core Features Implemented

### 1. Authentication & Authorization
- **User Auth**: Supabase JWT token validation on protected endpoints
- **Admin Auth**: Separate bcrypt password hashing + JWT with role claim
- **Middleware**: HTTPBearer for all protected routes
- **Rate Limiting**: Custom middleware limiting requests per minute

### 2. Onboarding Flow
- **POST /onboarding/submit**: Full onboarding with validation
  - Name, DOB, goal, fitness level, location, budget, meals/day, dietary restrictions, notification prefs
  - Auto-calculates age from DOB
  - Triggers AI generation of initial plans (mock)
  - One-time per user

### 3. User Profile Management
- **GET /profile**: Retrieve user profile
- **PATCH /profile/update**: Update with rate limiting
  - Goal: 2 per month
  - Fitness level: 1 per month
  - Budget: 1 per week
  - Change history tracking

### 4. AI Service Layer
- **Model Agnostic**: Single config controls active model
- **Model Options**:
  - `phi3-mini` (Ollama local)
  - `gemma4` (Ollama local)
  - `gemma4-cloud` (Remote endpoint)
- **Methods**:
  - `generate_workout()`: Home + gym variants
  - `generate_nutrition_plan()`: Budget/dietary filtered meals
  - `generate_coach_response()`: Personalized coaching
  - `generate_challenge()`: Weekly challenges
  - `generate_gamification_response()`: Achievement messages

### 5. Workout Management
- **GET /workouts/current**: Current week plan
- **POST /workouts/generate**: AI-generated plan (home/gym)
- **POST /workouts/log-session**: Track completed workouts
- Tracks: exercises, sets, reps, completed/skipped, difficulty feedback
- Weekly regeneration every Sunday (auto)
- Missed workout detection logic

### 6. Nutrition Planning
- **GET /nutrition/current**: Today's meal plan
- **POST /nutrition/generate**: AI meal plan with costs
  - Filters by budget tier
  - Uses local foods + global foods
  - Nutritional breakdown + estimated cost
- **POST /nutrition/log-meal**: Track consumed meals
- **GET /nutrition/food-prices**: Regional pricing data

### 7. Coach Service
- **POST /coach/chat**: Text chat with AI coach
  - Full user context (workouts, nutrition, XP, challenges, streaks)
  - Signal Protocol encryption (integration ready)
- **GET /coach/history**: Conversation history
- **POST /coach/voice**: Voice streaming (premium gated)
  - Auto returns upgrade prompt for free tier

### 8. Gym Finder
- **GET /gyms/nearby**: Query Overpass API
  - Takes user coordinates + radius
  - Returns gym name, address, phone, website
  - Caching in database
- **POST /gyms/click**: Track referral clicks

### 9. Gamification
- **GET /gamification/profile**: XP, level, badges, streaks
- **POST /gamification/award-xp**: Award XP for actions
  - Level calculation with configurable thresholds
  - Level-up notifications
- **GET /gamification/challenges**: Weekly AI-generated challenges
- **GET /gamification/leaderboard**: Global + friends leaderboards
- **GET /gamification/badges**: Available badges

### 10. Notifications
- **GET /notifications**: User notification list
- **PATCH /notifications/mark-read**: Mark as read
- **GET/PATCH /notifications/preferences**: Customize notification types
  - Workout reminders, meal reminders, streak warnings, challenge deadlines
  - Birthday rewards, achievement unlocks, announcements, app updates
  - Coach replies

### 11. Admin Dashboard
- **GET /admin/users**: Paginated users list + search
- **POST /admin/users/suspend**: Suspend account
- **DELETE /admin/users/delete**: Delete user + all data
- **POST /admin/announcements**: Create in-app announcements (all/free/premium)
- **POST /admin/notifications/send**: Targeted push notifications + scheduling
- **GET /admin/analytics/app**: App metrics (DAU, retention, completion rates, etc)
- **GET /admin/analytics/profit**: Revenue metrics (MRR, conversion, churn, referrals)
- **GET /admin/feedback**: Paginated feedback list
- **PATCH /admin/feedback/status**: Update status (read/in_progress/resolved)
- **POST /admin/feedback/reply**: Reply to feedback (triggers user notification)

### 12. User Feedback
- **POST /feedback/submit**: Submit feedback with optional screenshot
  - Rate limited: 5 submissions per user per day
  - Categories + base64 screenshot support
  - Status tracking

### 13. Payment Integration
- **GET /payments/subscription**: Check subscription status
- **POST /payments/subscribe**: Initiate Lemon Squeezy checkout
- **POST /payments/webhook/lemon-squeezy**: Handle subscription events
  - order.created, order.refunded, subscription.updated
  - Signature verification
- **GET /payments/is-premium**: Check premium status
- **Premium Gating**: Voice coach, future features

## API Endpoints Summary

### Authentication & User
- `POST /onboarding/submit`
- `GET /profile`
- `PATCH /profile/update`

### Workouts
- `GET /workouts/current`
- `POST /workouts/generate`
- `POST /workouts/log-session`

### Nutrition
- `GET /nutrition/current`
- `POST /nutrition/generate`
- `POST /nutrition/log-meal`
- `GET /nutrition/food-prices`

### Coach
- `POST /coach/chat`
- `GET /coach/history`
- `POST /coach/voice`

### Gyms
- `GET /gyms/nearby`
- `POST /gyms/click`

### Gamification
- `GET /gamification/profile`
- `POST /gamification/award-xp`
- `GET /gamification/challenges`
- `GET /gamification/leaderboard`
- `GET /gamification/badges`

### Notifications
- `GET /notifications`
- `POST /notifications/mark-read`
- `GET /notifications/preferences`
- `PATCH /notifications/preferences`

### Admin
- `GET /admin/users`
- `POST /admin/users/suspend`
- `DELETE /admin/users/delete`
- `POST /admin/announcements`
- `POST /admin/notifications/send`
- `GET /admin/analytics/app`
- `GET /admin/analytics/profit`
- `GET /admin/feedback`
- `PATCH /admin/feedback/status`
- `POST /admin/feedback/reply`

### Feedback
- `POST /feedback/submit`

### Payments
- `GET /payments/subscription`
- `POST /payments/subscribe`
- `POST /payments/webhook/lemon-squeezy`
- `GET /payments/is-premium`

### Health
- `GET /health`

## Configuration

All configuration is in `app/config/__init__.py` and loaded from environment variables:

```python
MODEL_CONFIG = {
    "active_model": "phi3-mini",  # Set via ACTIVE_MODEL env var
    "models": {
        "phi3-mini": {"type": "ollama", ...},
        "gemma4": {"type": "ollama", ...},
        "gemma4-cloud": {"type": "cloud", ...}
    }
}
```

Environment variables:
- `SUPABASE_URL`, `SUPABASE_ANON_KEY` — Database
- `CHROMADB_ENDPOINT` — Vector store
- `OLLAMA_ENDPOINT` — Local model server
- `GEMMA4_CLOUD_ENDPOINT` — Cloud model
- `LEMON_SQUEEZY_API_KEY` — Payments
- `FIREBASE_PROJECT_ID` — Push notifications
- `REDIS_URL` — Caching
- `ADMIN_PASSWORD_HASH` — Admin password (bcrypt)
- `ACTIVE_MODEL` — Active AI model

## Running the Application

### Local Development
```bash
pip install -r requirements.txt
export SUPABASE_URL=your_url
export SUPABASE_ANON_KEY=your_key
python -m uvicorn app.main:app --reload
```

### Docker
```bash
docker-compose up --build
```

API will be available at `http://localhost:8000`
Swagger UI at `http://localhost:8000/docs`

## Next Steps

1. **Database Setup**
   - Create Supabase project
   - Run migrations to create tables (users, profiles, workouts, nutrition, etc.)

2. **AI Model Setup**
   - Download Phi-3 Mini or Gemma 4 models to Ollama
   - Or configure cloud endpoints

3. **External Services**
   - Set up Firebase project for push notifications
   - Create Lemon Squeezy account for payments
   - Get Supabase URL and API keys

4. **ChromaDB Integration**
   - Deploy ChromaDB for RAG vector storage
   - Load workout/nutrition datasets

5. **Signal Protocol Setup**
   - Implement E2E encryption for coach communications
   - Set up key management

6. **Testing**
   - Create comprehensive test suite
   - Load testing for rate limits
   - End-to-end user flow tests

7. **Deployment**
   - Configure for cloud deployment (AWS, GCP, Heroku, etc.)
   - Set up CI/CD pipeline
   - Add monitoring and error tracking

## Security Checklist

- [x] JWT validation on all protected routes
- [x] Separate admin authentication with bcrypt
- [x] Rate limiting middleware
- [ ] Input sanitization (add validators)
- [x] No metadata collection on coach conversations (design)
- [ ] Signal Protocol encryption implementation
- [ ] HTTPS enforcement in production
- [ ] Secrets management (never commit .env)