from datetime import datetime

from pydantic import BaseModel, field_validator

from .models import WatchStatus


class WatchlistItemResponse(BaseModel):
    id: int
    mal_id: int
    title: str
    image_url: str
    mal_url: str
    status: WatchStatus
    position: str
    total_episodes: int | None = None
    current_episode: int | None = None
    score: float | None = None
    genres: list[str] = []
    media_type: str | None = None
    added_at: datetime

    model_config = {"from_attributes": True}

    @field_validator("genres", mode="before")
    @classmethod
    def split_genres(cls, v: str | list | None) -> list[str]:
        if not v:
            return []
        if isinstance(v, list):
            return v
        return [g for g in v.split(",") if g]


class WatchlistItemRequest(BaseModel):
    mal_id: int
    title: str
    image_url: str
    mal_url: str
    status: WatchStatus
    position: str
    total_episodes: int | None = None
    current_episode: int | None = None
    score: float | None = None
    genres: str | None = None
    media_type: str | None = None


class WatchlistItemUpdateRequest(BaseModel):
    status: WatchStatus | None = None
    position: str | None = None
    current_episode: int | None = None
