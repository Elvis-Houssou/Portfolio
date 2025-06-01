from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, date

class AboutCreate(SQLModel):
    profile_image: Optional[str] = None
    profile_image_url: Optional[str] = None
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    name: str
    email: Optional[str] = None
    password: str = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    about_me_fr: Optional[str] = None
    about_me_en: Optional[str] = None
    job_title_fr: Optional[str] = None
    job_title_en: Optional[str] = None
    description_fr: Optional[str] = None
    description_en: Optional[str] = None

class About(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    profile_image: Optional[str] = None
    profile_image_url: Optional[str] = None
    firstname: str
    lastname: str
    name: str
    email: str
    password: str = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    about_me_fr: Optional[str] = None
    about_me_en: Optional[str] = None
    job_title_fr: Optional[str] = None
    job_title_en: Optional[str] = None
    description_fr: Optional[str] = None
    description_en: Optional[str] = None
    
    created_at: Optional[datetime] = Field(default=None, index=True)
    updated_at: Optional[datetime] = Field(default=None, index=True)


    def __repr__(self):
        return f"About(id={self.id}, name={self.name}, version={self.version})"