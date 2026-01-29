from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

app = FastAPI()

# Configuração de CORS para permitir que o React acesse a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos de Dados
class LoginRequest(BaseModel):
    email: str
    password: str

# Rota de Login (Restaurada para o básico funcional)
@app.post("/auth/login")
async def login(req: LoginRequest):
    # Aqui você pode manter sua lógica de conferência com o banco ou estática
    if req.email == "admin@synapselab.com" and req.password == "admin123":
        return {
            "logado": True,
            "user_data": {
                "username": "Administrador",
                "org_name": "SynapseLab Core",
                "role": "Diretor Técnico"
            }
        }
    # Caso tenha lógica de banco, ela entraria aqui. 
    # Para teste de restauração, use o admin acima.
    return {"logado": False}

# Rota de Métricas do Dashboard
@app.get("/dashboard/metrics")
async def get_metrics(org_name: str):
    return {
        "total_itens": 1250,
        "total_equipamentos": 42,
        "total_analises": 856
    }

# Rota de Saúde do Sistema
@app.get("/")
async def root():
    return {"status": "Online", "sistema": "SynapseLab"}
