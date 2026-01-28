import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
import auth_db as db 

app = FastAPI()

# --- CONFIGURAÇÃO DE SEGURANÇA (CORS) ---
# Isso permite que o seu site React fale com este código Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CONEXÃO COM SUPABASE ---
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

class LoginRequest(BaseModel):
    email: str
    password: str

# Rota para tirar o erro "Not Found" quando abrir o link no navegador
@app.get("/")
async def root():
    return {"message": "LabSmartAI API Online", "status": "running"}

# Rota de Login que o seu app.jsx chama
@app.post("/auth/login")
async def login(req: LoginRequest):
    user = db.buscar_usuario_por_email(req.email)
    if user and db.verificar_senha(req.password, user['password_hash']):
        return {
            "logado": True,
            "user_data": user
        }
    raise HTTPException(status_code=401, detail="Dados incorretos.")

# Rota de Métricas que o seu app.jsx chama
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
            "total_analises": len(res_sub.data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
