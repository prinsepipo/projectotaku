FROM python:3.13-slim

WORKDIR /app

RUN pip install uv

ENV VIRTUAL_ENV=/opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY pyproject.toml uv.lock* ./
# Venv lives at /opt/venv so the ./backend:/app volume mount doesn't overwrite it
RUN uv venv $VIRTUAL_ENV && \
    UV_PROJECT_ENVIRONMENT=$VIRTUAL_ENV uv sync --frozen --no-dev

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
