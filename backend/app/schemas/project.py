from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.skill import SkillRead


class ProjectImageBase(BaseModel):
    image: str | None = None
    order: int | None = None


class ProjectImageCreate(ProjectImageBase):
    project_id: UUID


class ProjectImageUpdate(BaseModel):
    project_id: UUID | None = None
    image: str | None = None
    order: int | None = None


class ProjectImageRead(ProjectImageBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    project_id: UUID


class ProjectBase(BaseModel):
    name: str | None = Field(default=None, max_length=100)
    project_link: str | None = None
    github_link: str | None = None
    short_description: str | None = None
    large_description: str | None = None
    technical_description: str | None = None
    order: int | None = None
    is_active: bool | None = None


class ProjectCreate(ProjectBase):
    skill_ids: list[UUID] = Field(default_factory=list)
    images: list[ProjectImageBase] = Field(default_factory=list)


class ProjectUpdate(BaseModel):
    name: str | None = Field(default=None, max_length=100)
    project_link: str | None = None
    github_link: str | None = None
    short_description: str | None = None
    large_description: str | None = None
    technical_description: str | None = None
    order: int | None = None
    is_active: bool | None = None
    skill_ids: list[UUID] | None = None


class ProjectRead(ProjectBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    images: list[ProjectImageRead] = Field(default_factory=list)
    skills: list[SkillRead] = Field(default_factory=list)
