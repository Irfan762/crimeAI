from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base

# Auto-create tables for SQLite
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="KSP Crime Intelligence Assistant API",
    description="Backend API for the KSP Crime Intelligence Platform",
    version="1.0.0"
)

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the KSP Crime Intelligence API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

from app.routers import chat_router, analytics_router, network_router, forecast_router, auth_router, criminals_router, cases_router, firs_router, reports_router
from app.routers.voice_copilot_router import router as voice_copilot_router

app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(analytics_router)
app.include_router(network_router)
app.include_router(forecast_router)
app.include_router(criminals_router)
app.include_router(cases_router)
app.include_router(firs_router)
app.include_router(reports_router)
app.include_router(voice_copilot_router)
