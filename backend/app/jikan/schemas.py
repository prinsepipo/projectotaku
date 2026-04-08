from pydantic import BaseModel


class AnimeResult(BaseModel):
    mal_id: int
    title: str
    image_url: str
    mal_url: str
