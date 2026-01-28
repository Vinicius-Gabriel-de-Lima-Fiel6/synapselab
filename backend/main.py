import os
import sys
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from typing import List, Optional

# Garante que os módulos locais sejam encontrados
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Importações de lógica de negócio (seus arquivos .py originais adaptados para retornar dados)
import auth_db as db 

app = FastAPI(title="LabSmartAI API", version="1.0.0")

# --- CONFIGURAÇÃO DE CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, substitua pela URL da sua Vercel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CLIENTE SUPABASE ---
# Pegando das variáveis de ambiente ou secrets
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- SCHEMAS DE DADOS (Pydantic) ---
class LoginRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    username: str
    email: str
    role: str
    org_name: str

# --- ENDPOINTS DE AUTENTICAÇÃO ---

@app.post("/auth/login", response_model=dict)
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
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciais inválidas"
    )

# --- ENDPOINTS DO DASHBOARD (MÉTRICAS) ---

@app.get("/dashboard/stats/{org_name}")
async def get_dashboard_stats(org_name: str):
    try:
        # Lógica exata do seu bloco try/except do Streamlit
        res_sub = supabase.table("substancias").select("quantidade").eq("org_name", org_name).execute()
        total_itens = sum([i['quantidade'] for i in res_sub.data]) if res_sub.data else 0
        
        res_eq = supabase.table("equipamentos").select("id", count="exact").eq("org_name", org_name).execute()
        total_equip = res_eq.count if res_eq.count else 0
        
        total_analises = len(res_sub.data)
        
        return {
            "total_itens": total_itens,
            "total_equipamentos": total_equip,
            "total_registros": total_analises
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- ENDPOINTS DE MÓDULOS ---

@app.get("/inventory/{org_name}")
async def get_inventory(org_name: str):
    # Tradução da função show_estoque()
    res = supabase.table("substancias").select("*").eq("org_name", org_name).execute()
    return res.data

@app.get("/equipments/{org_name}")
async def get_equipments(org_name: str):
    # Tradução da função show_equipamentos()
    res = supabase.table("equipamentos").select("*").eq("org_name", org_name).execute()
    return res.data

@app.get("/reports/{org_name}")
async def get_reports(org_name: str):
    # Tradução da função relatorios.show_reports
    res = supabase.table("relatorios").select("*").eq("org_name", org_name).execute()
    return res.data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
