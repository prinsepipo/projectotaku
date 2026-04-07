from fastapi import HTTPException, status

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from datetime import datetime, timezone

from app.auth.models import User
from .models import WatchlistItem
from .schemas import WatchlistItemRequest, WatchlistItemUpdateRequest


async def get_watchlist(user: User, db: AsyncSession) -> list[WatchlistItem]:
    if user:
        result = await db.execute(
            select(WatchlistItem).where(WatchlistItem.user_id == user.id)
        )

        return result.scalars().all()


async def add_item(request: WatchlistItemRequest, user: User, db: AsyncSession) -> WatchlistItem:
    if user:
        result = await db.execute(
            select(WatchlistItem)
                .where(WatchlistItem.user_id == user.id)
                .where(WatchlistItem.mal_id == request.mal_id)
        )

        item = result.scalars().all()

        if item and len(item) > 0:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Item already in watchlist.")

        item = WatchlistItem(
            user_id=user.id,
            mal_id=request.mal_id,
            mal_url=request.mal_url,
            title=request.title,
            image_url=request.image_url,
            status=request.status,
            position=request.position,
            added_at=datetime.now(timezone.utc),
        )

        db.add(item)
        await db.commit()
        await db.refresh(item)

        return item


async def update_item(id: int, request: WatchlistItemUpdateRequest, user: User, db: AsyncSession) -> WatchlistItem:
    if user:
        await db.execute(
            update(WatchlistItem)
                .where(WatchlistItem.id == id)
                .where(WatchlistItem.user_id == user.id)
                .values(**request.model_dump(exclude_none=True))
        )
        await db.commit()

        result = await db.execute(
            select(WatchlistItem).where(WatchlistItem.id == id)
        )
        item = result.scalar_one_or_none()

        if item is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found.")

        return item


async def delete_item(id: int, user: User, db: AsyncSession) -> WatchlistItem:
    if user:
        result = await db.execute(
            select(WatchlistItem)
                .where(WatchlistItem.id == id)
                .where(WatchlistItem.user_id == user.id)
        )

        item = result.scalar_one_or_none()

        if item is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found.")

        await db.delete(item)
        await db.commit()

        return item
