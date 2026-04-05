from fastapi import APIRouter, Depends, HTTPException
from app.models import XPEntry, Level, Badge, Achievement, Challenge, LeaderboardEntry
from app.services.auth_service import get_current_user
from app.services.ai_service import ai_service
from app.services.supabase_service import supabase_service
from datetime import datetime
from typing import List
import json
import uuid

router = APIRouter(prefix="/gamification", tags=["gamification"])

# Configurable thresholds
XP_THRESHOLDS = {1: 0, 2: 100, 3: 250, 4: 450, 5: 700}

@router.get("/profile")
async def get_gamification_profile(current_user: dict = Depends(get_current_user)):
    """Get user's gamification profile (XP, level, badges, streaks)."""
    profile = await supabase_service.get_user_profile(current_user['id'])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return {
        "user_id": current_user['id'],
        "xp": profile.get("xp", 0),
        "level": calculate_level(profile.get("xp", 0)),
        "badges": [],
        "streak": profile.get("streak", 0),
        "achievements": []
    }

@router.post("/award-xp")
async def award_xp(
    reason: str,
    amount: int,
    current_user: dict = Depends(get_current_user)
):
    """Award XP to user."""
    profile = await supabase_service.get_user_profile(current_user['id'])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    current_xp = profile.get("xp", 0)
    new_xp = current_xp + amount
    old_level = calculate_level(current_xp)
    new_level = calculate_level(new_xp)
    
    # Update profile
    await supabase_service.update_profile(current_user['id'], {"xp": new_xp})
    
    response = {
        "xp_awarded": amount,
        "total_xp": new_xp,
        "level": new_level,
        "level_up": new_level > old_level
    }
    
    if new_level > old_level:
        response["message"] = f"🎉 Level up! You're now level {new_level}!"
    
    return response

@router.get("/challenges")
async def get_active_challenges(current_user: dict = Depends(get_current_user)):
    """Get active challenges for user."""
    profile = await supabase_service.get_user_profile(current_user['id'])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    # Generate challenge if needed
    user_context = {
        "goal": profile.get("goal"),
        "fitness_level": profile.get("fitness_level")
    }
    
    challenge = await ai_service.generate_challenge(user_context)
    
    return {
        "active_challenges": [challenge],
        "completed_this_week": 0
    }

@router.get("/leaderboard")
async def get_leaderboard(
    type: str = "global",
    limit: int = 10,
    current_user: dict = Depends(get_current_user)
):
    """Get leaderboards (global or friends)."""
    # Mock leaderboard data
    return {
        "type": type,
        "entries": [],
        "user_rank": 0,
        "user_score": 0
    }

@router.get("/badges")
async def get_available_badges():
    """Get all available badges in system."""
    return {
        "badges": [
            {
                "id": "first_workout",
                "name": "First Workout",
                "description": "Complete your first workout",
                "icon": "🏋️"
            },
            {
                "id": "week_warrior",
                "name": "Week Warrior",
                "description": "Complete all workouts for a week",
                "icon": "💪"
            }
        ]
    }

def calculate_level(xp: int) -> int:
    """Calculate user level based on XP."""
    for level, threshold in sorted(XP_THRESHOLDS.items(), reverse=True):
        if xp >= threshold:
            return level
    return 1