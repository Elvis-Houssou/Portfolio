from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, TYPE_CHECKING
from datetime import datetime, date

if TYPE_CHECKING:
    from .skill import Skill  # Avoid circular import issues


class ToolCreate(SQLModel):
    name_fr: str
    name_en: Optional[str] = None
    description_fr: Optional[str] = None
    description_en: Optional[str] = None
    skill_id: int  # Foreign key to Skill table
    
class Tool(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name_fr: str
    name_en: Optional[str] = None
    description_fr: Optional[str] = None
    description_en: Optional[str] = None

    skill_id: int = Field(default=None, foreign_key="skill.id")
    skill: "Skill" = Relationship(back_populates="tools") # type: ignore

    created_at: Optional[datetime] = Field(default=None, index=True)
    updated_at: Optional[datetime] = Field(default=None, index=True)


    def __repr__(self):
        return f"Tool(id={self.id}, name_fr={self.name_fr}, name_en={self.name_en})"