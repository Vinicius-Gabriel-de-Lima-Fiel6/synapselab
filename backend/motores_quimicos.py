import os
from chempy import balance_stoichiometry
from chempy.chemistry import Substance
from groq import Groq

class MotorCalculoAvancado:
    def __init__(self):
        self.client = None
        # Mudança apenas aqui: de st.secrets para os.getenv para rodar no FastAPI
        api_key = os.getenv("GROQ_API_KEY")
        if api_key:
            self.client = Groq(api_key=api_key)
        # Mantendo seu modelo exato
        self.modelo = "llama-3.3-70b-versatile"

    def balancear_e_resolver(self, reagentes_str, produtos_str):
        try:
            reac_list = [r.strip() for r in reagentes_str.split('+')]
            prod_list = [p.strip() for p in produtos_str.split('+')]
            reac_bal, prod_bal = balance_stoichiometry(set(reac_list), set(prod_list))
            return dict(reac_bal), dict(prod_bal), None
        except Exception as e:
            return None, None, str(e)

    def consultoria_ia(self, eq, limitante, rendimento):
        if not self.client: return "⚠️ API Key ausente."
        # Prompt idêntico ao seu original
        prompt = f"Analise técnica: Reação {eq}, Limitante {limitante}, Rendimento {rendimento}g. Foque em termodinâmica, segurança GHS e purificação."
        res = self.client.chat.completions.create(
            model=self.modelo,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )
        return res.choices[0].message.content
