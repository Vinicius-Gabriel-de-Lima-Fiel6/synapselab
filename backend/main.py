from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import calculadora as calc # Importa o seu arquivo fiel
from motores_quimicos import MotorCalculoAvancado

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuimicaRequest(BaseModel):
    operacao: str
    dados: dict

@app.post("/api/analitica")
async def rota_analitica(req: QuimicaRequest):
    try:
        resultado = calc.calcular_analitica_fiel(req.operacao, req.dados)
        return {"resultado": f"{resultado:.4f}"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/termodinamica")
async def rota_termo(req: QuimicaRequest):
    try:
        resultado = calc.calcular_termo_fiel(req.operacao, req.dados)
        return {"resultado": f"{resultado:.4f}"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/conversao")
async def rota_conversao(tipo: str, valor: float):
    resultado = calc.converter_si_fiel(tipo, valor)
    return {"resultado": f"{resultado:.4f}"}
