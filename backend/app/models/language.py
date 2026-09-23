from __future__ import annotations

import uuid
from datetime import date

from sqlalchemy import Boolean, Date, Enum, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.enums import Availability, LanguageLevel, WorkType

class Language(Base):
    __tablename__ = "languages"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    personal_info_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("personal_infos.id"),
        nullable=False,
    )
    language: Mapped[str | None] = mapped_column(String(100))
    level: Mapped[LanguageLevel | None] = mapped_column(
        Enum(
            LanguageLevel,
            name="language_level",
            native_enum=True,
            create_type=False,
        )
    )
    order: Mapped[int | None] = mapped_column("order", Integer)
    is_active: Mapped[bool | None] = mapped_column(Boolean)

    personal_info: Mapped[PersonalInfo] = relationship(back_populates="languages")