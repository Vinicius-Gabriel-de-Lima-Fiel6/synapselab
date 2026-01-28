import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
import auth_db as db 

app = FastAPI()

# Permite que o seu frontend acesse o backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuração via Variáveis de Ambiente da Vercel
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/auth/login")
async def login(req: LoginRequest):
    # BUSCA EXATA: usando sua função buscar_usuario_por_email
    user = db.buscar_usuario_por_email(req.email)
    
    # VERIFICAÇÃO EXATA: usando sua função verificar_senha
    if user and db.verificar_senha(req.password, user['password_hash']):
        return {
            "logado": True,
            "user_data": user
        }
    raise HTTPException(status_code=401, detail="Dados incorretos.")

@app.get("/dashboard/metrics")
async def get_metrics(org_name: str):
    # Lógica de contagem original do seu app.py
    res_sub = supabase.table("substancias").select("quantidade").eq("org_name", org_name).execute()
    total_itens = sum([i['quantidade'] for i in res_sub.data]) if res_sub.data else 0
    
    res_eq = supabase.table("equipamentos").select("id", count="exact").eq("org_name", org_name).execute()
    total_equip = res_eq.count if res_eq.count else 0
    
    return {
        "total_itens": total_itens,
        "total_equipamentos": total_equip,
        "total_analises": len(res_sub.data)
    }
