import os
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from typing import List

# Importe suas funções originais do auth_db.py
import auth_db as db 

app = FastAPI(title="LabSmartAI API")

# Libera o acesso para o seu frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuração Supabase (Substitua ou use Env Vars na Vercel)
SUPABASE_URL = "SUA_URL_AQUI"
SUPABASE_KEY = "SUA_KEY_AQUI"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/auth/login")
async def login(req: LoginRequest):
    user = db.buscar_usuario_por_email(req.email)
    if user and db.verificar_senha(req.password, user['password_hash']):
        return {
            "status": "success",
            "user": {
                "username": user['username'],
                "role": user.get('role', 'Visualizador'),
                "org_name": user.get('org_name')
            }
        }
    raise HTTPException(status_code=401, detail="Dados incorretos.")

@app.get("/dashboard/metrics")
async def get_metrics(org_name: str):
    try:
        res_sub = supabase.table("substancias").select("quantidade").eq("org_name", org_name).execute()
        total_itens = sum([i['quantidade'] for i in res_sub.data]) if res_sub.data else 0
        
        res_eq = supabase.table("equipamentos").select("id", count="exact").eq("org_name", org_name).execute()
        total_equip = res_eq.count if res_eq.count else 0
        
        return {
            "total_itens": total_itens,
            "total_equipamentos": total_equip,
            "total_registros": len(res_sub.data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/data/inventory")
async def get_inventory(org_name: str):
    res = supabase.table("substancias").select("*").eq("org_name", org_name).execute()
    return res.data
