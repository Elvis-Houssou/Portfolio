from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class SkillBase(BaseModel):
    icon: str | None = Field(default=None, max_length=100)
    name: str | None = Field(default=None, max_length=100)
    description: str | None = Field(default=None, max_length=100)
    link: str | None = None
    order: int | None = None
    is_active: bool | None = None


class SkillCreate(SkillBase):
    category_skill_id: UUID


class SkillUpdate(BaseModel):
    category_skill_id: UUID | None = None
    icon: str | None = Field(default=None, max_length=100)
    name: str | None = Field(default=None, max_length=100)
    description: str | None = Field(default=None, max_length=100)
    link: str | None = None
    order: int | None = None
    is_active: bool | None = None


class SkillRead(SkillBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    category_skill_id: UUID


class CategorySkillBase(BaseModel):
    icon: str | None = Field(default=None, max_length=100)
    name: str | None = Field(default=None, max_length=100)
    description: str | None = None
    order: int | None = None
    is_active: bool | None = None


class CategorySkillCreate(CategorySkillBase):
    skills: list[SkillBase] = Field(default_factory=list)


class CategorySkillUpdate(BaseModel):
    icon: str | None = Field(default=None, max_length=100)
    name: str | None = Field(default=None, max_length=100)
    description: str | None = None
    order: int | None = None
    is_active: bool | None = None


class CategorySkillRead(CategorySkillBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    skills: list[SkillRead] = Field(default_factory=list)
