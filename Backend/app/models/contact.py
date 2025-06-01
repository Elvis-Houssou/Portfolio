from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, date

class ContactCreate(SQLModel):
    intragram: Optional[str] = None
    linkedin: Optional[str] = None
    x: Optional[str] = None
    gitHub: Optional[str] = None
    resume_url: Optional[str] = None

class Contact(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    intragram: Optional[str] = None
    linkedin: Optional[str] = None
    x: Optional[str] = None
    gitHub: Optional[str] = None
    resume_url: Optional[str] = None
    
    created_at: Optional[datetime] = Field(default=None, index=True)
    updated_at: Optional[datetime] = Field(default=None, index=True)


    def __repr__(self):
        return f"Contact(id={self.id}, resume={self.resume})"