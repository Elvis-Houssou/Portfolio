from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.crud.base import CRUDBase
from app.models.skill import CategorySkill, Skill
from app.schemas.skill import (
    CategorySkillCreate,
    CategorySkillUpdate,
    SkillCreate,
    SkillUpdate,
)


class CRUDCategorySkill(
    CRUDBase[CategorySkill, CategorySkillCreate, CategorySkillUpdate]
):
    def get(self, db: Session, id: UUID) -> CategorySkill | None:
        stmt = (
            select(CategorySkill)
            .options(selectinload(CategorySkill.skills))
            .where(CategorySkill.id == id)
        )
        return db.scalars(stmt).first()

    def get_multi(
        self,
        db: Session,
        *,
        skip: int = 0,
        limit: int = 100,
    ) -> list[CategorySkill]:
        stmt = (
            select(CategorySkill)
            .options(selectinload(CategorySkill.skills))
            .order_by(CategorySkill.order)
            .offset(skip)
            .limit(limit)
        )
        return list(db.scalars(stmt).all())

    def create(self, db: Session, *, obj_in: CategorySkillCreate) -> CategorySkill:
        data = obj_in.model_dump(exclude={"skills"})
        db_obj = CategorySkill(**data)
        db_obj.skills = [Skill(**item.model_dump()) for item in obj_in.skills]
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


class CRUDSkill(CRUDBase[Skill, SkillCreate, SkillUpdate]):
    def get_by_category(
        self,
        db: Session,
        category_skill_id: UUID,
    ) -> list[Skill]:
        stmt = (
            select(Skill)
            .where(Skill.category_skill_id == category_skill_id)
            .order_by(Skill.order)
        )
        return list(db.scalars(stmt).all())

    def get_by_ids(self, db: Session, ids: list[UUID]) -> list[Skill]:
        if not ids:
            return []
        stmt = select(Skill).where(Skill.id.in_(ids))
        return list(db.scalars(stmt).all())


category_skill = CRUDCategorySkill(CategorySkill)
skill = CRUDSkill(Skill)
