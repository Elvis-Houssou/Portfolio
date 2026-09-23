from __future__ import annotations

import uuid
from datetime import date

from sqlalchemy import Boolean, Date, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.associations import education_skills


class Education(Base):
    __tablename__ = "educations"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    school_name: Mapped[str | None] = mapped_column(String)
    school_link: Mapped[str | None] = mapped_column(String)
    school_avatar: Mapped[str | None] = mapped_column(String)
    field_study: Mapped[str | None] = mapped_column(String)
    degree: Mapped[str | None] = mapped_column(String)
    start_date: Mapped[date | None] = mapped_column(Date)
    end_date: Mapped[date | None] = mapped_column(Date)
    mention: Mapped[str | None] = mapped_column(String)
    major_promotion: Mapped[bool | None] = mapped_column(Boolean)
    description: Mapped[str | None] = mapped_column(Text)
    extracurricular_activity: Mapped[str | None] = mapped_column(String)

    skills: Mapped[list["Skill"]] = relationship(
        "Skill",
        secondary=education_skills,
        back_populates="educations",
    )
