from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Subscription(BaseModel):
    id: str
    user_id: str
    status: str  # 'active', 'cancelled', 'expired'
    plan: str  # 'free', 'premium'
    start_date: datetime
    end_date: Optional[datetime] = None
    lemon_squeezy_id: str

class PaymentWebhook(BaseModel):
    event: str
    data: dict