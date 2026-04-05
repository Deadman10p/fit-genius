from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class Profile(BaseModel):
    user_id: str
    name: str
    date_of_birth: date
    age: int
    goal: str  # e.g., 'lose_weight', 'gain_muscle', 'maintain'
    fitness_level: str  # 'beginner', 'intermediate', 'advanced'
    country: str
    city: str
    budget: str  # 'low', 'medium', 'high'
    meals_per_day: int
    dietary_restrictions: list[str]
    notification_preferences: dict
    created_at: str
    updated_at: str

class ProfileUpdate(BaseModel):
    goal: Optional[str] = None
    fitness_level: Optional[str] = None
    budget: Optional[str] = None
    meals_per_day: Optional[int] = None
    dietary_restrictions: Optional[list[str]] = None
    notification_preferences: Optional[dict] = None

class OnboardingSubmit(BaseModel):
    name: str
    date_of_birth: date
    goal: str
    fitness_level: str
    country: str
    city: str
    budget: str
    meals_per_day: int
    dietary_restrictions: list[str]
    notification_preferences: dict