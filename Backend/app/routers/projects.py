from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from app.dependencies import DbDependency, bcrypt_context
from app.models.project import Project, ProjectCreate
from sqlalchemy.exc import IntegrityError
import logging
from datetime import datetime

# Configurer les logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix = "/projets",
    tags= ['projets']
)

@router.get("/", response_model=list[Project], status_code=status.HTTP_200_OK)
async def get_projects(db: DbDependency):
    """Récupère tous les projets."""
    projects = db.query(Project).all()
    if not projects:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No projects found")
    return projects

@router.post("/create", response_model=Project, status_code=status.HTTP_201_CREATED)
async def create_project(project_data: ProjectCreate, db: DbDependency):
    """Crée un nouveau projet."""
    project = Project.from_orm(project_data)
    project.created_at = datetime.utcnow()
    db.add(project)
    try:
        db.commit()
        db.refresh(project)
        logger.info("Project created successfully")
        return project
    except IntegrityError as e:
        db.rollback()
        logger.error(f"Integrity error while creating project: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Project already exists")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while creating project: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while creating project")
    
@router.put("/update/{project_id}", response_model=Project, status_code=status.HTTP_200_OK)
async def update_project(project_id: int, project_data: ProjectCreate, db: DbDependency):
    """Met à jour un projet existant."""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    
    for key, value in project_data.dict(exclude_unset=True).items():
        setattr(project, key, value)
    
    project.updated_at = datetime.utcnow()
    db.add(project)
    try:
        db.commit()
        db.refresh(project)
        logger.info("Project updated successfully")
        return project
    except IntegrityError as e:
        db.rollback()
        logger.error(f"Integrity error while updating project: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Project already exists")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while updating project: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while updating project")
    
@router.delete("/delete/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: int, db: DbDependency):
    """Supprime un projet."""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    
    db.delete(project)
    try:
        db.commit()
        logger.info("Project deleted successfully")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while deleting project: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while deleting project")