# Project Otaku - Backend

## !IMPORTANT

DO NOT READ `.env` files. Ask instead if you want information regarding environment variables.

## Tech Stack

- FastAPI Python Framework
- Alembic + Postgres for database
- Jikan API 3rd party anime database

## Project Strucutre

.
├── alembic                # Alembic migration code and version history
├── app                    # API modules
│   ├── auth               # Handles authentication
│   ├── core               # Handles core logic
│   ├── jikan              # Handles proxy for Jikan API
│   ├── watchlist          # Handles watchlist kanban
│   └── main.py            # FastAPI entry file
├── tests                  # Contains Pytest config and test cases
├── Dockerfile             # Setup for backend docker container
└── pyproject.toml         # Used by uv package manager containing dependencies
