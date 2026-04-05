from pydantic import BaseModel
from typing import Optional

class Gym(BaseModel):
    id: str
    name: str
    address: str
    coordinates: dict  # lat, lng
    phone: Optional[str] = None
    website: Optional[str] = None
    cached_at: str