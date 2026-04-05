from fastapi import APIRouter
from app.models import Gym
from datetime import datetime
from typing import List
import requests
import json

router = APIRouter(prefix="/gyms", tags=["gyms"])

@router.get("/nearby")
async def find_nearby_gyms(
    latitude: float,
    longitude: float,
    radius: int = 5000
) -> List[Gym]:
    """Find nearby gyms using OpenStreetMap Overpass API."""
    try:
        # Overpass API query
        query = f"""
        [bbox:{latitude-0.05},{longitude-0.05},{latitude+0.05},{longitude+0.05}];
        (node["amenity"="gym"];way["amenity"="gym"];);
        out center;
        """
        
        response = requests.post(
            "https://overpass-api.de/api/interpreter",
            data=query,
            timeout=10
        )
        
        if response.status_code != 200:
            return []
        
        # Parse results (simplified)
        gyms = []
        data = response.json()
        
        for element in data.get("elements", []):
            if "tags" in element and "name" in element["tags"]:
                gym = {
                    "id": str(element.get("id")),
                    "name": element["tags"].get("name"),
                    "address": element["tags"].get("addr:full", "N/A"),
                    "coordinates": {
                        "lat": element.get("lat", latitude),
                        "lng": element.get("lon", longitude)
                    },
                    "phone": element["tags"].get("phone"),
                    "website": element["tags"].get("website"),
                    "cached_at": datetime.utcnow().isoformat()
                }
                gyms.append(gym)
        
        return gyms
    except Exception as e:
        return []

@router.post("/click")
async def track_gym_click(gym_id: str, user_id: str):
    """Track gym website clicks for referral tracking."""
    # Log click for potential commission tracking
    return {"message": "Click tracked"}