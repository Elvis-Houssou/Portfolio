from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Union

from app.routers import auth, abouts, contacts

app = FastAPI(title='Portfolio Elvis Houssou API')

# Configurer le middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Autorise ton frontend
    allow_credentials=True,                   # Autorise les cookies/headers d'authentification
    allow_methods=["*"],                      # Autorise toutes les méthodes (GET, POST, etc.)
    allow_headers=["*"],                      # Autorise tous les headers
)

app.include_router(auth.router)
app.include_router(abouts.router)
app.include_router(contacts.router)
# app.include_router(experiences.router)
# app.include_router(projects.router)
# app.include_router(skills.router)
