import os
from typing import Dict, Any

MODEL_CONFIG = {
    "active_model": os.getenv("ACTIVE_MODEL", "phi3-mini"),
    "models": {
        "phi3-mini": {
            "type": "ollama",
            "name": "phi3:mini",
            "endpoint": os.getenv("OLLAMA_ENDPOINT", "http://localhost:11434")
        },
        "gemma4": {
            "type": "ollama",
            "name": "gemma4",
            "endpoint": os.getenv("OLLAMA_ENDPOINT", "http://localhost:11434")
        },
        "gemma4-cloud": {
            "type": "cloud",
            "name": "gemma4-finetuned",
            "endpoint": os.getenv("GEMMA4_CLOUD_ENDPOINT", "YOUR_CLOUD_SERVER_URL")
        }
    }
}

# Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

# ChromaDB
CHROMADB_ENDPOINT = os.getenv("CHROMADB_ENDPOINT", "http://localhost:8000")

# Lemon Squeezy (kept for future use)
LEMON_SQUEEZY_API_KEY = os.getenv("LEMON_SQUEEZY_API_KEY")

# Manual Payment Configuration
PREMIUM_COST_UGX = 5000
PAYMENT_RECIPIENT_NUMBER = "+256 XXX XXX XXX"
PREMIUM_FEATURES = ["ai_chat"]

# Firebase
FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID")

# Redis
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

# Admin
ADMIN_EMAIL = "bulegafarid@gmail.com"
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")