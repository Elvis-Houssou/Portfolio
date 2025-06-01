from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, date

class TrainingCreate(SQLModel):
    name_fr: str
    name_en: Optional[str] = None
    description_fr: Optional[str] = None
    description_en: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    duration: Optional[int] = None  # Duration in years
    status: str  # e.g., "pending", "in_progress", "completed", "failed"

class Training(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name_fr: str
    name_en: Optional[str] = None
    description_fr: Optional[str] = None
    description_en: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    duration: Optional[int] = None  # Duration in years
    status: str  # e.g., "pending", "in_progress", "completed", "failed"
    
    created_at: Optional[datetime] = Field(default=None, index=True)
    updated_at: Optional[datetime] = Field(default=None, index=True)

    
    def __repr__(self):
        return f"Training(id={self.id}, model_name={self.name_fr}, status={self.status})"