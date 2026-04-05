from fastapi import APIRouter, Depends, HTTPException
from app.models import Notification, PushNotification
from app.services.auth_service import get_current_user
from app.services.supabase_service import supabase_service
from datetime import datetime
from typing import List
import json
import uuid

router = APIRouter(prefix="/notifications", tags=["notifications"])

@router.get("/")
async def get_notifications(
    current_user: dict = Depends(get_current_user),
    unread_only: bool = False
):
    """Get user notifications."""
    # Mock retrieve from database
    notifications = []
    
    return {
        "notifications": notifications,
        "unread_count": 0
    }

@router.post("/mark-read")
async def mark_notification_read(
    notification_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Mark notification as read."""
    return {"message": "Notification marked as read"}

@router.get("/preferences")
async def get_notification_preferences(current_user: dict = Depends(get_current_user)):
    """Get user notification preferences."""
    profile = await supabase_service.get_user_profile(current_user['id'])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    prefs = json.loads(profile.get("notification_preferences", "{}"))
    return {
        "workout_reminders": prefs.get("workout_reminders", True),
        "meal_reminders": prefs.get("meal_reminders", True),
        "streak_warnings": prefs.get("streak_warnings", True),
        "challenge_deadlines": prefs.get("challenge_deadlines", True),
        "birthday_rewards": prefs.get("birthday_rewards", True),
        "achievement_unlocks": prefs.get("achievement_unlocks", True),
        "admin_announcements": prefs.get("admin_announcements", True),
        "app_updates": prefs.get("app_updates", True),
        "coach_replies": prefs.get("coach_replies", True)
    }

@router.patch("/preferences")
async def update_notification_preferences(
    preferences: dict,
    current_user: dict = Depends(get_current_user)
):
    """Update notification preferences."""
    await supabase_service.update_profile(
        current_user['id'],
        {"notification_preferences": json.dumps(preferences)}
    )
    return {"message": "Preferences updated"}

async def send_push_notification(user_id: str, title: str, body: str, data: dict = None):
    """Send push notification via Firebase Cloud Messaging."""
    # Integrate with Firebase Admin SDK
    # For now, just mock
    pass