# Project Otaku - Backend (REST API)

This is the backend of the project that only serves the REST API needed by the separate frontend
which is a single page application.

## Technologies

- [Python3](https://www.python.org/)
- [Django](https://www.djangoproject.com/) v3.1.7
- [Django REST Framework](https://www.django-rest-framework.org/) v3.12.2
- [Postgresql](https://www.postgresql.org/)

## Setup

Make sure [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
are installed.

1. Create `.env` file then add and set the environment variables declared in `.env.example` file.
2. Build and run the container using `docker-compose up --build`.
