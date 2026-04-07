import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy import text
from collections.abc import AsyncGenerator

from app.core.database import Base, get_db

from app.main import app


TEST_DATABASE_URL = "postgresql+asyncpg://otaku:otaku@localhost:5432/otaku_test"
_POSTGRES_URL = "postgresql+asyncpg://otaku:otaku@localhost:5432/postgres"

test_engine = create_async_engine(TEST_DATABASE_URL, echo=False)
TestSessionLocal = async_sessionmaker(test_engine, expire_on_commit=False)


@pytest_asyncio.fixture(scope="session", autouse=True)
async def create_tables():
    admin_engine = create_async_engine(_POSTGRES_URL, echo=False, isolation_level="AUTOCOMMIT")
    async with admin_engine.connect() as conn:
        result = await conn.execute(text("SELECT 1 FROM pg_database WHERE datname = 'otaku_test'"))
        if not result.scalar():
            await conn.execute(text("CREATE DATABASE otaku_test"))
    await admin_engine.dispose()
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest_asyncio.fixture(autouse=True)
async def clean_db(create_tables):
    yield
    async with TestSessionLocal() as session:
        await session.execute(text("TRUNCATE TABLE refresh_tokens, users CASCADE"))
        await session.commit()


@pytest_asyncio.fixture
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    async with TestSessionLocal() as session:
        yield session


@pytest_asyncio.fixture
async def client(db_session: AsyncSession) -> AsyncGenerator[AsyncClient, None]:
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    transport = ASGITransport(app=app)

    async with AsyncClient(transport=transport, base_url="https://test") as client:
        yield client

    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def authenticated_client(client):
    creds = {
        "username": "test_user",
        "email": "testuser@example.com",
        "password": "password123"
    }
    response = await client.post("/auth/register", json=creds)
    token = response.json()["access_token"]
    client.headers["Authorization"] = f"Bearer {token}"

    yield client
