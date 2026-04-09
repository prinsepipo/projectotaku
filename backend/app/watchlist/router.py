from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_user
from app.auth.models import User
from app.core.database import get_db

from . import service
from .schemas import (
    WatchlistItemRequest,
    WatchlistItemResponse,
    WatchlistItemUpdateRequest,
)

router = APIRouter(prefix="/watchlist", tags=["watchlist"])


@router.get("", response_model=list[WatchlistItemResponse])
async def get_watchlist(
    user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)
):
    return await service.get_watchlist(user, db)


@router.post(
    "", response_model=WatchlistItemResponse, status_code=status.HTTP_201_CREATED
)
async def add_item_to_watchlist(
    request: WatchlistItemRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.add_item(request, user, db)


@router.patch("/{item_id}", response_model=WatchlistItemResponse)
async def update_item_in_watchlist(
    item_id: int,
    request: WatchlistItemUpdateRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.update_item(item_id, request, user, db)


@router.delete("/{item_id}", response_model=WatchlistItemResponse)
async def delete_item_in_watchlist(
    item_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await service.delete_item(item_id, user, db)
