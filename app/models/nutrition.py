from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Meal(BaseModel):
    name: str
    ingredients: List[str]
    nutritional_info: dict  # calories, protein, carbs, fat, etc.
    cost: float
    currency: str

class NutritionPlan(BaseModel):
    id: str
    user_id: str
    date: datetime
    meals: List[Meal]
    total_nutrition: dict
    total_cost: float
    currency: str

class FoodItem(BaseModel):
    name: str
    country: str
    city: str
    price_per_unit: float
    currency: str
    unit: str  # kg, lb, etc.
    availability: bool
    budget_tier: str