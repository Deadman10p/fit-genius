from fastapi import APIRouter, Depends, HTTPException
from app.models import NutritionPlan, Meal
from app.services.auth_service import get_current_user
from app.services.ai_service import ai_service
from app.services.supabase_service import supabase_service
from datetime import datetime
import json
import uuid

router = APIRouter(prefix="/nutrition", tags=["nutrition"])

@router.get("/current")
async def get_nutrition_plan(current_user: dict = Depends(get_current_user)):
    """Get today's nutrition plan."""
    profile = await supabase_service.get_user_profile(current_user['id'])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    plan = {
        "id": str(uuid.uuid4()),
        "user_id": current_user['id'],
        "date": datetime.utcnow().isoformat(),
        "meals": [],
        "total_nutrition": {},
        "total_cost": 0,
        "currency": "USD"
    }
    
    return plan

@router.post("/generate")
async def generate_nutrition_plan(current_user: dict = Depends(get_current_user)):
    """Generate daily nutrition plan using AI."""
    profile = await supabase_service.get_user_profile(current_user['id'])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    user_context = {
        "goal": profile.get("goal"),
        "country": profile.get("country"),
        "city": profile.get("city"),
        "meals_per_day": profile.get("meals_per_day", 3),
        "dietary_restrictions": json.loads(profile.get("dietary_restrictions", "[]")),
        "budget": profile.get("budget")
    }
    
    plan = await ai_service.generate_nutrition_plan(user_context)
    
    return {
        "plan": plan,
        "generated_at": datetime.utcnow().isoformat()
    }

@router.post("/log-meal")
async def log_meal(
    meal: Meal,
    current_user: dict = Depends(get_current_user)
):
    """Log consumed meal."""
    # Save to database
    return {"message": "Meal logged"}

@router.get("/food-prices")
async def get_food_prices(country: str, city: str):
    """Get food price data for region."""
    # Mock endpoint - in production, would aggregate from multiple APIs
    return {
        "country": country,
        "city": city,
        "prices": {},
        "last_updated": datetime.utcnow().isoformat()
    }