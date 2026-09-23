from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud.professional_experience import (
    professional_experience as professional_experience_crud,
)
from app.models.professional_experience import ProfessionalExperience
from app.schemas.professional_experience import (
    ProfessionalExperienceCreate,
    ProfessionalExperienceUpdate,
)
from app.services.skill import skill_service


class ProfessionalExperienceService:
    def get(self, db: Session, id: UUID) -> ProfessionalExperience:
        obj = professional_experience_crud.get(db, id)
        if obj is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Expérience professionnelle introuvable",
            )
        return obj

    def list(
        self,
        db: Session,
        skip: int = 0,
        limit: int = 100,
    ) -> list[ProfessionalExperience]:
        return professional_experience_crud.get_multi(db, skip=skip, limit=limit)

    def create(
        self,
        db: Session,
        obj_in: ProfessionalExperienceCreate,
    ) -> ProfessionalExperience:
        skill_service.get_by_ids(db, obj_in.skill_ids)
        return professional_experience_crud.create(db, obj_in=obj_in)

    def update(
        self,
        db: Session,
        id: UUID,
        obj_in: ProfessionalExperienceUpdate,
    ) -> ProfessionalExperience:
        db_obj = self.get(db, id)
        if obj_in.skill_ids is not None:
            skill_service.get_by_ids(db, obj_in.skill_ids)
        return professional_experience_crud.update(db, db_obj=db_obj, obj_in=obj_in)

    def delete(self, db: Session, id: UUID) -> ProfessionalExperience:
        db_obj = self.get(db, id)
        professional_experience_crud.remove(db, id=db_obj.id)
        return db_obj


professional_experience_service = ProfessionalExperienceService()
