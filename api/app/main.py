from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "GoldenDream API"
    version: str = "0.1.0"

settings = Settings()

app = FastAPI(title=settings.app_name, version=settings.version)

# CORS pour le front local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/v1/health")
def health():
    return {"status": "ok"}

@app.get("/v1/info")
def info():
    return {"name": settings.app_name, "version": settings.version}
