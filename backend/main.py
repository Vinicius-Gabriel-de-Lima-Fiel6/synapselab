from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import calculadora as calc
from motores_quimicos import MotorCalculoAvancado
from chempy.chemistry import Substance

app = FastAPI()
motor = MotorCalculoAvancado()

class EstequiometriaRequest(BaseModel):
    reagentes: str
    produtos: str
    massas: dict # Ex: {"NaOH": 40, "HCl": 36.5}

@app.post("/api/estequiometria/analisar")
async def analisar_estequiometria(req: EstequiometriaRequest):
    # 1. Balanceamento (Usando seu método balancear_e_resolver)
    rb, pb, err = motor.balancear_e_resolver(req.reagentes, req.produtos)
    if err:
        raise HTTPException(status_code=400, detail=f"Erro no balanceamento: {err}")

    # 2. Lógica de Massas e Mols (Copiada do seu bloco 'if st.button("🚀 ANALISAR COM IA")')
    try:
        m_mols = {s: req.massas[s]/Substance.from_formula(s).mass for s in req.massas}
        # Achar o limitante (Sua lógica exata)
        lim = min(m_mols, key=lambda x: m_mols[x]/rb[x])
        fat = m_mols[lim]/rb[lim]
        
        # Equação formatada para o laudo
        eq_str = " + ".join([f"{v if v>1 else ''}{k}" for k, v in rb.items()]) + " -> " + \
                 " + ".join([f"{v if v>1 else ''}{k}" for k, v in pb.items()])

        # 3. Cálculo de Produtos (Seu loop original)
        lista_prod = []
        for k, v in pb.items():
            m_f = fat * v * Substance.from_formula(k).mass
            lista_prod.append({"Produto": k, "Massa": f"{m_f:.4f}"})

        # 4. Consultoria IA (Seu método consultoria_ia)
        laudo = motor.consultoria_ia(eq_str, lim, lista_prod[0]['Massa'])

        return {
            "equacao": eq_str,
            "limitante": lim,
            "produtos": lista_prod,
            "laudo": laudo
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
