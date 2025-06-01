from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from app.dependencies import DbDependency, bcrypt_context
from app.models.experience import Experience, ExperienceCreate
from sqlalchemy.exc import IntegrityError
import logging
from datetime import datetime

# Configurer les logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix = "/experiences",
    tags= ['experiences']
)

@router.get("/", response_model=list[Experience], status_code=status.HTTP_200_OK)
async def get_experiences(db: DbDependency):
    """Récupère toutes les expériences."""
    experiences = db.query(Experience).all()
    if not experiences:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No experiences found")
    return experiences

@router.post("/create", response_model=Experience, status_code=status.HTTP_201_CREATED)
async def create_experience(experience_data: ExperienceCreate, db: DbDependency):
    """Crée une nouvelle expérience."""
    experience = Experience.from_orm(experience_data)
    experience.created_at = datetime.utcnow()
    db.add(experience)
    try:
        db.commit()
        db.refresh(experience)
        logger.info("Experience created successfully")
        return experience
    except IntegrityError as e:
        db.rollback()
        logger.error(f"Integrity error while creating experience: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Experience already exists")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while creating experience: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while creating experience")

@router.put("/update/{experience_id}", response_model=Experience, status_code=status.HTTP_200_OK)
async def update_experience(experience_id: int, experience_data: ExperienceCreate, db: DbDependency):
    """Met à jour une expérience existante."""
    experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found")
    
    for key, value in experience_data.dict(exclude_unset=True).items():
        setattr(experience, key, value)
    
    experience.updated_at = datetime.utcnow()
    
    db.add(experience)
    try:
        db.commit()
        db.refresh(experience)
        logger.info("Experience updated successfully")
        return experience
    except IntegrityError as e:
        db.rollback()
        logger.error(f"Integrity error while updating experience: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Experience already exists")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while updating experience: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while updating experience")
    
@router.delete("/delete/{experience_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_experience(experience_id: int, db: DbDependency):
    """Supprime une expérience existante."""
    experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not experience:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Experience not found")
    
    db.delete(experience)
    try:
        db.commit()
        logger.info("Experience deleted successfully")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while deleting experience: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while deleting experience")