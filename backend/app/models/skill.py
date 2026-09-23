from __future__ import annotations

import uuid

from sqlalchemy import Boolean, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.associations import (
    education_skills,
    professional_experience_skills,
    project_skills,
)


class CategorySkill(Base):
    __tablename__ = "category_skills"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    icon: Mapped[str | None] = mapped_column(String(100))
    name: Mapped[str | None] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(String)
    order: Mapped[int | None] = mapped_column("order", Integer)
    is_active: Mapped[bool | None] = mapped_column(Boolean)

    skills: Mapped[list[Skill]] = relationship(
        back_populates="category_skill",
        cascade="all, delete-orphan",
    )


class Skill(Base):
    __tablename__ = "skills"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    category_skill_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("category_skills.id"),
        nullable=False,
    )
    icon: Mapped[str | None] = mapped_column(String(100))
    name: Mapped[str | None] = mapped_column(String(100))
    description: Mapped[str | None] = mapped_column(String(100))
    link: Mapped[str | None] = mapped_column(String)
    order: Mapped[int | None] = mapped_column("order", Integer)
    is_active: Mapped[bool | None] = mapped_column(Boolean)

    category_skill: Mapped[CategorySkill] = relationship(back_populates="skills")
    projects: Mapped[list["Project"]] = relationship(
        "Project",
        secondary=project_skills,
        back_populates="skills",
    )
    educations: Mapped[list["Education"]] = relationship(
        "Education",
        secondary=education_skills,
        back_populates="skills",
    )
    professional_experiences: Mapped[list["ProfessionalExperience"]] = relationship(
        "ProfessionalExperience",
        secondary=professional_experience_skills,
        back_populates="skills",
    )
