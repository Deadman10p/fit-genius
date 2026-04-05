from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class XPEntry(BaseModel):
    id: str
    user_id: str
    amount: int
    reason: str  # 'workout_completed', 'meal_logged', etc.
    timestamp: datetime

class Level(BaseModel):
    level: int
    xp_required: int

class Badge(BaseModel):
    id: str
    name: str
    description: str
    icon: str
    criteria: dict

class Achievement(BaseModel):
    id: str
    user_id: str
    badge_id: str
    unlocked_at: datetime

class Challenge(BaseModel):
    id: str
    title: str
    description: str
    goal: dict
    reward_xp: int
    start_date: datetime
    end_date: datetime

class LeaderboardEntry(BaseModel):
    user_id: str
    score: int
    rank: int