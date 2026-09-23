from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud.personal_info import contact as contact_crud
from app.crud.personal_info import language as language_crud
from app.crud.personal_info import personal_info as personal_info_crud
from app.models.personal_info import Contact, Language, PersonalInfo
from app.schemas.personal_info import (
    ContactCreate,
    ContactUpdate,
    LanguageCreate,
    LanguageUpdate,
    PersonalInfoCreate,
    PersonalInfoUpdate,
)


class PersonalInfoService:
    def get(self, db: Session, id: UUID) -> PersonalInfo:
        obj = personal_info_crud.get(db, id)
        if obj is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Personal info introuvable",
            )
        return obj

    def list(self, db: Session, skip: int = 0, limit: int = 100) -> list[PersonalInfo]:
        return personal_info_crud.get_multi(db, skip=skip, limit=limit)

    def create(self, db: Session, obj_in: PersonalInfoCreate) -> PersonalInfo:
        return personal_info_crud.create(db, obj_in=obj_in)

    def update(
        self,
        db: Session,
        id: UUID,
        obj_in: PersonalInfoUpdate,
    ) -> PersonalInfo:
        db_obj = self.get(db, id)
        return personal_info_crud.update(db, db_obj=db_obj, obj_in=obj_in)

    def delete(self, db: Session, id: UUID) -> PersonalInfo:
        db_obj = self.get(db, id)
        personal_info_crud.remove(db, id=db_obj.id)
        return db_obj


class LanguageService:
    def get(self, db: Session, id: UUID) -> Language:
        obj = language_crud.get(db, id)
        if obj is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Langue introuvable",
            )
        return obj

    def list_by_personal_info(
        self,
        db: Session,
        personal_info_id: UUID,
    ) -> list[Language]:
        personal_info_service.get(db, personal_info_id)
        return language_crud.get_by_personal_info(db, personal_info_id)

    def create(self, db: Session, obj_in: LanguageCreate) -> Language:
        personal_info_service.get(db, obj_in.personal_info_id)
        return language_crud.create(db, obj_in=obj_in)

    def update(self, db: Session, id: UUID, obj_in: LanguageUpdate) -> Language:
        db_obj = self.get(db, id)
        if obj_in.personal_info_id is not None:
            personal_info_service.get(db, obj_in.personal_info_id)
        return language_crud.update(db, db_obj=db_obj, obj_in=obj_in)

    def delete(self, db: Session, id: UUID) -> Language:
        db_obj = self.get(db, id)
        language_crud.remove(db, id=db_obj.id)
        return db_obj


class ContactService:
    def get(self, db: Session, id: UUID) -> Contact:
        obj = contact_crud.get(db, id)
        if obj is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact introuvable",
            )
        return obj

    def list_by_personal_info(
        self,
        db: Session,
        personal_info_id: UUID,
    ) -> list[Contact]:
        personal_info_service.get(db, personal_info_id)
        return contact_crud.get_by_personal_info(db, personal_info_id)

    def create(self, db: Session, obj_in: ContactCreate) -> Contact:
        personal_info_service.get(db, obj_in.personal_info_id)
        return contact_crud.create(db, obj_in=obj_in)

    def update(self, db: Session, id: UUID, obj_in: ContactUpdate) -> Contact:
        db_obj = self.get(db, id)
        if obj_in.personal_info_id is not None:
            personal_info_service.get(db, obj_in.personal_info_id)
        return contact_crud.update(db, db_obj=db_obj, obj_in=obj_in)

    def delete(self, db: Session, id: UUID) -> Contact:
        db_obj = self.get(db, id)
        contact_crud.remove(db, id=db_obj.id)
        return db_obj


personal_info_service = PersonalInfoService()
language_service = LanguageService()
contact_service = ContactService()
