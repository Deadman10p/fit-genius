from fastapi import APIRouter, Depends, HTTPException
from app.models import CoachRequest, CoachResponse
from app.services.auth_service import get_current_user
from app.services.ai_service import ai_service
from app.services.supabase_service import supabase_service
from app.config import PREMIUM_COST_UGX, PAYMENT_RECIPIENT_NUMBER
from datetime import datetime
from typing import List
import json
import uuid

router = APIRouter(prefix="/coach", tags=["coach"])

@router.post("/chat")
async def coach_chat(
    request: CoachRequest,
    current_user: dict = Depends(get_current_user)
):
    """Send message to coach (text chat - premium only)."""
    profile = await supabase_service.get_user_profile(current_user['id'])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    # Check premium status
    subscription = profile.get("subscription", {})
    is_premium = subscription.get("status") == "active" and subscription.get("plan") == "premium"
    if not is_premium:
        raise HTTPException(
            status_code=403, 
            detail=f"AI chat is a premium feature. Send {PREMIUM_COST_UGX} UGX to {PAYMENT_RECIPIENT_NUMBER} to unlock premium access."
        )
    
    # Build user context
    user_context = {
        "name": profile.get("name"),
        "goal": profile.get("goal"),
        "fitness_level": profile.get("fitness_level"),
        "xp": profile.get("xp", 0)
    }
    
    # Get AI response
    response_text = await ai_service.generate_coach_response(user_context, request.message)
    
    # Store conversation in database
    conversation_data = {
        "user_id": current_user['id'],
        "message": request.message,
        "response": response_text,
        "timestamp": datetime.utcnow().isoformat(),
        "encrypted": True
    }
    
    # Mock save
    return CoachResponse(
        response=response_text,
        suggestions=["Keep it up!", "You can do better!"]
    )

@router.get("/history")
async def get_chat_history(
    current_user: dict = Depends(get_current_user),
    limit: int = 50
):
    """Get coach chat history."""
    # Mock retrieve from database
    return {
        "conversations": [],
        "total": 0
    }

@router.post("/voice")
async def coach_voice(
    request: CoachRequest,
    current_user: dict = Depends(get_current_user)
):
    """Voice coach endpoint (premium only)."""
    # Check premium status
    profile = await supabase_service.get_user_profile(current_user['id'])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    # Check subscription (mock)
    is_premium = False  # Mock - check against payment service
    if not is_premium:
        raise HTTPException(status_code=403, detail="Premium feature required")
    
    # Get AI response
    user_context = {
        "name": profile.get("name"),
        "goal": profile.get("goal"),
        "fitness_level": profile.get("fitness_level"),
    }
    
    response_text = await ai_service.generate_coach_response(user_context, request.message)
    
    return {
        "audio_stream": f"mock_audio_stream_for_{response_text[:20]}",
        "text": response_text
    }