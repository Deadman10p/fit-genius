from fastapi import APIRouter, Depends, HTTPException
from app.models import OnboardingSubmit, Profile
from app.services.auth_service import get_current_user
from app.services.supabase_service import supabase_service
from datetime import datetime
from dateutil.relativedelta import relativedelta
import json

router = APIRouter(prefix="/onboarding", tags=["onboarding"])

@router.post("/submit")
async def submit_onboarding(
    data: OnboardingSubmit,
    current_user: dict = Depends(get_current_user)
):
    # Check if already onboarded
    existing = await supabase_service.get_user_profile(current_user['id'])
    if existing:
        raise HTTPException(status_code=400, detail="Already onboarded")

    # Calculate age
    today = datetime.today().date()
    age = relativedelta(today, data.date_of_birth).years

    profile_data = {
        "user_id": current_user['id'],
        "name": data.name,
        "date_of_birth": data.date_of_birth.isoformat(),
        "age": age,
        "goal": data.goal,
        "fitness_level": data.fitness_level,
        "country": data.country,
        "city": data.city,
        "budget": data.budget,
        "meals_per_day": data.meals_per_day,
        "dietary_restrictions": json.dumps(data.dietary_restrictions),
        "notification_preferences": json.dumps(data.notification_preferences),
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat()
    }

    profile = await supabase_service.create_profile(profile_data)

    # Trigger AI generation (mock for now)
    workout_plan = await generate_initial_workout_plan(profile)
    nutrition_plan = await generate_initial_nutrition_plan(profile)
    coach_persona = await generate_coach_persona(profile)

    return {
        "message": "Onboarding completed",
        "workout_plan": workout_plan,
        "nutrition_plan": nutrition_plan,
        "coach_persona": coach_persona
    }

async def generate_initial_workout_plan(profile):
    # Mock AI call
    return {"plan": "Initial workout plan generated"}

async def generate_initial_nutrition_plan(profile):
    # Mock AI call
    return {"plan": "Initial nutrition plan generated"}

async def generate_coach_persona(profile):
    # Mock AI call
    return {"persona": "Coach persona generated"}