from __future__ import annotations

import uuid
from datetime import date

from sqlalchemy import Boolean, Date, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.enums import Availability, LanguageLevel, WorkType


class PersonalInfo(Base):
    __tablename__ = "personal_infos"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    avatar: Mapped[str | None] = mapped_column(String)
    logo: Mapped[str | None] = mapped_column(String)
    resume_url: Mapped[str | None] = mapped_column(String)
    firstname: Mapped[str] = mapped_column(String(100), nullable=False)
    lastname: Mapped[str] = mapped_column(String(100), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(100))
    dob: Mapped[date | None] = mapped_column(Date)
    city: Mapped[str | None] = mapped_column(String(100))
    country: Mapped[str | None] = mapped_column(String(100))
    post: Mapped[str | None] = mapped_column(String(150))
    social_status: Mapped[str | None] = mapped_column(String(150))
    profil_description: Mapped[str | None] = mapped_column(Text)
    short_description: Mapped[str | None] = mapped_column(Text)
    full_description: Mapped[str | None] = mapped_column(Text)
    availability: Mapped[Availability | None] = mapped_column(
        Enum(
            Availability,
            name="availability",
            native_enum=True,
            create_type=False,
        )
    )
    on_site: Mapped[bool | None] = mapped_column(Boolean)
    hybrid: Mapped[bool | None] = mapped_column(Boolean)
    remote: Mapped[bool | None] = mapped_column(Boolean)
    work_type: Mapped[WorkType | None] = mapped_column(
        Enum(WorkType, name="work_type", native_enum=True, create_type=False)
    )

    languages: Mapped[list[Language]] = relationship(
        back_populates="personal_info",
        cascade="all, delete-orphan",
    )
    contacts: Mapped[list[Contact]] = relationship(
        back_populates="personal_info",
        cascade="all, delete-orphan",
    )
