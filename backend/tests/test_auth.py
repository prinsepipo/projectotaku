from datetime import datetime, timezone, timedelta

from sqlalchemy import select

from app.core.security import hash_password, verify_password, create_access_token, decode_access_token, hash_token
from app.auth.models import RefreshToken


register_credentials = {
    "username": "john",
    "email": "john@example.com",
    "password": "password123"
}

login_credentials = {
    "username": "john",
    "password": "password123"
}


def test_password_round_trip():
    plain = "s3cret!"
    hashed = hash_password(plain)

    assert hashed != plain
    assert verify_password(plain, hashed)
    assert not verify_password("wrongpassword", hashed)


def test_jwt_round_trip():
    token = create_access_token("user-id-123")
    token_hash = hash_token(token)

    assert token_hash != token
    assert hash_token('different.token') != token_hash

    payload = decode_access_token(token)

    assert payload["sub"] == "user-id-123"


def test_jwt_returns_none_on_invalid():
    result = decode_access_token("not.a.token")

    assert result is None


async def test_register_creates_user_and_token(client, db_session):
    response = await client.post("/auth/register", json=register_credentials)

    assert response.status_code == 201

    data = response.json()

    assert data["username"] == "john"
    assert data["email"] == "john@example.com"
    assert "id" in data
    assert "access_token" in data
    assert response.cookies.get("refresh_token") is not None


async def test_register_duplicate_username_and_email(client, db_session):
    await client.post("/auth/register", json=register_credentials)
    response2 = await client.post("/auth/register", json=register_credentials)

    assert response2.status_code == 400

    data = response2.json()

    assert "errors" in data


async def test_login_returns_token(client, db_session):
    await client.post("/auth/register", json=register_credentials)

    response = await client.post("/auth/login", json=login_credentials)

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert response.cookies.get("refresh_token") is not None


async def test_login_invalid_credentials(client, db_session):
    await client.post("/auth/register", json=register_credentials)
    response = await client.post("/auth/login", json={**login_credentials, "password": "wrongpassword"})

    assert response.status_code == 401

    data = response.json()

    assert "errors" in data


async def test_refresh_rotates_token(client, db_session):
    register_response = await client.post("/auth/register", json=register_credentials)
    old_refresh_token = register_response.cookies.get("refresh_token")

    refresh_response = await client.post("/auth/refresh")

    assert refresh_response.status_code == 200

    data = refresh_response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"

    new_refresh_token = refresh_response.cookies.get("refresh_token")
    assert new_refresh_token is not None
    assert new_refresh_token != old_refresh_token


async def test_refresh_rejects_missing_cookie(client, db_session):
    response = await client.post("/auth/refresh")

    assert response.status_code == 401


async def test_refresh_rejects_reused_token(client, db_session):
    register_response = await client.post("/auth/register", json=register_credentials)
    old_refresh_token = register_response.cookies.get("refresh_token")

    await client.post("/auth/refresh")

    client.cookies.set("refresh_token", old_refresh_token)
    response = await client.post("/auth/refresh")

    assert response.status_code == 401


async def test_logout_invalidates_tokens(client, db_session):
    register_response = await client.post("/auth/register", json=register_credentials)
    assert register_response.status_code == 201

    refresh_token = register_response.cookies.get("refresh_token")
    assert refresh_token is not None

    logout_response = await client.post("/auth/logout")
    assert logout_response.status_code == 204

    assert client.cookies.get("refresh_token") is None

    client.cookies.set("refresh_token", refresh_token)
    refresh_response = await client.post("/auth/refresh")
    assert refresh_response.status_code == 401


async def test_logout_without_cookie_returns_204(client):
    response = await client.post("/auth/logout")

    assert response.status_code == 204


async def test_refresh_rejects_expired_token(client, db_session):
    register_response = await client.post("/auth/register", json=register_credentials)
    refresh_token = register_response.cookies.get("refresh_token")

    token_hash = hash_token(refresh_token)
    result = await db_session.execute(
        select(RefreshToken).where(RefreshToken.token_hash == token_hash)
    )
    token_row = result.scalar_one()
    token_row.expires_at = datetime.now(timezone.utc) - timedelta(seconds=1)
    await db_session.commit()
    await db_session.refresh(token_row)

    response = await client.post("/auth/refresh")

    assert response.status_code == 401


async def test_register_missing_fields_returns_422(client):
    response = await client.post("/auth/register", json={"username": "john"})

    assert response.status_code == 422


async def test_me_returns_current_user(client):
    register_response = await client.post("/auth/register", json=register_credentials)
    access_token = register_response.json()["access_token"]

    response = await client.get("/auth/me", headers={"Authorization": f"Bearer {access_token}"})

    assert response.status_code == 200

    data = response.json()
    assert data["username"] == "john"
    assert data["email"] == "john@example.com"
    assert "id" in data


async def test_me_rejects_missing_token(client):
    response = await client.get("/auth/me")

    assert response.status_code == 401


async def test_me_rejects_invalid_token(client):
    response = await client.get("/auth/me", headers={"Authorization": "Bearer not.a.valid.token"})

    assert response.status_code == 401
