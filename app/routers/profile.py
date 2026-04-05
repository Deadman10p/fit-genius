from fastapi import APIRouter, Depends, HTTPException
from app.models import ProfileUpdate
from app.services.auth_service import get_current_user
from app.services.supabase_service import supabase_service
from datetime import datetime, timedelta
import json

router = APIRouter(prefix="/profile", tags=["profile"])

@router.get("/")
async def get_profile(current_user: dict = Depends(get_current_user)):
    profile = await supabase_service.get_user_profile(current_user['id'])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.patch("/update")
async def update_profile(
    updates: ProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    profile = await supabase_service.get_user_profile(current_user['id'])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    # Rate limiting logic
    last_changes = profile.get('change_history', [])
    now = datetime.utcnow()

    # Goal: 2 per month
    goal_changes = [c for c in last_changes if c['field'] == 'goal' and (now - datetime.fromisoformat(c['timestamp'])).days < 30]
    if updates.goal and len(goal_changes) >= 2:
        raise HTTPException(status_code=429, detail="Goal change limit exceeded")

    # Fitness level: 1 per month
    fitness_changes = [c for c in last_changes if c['field'] == 'fitness_level' and (now - datetime.fromisoformat(c['timestamp'])).days < 30]
    if updates.fitness_level and len(fitness_changes) >= 1:
        raise HTTPException(status_code=429, detail="Fitness level change limit exceeded")

    # Budget: 1 per week
    budget_changes = [c for c in last_changes if c['field'] == 'budget' and (now - datetime.fromisoformat(c['timestamp'])).days < 7]
    if updates.budget and len(budget_changes) >= 1:
        raise HTTPException(status_code=429, detail="Budget change limit exceeded")

    # Apply updates
    update_data = {}
    if updates.goal:
        update_data['goal'] = updates.goal
        last_changes.append({'field': 'goal', 'timestamp': now.isoformat()})
    if updates.fitness_level:
        update_data['fitness_level'] = updates.fitness_level
        last_changes.append({'field': 'fitness_level', 'timestamp': now.isoformat()})
    if updates.budget:
        update_data['budget'] = updates.budget
        last_changes.append({'field': 'budget', 'timestamp': now.isoformat()})
    if updates.meals_per_day:
        update_data['meals_per_day'] = updates.meals_per_day
    if updates.dietary_restrictions:
        update_data['dietary_restrictions'] = json.dumps(updates.dietary_restrictions)
    if updates.notification_preferences:
        update_data['notification_preferences'] = json.dumps(updates.notification_preferences)

    update_data['change_history'] = json.dumps(last_changes)
    update_data['updated_at'] = now.isoformat()

    updated_profile = await supabase_service.update_profile(current_user['id'], update_data)
    return updated_profile