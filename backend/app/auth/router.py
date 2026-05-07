from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import service
from app.auth.dependencies import get_current_user
from app.auth.models import User
from app.auth.schemas import (
    LoginRequest,
    RegisterRequest,
    RegisterResponse,
    TokenResponse,
    UserResponse,
)
from app.core.config import settings
from app.core.database import get_db

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post(
    "/register", response_model=RegisterResponse, status_code=status.HTTP_201_CREATED
)
async def register(
    request: RegisterRequest, response: Response, db: AsyncSession = Depends(get_db)
):
    user, access_token, opaque = await service.register(request, db)
    response.set_cookie(
        key="refresh_token",
        value=opaque,
        httponly=True,
        secure=settings.SECURE_COOKIES,
        samesite="lax",
        path="/auth/refresh",
    )
    return RegisterResponse(
        id=user.id, username=user.username, email=user.email, access_token=access_token
    )


@router.post("/login", response_model=TokenResponse)
async def login(
    request: LoginRequest, response: Response, db: AsyncSession = Depends(get_db)
):
    access_token, opaque = await service.login(request, db)
    response.set_cookie(
        key="refresh_token",
        value=opaque,
        httponly=True,
        secure=settings.SECURE_COOKIES,
        samesite="lax",
        path="/auth/refresh",
    )
    return TokenResponse(access_token=access_token)


@router.post("/refresh", response_model=TokenResponse)
async def refresh(
    request: Request, response: Response, db: AsyncSession = Depends(get_db)
):
    opaque = request.cookies.get("refresh_token")

    if not opaque:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token missing."
        )

    access_token, new_opaque = await service.refresh_token(opaque, db)

    response.set_cookie(
        key="refresh_token",
        value=new_opaque,
        httponly=True,
        secure=settings.SECURE_COOKIES,
        samesite="lax",
        path="/auth/refresh",
    )

    return TokenResponse(access_token=access_token)


@router.delete("/refresh", status_code=status.HTTP_204_NO_CONTENT)
async def logout(
    request: Request, response: Response, db: AsyncSession = Depends(get_db)
):
    opaque = request.cookies.get("refresh_token")

    if opaque:
        await service.logout(opaque, db)

    response.delete_cookie(
        key="refresh_token",
        path="/auth/refresh",
        secure=settings.SECURE_COOKIES,
        samesite="lax",
    )


@router.get("/me", response_model=UserResponse)
async def me(user: User = Depends(get_current_user)):
    return user
