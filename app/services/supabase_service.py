from supabase import create_client, Client
from app.config import SUPABASE_URL, SUPABASE_ANON_KEY
import os

class SupabaseService:
    def __init__(self):
        if SUPABASE_URL and SUPABASE_ANON_KEY:
            self.client: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
            self.connected = True
        else:
            self.client = None
            self.connected = False

    async def get_user(self, user_id: str):
        if not self.connected:
            return None
        response = self.client.table('users').select('*').eq('id', user_id).execute()
        return response.data[0] if response.data else None

    async def create_user(self, user_data: dict):
        if not self.connected:
            return user_data
        response = self.client.table('users').insert(user_data).execute()
        return response.data[0]

    async def update_user(self, user_id: str, updates: dict):
        if not self.connected:
            return updates
        response = self.client.table('users').update(updates).eq('id', user_id).execute()
        return response.data[0]

    async def get_user_profile(self, user_id: str):
        if not self.connected:
            return None
        response = self.client.table('profiles').select('*').eq('user_id', user_id).execute()
        return response.data[0] if response.data else None

    async def create_profile(self, profile_data: dict):
        if not self.connected:
            return profile_data
        response = self.client.table('profiles').insert(profile_data).execute()
        return response.data[0]

    async def update_profile(self, user_id: str, updates: dict):
        if not self.connected:
            return updates
        response = self.client.table('profiles').update(updates).eq('user_id', user_id).execute()
        return response.data[0]

    # Add more methods as needed

supabase_service = SupabaseService()