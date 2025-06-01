from sqlmodel import SQLModel, Field
from typing import Optional

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name_fr: str
    name_en: str
    description_fr: Optional[str] = None
    description_en: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    status: str  # e.g., "pending", "in_progress", "completed", "failed"
    created_at: Optional[str] = Field(default=None, index=True)
    updated_at: Optional[str] = Field(default=None, index=True)

    def __repr__(self):
        return f"Project(id={self.id}, name_fr={self.name_fr}, status={self.status})"