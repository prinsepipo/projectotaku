import httpx
import redis.asyncio as aioredis
from fastapi import APIRouter, Depends, Query

from app.auth.models import User
from app.auth.dependencies import get_current_user
from .dependencies import get_redis, get_http_client
from .schemas import AnimeResult
from . import service


router = APIRouter(prefix="/jikan", tags=["jikan"])


@router.get("/anime", response_model=list[AnimeResult])
async def search_anime(
    q: str = Query(min_length=1),
    user: User = Depends(get_current_user),
    redis: aioredis.Redis = Depends(get_redis),
    http: httpx.AsyncClient = Depends(get_http_client),
):
    return await service.search_anime(q, redis, http)
