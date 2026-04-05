# External Services Setup Guide

This guide walks you through setting up all external services needed for the Fit Genius Backend.

## 1. Supabase (Database & Authentication)

**What it's for**: PostgreSQL database + JWT authentication

### Setup Steps

1. Go to https://supabase.com
2. Sign up or log in
3. Create a new project
4. Wait for project to initialize
5. Go to **Settings → API** to find:
   - `Project URL` → Set as `SUPABASE_URL`
   - `anon public` key → Set as `SUPABASE_ANON_KEY`
6. Create the required tables:

```sql
-- Run these in Supabase SQL Editor

-- Users table (managed by Supabase auth)
-- Profiles extension of users
CREATE TABLE profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id),
    name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    age INT NOT NULL,
    goal TEXT NOT NULL,
    fitness_level TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    budget TEXT NOT NULL,
    meals_per_day INT NOT NULL,
    dietary_restrictions TEXT DEFAULT '[]',
    notification_preferences TEXT DEFAULT '{}',
    xp INT DEFAULT 0,
    streak INT DEFAULT 0,
    change_history TEXT DEFAULT '[]',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Workouts
CREATE TABLE workouts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    exercises TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Nutrition
CREATE TABLE nutrition_plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date TIMESTAMP NOT NULL,
    meals TEXT NOT NULL,
    total_cost FLOAT NOT NULL,
    currency TEXT DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Conversations
CREATE TABLE conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT NOW(),
    read BOOLEAN DEFAULT FALSE
);

-- Feedback
CREATE TABLE feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    message TEXT NOT NULL,
    screenshot TEXT,
    status TEXT DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

7. Enable Row Level Security (RLS) on tables for security
8. Add indexes for performance:

```sql
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_workouts_user_id ON workouts(user_id);
CREATE INDEX idx_nutrition_user_id ON nutrition_plans(user_id);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_feedback_user_id ON feedback(user_id);
```

## 2. Ollama (Local AI Models)

**What it's for**: Running Phi-3 Mini or Gemma 4 locally

### Installation

1. Install from https://ollama.ai
2. Run Ollama server:
   ```bash
   ollama serve
   ```
   (Keep this running in a separate terminal)

3. Pull models:
   ```bash
   # Phi-3 Mini (smaller, faster)
   ollama pull phi3:mini
   
   # Or Gemma 4 (more capable)
   ollama pull gemma4
   ```

4. Set in `.env`:
   ```
   OLLAMA_ENDPOINT=http://localhost:11434
   ACTIVE_MODEL=phi3-mini
   ```

### Verify

```bash
curl http://localhost:11434/api/tags
```

## 3. Firebase (Push Notifications)

**What it's for**: Sending push notifications to mobile apps

### Setup Steps

1. Go to https://firebase.google.com
2. Click "Get Started"
3. Create a new project
4. Add an app (iOS/Android/Web)
5. Download credentials:
   - Go to **Project Settings → Service Accounts**
   - Generate new private key
   - Save as `firebase-credentials.json`
6. Set in `.env`:
   ```
   FIREBASE_PROJECT_ID=your-project-id
   ```

### Integration

```python
import firebase_admin
from firebase_admin import credentials, messaging

# Initialize
cred = credentials.Certificate('firebase-credentials.json')
firebase_admin.initialize_app(cred)

# Send notification
message = messaging.Message(
    notification=messaging.Notification(
        title='Title',
        body='Body'
    ),
    token='device_token'
)
response = messaging.send(message)
```

## 4. Lemon Squeezy (Payments)

**What it's for**: Subscription billing and payment processing

### Setup Steps

1. Go to https://www.lemonsqueezy.com
2. Create account and verify email
3. Go to **Settings → API** to get API key
4. Create a product and price tier
5. Set in `.env`:
   ```
   LEMON_SQUEEZY_API_KEY=your_secret_api_key
   ```

### Webhook Setup

1. Go to **Settings → Webhooks**
2. Add webhook URL:
   ```
   https://your-domain.com/payments/webhook/lemon-squeezy
   ```
3. Subscribe to events:
   - order.created
   - order.refunded
   - subscription.updated

### Test Payment

Use Lemon Squeezy's test mode with card `4111 1111 1111 1111`

## 5. ChromaDB (Vector Store for RAG)

**What it's for**: Storing and retrieving embeddings for RAG

### Installation

```bash
pip install chromadb
```

### Run Server

```bash
chroma run --host 0.0.0.0 --port 8001
```

Set in `.env`:
```
CHROMADB_ENDPOINT=http://localhost:8001
```

### Load Data

```python
import chromadb

