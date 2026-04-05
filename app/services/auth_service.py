from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from app.config import SUPABASE_URL, SUPABASE_ANON_KEY
from app.services.supabase_service import supabase_service
import os

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        # Verify Supabase JWT
        payload = jwt.get_unverified_claims(token)
        # For simplicity, assume valid if present; in production, verify with Supabase
        user_id = payload.get('sub')
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await supabase_service.get_user(user_id)
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Admin auth
ADMIN_SECRET_KEY = os.getenv("ADMIN_SECRET_KEY", "your_admin_secret")
ALGORITHM = "HS256"

def create_admin_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, ADMIN_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_admin_token(token: str):
    try:
        payload = jwt.decode(token, ADMIN_SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("email")
        if email != "bulegafarid@gmail.com":
            raise HTTPException(status_code=403, detail="Not admin")
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid admin token")

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_admin_token(token)
    return payload