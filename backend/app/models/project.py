from __future__ import annotations

import uuid

from sqlalchemy import Boolean, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.associations import project_skills


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str | None] = mapped_column(String(100))
    project_link: Mapped[str | None] = mapped_column(String)
    github_link: Mapped[str | None] = mapped_column(String)
    short_description: Mapped[str | None] = mapped_column(String)
    large_description: Mapped[str | None] = mapped_column(Text)
    technical_description: Mapped[str | None] = mapped_column(Text)
    order: Mapped[int | None] = mapped_column("order", Integer)
    is_active: Mapped[bool | None] = mapped_column(Boolean)

    images: Mapped[list[ProjectImage]] = relationship(
        back_populates="project",
        cascade="all, delete-orphan",
    )
    skills: Mapped[list["Skill"]] = relationship(
        "Skill",
        secondary=project_skills,
        back_populates="projects",
    )


class ProjectImage(Base):
    __tablename__ = "project_images"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    project_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("projects.id"),
        nullable=False,
    )
    image: Mapped[str | None] = mapped_column(String)
    order: Mapped[int | None] = mapped_column("order", Integer)

    project: Mapped[Project] = relationship(back_populates="images")
