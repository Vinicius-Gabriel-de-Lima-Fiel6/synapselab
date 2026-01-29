from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import calculadora as calc
from motores_quimicos import MotorCalculoAvancado

app = FastAPI()
motor = MotorCalculoAvancado()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuimicaRequest(BaseModel):
    operacao: str
    dados: dict

@app.get("/")
async def root():
    return {"status": "Online"}

@app.post("/auth/login")
async def login(req: dict):
    if req.get("email") == "admin@synapselab.com":
        return {"logado": True, "user_data": {"username": "Admin", "org_name": "SynapseLab", "role": "Master"}}
    return {"logado": False}

@app.post("/api/analitica")
async def rota_analitica(req: QuimicaRequest):
    res = calc.calcular_analitica_fiel(req.operacao, req.dados)
    return {"resultado": f"{res:.4f}"}

@app.post("/api/estequiometria/analisar")
async def analisar_ia(req: dict):
    reac = req.get("reagentes")
    prod = req.get("produtos")
    rb, pb, err = motor.balancear_e_resolver(reac, prod)
    if err: raise HTTPException(status_code=400, detail=err)
    laudo = motor.consultoria_ia(f"{reac}->{prod}", "Cálculo pendente", "N/A")
    return {"equacao": f"{rb} -> {pb}", "laudo": laudo}
