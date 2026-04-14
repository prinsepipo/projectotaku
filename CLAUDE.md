# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ProjectOtaku is a full-stack anime watchlist app with a Kanban-style board. Users search anime via the [Jikan API](https://jikan.moe/) (MyAnimeList data) and organize them into Watch / Watching / Watched columns with drag-and-drop.

**Stack:** React + Vite (frontend) · FastAPI + Python 3.13 (backend) · PostgreSQL · Redis

## Development Commands

All backend commands run from the `backend/` directory using the `.venv` virtual environment.

### Run the full stack
```bash
docker compose up
```
Backend: `http://localhost:8000` · Frontend: `http://localhost:5173`

### Backend (local, without Docker)
```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

### Run tests
Tests require a running PostgreSQL instance with database `otaku_test` (same host/creds as dev: `localhost:5432`, user `otaku`, password `otaku`).

```bash
cd backend
source .venv/bin/activate
pytest                          # all tests
pytest tests/test_auth.py       # single file
pytest tests/test_auth.py::test_register  # single test
```

### Database migrations (Alembic)
Run from `backend/` with the venv activated and `.env` present:
```bash
alembic upgrade head                        # apply migrations
alembic revision --autogenerate -m "msg"    # generate new migration
alembic downgrade -1                        # roll back one
```

Alembic reads `DATABASE_URL` from `app.core.config.settings` (loaded via `backend/.env`).

### Install dependencies
```bash
cd backend
uv sync            # install all deps including dev group
```

## PRD or Specifications

This project specs is located in [PRD.md](./docs/PRD.md). Use it if you more info about the project.

## Architecture

### Backend (`backend/app/`)

| Module | Role |
|--------|------|
| `main.py` | FastAPI app factory; mounts CORS middleware and routers |
| `core/config.py` | `Settings` via `pydantic-settings`; reads `backend/.env` |
| `core/database.py` | Async SQLAlchemy engine + `get_db` dependency; `Base` for all models |
| `core/security.py` | bcrypt password hashing, JWT (authlib HS256) access token creation/decoding, SHA-256 token hashing |
| `auth/models.py` | `User` and `RefreshToken` ORM models |
| `auth/schemas.py` | Pydantic request/response schemas |
| `auth/service.py` | Business logic: register, login, refresh, logout |
| `auth/router.py` | `/auth` routes: `POST /register`, `POST /login`, `POST /refresh`, `POST /logout`, `GET /me` |
| `auth/dependencies.py` | `get_current_user` FastAPI dependency (Bearer token → User) |

### Auth flow
- **Access token**: short-lived JWT (default 15 min), sent as `Authorization: Bearer <token>`.
- **Refresh token**: opaque UUID stored hashed in the DB, sent/received via `HttpOnly` cookie scoped to `/auth/refresh`. Rotation on each use (old token revoked, new one issued).

### Planned modules (not yet implemented)
- `jikan/` — Jikan API proxy with Redis caching
- `watchlist/` — User anime list CRUD (stores `mal_id`, `status`, `position` per user)

### Testing (`backend/tests/`)
- `conftest.py` creates a separate `otaku_test` database using `Base.metadata`, overrides the `get_db` dependency per test, and rolls back each transaction after the test.
- Uses `httpx.AsyncClient` with `ASGITransport` for end-to-end HTTP tests without a real server.

### Environment variables
**IMPORTANT: DO NOT READ the `.env` files.**
Stored in `backend/.env` (see README for full list). Key vars: `DATABASE_URL`, `REDIS_URL`, `SECRET_KEY`.
