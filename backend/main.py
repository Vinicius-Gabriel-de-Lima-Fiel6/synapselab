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
async def health_check():
    return {"status": "SynapseLab Backend Online", "model": "llama-3.3-70b-versatile"}

@app.post("/auth/login")
async def login(req: dict):
    if req.get("email") == "admin@synapselab.com" and req.get("password") == "admin123":
        return {
            "logado": True, 
            "user_data": {
                "username": "Admin Master", 
                "org_name": "SynapseLab", 
                "role": "Diretor"
            }
        }
    return {"logado": False}

@app.post("/api/analitica")
async def rota_analitica(req: QuimicaRequest):
    resultado = calc.calcular_analitica_fiel(req.operacao, req.dados)
    return {"resultado": f"{resultado:.4f}"}

@app.post("/api/termodinamica")
async def rota_termo(req: QuimicaRequest):
    resultado = calc.calcular_termo_fiel(req.operacao, req.dados)
    return {"resultado": f"{resultado:.4f}"}

@app.get("/api/conversao")
async def rota_conversao(tipo: str, valor: float):
    resultado = calc.converter_si_fiel(tipo, valor)
    return {"resultado": f"{resultado:.4f}"}

@app.post("/api/estequiometria/analisar")
async def analisar_ia(req: dict):
    reac = req.get("reagentes")
    prod = req.get("produtos")
    rb, pb, err = motor.balancear_e_resolver(reac, prod)
    if err:
        raise HTTPException(status_code=400, detail=err)
    
    eq_formatada = f"{rb} -> {pb}"
    laudo = motor.consultoria_ia(eq_formatada, "Calculado via ChemPy", "Pendente")
    return {
        "equacao": eq_formatada,
        "balanceamento": {"reagentes": rb, "produtos": pb},
        "laudo": laudo
    }
