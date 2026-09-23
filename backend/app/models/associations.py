import uuid

from sqlalchemy import Column, ForeignKey, Table
from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base

project_skills = Table(
    "project_skills",
    Base.metadata,
    Column("id", UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
    Column(
        "project_id",
        UUID(as_uuid=True),
        ForeignKey("projects.id"),
        nullable=False,
    ),
    Column(
        "skill_id",
        UUID(as_uuid=True),
        ForeignKey("skills.id"),
        nullable=False,
    ),
)

education_skills = Table(
    "education_skills",
    Base.metadata,
    Column("id", UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
    Column(
        "education_id",
        UUID(as_uuid=True),
        ForeignKey("educations.id"),
        nullable=False,
    ),
    Column(
        "skill_id",
        UUID(as_uuid=True),
        ForeignKey("skills.id"),
        nullable=False,
    ),
)

professional_experience_skills = Table(
    "professional_experience_skills",
    Base.metadata,
    Column("id", UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
    Column(
        "professional_experience_id",
        UUID(as_uuid=True),
        ForeignKey("professional_experiences.id"),
        nullable=False,
    ),
    Column(
        "skill_id",
        UUID(as_uuid=True),
        ForeignKey("skills.id"),
        nullable=False,
    ),
)
