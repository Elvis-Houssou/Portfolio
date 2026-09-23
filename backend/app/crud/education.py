from typing import Any
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.crud.base import CRUDBase
from app.crud.skill import skill as skill_crud
from app.models.education import Education
from app.schemas.education import EducationCreate, EducationUpdate


class CRUDEducation(CRUDBase[Education, EducationCreate, EducationUpdate]):
    def get(self, db: Session, id: UUID) -> Education | None:
        stmt = (
            select(Education)
            .options(selectinload(Education.skills))
            .where(Education.id == id)
        )
        return db.scalars(stmt).first()

    def get_multi(
        self,
        db: Session,
        *,
        skip: int = 0,
        limit: int = 100,
    ) -> list[Education]:
        stmt = (
            select(Education)
            .options(selectinload(Education.skills))
            .offset(skip)
            .limit(limit)
        )
        return list(db.scalars(stmt).all())

    def create(self, db: Session, *, obj_in: EducationCreate) -> Education:
        data = obj_in.model_dump(exclude={"skill_ids"})
        db_obj = Education(**data)
        db_obj.skills = skill_crud.get_by_ids(db, obj_in.skill_ids)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: Education,
        obj_in: EducationUpdate | dict[str, Any],
    ) -> Education:
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


education = CRUDEducation(Education)
