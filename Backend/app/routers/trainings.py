from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from app.dependencies import DbDependency, bcrypt_context
from app.models.training import Training, TrainingCreate
from sqlalchemy.exc import IntegrityError
import logging
from datetime import datetime

# Configurer les logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix = "/trainings",
    tags= ['trainings']
)

@router.get("/", response_model=list[Training], status_code=status.HTTP_200_OK)
async def get_trainings(db: DbDependency):
    """Récupère toutes les formations."""
    trainings = db.query(Training).all()
    if not trainings:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No trainings found")
    return trainings

@router.post("/create", response_model=Training, status_code=status.HTTP_201_CREATED)
async def create_training(training_data: TrainingCreate, db: DbDependency):
    """Crée une nouvelle formation."""
    training = Training.from_orm(training_data)
    training.created_at = datetime.utcnow()
    db.add(training)
    try:
        db.commit()
        db.refresh(training)
        logger.info("Training created successfully")
        return training
    except IntegrityError as e:
        db.rollback()
        logger.error(f"Integrity error while creating training: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Training already exists")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while creating training: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while creating training")
    
@router.put("/update/{training_id}", response_model=Training, status_code=status.HTTP_200_OK)
async def update_training(training_id: int, training_data: TrainingCreate, db: DbDependency):
    """Met à jour une formation existante."""
    training = db.query(Training).filter(Training.id == training_id).first()
    if not training:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Training not found")
    
    for key, value in training_data.dict(exclude_unset=True).items():
        setattr(training, key, value)
    
    training.updated_at = datetime.utcnow()
    
    db.add(training)
    try:
        db.commit()
        db.refresh(training)
        logger.info("Training updated successfully")
        return training
    except IntegrityError as e:
        db.rollback()
        logger.error(f"Integrity error while updating training: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Training already exists")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while updating training: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while updating training")
    
@router.delete("/delete/{training_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_training(training_id: int, db: DbDependency):
    """Supprime une formation."""
    training = db.query(Training).filter(Training.id == training_id).first()
    if not training:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Training not found")
    
    db.delete(training)
    try:
        db.commit()
        logger.info("Training deleted successfully")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while deleting training: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while deleting training")