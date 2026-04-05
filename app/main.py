from fastapi import FastAPI
from app.utils.rate_limit import RateLimitMiddleware
from app.routers import onboarding, profile, workouts, nutrition, coach, gyms, gamification, notifications, admin, feedback, payments

app = FastAPI(title="Fit Genius Backend", version="1.0.0")

# Add middleware
app.add_middleware(RateLimitMiddleware)

# Include routers
app.include_router(onboarding.router)
app.include_router(profile.router)
app.include_router(workouts.router)
app.include_router(nutrition.router)
app.include_router(coach.router)
app.include_router(gyms.router)
app.include_router(gamification.router)
app.include_router(notifications.router)
app.include_router(admin.router)
app.include_router(feedback.router)
app.include_router(payments.router)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}