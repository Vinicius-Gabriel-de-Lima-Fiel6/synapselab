import os
import math
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client

# Importação dos seus módulos originais
import auth_db as db 
# Importamos a lógica da calculadora e do motor de IA
# (Certifique-se de que os arquivos .py estejam na mesma pasta)
import calculadora as calc_engine 
from motores_quimicos import MotorCalculoAvancado

app = FastAPI()

# --- CONFIGURAÇÃO DE SEGURANÇA (CORS) ---
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

# --- MODELOS DE DADOS ---
class LoginRequest(BaseModel):
    email: str
    password: str

class AnaliticaInput(BaseModel):
    tipo: str
    f: str = "NaCl"
    m: float = 0.0
    v: float = 0.1
    h: float = 0.0
    oh: float = 0.0
    # Adicione aqui os campos conforme a necessidade de cada fórmula do seu calculadora.py

# --- ROTAS EXISTENTES ---
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

# --- MÓDULOS DE CÁLCULO (MODULARIZADOS) ---

@app.post("/calculadora/analitica")
async def calcular_analitica(data: AnaliticaInput):
    # Esta rota chama a lógica fiel que está no seu calculadora.py
    # Repassamos os parâmetros exatamente como sua lógica espera
    try:
        resultado = calc_engine.executar_calculo_analitico(data)
        return {"resultado": f"{resultado:.4f}"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro no cálculo: {str(e)}")

@app.get("/calculadora/conversao")
async def converter_unidades(tipo: str, valor: float):
    # Chama o dicionário de conversão SI do seu arquivo
    resultado = calc_engine.executar_conversao(tipo, valor)
    return {"resultado": f"{resultado:.4f}"}
