from datetime import date
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.skill import SkillRead


class ProfessionalExperienceBase(BaseModel):
    post_name: str | None = None
    image: str | None = None
    work_name: str | None = None
    work_link: str | None = None
    city: str | None = None
    country: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    short_description: str | None = None
    large_description: str | None = None
    is_currently: bool | None = None
    is_freelance: bool | None = None
    project_link: str | None = None


class ProfessionalExperienceCreate(ProfessionalExperienceBase):
    skill_ids: list[UUID] = Field(default_factory=list)


class ProfessionalExperienceUpdate(BaseModel):
    post_name: str | None = None
    image: str | None = None
    work_name: str | None = None
    work_link: str | None = None
    city: str | None = None
    country: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    short_description: str | None = None
    large_description: str | None = None
    is_currently: bool | None = None
    is_freelance: bool | None = None
    project_link: str | None = None
    skill_ids: list[UUID] | None = None


class ProfessionalExperienceRead(ProfessionalExperienceBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    skills: list[SkillRead] = Field(default_factory=list)
