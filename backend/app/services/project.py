from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud.project import project as project_crud
from app.crud.project import project_image as project_image_crud
from app.models.project import Project, ProjectImage
from app.schemas.project import (
    ProjectCreate,
    ProjectImageCreate,
    ProjectImageUpdate,
    ProjectUpdate,
)
from app.services.skill import skill_service


class ProjectService:
    def get(self, db: Session, id: UUID) -> Project:
        obj = project_crud.get(db, id)
        if obj is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Projet introuvable",
            )
        return obj

    def list(self, db: Session, skip: int = 0, limit: int = 100) -> list[Project]:
        return project_crud.get_multi(db, skip=skip, limit=limit)

    def create(self, db: Session, obj_in: ProjectCreate) -> Project:
        skill_service.get_by_ids(db, obj_in.skill_ids)
        return project_crud.create(db, obj_in=obj_in)

    def update(self, db: Session, id: UUID, obj_in: ProjectUpdate) -> Project:
        db_obj = self.get(db, id)
        if obj_in.skill_ids is not None:
            skill_service.get_by_ids(db, obj_in.skill_ids)
        return project_crud.update(db, db_obj=db_obj, obj_in=obj_in)

    def delete(self, db: Session, id: UUID) -> Project:
        db_obj = self.get(db, id)
        project_crud.remove(db, id=db_obj.id)
        return db_obj


class ProjectImageService:
    def get(self, db: Session, id: UUID) -> ProjectImage:
        obj = project_image_crud.get(db, id)
        if obj is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Image de projet introuvable",
            )
        return obj

    def list_by_project(self, db: Session, project_id: UUID) -> list[ProjectImage]:
        project_service.get(db, project_id)
        return project_image_crud.get_by_project(db, project_id)

    def create(self, db: Session, obj_in: ProjectImageCreate) -> ProjectImage:
        project_service.get(db, obj_in.project_id)
        return project_image_crud.create(db, obj_in=obj_in)

    def update(
        self,
        db: Session,
        id: UUID,
        obj_in: ProjectImageUpdate,
    ) -> ProjectImage:
        db_obj = self.get(db, id)
        if obj_in.project_id is not None:
            project_service.get(db, obj_in.project_id)
        return project_image_crud.update(db, db_obj=db_obj, obj_in=obj_in)

    def delete(self, db: Session, id: UUID) -> ProjectImage:
        db_obj = self.get(db, id)
        project_image_crud.remove(db, id=db_obj.id)
        return db_obj


project_service = ProjectService()
project_image_service = ProjectImageService()
