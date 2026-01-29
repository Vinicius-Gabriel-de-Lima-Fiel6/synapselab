from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: str
    password: str

@app.get("/")
async def root():
    return {"status": "SynapseLab Online"}

@app.post("/auth/login")
async def login(req: LoginRequest):
    # Lógica de login original e direta
    if req.email == "admin@synapselab.com" and req.password == "admin123":
        return {
            "logado": True, 
            "user_data": {
                "username": "Admin Master", 
                "org_name": "SynapseLab", 
                "role": "Diretor"
            }
        }
    return {"logado": False}

@app.get("/api/metricas")
async def get_metricas():
    return {
        "reagentes": 450,
        "analises": 128,
        "alertas": 5
    }
