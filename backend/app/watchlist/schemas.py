from datetime import datetime

from pydantic import BaseModel

from .models import WatchStatus


class WatchlistItemResponse(BaseModel):
    id: int
    mal_id: int
    title: str
    image_url: str
    mal_url: str
    status: WatchStatus
    position: float
    added_at: datetime

    model_config = {"from_attributes": True}


class WatchlistItemRequest(BaseModel):
    mal_id: int
    title: str
    image_url: str
    mal_url: str
    status: WatchStatus
    position: float


class WatchlistItemUpdateRequest(BaseModel):
    mal_id: int | None = None
    title: str | None = None
    image_url: str | None = None
    mal_url: str | None = None
    status: WatchStatus | None = None
    position: float | None = None
