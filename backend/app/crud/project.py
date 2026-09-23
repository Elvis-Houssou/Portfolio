from typing import Any
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.crud.base import CRUDBase
from app.crud.skill import skill as skill_crud
from app.models.project import Project, ProjectImage
from app.schemas.project import (
    ProjectCreate,
    ProjectImageCreate,
    ProjectImageUpdate,
    ProjectUpdate,
)


class CRUDProject(CRUDBase[Project, ProjectCreate, ProjectUpdate]):
    def get(self, db: Session, id: UUID) -> Project | None:
        stmt = (
            select(Project)
            .options(
                selectinload(Project.images),
                selectinload(Project.skills),
            )
            .where(Project.id == id)
        )
        return db.scalars(stmt).first()

    def get_multi(
        self,
        db: Session,
        *,
        skip: int = 0,
        limit: int = 100,
    ) -> list[Project]:
        stmt = (
            select(Project)
            .options(
                selectinload(Project.images),
                selectinload(Project.skills),
            )
            .order_by(Project.order)
            .offset(skip)
            .limit(limit)
        )
        return list(db.scalars(stmt).all())

    def create(self, db: Session, *, obj_in: ProjectCreate) -> Project:
        data = obj_in.model_dump(exclude={"skill_ids", "images"})
        db_obj = Project(**data)
        db_obj.images = [
            ProjectImage(**item.model_dump()) for item in obj_in.images
        ]
        db_obj.skills = skill_crud.get_by_ids(db, obj_in.skill_ids)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: Project,
        obj_in: ProjectUpdate | dict[str, Any],
    ) -> Project:
        update_data = (
            obj_in
            if isinstance(obj_in, dict)
            else obj_in.model_dump(exclude_unset=True)
        )
        skill_ids = update_data.pop("skill_ids", None)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        if skill_ids is not None:
            db_obj.skills = skill_crud.get_by_ids(db, skill_ids)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


class CRUDProjectImage(
    CRUDBase[ProjectImage, ProjectImageCreate, ProjectImageUpdate]
):
    def get_by_project(self, db: Session, project_id: UUID) -> list[ProjectImage]:
        stmt = (
            select(ProjectImage)
            .where(ProjectImage.project_id == project_id)
            .order_by(ProjectImage.order)
        )
        return list(db.scalars(stmt).all())


project = CRUDProject(Project)
project_image = CRUDProjectImage(ProjectImage)
