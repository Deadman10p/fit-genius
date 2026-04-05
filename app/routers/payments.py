from fastapi import APIRouter, Depends, HTTPException, Request
from app.models import Subscription, PaymentWebhook
from app.services.auth_service import get_current_user
from app.services.supabase_service import supabase_service
from datetime import datetime, timedelta
from typing import Optional
import json
import hmac
import hashlib

router = APIRouter(prefix="/payments", tags=["payments"])

@router.get("/subscription")
async def get_subscription(current_user: dict = Depends(get_current_user)):
    """Get user's subscription status."""
    profile = await supabase_service.get_user_profile(current_user['id'])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    subscription = profile.get("subscription", {})
    return {
        "user_id": current_user['id'],
        "plan": subscription.get("plan", "free"),
        "status": subscription.get("status", "inactive"),
        "start_date": subscription.get("start_date"),
        "end_date": subscription.get("end_date"),
        "renewal_date": subscription.get("renewal_date")
    }

@router.post("/subscribe")
async def subscribe_to_premium(
    current_user: dict = Depends(get_current_user)
):
    """Initiate premium subscription via Lemon Squeezy."""
    return {
        "message": "Redirect to Lemon Squeezy checkout",
        "checkout_url": "https://your-lemonsqueezy-store.com/checkout"
    }

@router.post("/webhook/lemon-squeezy")
async def handle_lemon_squeezy_webhook(
    request: Request
):
    """Handle Lemon Squeezy webhook for subscription events."""
    body = await request.body()
    signature = request.headers.get("X-Signature")
    
    # Verify signature
    webhook_secret = "your_webhook_secret"
    expected_signature = hmac.new(
        webhook_secret.encode(),
        body,
        hashlib.sha256
    ).hexdigest()
    
    if not hmac.compare_digest(signature or "", expected_signature):
        raise HTTPException(status_code=401, detail="Invalid signature")
    
    # Parse event
    event_data = json.loads(body)
    event_type = event_data.get("meta", {}).get("event_name")
    
    if event_type == "order.created":
        # New subscription created
        pass
    elif event_type == "order.refunded":
        # Subscription cancelled
        pass
    elif event_type == "subscription.updated":
        # Subscription renewed
        pass
    
    return {"message": "Webhook processed"}

@router.get("/is-premium")
async def check_premium_status(current_user: dict = Depends(get_current_user)):
    """Check if user has active premium subscription."""
    profile = await supabase_service.get_user_profile(current_user['id'])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    subscription = profile.get("subscription", {})
    is_premium = subscription.get("status") == "active" and subscription.get("plan") == "premium"
    
    return {
        "is_premium": is_premium,
        "plan": subscription.get("plan", "free")
    }

# Middleware to check premium status on endpoints
def require_premium(current_user: dict = Depends(get_current_user)):
    """Dependency to guard premium endpoints."""
    # Check subscription status
    # In production, query database
    is_premium = False
    
    if not is_premium:
        raise HTTPException(status_code=403, detail="Premium subscription required")
    
    return current_user