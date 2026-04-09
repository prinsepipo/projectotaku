import uuid
from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.models import RefreshToken, User
from app.auth.schemas import LoginRequest, RegisterRequest
from app.core.config import settings
from app.core.security import (
    create_access_token,
    hash_password,
    hash_token,
    verify_password,
)


def _issue_refresh_token(db: AsyncSession, user_id: uuid.UUID) -> str:
    opaque = str(uuid.uuid4())
    db.add(
        RefreshToken(
            user_id=user_id,
            token_hash=hash_token(opaque),
            expires_at=datetime.now(timezone.utc)
            + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
        )
    )
    return opaque


async def register(request: RegisterRequest, db: AsyncSession) -> tuple[User, str, str]:
    existing = await db.execute(
        select(User).where(
            (User.username == request.username) | (User.email == request.email)
        )
    )

    if existing.scalar_one_or_none() is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered.",
        )

    user = User(
        username=request.username,
        email=request.email,
        password_hash=hash_password(request.password),
    )

    db.add(user)
    await db.flush()

    access_token = create_access_token(str(user.id))
    opaque = _issue_refresh_token(db, user.id)
    await db.commit()
    await db.refresh(user)

    return user, access_token, opaque


async def login(request: LoginRequest, db: AsyncSession) -> tuple[str, str]:
    result = await db.execute(select(User).where(User.username == request.username))
    user = result.scalar_one_or_none()

    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials."
        )

    access_token = create_access_token(str(user.id))
    opaque = _issue_refresh_token(db, user.id)
    await db.commit()

    return access_token, opaque


async def refresh_token(opaque: str, db: AsyncSession) -> tuple[str, str]:
    token_hash = hash_token(opaque)
    result = await db.execute(
        select(RefreshToken).where(
            RefreshToken.token_hash == token_hash,
            RefreshToken.revoked == False,  # noqa: E712
            RefreshToken.expires_at > datetime.now(timezone.utc),
        )
    )
    token = result.scalar_one_or_none()

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token.",
        )

    new_opaque = _issue_refresh_token(db, token.user_id)
    token.revoked = True
    access_token = create_access_token(str(token.user_id))
    await db.commit()

    return access_token, new_opaque


async def logout(opaque: str, db: AsyncSession) -> None:
    token_hash = hash_token(opaque)
    result = await db.execute(
        select(RefreshToken).where(RefreshToken.token_hash == token_hash)
    )

    refresh_token = result.scalar_one_or_none()

    if refresh_token:
        refresh_token.revoked = True
        await db.commit()
