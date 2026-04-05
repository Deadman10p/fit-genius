from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Feedback(BaseModel):
    id: str
    user_id: str
    category: str
    message: str
    screenshot: Optional[str] = None  # base64
    status: str = 'unread'  # 'unread', 'read', 'in_progress', 'resolved'
    created_at: datetime
    updated_at: datetime

class FeedbackReply(BaseModel):
    feedback_id: str
    reply: str

class FeedbackSubmit(BaseModel):
    category: str
    message: str
    screenshot: Optional[str] = None