from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING, List
from datetime import datetime, date

if TYPE_CHECKING:
    from .tool import Tool  # Avoid circular import issues


class SkillCreate(SQLModel):
    name_fr: str
    name_en: Optional[str] = None
    description_fr: Optional[str] = None
    description_en: Optional[str] = None
    
class Skill(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name_fr: str
    name_en: Optional[str] = None
    description_fr: Optional[str] = None
    description_en: Optional[str] = None

    tools: List["Tool"] = Relationship(back_populates="skill", sa_relationship_kwargs={"cascade": "all, delete-orphan"})  # type: ignore
    
    created_at: Optional[datetime] = Field(default=None, index=True)
    updated_at: Optional[datetime] = Field(default=None, index=True)


    def __repr__(self):
        return f"Skill(id={self.id}, name_fr={self.name_fr}, name_en={self.name_en})"