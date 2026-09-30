from fastapi import FastAPI
from app.database import supabase
from app.routers import auth, chat


app = FastAPI(
    title="Athena API",
    description="API for Athena application",
    version="1.0.0"
)

app.include_router(auth.router)
app.include_router(chat.router)

@app.get("/health")
def health_check():
    return{
    "status": "healthy",
    "service" :"Athena API"
    }
@app.get("/health/database")
def database_health():
    try:
        response = supabase.table("health_check").select("*").execute()

        return{
            "status": "healthy",
            "service": "connect",
        }
    except Exception as e:
        return{
            "status": "error",
            "service": "disconnect",
            "error": str(e)
        }
    
