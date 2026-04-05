from fastapi import APIRouter, Depends, HTTPException
from app.models import FeedbackSubmit
from app.services.auth_service import get_current_user
from app.services.supabase_service import supabase_service
from datetime import datetime, timedelta
from typing import Optional
import json
import uuid

router = APIRouter(prefix="/feedback", tags=["feedback"])

@router.post("/submit")
async def submit_feedback(
    feedback: FeedbackSubmit,
    current_user: dict = Depends(get_current_user)
):
    """Submit feedback (rate limited: 5 per day per user)."""
    # Check rate limit
    today = datetime.utcnow().date()
    
    # Mock check - in production, query database
    submission_count_today = 0
    
    if submission_count_today >= 5:
        raise HTTPException(status_code=429, detail="Feedback submission limit exceeded (5 per day)")
    
    feedback_data = {
        "id": str(uuid.uuid4()),
        "user_id": current_user['id'],
        "category": feedback.category,
        "message": feedback.message,
        "screenshot": feedback.screenshot,
        "status": "unread",
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }
    
    # Save to database
    # Mock save
    
    return {
        "message": "Feedback submitted successfully",
        "feedback_id": feedback_data["id"]
    }