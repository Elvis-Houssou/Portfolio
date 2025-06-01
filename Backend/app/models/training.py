from sqlmodel import SQLModel, Field
from typing import Optional

class Training(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name_fr: str
    name_en: str
    description_fr: str
    description_en: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    duration: Optional[int] = None  # Duration in years
    status: str  # e.g., "pending", "in_progress", "completed", "failed"
    created_at: Optional[str] = Field(default=None, index=True)
    updated_at: Optional[str] = Field(default=None, index=True)
    
    def __repr__(self):
        return f"Training(id={self.id}, model_name={self.name_fr}, status={self.status})"