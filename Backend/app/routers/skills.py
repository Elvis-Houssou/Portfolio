from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from app.dependencies import DbDependency, bcrypt_context
from app.models.skill import Skill, SkillCreate
from sqlalchemy.exc import IntegrityError
import logging
from datetime import datetime

# Configurer les logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix = "/skills",
    tags= ['skills']
)

@router.get("/", response_model=list[Skill], status_code=status.HTTP_200_OK)
async def get_skills(db: DbDependency):
    """Récupère toutes les compétences."""
    skills = db.query(Skill).all()
    if not skills:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No skills found")
    return skills

@router.post("/create", response_model=Skill, status_code=status.HTTP_201_CREATED)
async def create_skill(skill_data: SkillCreate, db: DbDependency):
    """Crée une nouvelle compétence."""
    skill = Skill.from_orm(skill_data)
    skill.created_at = datetime.utcnow()
    db.add(skill)
    try:
        db.commit()
        db.refresh(skill)
        logger.info("Skill created successfully")
        return skill
    except IntegrityError as e:
        db.rollback()
        logger.error(f"Integrity error while creating skill: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Skill already exists")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while creating skill: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while creating skill")
    
@router.put("/update/{skill_id}", response_model=Skill, status_code=status.HTTP_200_OK)
async def update_skill(skill_id: int, skill_data: SkillCreate, db: DbDependency):
    """Met à jour une compétence existante."""
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Skill not found")
    
    for key, value in skill_data.dict(exclude_unset=True).items():
        setattr(skill, key, value)
    
    skill.updated_at = datetime.utcnow()
    db.add(skill)
    try:
        db.commit()
        db.refresh(skill)
        logger.info("Skill updated successfully")
        return skill
    except IntegrityError as e:
        db.rollback()
        logger.error(f"Integrity error while updating skill: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Skill already exists")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while updating skill: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while updating skill")
    
@router.delete("/delete/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_skill(skill_id: int, db: DbDependency):
    """Supprime une compétence."""
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Skill not found")
    
    db.delete(skill)
    try:
        db.commit()
        logger.info("Skill deleted successfully")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while deleting skill: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while deleting skill")