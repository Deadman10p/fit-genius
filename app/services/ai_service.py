import requests
import json
from typing import Optional, List, Dict, Any
from app.config import MODEL_CONFIG
import asyncio

class AIService:
    def __init__(self):
        self.config = MODEL_CONFIG
        self.active_model = self.config["active_model"]

    async def _call_ollama(self, prompt: str, model_name: str) -> str:
        """Call Ollama endpoint for local models."""
        endpoint = self.config["models"][self.active_model]["endpoint"]
        try:
            response = requests.post(
                f"{endpoint}/api/generate",
                json={"model": model_name, "prompt": prompt, "stream": False},
                timeout=30
            )
            response.raise_for_status()
            return response.json()["response"]
        except Exception as e:
            return f"Error calling Ollama: {str(e)}"

    async def _call_cloud(self, prompt: str) -> str:
        """Call cloud endpoint for remote models."""
        endpoint = self.config["models"][self.active_model]["endpoint"]
        try:
            response = requests.post(
                f"{endpoint}/generate",
                json={"prompt": prompt},
                timeout=30
            )
            response.raise_for_status()
            return response.json()["response"]
        except Exception as e:
            return f"Error calling cloud endpoint: {str(e)}"

    async def generate_response(self, prompt: str, stream: bool = False):
        """Generate response using configured model."""
        model_config = self.config["models"][self.active_model]
        
        if model_config["type"] == "ollama":
            return await self._call_ollama(prompt, model_config["name"])
        elif model_config["type"] == "cloud":
            return await self._call_cloud(prompt)
        else:
            return "Unknown model type"

    async def generate_workout(self, user_context: Dict[str, Any]) -> Dict[str, Any]:
        """Generate personalized workout plan."""
        prompt = f"""
        Generate a personalized workout plan for a user with the following profile:
        Name: {user_context.get('name')}
        Age: {user_context.get('age')}
        Goal: {user_context.get('goal')}
        Fitness Level: {user_context.get('fitness_level')}
        Preference: {user_context.get('preference', 'gym')}
        
        Provide the plan in JSON format with exercises, sets, reps, and difficulty.
        """
        response = await self.generate_response(prompt)
        try:
            return json.loads(response)
        except:
            return {"plan": response}

    async def generate_nutrition_plan(self, user_context: Dict[str, Any]) -> Dict[str, Any]:
        """Generate personalized nutrition plan."""
        prompt = f"""
        Generate a daily nutrition plan for a user with:
        Goal: {user_context.get('goal')}
        Country: {user_context.get('country')}
        City: {user_context.get('city')}
        Meals per day: {user_context.get('meals_per_day')}
        Dietary restrictions: {user_context.get('dietary_restrictions')}
        Budget: {user_context.get('budget')}
        
        Include meal names, ingredients, nutritional info, and estimated costs.
        Provide response in JSON format.
        """
        response = await self.generate_response(prompt)
        try:
            return json.loads(response)
        except:
            return {"plan": response}

    async def generate_coach_response(self, user_context: Dict[str, Any], message: str) -> str:
        """Generate personalized coach response."""
        prompt = f"""
        You are an AI fitness coach talking to a user. Respond in a friendly, motivating way.
        User info:
        - Name: {user_context.get('name')}
        - Goal: {user_context.get('goal')}
        - Fitness Level: {user_context.get('fitness_level')}
        - Current XP: {user_context.get('xp', 0)}
        
        User message: {message}
        
        Provide a helpful, motivating response.
        """
        return await self.generate_response(prompt)

    async def generate_challenge(self, user_context: Dict[str, Any]) -> Dict[str, Any]:
        """Generate weekly challenge for user."""
        prompt = f"""
        Create a weekly fitness challenge for a user with:
        Goal: {user_context.get('goal')}
        Fitness Level: {user_context.get('fitness_level')}
        
        The challenge should be achievable and motivating.
        Return JSON with: title, description, goal_type, target, reward_xp
        """
        response = await self.generate_response(prompt)
        try:
            return json.loads(response)
        except:
            return {"challenge": response}

    async def generate_gamification_response(self, event: Dict[str, Any]) -> Dict[str, Any]:
        """Generate gamification messages (achievements, badges, etc)."""
        prompt = f"""
        The user just completed: {event.get('type')}
        Details: {event.get('details')}
        
        Generate a congratulatory message and any achievements unlocked.
        Return JSON with: message, badges_unlocked, xp_earned
        """
        response = await self.generate_response(prompt)
        try:
            return json.loads(response)
        except:
            return {"message": response}

# Singleton instance
ai_service = AIService()