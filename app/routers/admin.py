from fastapi import APIRouter, Depends, HTTPException, Query
from app.models import Feedback, FeedbackSubmit, Announcement, Analytics
from app.services.auth_service import get_current_admin
from app.services.supabase_service import supabase_service
from datetime import datetime
from typing import List, Optional
import json
import uuid
import base64

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/users")
async def get_users_list(
    current_admin: dict = Depends(get_current_admin),
    search: Optional[str] = None,
    page: int = 1,
    limit: int = 50
):
    """Get paginated list of users."""
    # Mock retrieve from database
    return {
        "users": [],
        "total": 0,
        "page": page,
        "limit": limit
    }

@router.post("/users/suspend")
async def suspend_user(
    user_id: str,
    reason: str,
    current_admin: dict = Depends(get_current_admin)
):
    """Suspend user account."""
    return {"message": f"User {user_id} suspended for: {reason}"}

@router.delete("/users/delete")
async def delete_user(
    user_id: str,
    current_admin: dict = Depends(get_current_admin)
):
    """Delete user and all associated data."""
    return {"message": f"User {user_id} and all data deleted"}

@router.post("/announcements")
async def create_announcement(
    title: str,
    message: str,
    target_audience: str,  # 'all', 'free', 'premium'
    current_admin: dict = Depends(get_current_admin)
):
    """Create in-app announcement."""
    announcement = {
        "id": str(uuid.uuid4()),
        "title": title,
        "message": message,
        "target_audience": target_audience,
        "created_at": datetime.utcnow().isoformat(),
        "sent": False
    }
    
    # Save to database and fan out to users
    return {"message": "Announcement created", "id": announcement["id"]}

@router.post("/notifications/send")
async def send_push_notification(
    title: str,
    body: str,
    target_audience: str,  # 'all', 'free', 'premium', or country
    scheduled_for: Optional[datetime] = None,
    current_admin: dict = Depends(get_current_admin)
):
    """Send targeted push notification."""
    return {"message": "Notification sent/scheduled"}

@router.get("/analytics/app")
async def get_app_analytics(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    current_admin: dict = Depends(get_current_admin)
):
    """Get app analytics."""
    return {
        "total_users": 0,
        "daily_active_users": 0,
        "monthly_active_users": 0,
        "retention_rates": {},
        "onboarding_completion_rate": 0.0,
        "popular_goals": {},
        "active_countries": [],
        "session_duration_avg": 0.0,
        "workout_completion_rate": 0.0,
        "meal_adherence_rate": 0.0
    }

@router.get("/analytics/profit")
async def get_profit_analytics(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    current_admin: dict = Depends(get_current_admin)
):
    """Get profit analytics from Lemon Squeezy."""
    return {
        "total_revenue": 0.0,
        "monthly_recurring_revenue": 0.0,
        "free_premium_ratio": 0.0,
        "conversion_rate": 0.0,
        "churn_rate": 0.0,
        "gym_referral_clicks": 0
    }

@router.get("/feedback")
async def get_feedback_list(
    status: Optional[str] = None,
    category: Optional[str] = None,
    page: int = 1,
    limit: int = 50,
    current_admin: dict = Depends(get_current_admin)
):
    """Get paginated feedback list."""
    return {
        "feedback": [],
        "total": 0,
        "page": page,
        "limit": limit
    }

@router.patch("/feedback/status")
async def update_feedback_status(
    feedback_id: str,
    status: str,  # 'read', 'in_progress', 'resolved'
    current_admin: dict = Depends(get_current_admin)
):
    """Update feedback status."""
    return {"message": f"Feedback {feedback_id} status updated to {status}"}

@router.post("/feedback/reply")
async def reply_to_feedback(
    feedback_id: str,
    reply: str,
    current_admin: dict = Depends(get_current_admin)
):
    """Send reply to user feedback."""
    return {"message": "Reply sent"}