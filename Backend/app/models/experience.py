from sqlmodel import SQLModel, Field
from typing import Optional

class Experience(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    company_name_fr: str
    company_name_en: str
    job_title_fr: str
    job_title_en: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description_fr: Optional[str] = None
    description_en: Optional[str] = None
    created_at: Optional[str] = Field(default=None, index=True)
    updated_at: Optional[str] = Field(default=None, index=True)

    def __repr__(self):
        return f"Experience(id={self.id}, company_name_fr={self.company_name_fr}, job_title_fr={self.job_title_fr})"