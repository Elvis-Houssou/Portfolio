from datetime import date
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.skill import SkillRead


class EducationBase(BaseModel):
    school_name: str | None = None
    school_link: str | None = None
    school_avatar: str | None = None
    field_study: str | None = None
    degree: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    mention: str | None = None
    major_promotion: bool | None = None
    description: str | None = None
    extracurricular_activity: str | None = None


class EducationCreate(EducationBase):
    skill_ids: list[UUID] = Field(default_factory=list)


class EducationUpdate(BaseModel):
    school_name: str | None = None
    school_link: str | None = None
    school_avatar: str | None = None
    field_study: str | None = None
    degree: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    mention: str | None = None
    major_promotion: bool | None = None
    description: str | None = None
    extracurricular_activity: str | None = None
    skill_ids: list[UUID] | None = None


class EducationRead(EducationBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    skills: list[SkillRead] = Field(default_factory=list)
