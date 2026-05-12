from pydantic import BaseModel


class AnimeResult(BaseModel):
    mal_id: int
    title: str
    image_url: str
    mal_url: str
    total_episodes: int | None = None
    score: float | None = None
    genres: list[str] = []
    media_type: str | None = None
