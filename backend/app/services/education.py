from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud.education import education as education_crud
from app.models.education import Education
from app.schemas.education import EducationCreate, EducationUpdate
from app.services.skill import skill_service


class EducationService:
    def get(self, db: Session, id: UUID) -> Education:
        obj = education_crud.get(db, id)
        if obj is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Formation introuvable",
            )
        return obj

    def list(self, db: Session, skip: int = 0, limit: int = 100) -> list[Education]:
        return education_crud.get_multi(db, skip=skip, limit=limit)

    def create(self, db: Session, obj_in: EducationCreate) -> Education:
        skill_service.get_by_ids(db, obj_in.skill_ids)
        return education_crud.create(db, obj_in=obj_in)

    def update(self, db: Session, id: UUID, obj_in: EducationUpdate) -> Education:
        db_obj = self.get(db, id)
        if obj_in.skill_ids is not None:
            skill_service.get_by_ids(db, obj_in.skill_ids)
        return education_crud.update(db, db_obj=db_obj, obj_in=obj_in)

    def delete(self, db: Session, id: UUID) -> Education:
        db_obj = self.get(db, id)
        education_crud.remove(db, id=db_obj.id)
        return db_obj


education_service = EducationService()
