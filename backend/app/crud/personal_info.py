from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.crud.base import CRUDBase
from app.models.personal_info import Contact, Language, PersonalInfo
from app.schemas.personal_info import (
    ContactCreate,
    ContactUpdate,
    LanguageCreate,
    LanguageUpdate,
    PersonalInfoCreate,
    PersonalInfoUpdate,
)


class CRUDPersonalInfo(CRUDBase[PersonalInfo, PersonalInfoCreate, PersonalInfoUpdate]):
    def get(self, db: Session, id: UUID) -> PersonalInfo | None:
        stmt = (
            select(PersonalInfo)
            .options(
                selectinload(PersonalInfo.languages),
                selectinload(PersonalInfo.contacts),
            )
            .where(PersonalInfo.id == id)
        )
        return db.scalars(stmt).first()

    def get_multi(
        self,
        db: Session,
        *,
        skip: int = 0,
        limit: int = 100,
    ) -> list[PersonalInfo]:
        stmt = (
            select(PersonalInfo)
            .options(
                selectinload(PersonalInfo.languages),
                selectinload(PersonalInfo.contacts),
            )
            .offset(skip)
            .limit(limit)
        )
        return list(db.scalars(stmt).all())

    def create(self, db: Session, *, obj_in: PersonalInfoCreate) -> PersonalInfo:
        data = obj_in.model_dump(exclude={"languages", "contacts"})
        db_obj = PersonalInfo(**data)
        db_obj.languages = [
            Language(**item.model_dump()) for item in obj_in.languages
        ]
        db_obj.contacts = [
            Contact(**item.model_dump()) for item in obj_in.contacts
        ]
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


class CRUDLanguage(CRUDBase[Language, LanguageCreate, LanguageUpdate]):
    def get_by_personal_info(
        self,
        db: Session,
        personal_info_id: UUID,
    ) -> list[Language]:
        stmt = (
            select(Language)
            .where(Language.personal_info_id == personal_info_id)
            .order_by(Language.order)
        )
        return list(db.scalars(stmt).all())


class CRUDContact(CRUDBase[Contact, ContactCreate, ContactUpdate]):
    def get_by_personal_info(
        self,
        db: Session,
        personal_info_id: UUID,
    ) -> list[Contact]:
        stmt = (
            select(Contact)
            .where(Contact.personal_info_id == personal_info_id)
            .order_by(Contact.order)
        )
        return list(db.scalars(stmt).all())


personal_info = CRUDPersonalInfo(PersonalInfo)
language = CRUDLanguage(Language)
contact = CRUDContact(Contact)