client = chromadb.HttpClient(host='localhost', port=8001)
collection = client.get_or_create_collection(name="workouts")

# Add documents
collection.add(
    ids=["1", "2"],
    documents=["Push-ups", "Squats"],
    metadatas=[{"type": "exercise"}, {"type": "exercise"}]
)
```

## 6. Redis (Caching)

**What it's for**: Rate limiting and caching

### Installation

```bash
# On Mac
brew install redis

# On Linux
sudo apt-get install redis-server

# With Docker
docker run -d -p 6379:6379 redis:7-alpine
```

### Run Server

```bash
redis-server
```

Set in `.env`:
```
REDIS_URL=redis://localhost:6379
```

## 7. OpenStreetMap Nominatim & Overpass API

**What it's for**: Gym location data

These are free public APIs, no setup needed.

- **Nominatim**: https://nominatim.openstreetmap.org (geocoding)
- **Overpass**: https://overpass-api.de (map data queries)

Just make HTTP requests (already implemented in code).

## Complete .env File

After setting up all services:

```env
# Database
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJxxxxx.xxxxx.xxxxx

# AI Models
ACTIVE_MODEL=phi3-mini
OLLAMA_ENDPOINT=http://localhost:11434
GEMMA4_CLOUD_ENDPOINT=https://your-cloud-endpoint.com

# Vector Store
CHROMADB_ENDPOINT=http://localhost:8001

# Cache
REDIS_URL=redis://localhost:6379

# Payments
LEMON_SQUEEZY_API_KEY=lsy_sk_xxxxx

# Firebase
FIREBASE_PROJECT_ID=your-project-id

# Admin
ADMIN_PASSWORD_HASH=$2b$12$xxxxx  # Generated with bcrypt
```

## Local Development Setup

Complete docker-compose.yml already includes Redis:

```bash
docker-compose up --build
```

This starts:
- App on port 8000
- Redis on port 6379

Still need to set up:
- Supabase (cloud)
- Firebase (cloud)
- Ollama (local terminal)
- Lemon Squeezy (cloud)
- ChromaDB (optional, can run as service)

## Testing Services

### Test Ollama
```bash
curl http://localhost:11434/api/generate \
  -d '{"model":"phi3:mini","prompt":"Hello"}'
```

### Test Redis
```bash
redis-cli ping
```

### Test Supabase
```bash
curl https://xxxxx.supabase.co/rest/v1/profiles?select=* \
  -H "apikey: xxxxx" \
  -H "Authorization: Bearer xxxxx"
```

### Test Firebase
```python
import firebase_admin
firebase_admin.get_app()  # Check if initialized
```

### Test Lemon Squeezy
```bash
curl https://api.lemonsqueezy.com/v1/products \
  -H "Authorization: Bearer your_api_key"
```

## Next Steps

1. Set up services in this order:
   - Supabase (database is critical)
   - Redis (used by rate limiting)
   - Ollama (used by AI service)
   - Firebase (for notifications)
   - Lemon Squeezy (for payments)
   - ChromaDB (optional, for advanced RAG)

2. Update `.env` with actual credentials

3. Run migrations to create database tables

4. Start the FastAPI server:
   ```bash
   python -m uvicorn app.main:app --reload
   ```

5. Test endpoints using Swagger UI:
   ```
   http://localhost:8000/docs
   ```

## Troubleshooting

### "Cannot connect to Supabase"
- Check `SUPABASE_URL` and `SUPABASE_ANON_KEY` in .env
- Verify project is active in Supabase dashboard

### "Ollama not responding"
- Make sure `ollama serve` is running
- Check `OLLAMA_ENDPOINT` is correct
- Try: `curl http://localhost:11434/api/tags`

### "Redis connection refused"
- Start Redis: `redis-server`
- Check `REDIS_URL` is correct

### "Firebase credentials error"
- Ensure `firebase-credentials.json` exists
- Check service account has proper permissions

### "Lemon Squeezy webhook not triggering"
- Verify webhook URL is publicly accessible (not localhost)
- Check webhook signature verification in code
- Test with Lemon Squeezy webhook tester

## Production Considerations

1. Use managed services:
   - Supabase (hosted)
   - Firebase (hosted)
   - Redis (AWS ElastiCache, Heroku Redis)
   - ChromaDB (Pinecone, Weaviate)

2. Environment variables:
   - Store secrets in secrets manager
   - Never commit .env to git
   - Use different keys per environment

3. API Keys:
   - Rotate regularly
   - Use service accounts with minimal permissions
   - Monitor usage and set up alerts