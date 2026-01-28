from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import auth_db as db

app = FastAPI()

# Modelos para receber os dados do React
class LoginSchema(BaseModel):
    email: str
    password: str

class SignupSchema(BaseModel):
    username: str
    email: str
    password: str
    org_name: str
    org_id: str
    role: str

@app.post("/login")
async def login_endpoint(data: LoginSchema):
    user = db.buscar_usuario_por_email(data.email)
    if user and db.verificar_senha(data.password, user['password_hash']):
        return {"status": "success", "user": user}
    raise HTTPException(status_code=401, detail="Credenciais Inválidas")

@app.post("/register")
async def register_endpoint(data: SignupSchema):
    success, msg = db.cadastrar_usuario(
        data.username, data.email, data.password, 
        data.org_name, data.role, data.org_id
    )
    if success:
        return {"status": "success", "message": msg}
    raise HTTPException(status_code=400, detail=msg)
