import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client

app = FastAPI()

# Configuração de CORS para o React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexão Real com Supabase
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/auth/login")
async def login(req: LoginRequest):
    try:
        # Autenticação via Supabase Auth
        response = supabase.auth.sign_in_with_password({
            "email": req.email,
            "password": req.password
        })
        
        # Busca dados adicionais na tabela de perfis
        user_info = supabase.table("perfis").select("*").eq("id", response.user.id).single().execute()
        
        return {
            "logado": True,
            "session": response.session,
            "user_data": user_info.data
        }
    except Exception as e:
        return {"logado": False, "erro": str(e)}

@app.get("/api/estoque")
async def get_estoque():
    # Lógica real de busca no banco
    res = supabase.table("estoque_reagentes").select("*").execute()
    return res.data

@app.get("/api/metricas")
async def get_metricas():
    # Agregações reais do Supabase
    reagentes = supabase.table("estoque_reagentes").select("id", count="exact").execute()
    analises = supabase.table("historico_analises").select("id", count="exact").execute()
    return {
        "reagentes": reagentes.count,
        "analises": analises.count,
        "alertas": 0
    }
