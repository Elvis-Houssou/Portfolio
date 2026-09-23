from __future__ import annotations

import uuid
from datetime import date

from sqlalchemy import Boolean, Date, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.associations import professional_experience_skills


class ProfessionalExperience(Base):
    __tablename__ = "professional_experiences"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    post_name: Mapped[str | None] = mapped_column(String)
    image: Mapped[str | None] = mapped_column(String)
    work_name: Mapped[str | None] = mapped_column(String)
    work_link: Mapped[str | None] = mapped_column(String)
    city: Mapped[str | None] = mapped_column(String)
    country: Mapped[str | None] = mapped_column(String)
    start_date: Mapped[date | None] = mapped_column(Date)
    end_date: Mapped[date | None] = mapped_column(Date)
    short_description: Mapped[str | None] = mapped_column(String)
    large_description: Mapped[str | None] = mapped_column(Text)
    is_currently: Mapped[bool | None] = mapped_column(Boolean)
    is_freelance: Mapped[bool | None] = mapped_column(Boolean)
    project_link: Mapped[str | None] = mapped_column(String)

    skills: Mapped[list["Skill"]] = relationship(
        "Skill",
        secondary=professional_experience_skills,
        back_populates="professional_experiences",
    )
