from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, date

class ProjectCreate(SQLModel):
    name_fr: str
    name_en: Optional[str] = None
    description_fr: Optional[str] = None
    description_en: Optional[str] = None
    employer: Optional[str] = None  # e.g., the company or individual who commissioned the project
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    status: str  # e.g., "pending", "in_progress", "completed", "failed"
    github_url: Optional[str] = None
    live_url: Optional[str] = None

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name_fr: str
    name_en: Optional[str] = None
    description_fr: Optional[str] = None
    description_en: Optional[str] = None
    employer: Optional[str] = None  # e.g., the company or individual who commissioned the project
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    status: str  # e.g., "pending", "in_progress", "completed", "failed"

    created_at: Optional[datetime] = Field(default=None, index=True)
    updated_at: Optional[datetime] = Field(default=None, index=True)

    def __repr__(self):
        return f"Project(id={self.id}, name_fr={self.name_fr}, status={self.status})"