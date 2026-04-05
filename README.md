# Fit Genius Backend

A complete FastAPI backend for a personalized AI fitness and nutrition coaching app featuring:

- **AI-Powered Coaching**: Model-agnostic service layer supporting Phi-3 Mini, Gemma 4 (local or cloud)
- **Personalized Plans**: AI-generated workout and nutrition plans with RAG integration
- **User Authentication**: Supabase JWT + Admin bcrypt authentication
- **Gamification**: XP, levels, badges, challenges, and leaderboards
- **Coach Service**: Encrypted text/voice coaching with Signal Protocol
- **Payment Integration**: Lemon Squeezy checkout with mobile money option for premium AI chat
- **Admin Dashboard**: Analytics, user management, feedback handling
- **Push Notifications**: Firebase Cloud Messaging integration
- **Gym Finder**: OpenStreetMap Overpass API integration
- **Comprehensive API**: 40+ endpoints for full app functionality

## Quick Start

### Prerequisites
- Python 3.11+
- Pip or Poetry
- Docker (optional)

### Installation

1. Clone and navigate to the project:
```bash
cd /workspaces/fit-genius
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys and endpoints
```

5. Run the server:
```bash
python -m uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

### Interactive API Docs
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key Endpoints

**User Management**
- `POST /onboarding/submit` — Complete user onboarding
- `GET /profile` — Get user profile
- `PATCH /profile/update` — Update profile with rate limiting

**AI & Coaching**
- `POST /workouts/generate` — Generate personalized workout plan
- `POST /nutrition/generate` — Generate meal plan with pricing
- `POST /coach/chat` — Chat with AI coach
- `POST /coach/voice` — Voice coaching (premium)

**Gamification**
- `GET /gamification/profile` — View XP, level, badges
- `POST /gamification/award-xp` — Award XP for actions
- `GET /gamification/challenges` — Get weekly challenges
- `GET /gamification/leaderboard` — View leaderboards

**Utilities**
- `GET /gyms/nearby` — Find nearby gyms
- `GET /notifications` — View notifications
- `POST /feedback/submit` — Submit user feedback

**Admin**
- `GET /admin/users` — Manage users
- `GET /admin/analytics/app` — App analytics
- `GET /admin/analytics/profit` — Revenue analytics
- `POST /admin/announcements` — Create announcements

See [ARCHITECTURE.md](ARCHITECTURE.md) for complete API reference.

## Configuration

### Environment Variables

```env
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Models
ACTIVE_MODEL=phi3-mini  # phi3-mini, gemma4, gemma4-cloud, or uploaded
OLLAMA_ENDPOINT=http://localhost:11434
GEMMA4_CLOUD_ENDPOINT=your_cloud_endpoint

# External Services
CHROMADB_ENDPOINT=http://localhost:8000
FIREBASE_PROJECT_ID=your_firebase_project
REDIS_URL=redis://localhost:6379

# Payment Configuration
PREMIUM_COST_UGX=5000
PAYMENT_RECIPIENT_NUMBER=+256 XXX XXX XXX
PREMIUM_FEATURES=ai_chat

# Lemon Squeezy (optional - for future automated subscriptions)
LEMON_SQUEEZY_API_KEY=your_lemon_squeezy_key

# AI Model Uploads
AI_MODEL_UPLOAD_DIR=/app/ai_models
AI_MODEL_FILE_NAME=model.guuf

# Admin
ADMIN_PASSWORD_HASH=your_bcrypt_hash
```

### Model Configuration

The AI service uses a config file that allows switching models with a single value:

```python
# app/config/__init__.py
MODEL_CONFIG = {
    "active_model": "phi3-mini",  # Switch by changing this
    "models": {
        "phi3-mini": {"type": "ollama", "name": "phi3:mini", ...},
        "gemma4": {"type": "ollama", "name": "gemma4", ...},
        "gemma4-cloud": {"type": "cloud", "name": "gemma4-finetuned", ...}
    }
}
```

## Docker Deployment

Build and run with Docker Compose:

```bash
docker-compose up --build
```

This starts:
- FastAPI server on port 8000
- Redis on port 6379
- All configured to work with external services (Supabase, Ollama, etc.)

## Project Structure

```
app/
├── config/           # Configuration (MODEL_CONFIG, env vars)
├── models/           # Pydantic models for all entities
├── routers/          # API endpoints organized by feature
├── services/         # Business logic (AI, Auth, Database)
└── utils/            # Helpers (rate limiting, encryption)
```

## Key Features

### AI Service Layer
- Model-agnostic: Switch between Phi-3 Mini, Gemma 4 (local), or cloud endpoints
- Structured prompts with full user context and RAG retrieval
- Methods for workouts, nutrition, coaching, challenges, and gamification

### Authentication
- **User Auth**: Supabase JWT validation
- **Admin Auth**: Separate bcrypt password hashing + JWT with role claim
- **Rate Limiting**: Custom middleware for IP-based rate limiting

### Onboarding
- Comprehensive user profile collection
- Auto age calculation from DOB
- Trigger initial AI generation of plans
- One-time flow per user

### Gamification
- XP points for completed workouts, logged meals, coach interactions
- Level progression system
- Badge and achievement system (extensible)
- Weekly/monthly challenges
- Global and friend leaderboards

### Notifications
- Push notifications via Firebase Cloud Messaging
- In-app notification storage and delivery
- Configurable notification preferences per user
- Types: workouts, meals, streaks, challenges, birthdays, achievements, announcements

### Admin Features
- User management (suspend/delete)
- In-app announcements with targeting
- Targeted push notifications
- App analytics (DAU, retention, completion rates)
- Revenue analytics (MRR, conversion, churn)
- User feedback management with reply system

### Payments
- Manual mobile money payment system (5000 UGX to unlock AI chat)
- Lemon Squeezy integration kept for future automated subscriptions
- Premium tier gating on AI chat feature

## API Authentication

Protected endpoints require Bearer token in Authorization header:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/profile
```

Admin endpoints require additional email claim in JWT token.

## Rate Limiting

- Default: 60 requests per minute per IP
- Applied to all endpoints via middleware
- Returns 429 status when exceeded

## Testing

Run tests with pytest:

```bash
pytest app/tests/
```

## Deployment Considerations

1. **Database**: Migrate to production Supabase project
2. **AI Models**: Deploy Ollama server or configure cloud endpoints
3. **Authentication**: Configure Supabase security rules
4. **Payment System**: Configure mobile money recipient number and premium pricing
5. **Lemon Squeezy**: Optional - set up for future automated subscriptions
5. **Firebase**: Set up Firebase project for push notifications
6. **Security**: 
   - Use HTTPS in production
   - Enable CORS appropriately
   - Implement input validation
   - Set up secrets management

## Development

### Adding New Endpoints

1. Create models in `app/models/`
2. Create router in `app/routers/`
3. Add service methods in `app/services/`
4. Include router in `app/main.py`

### Using the AI Service

```python
from app.services.ai_service import ai_service

response = await ai_service.generate_coach_response(
    user_context={"name": "John", "goal": "lose_weight"},
    message="How do I stay motivated?"
)
```

## Support & Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com
- **Supabase Docs**: https://supabase.com/docs
- **Ollama Models**: https://ollama.ai
- **Lemon Squeezy**: https://www.lemonsqueezy.com

## License

See LICENSE file for details.

## Next Steps

1. Set up Supabase project and database tables
2. Configure API keys for external services
3. Download and run Ollama with models
4. Deploy to your preferred cloud platform
5. Run comprehensive test suite
6. Set up CI/CD pipeline