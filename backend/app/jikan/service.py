import json

import httpx
import redis.asyncio as aioredis
from fastapi import HTTPException, status

from .schemas import AnimeResult

JIKAN_SEARCH_URL = "https://api.jikan.moe/v4/anime"
CACHE_TTL = 60 * 60  # 1 hour


async def search_anime(q: str, redis: aioredis.Redis, http: httpx.AsyncClient) -> list[AnimeResult]:
    cache_key = f"jikan:anime:{q}"

    cached = await redis.get(cache_key)
    if cached:
        return [AnimeResult(**item) for item in json.loads(cached)]

    try:
        response = await http.get(JIKAN_SEARCH_URL, params={"q": q})
    except httpx.HTTPError:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Failed to reach Jikan API.")

    if response.status_code != 200:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Jikan API returned an error.")

    results = [
        AnimeResult(
            mal_id=item["mal_id"],
            title=item["title"],
            image_url=item["images"]["jpg"]["image_url"],
            mal_url=item["url"],
        )
        for item in response.json().get("data", [])
    ]

    await redis.set(cache_key, json.dumps([r.model_dump() for r in results]), ex=CACHE_TTL)

    return results
