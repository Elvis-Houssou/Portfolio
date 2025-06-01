from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from app.database import SessionLocal
from app.models.about import About

import os

load_dotenv(encoding="utf-8")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_db():
    """Crée et gère une session de base de données."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

DbDependency = Annotated[Session, Depends(get_db)]


def authenticate_user(db: Session, identifier: str, password: str):
    """Authentifie un utilisateur."""
    user = db.query(About).where((About.name == identifier) | (About.email == identifier)).first()
    if not user: 
        return False 
    
    if not bcrypt_context.verify(password, user.hashed_password):
        return None
    
    return user


def create_access_token(username: str, user_id: int, expires_delta: timedelta = None):
    """Crée un token JWT."""
    encode = {'sub': username, 'id': user_id}
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    encode.update({"exp": expire})
    encoded_jwt = jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: Annotated[str, Depends(oauth2_bearer)], db: DbDependency) -> About:
    """Récupère l'utilisateur actuel à partir du token JWT."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        identifier: str = payload.get('sub')
        user_id: int = payload.get('id')
        if None in (identifier, user_id):
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(About).where((About.name == identifier) | (About.email == identifier)).first()
    if user is None:
        raise credentials_exception
    return user

