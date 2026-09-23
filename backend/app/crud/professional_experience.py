from typing import Any
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.crud.base import CRUDBase
from app.crud.skill import skill as skill_crud
from app.models.professional_experience import ProfessionalExperience
from app.schemas.professional_experience import (
    ProfessionalExperienceCreate,
    ProfessionalExperienceUpdate,
)


class CRUDProfessionalExperience(
    CRUDBase[
        ProfessionalExperience,
        ProfessionalExperienceCreate,
        ProfessionalExperienceUpdate,
    ]
):
    def get(self, db: Session, id: UUID) -> ProfessionalExperience | None:
        stmt = (
            select(ProfessionalExperience)
            .options(selectinload(ProfessionalExperience.skills))
            .where(ProfessionalExperience.id == id)
        )
        return db.scalars(stmt).first()

    def get_multi(
        self,
        db: Session,
        *,
        skip: int = 0,
        limit: int = 100,
    ) -> list[ProfessionalExperience]:
        stmt = (
            select(ProfessionalExperience)
            .options(selectinload(ProfessionalExperience.skills))
            .offset(skip)
            .limit(limit)
        )
        return list(db.scalars(stmt).all())

    def create(
        self,
        db: Session,
        *,
        obj_in: ProfessionalExperienceCreate,
    ) -> ProfessionalExperience:
        data = obj_in.model_dump(exclude={"skill_ids"})
        db_obj = ProfessionalExperience(**data)
        db_obj.skills = skill_crud.get_by_ids(db, obj_in.skill_ids)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: ProfessionalExperience,
        obj_in: ProfessionalExperienceUpdate | dict[str, Any],
    ) -> ProfessionalExperience:
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


professional_experience = CRUDProfessionalExperience(ProfessionalExperience)
