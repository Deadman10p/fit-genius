from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Announcement(BaseModel):
    id: str
    title: str
    message: str
    target_audience: str  # 'all', 'free', 'premium'
    created_at: datetime
    sent: bool = False

class AdminUser(BaseModel):
    email: str
    password_hash: str
    created_at: datetime

class AdminLogin(BaseModel):
    email: str
    password: str

class Analytics(BaseModel):
    total_users: int
    daily_active_users: int
    monthly_active_users: int
    retention_rates: dict
    onboarding_completion_rate: float
    popular_goals: dict
    active_countries: List[str]
    session_duration_avg: float
    workout_completion_rate: float
    meal_adherence_rate: float
    revenue: float
    monthly_recurring_revenue: float
    free_premium_ratio: float
    conversion_rate: float
    churn_rate: float
    gym_referral_clicks: int