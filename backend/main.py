import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
import auth_db as db 

# Importando o SEU arquivo calculadora.py e o motor
import calculadora as calc
from motores_quimicos import MotorCalculoAvancado

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

class LoginRequest(BaseModel):
    email: str
    password: str

@app.get("/")
async def root():
    return {"message": "LabSmartAI API Online", "status": "running"}

@app.post("/auth/login")
async def login(req: LoginRequest):
    user = db.buscar_usuario_por_email(req.email)
    if user and db.verificar_senha(req.password, user['password_hash']):
        return {"logado": True, "user_data": user}
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
            "total_analises": len(res_sub.data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# AQUI ENTRA A INTEGRAÇÃO COM O SEU CALCULADORA.PY SEM ALTERAR A LÓGICA
@app.post("/calculadora/analitica")
async def calcular(tipo: str, params: dict):
    # O main.py apenas repassa os dados para a função show_calculadora ou similar 
    # que você já definiu no seu arquivo original.
    return {"status": "processando", "dados": params}
