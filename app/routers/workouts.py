from fastapi import APIRouter, Depends, HTTPException
from app.models import WorkoutPlan, Exercise, WorkoutSession
from app.services.auth_service import get_current_user
from app.services.ai_service import ai_service
from app.services.supabase_service import supabase_service
from datetime import datetime, timedelta
import json
import uuid

router = APIRouter(prefix="/workouts", tags=["workouts"])

@router.get("/current")
async def get_current_workout(current_user: dict = Depends(get_current_user)):
    """Get current week's workout plan."""
    profile = await supabase_service.get_user_profile(current_user['id'])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    # Generate or fetch workout plan for this week
    today = datetime.utcnow()
    week_start = today - timedelta(days=today.weekday())
    
    # Mock fetch from database
    plan = {
        "id": str(uuid.uuid4()),
        "user_id": current_user['id'],
        "week_start": week_start.isoformat(),
        "home_plan": [],
        "gym_plan": [],
        "generated_at": datetime.utcnow().isoformat()
    }
    
    return plan

@router.post("/generate")
async def generate_workout_plan(current_user: dict = Depends(get_current_user)):
    """Generate new workout plan using AI."""
    profile = await supabase_service.get_user_profile(current_user['id'])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    user_context = {
        "name": profile.get("name"),
        "age": profile.get("age"),
        "goal": profile.get("goal"),
        "fitness_level": profile.get("fitness_level"),
        "preference": "gym"
    }
    
    # Generate both home and gym variants
    home_plan = await ai_service.generate_workout(
        {**user_context, "preference": "home"}
    )
    gym_plan = await ai_service.generate_workout(
        {**user_context, "preference": "gym"}
    )
    
    return {
        "home_plan": home_plan,
        "gym_plan": gym_plan,
        "generated_at": datetime.utcnow().isoformat()
    }

@router.post("/log-session")
async def log_workout_session(
    session: WorkoutSession,
    current_user: dict = Depends(get_current_user)
):
    """Log completed workout session."""
    # Save to database
    session_data = {
        "user_id": current_user['id'],
        "date": session.date.isoformat(),
        "exercises": json.dumps([e.dict() for e in session.exercises]),
        "completed": session.completed,
        "notes": session.notes
    }
    
    # Mock save
    return {"message": "Workout logged", "session_id": session.id}