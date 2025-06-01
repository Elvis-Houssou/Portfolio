from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from jose import jwt
from datetime import timedelta
from dotenv import load_dotenv
from app.dependencies import DbDependency, authenticate_user, create_access_token

load_dotenv(encoding="utf-8")

router = APIRouter(
    prefix = "/auth",
    tags= ['auth']
)



@router.post('/login', status_code=status.HTTP_200_OK)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: DbDependency):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token(user.username, user.id, timedelta(minutes=600))
    return {
        "access_token": token, 
        "token_type": "bearer", 
        "message": "Connexion réussie", 
        'user': {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        }
    }

