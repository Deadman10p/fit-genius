from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Exercise(BaseModel):
    name: str
    sets: int
    reps: int
    weight: Optional[float] = None
    duration: Optional[int] = None  # in seconds
    completed: bool = False
    skipped: bool = False
    difficulty_feedback: Optional[str] = None

class WorkoutSession(BaseModel):
    id: str
    user_id: str
    date: datetime
    exercises: List[Exercise]
    completed: bool = False
    notes: Optional[str] = None

class WorkoutPlan(BaseModel):
    id: str
    user_id: str
    week_start: datetime
    home_plan: List[WorkoutSession]
    gym_plan: List[WorkoutSession]
    generated_at: datetime