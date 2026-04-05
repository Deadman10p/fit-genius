from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Conversation(BaseModel):
    id: str
    user_id: str
    message: str
    response: str
    timestamp: datetime
    encrypted: bool = True

class CoachRequest(BaseModel):
    message: str
    context: Optional[dict] = None

class CoachResponse(BaseModel):
    response: str
    suggestions: Optional[List[str]] = None