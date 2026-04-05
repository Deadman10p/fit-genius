import os
import requests
import json
from pathlib import Path
from typing import Optional, List, Dict, Any
from app.config import MODEL_CONFIG, AI_MODEL_UPLOAD_DIR, AI_MODEL_FILE_NAME
import asyncio

class AIService:
    def __init__(self):
        self.config = MODEL_CONFIG
        self.active_model = self.config["active_model"]
        self.uploaded_model_path = Path(AI_MODEL_UPLOAD_DIR) / AI_MODEL_FILE_NAME
        os.makedirs(AI_MODEL_UPLOAD_DIR, exist_ok=True)

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
            if not endpoint or endpoint.startswith("http://localhost"):
                return "AI endpoint unavailable. Please start Ollama locally or configure GEMMA4_CLOUD_ENDPOINT."
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
            if not endpoint or endpoint == "YOUR_CLOUD_SERVER_URL":
                return "Cloud AI endpoint unavailable. Please configure GEMMA4_CLOUD_ENDPOINT."
            return f"Error calling cloud endpoint: {str(e)}"

    async def _call_uploaded_model(self, prompt: str) -> str:
        """Stub for using an uploaded GUUF model in the future."""
        if not self.uploaded_model_path.exists():
            return (
                "Uploaded AI model not found. "
                f"Upload {AI_MODEL_FILE_NAME} to {AI_MODEL_UPLOAD_DIR} and set ACTIVE_MODEL=uploaded."
            )
        # TODO: Replace this stub with actual GUUF model loader and inference logic.
        return (
            f"Uploaded model loader stub detected at {self.uploaded_model_path}. "
            "Replace this response with direct model inference once the GUUF loader is implemented."
        )

    async def generate_response(self, prompt: str, stream: bool = False):
        """Generate response using configured model."""
        if self.active_model == "uploaded":
            return await self._call_uploaded_model(prompt)

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