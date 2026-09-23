from datetime import date
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.enums import Availability, LanguageLevel, WorkType


class LanguageBase(BaseModel):
    language: str | None = Field(default=None, max_length=100)
    level: LanguageLevel | None = None
    order: int | None = None
    is_active: bool | None = None


class LanguageCreate(LanguageBase):
    personal_info_id: UUID


class LanguageUpdate(BaseModel):
    personal_info_id: UUID | None = None
    language: str | None = Field(default=None, max_length=100)
    level: LanguageLevel | None = None
    order: int | None = None
    is_active: bool | None = None


class LanguageRead(LanguageBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    personal_info_id: UUID


class ContactBase(BaseModel):
    icon: str | None = Field(default=None, max_length=225)
    name: str | None = Field(default=None, max_length=100)
    value: str | None = Field(default=None, max_length=100)
    link: str | None = Field(default=None, max_length=225)
    order: int | None = None
    is_active: bool | None = None


class ContactCreate(ContactBase):
    personal_info_id: UUID


class ContactUpdate(BaseModel):
    personal_info_id: UUID | None = None
    icon: str | None = Field(default=None, max_length=225)
    name: str | None = Field(default=None, max_length=100)
    value: str | None = Field(default=None, max_length=100)
    link: str | None = Field(default=None, max_length=225)
    order: int | None = None
    is_active: bool | None = None


class ContactRead(ContactBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    personal_info_id: UUID


class PersonalInfoBase(BaseModel):
    avatar: str | None = None
    logo: str | None = None
    resume_url: str | None = None
    firstname: str = Field(max_length=100)
    lastname: str = Field(max_length=100)
    phone: str | None = Field(default=None, max_length=100)
    dob: date | None = None
    city: str | None = Field(default=None, max_length=100)
    country: str | None = Field(default=None, max_length=100)
    post: str | None = Field(default=None, max_length=150)
    social_status: str | None = Field(default=None, max_length=150)
    profil_description: str | None = None
    short_description: str | None = None
    full_description: str | None = None
    availability: Availability | None = None
    on_site: bool | None = None
    hybrid: bool | None = None
    remote: bool | None = None
    work_type: WorkType | None = None


class PersonalInfoCreate(PersonalInfoBase):
    languages: list[LanguageBase] = Field(default_factory=list)
    contacts: list[ContactBase] = Field(default_factory=list)


class PersonalInfoUpdate(BaseModel):
    avatar: str | None = None
    logo: str | None = None
    resume_url: str | None = None
    firstname: str | None = Field(default=None, max_length=100)
    lastname: str | None = Field(default=None, max_length=100)
    phone: str | None = Field(default=None, max_length=100)
    dob: date | None = None
    city: str | None = Field(default=None, max_length=100)
    country: str | None = Field(default=None, max_length=100)
    post: str | None = Field(default=None, max_length=150)
    social_status: str | None = Field(default=None, max_length=150)
    profil_description: str | None = None
    short_description: str | None = None
    full_description: str | None = None
    availability: Availability | None = None
    on_site: bool | None = None
    hybrid: bool | None = None
    remote: bool | None = None
    work_type: WorkType | None = None


class PersonalInfoRead(PersonalInfoBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    languages: list[LanguageRead] = Field(default_factory=list)
    contacts: list[ContactRead] = Field(default_factory=list)
