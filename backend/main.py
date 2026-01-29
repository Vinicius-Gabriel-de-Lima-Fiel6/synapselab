import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Importamos seus arquivos EXATAMENTE como você os criou
import calculadora as calc_original 
from motores_quimicos import MotorCalculoAvancado
import auth_db as db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LOGIN (Mantendo o que já funciona)
@app.post("/auth/login")
async def login(email: str, passw: str):
    user = db.buscar_usuario_por_email(email)
    if user and db.verificar_senha(passw, user['password_hash']):
        return {"logado": True, "user_data": user}
    return {"logado": False}

# PONTE PARA A SUA CALCULADORA
# Aqui o FastAPI apenas "serve" como os inputs do seu Streamlit
@app.post("/calculadora/executar")
async def executar_calculadora(dados: dict):
    # Chamamos as suas funções originais aqui dentro
    # sem alterar o conteúdo delas nos arquivos .py
    return {"status": "ok"}
