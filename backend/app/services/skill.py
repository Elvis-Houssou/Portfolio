from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud.skill import category_skill as category_skill_crud
from app.crud.skill import skill as skill_crud
from app.models.skill import CategorySkill, Skill
from app.schemas.skill import (
    CategorySkillCreate,
    CategorySkillUpdate,
    SkillCreate,
    SkillUpdate,
)


class CategorySkillService:
    def get(self, db: Session, id: UUID) -> CategorySkill:
        obj = category_skill_crud.get(db, id)
        if obj is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Catégorie de compétence introuvable",
            )
        return obj

    def list(
        self,
        db: Session,
        skip: int = 0,
        limit: int = 100,
    ) -> list[CategorySkill]:
        return category_skill_crud.get_multi(db, skip=skip, limit=limit)

    def create(self, db: Session, obj_in: CategorySkillCreate) -> CategorySkill:
        return category_skill_crud.create(db, obj_in=obj_in)

    def update(
        self,
        db: Session,
        id: UUID,
        obj_in: CategorySkillUpdate,
    ) -> CategorySkill:
        db_obj = self.get(db, id)
        return category_skill_crud.update(db, db_obj=db_obj, obj_in=obj_in)

    def delete(self, db: Session, id: UUID) -> CategorySkill:
        db_obj = self.get(db, id)
        category_skill_crud.remove(db, id=db_obj.id)
        return db_obj


class SkillService:
    def get(self, db: Session, id: UUID) -> Skill:
        obj = skill_crud.get(db, id)
        if obj is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Compétence introuvable",
            )
        return obj

    def get_by_ids(self, db: Session, ids: list[UUID]) -> list[Skill]:
        skills = skill_crud.get_by_ids(db, ids)
        if len(skills) != len(set(ids)):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Une ou plusieurs compétences sont introuvables",
            )
        return skills

    def list_by_category(self, db: Session, category_skill_id: UUID) -> list[Skill]:
        category_skill_service.get(db, category_skill_id)
        return skill_crud.get_by_category(db, category_skill_id)

    def list(self, db: Session, skip: int = 0, limit: int = 100) -> list[Skill]:
        return skill_crud.get_multi(db, skip=skip, limit=limit)

    def create(self, db: Session, obj_in: SkillCreate) -> Skill:
        category_skill_service.get(db, obj_in.category_skill_id)
        return skill_crud.create(db, obj_in=obj_in)

    def update(self, db: Session, id: UUID, obj_in: SkillUpdate) -> Skill:
        db_obj = self.get(db, id)
        if obj_in.category_skill_id is not None:
            category_skill_service.get(db, obj_in.category_skill_id)
        return skill_crud.update(db, db_obj=db_obj, obj_in=obj_in)

    def delete(self, db: Session, id: UUID) -> Skill:
        db_obj = self.get(db, id)
        skill_crud.remove(db, id=db_obj.id)
        return db_obj


category_skill_service = CategorySkillService()
skill_service = SkillService()
