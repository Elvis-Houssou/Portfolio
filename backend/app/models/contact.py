from __future__ import annotations

import uuid

from sqlalchemy import Boolean, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

class Contact(Base):
    __tablename__ = "contacts"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    personal_info_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("personal_infos.id"),
        nullable=False,
    )
    icon: Mapped[str | None] = mapped_column(String(225))
    name: Mapped[str | None] = mapped_column(String(100))
    value: Mapped[str | None] = mapped_column(String(100))
    link: Mapped[str | None] = mapped_column(String(225))
    order: Mapped[int | None] = mapped_column("order", Integer)
    is_active: Mapped[bool | None] = mapped_column(Boolean)

    personal_info: Mapped["PersonalInfo"] = relationship(back_populates="contacts")
