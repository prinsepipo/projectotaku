from __future__ import annotations

import enum
import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, Enum, Float, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from app.auth.models import User


class WatchStatus(str, enum.Enum):
    WATCH = "watch"
    WATCHING = "watching"
    WATCHED = "watched"


class WatchlistItem(Base):
    __tablename__ = "watchlist_item"
    __table_args__ = (
        UniqueConstraint("user_id", "mal_id", name="uq_watchlist_user_mal"),
    )

    id: Mapped[int] = mapped_column(Integer(), primary_key=True, autoincrement=True)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    mal_id: Mapped[int] = mapped_column(Integer(), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    image_url: Mapped[str] = mapped_column(String(255), nullable=False)
    mal_url: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[WatchStatus] = mapped_column(Enum(WatchStatus), nullable=False)
    position: Mapped[str] = mapped_column(String(50), nullable=False)
    total_episodes: Mapped[int | None] = mapped_column(Integer(), nullable=True)
    current_episode: Mapped[int | None] = mapped_column(Integer(), nullable=True)
    score: Mapped[float | None] = mapped_column(Float(), nullable=True)
    genres: Mapped[str | None] = mapped_column(String(255), nullable=True)
    media_type: Mapped[str | None] = mapped_column(String(20), nullable=True)
    added_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    user: Mapped["User"] = relationship(back_populates="watchlist")
