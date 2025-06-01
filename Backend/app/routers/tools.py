from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from app.dependencies import DbDependency, bcrypt_context
from app.models.tool import Tool, ToolCreate
from sqlalchemy.exc import IntegrityError
import logging
from datetime import datetime

# Configurer les logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix = "/tools",
    tags= ['tools']
)

@router.get("/", response_model=list[Tool], status_code=status.HTTP_200_OK)
async def get_tools(db: DbDependency):
    """Récupère tous les outils."""
    tools = db.query(Tool).all()
    if not tools:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No tools found")
    return tools

@router.post("/create", response_model=Tool, status_code=status.HTTP_201_CREATED)
async def create_tool(tool_data: ToolCreate, db: DbDependency):
    """Crée un nouvel outil."""
    tool = Tool.from_orm(tool_data)
    tool.created_at = datetime.utcnow()
    db.add(tool)
    try:
        db.commit()
        db.refresh(tool)
        logger.info("Tool created successfully")
        return tool
    except IntegrityError as e:
        db.rollback()
        logger.error(f"Integrity error while creating tool: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Tool already exists")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while creating tool: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while creating tool")
    
@router.put("/update/{tool_id}", response_model=Tool, status_code=status.HTTP_200_OK)
async def update_tool(tool_id: int, tool_data: ToolCreate, db: DbDependency):
    """Met à jour un outil existant."""
    tool = db.query(Tool).filter(Tool.id == tool_id).first()
    if not tool:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tool not found")
    
    for key, value in tool_data.dict(exclude_unset=True).items():
        setattr(tool, key, value)
    
    tool.updated_at = datetime.utcnow()
    db.add(tool)
    try:
        db.commit()
        db.refresh(tool)
        logger.info("Tool updated successfully")
        return tool
    except IntegrityError as e:
        db.rollback()
        logger.error(f"Integrity error while updating tool: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Tool already exists")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while updating tool: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while updating tool")
    
@router.delete("/delete/{tool_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_tool(tool_id: int, db: DbDependency):
    """Supprime un outil."""
    tool = db.query(Tool).filter(Tool.id == tool_id).first()
    if not tool:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tool not found")
    
    db.delete(tool)
    try:
        db.commit()
        logger.info("Tool deleted successfully")
    except Exception as e:
        db.rollback()
        logger.error(f"Error while deleting tool: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="An error occurred while deleting tool")