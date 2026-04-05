from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Notification(BaseModel):
    id: str
    user_id: str
    type: str  # 'workout_reminder', 'meal_reminder', etc.
    title: str
    message: str
    sent_at: datetime
    read: bool = False

class PushNotification(BaseModel):
    to: str  # user_id or topic
    title: str
    body: str
    data: Optional[dict] = None