from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from app.dependencies import DbDependency, bcrypt_context
from app.models.about import About, AboutCreate
from sqlalchemy.exc import IntegrityError
import logging

# Configurer les logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix = "/abouts",
    tags= ['abouts']
)

@router.get("/", response_model=About, status_code=status.HTTP_200_OK)
def get_about(db: DbDependency):
    """Récupère les informations de la section 'About'."""
    about = db.query(About).first()
    if not about:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="About information not found")
    return about

@router.post("/create", response_model=About, status_code=status.HTTP_201_CREATED)
def create_about(about_data: AboutCreate, db: DbDependency):
    """Crée une nouvelle section 'About'."""
    about = About.from_orm(about_data)
    about.password = bcrypt_context.hash(about.password) if about.password else None
    db.add(about)
    try:
        db.commit()
        db.refresh(about)
        logger.info("About created successfully")
        return about
    except IntegrityError as e:
        db.rollback()
        logger.error(f"Integrity error while creating about: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="About already exists")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while creating about: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while creating about")

@router.put("/update/{about_id}", response_model=About, status_code=status.HTTP_200_OK)
def update_about(about_id: int, about_data: AboutCreate, db: DbDependency):
    """Met à jour les informations de la section 'About'."""
    about = db.query(About).filter(About.id == about_id).first()
    if not about:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="About not found")
    
    for key, value in about_data.dict(exclude_unset=True).items():
        setattr(about, key, value)
    
    about.password = bcrypt_context.hash(about.password) if about.password else None
    
    db.add(about)
    try:
        db.commit()
        db.refresh(about)
        logger.info("About updated successfully")
        return about
    except IntegrityError as e:
        db.rollback()
        logger.error(f"Integrity error while updating about: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="About already exists")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while updating about: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while updating about")
    
@router.delete("/delete/{about_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_about(about_id: int, db: DbDependency):
    """Supprime la section 'About'."""
    about = db.query(About).filter(About.id == about_id).first()
    if not about:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="About not found")
    
    db.delete(about)
    try:
        db.commit()
        logger.info("About deleted successfully")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while deleting about: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while deleting about")