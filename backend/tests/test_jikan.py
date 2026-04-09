import json

import respx
from httpx import Response

JIKAN_RESPONSE = {
    "data": [
        {
            "mal_id": 52991,
            "title": "Sousou no Frieren",
            "images": {
                "jpg": {
                    "image_url": "https://cdn.myanimelist.net/images/anime/1015/138006.jpg"
                }
            },
            "url": "https://myanimelist.net/anime/52991/Sousou_no_Frieren",
        },
        {
            "mal_id": 5114,
            "title": "Fullmetal Alchemist: Brotherhood",
            "images": {
                "jpg": {
                    "image_url": "https://cdn.myanimelist.net/images/anime/1208/94745.jpg"
                }
            },
            "url": "https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood",
        },
    ]
}

EXPECTED_RESULTS = [
    {
        "mal_id": 52991,
        "title": "Sousou no Frieren",
        "image_url": "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
        "mal_url": "https://myanimelist.net/anime/52991/Sousou_no_Frieren",
    },
    {
        "mal_id": 5114,
        "title": "Fullmetal Alchemist: Brotherhood",
        "image_url": "https://cdn.myanimelist.net/images/anime/1208/94745.jpg",
        "mal_url": "https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood",
    },
]

JIKAN_SEARCH_URL = "https://api.jikan.moe/v4/anime"


# ---------------------------------------------------------------------------
# Auth guard
# ---------------------------------------------------------------------------


async def test_search_requires_auth(client):
    response = await client.get("/jikan/anime", params={"q": "frieren"})

    assert response.status_code == 401


# ---------------------------------------------------------------------------
# Input validation
# ---------------------------------------------------------------------------


async def test_search_missing_query_param(jikan_client):
    client, _ = jikan_client
    response = await client.get("/jikan/anime")

    assert response.status_code == 422


async def test_search_empty_query(jikan_client):
    client, _ = jikan_client
    response = await client.get("/jikan/anime", params={"q": ""})

    assert response.status_code == 422


# ---------------------------------------------------------------------------
# Cache miss: hits Jikan API, caches result, returns data
# ---------------------------------------------------------------------------


@respx.mock
async def test_search_cache_miss(jikan_client):
    client, redis = jikan_client
    await redis.flushdb()

    respx.get(JIKAN_SEARCH_URL).mock(return_value=Response(200, json=JIKAN_RESPONSE))

    response = await client.get("/jikan/anime", params={"q": "frieren"})

    assert response.status_code == 200
    assert response.json() == EXPECTED_RESULTS
    assert respx.calls.call_count == 1

    cached = await redis.get("jikan:anime:frieren")
    assert cached is not None
    assert json.loads(cached) == EXPECTED_RESULTS


# ---------------------------------------------------------------------------
# Cache hit: returns cached data without calling Jikan API
# ---------------------------------------------------------------------------


@respx.mock
async def test_search_cache_hit(jikan_client):
    client, redis = jikan_client
    await redis.set("jikan:anime:frieren", json.dumps(EXPECTED_RESULTS))

    response = await client.get("/jikan/anime", params={"q": "frieren"})

    assert response.status_code == 200
    assert response.json() == EXPECTED_RESULTS
    assert respx.calls.call_count == 0


# ---------------------------------------------------------------------------
# Upstream failure
# ---------------------------------------------------------------------------


@respx.mock
async def test_search_jikan_upstream_error(jikan_client):
    client, redis = jikan_client
    await redis.flushdb()

    respx.get(JIKAN_SEARCH_URL).mock(return_value=Response(429))

    response = await client.get("/jikan/anime", params={"q": "frieren"})

    assert response.status_code == 502
    assert "errors" in response.json()


@respx.mock
async def test_search_jikan_network_error(jikan_client):
    import httpx

    client, redis = jikan_client
    await redis.flushdb()

    respx.get(JIKAN_SEARCH_URL).mock(
        side_effect=httpx.ConnectError("connection refused")
    )

    response = await client.get("/jikan/anime", params={"q": "frieren"})

    assert response.status_code == 502
    assert "errors" in response.json()


# ---------------------------------------------------------------------------
# Response shape
# ---------------------------------------------------------------------------


@respx.mock
async def test_search_response_shape(jikan_client):
    client, redis = jikan_client
    await redis.flushdb()

    respx.get(JIKAN_SEARCH_URL).mock(return_value=Response(200, json=JIKAN_RESPONSE))

    response = await client.get("/jikan/anime", params={"q": "frieren"})

    assert response.status_code == 200
    for item in response.json():
        assert set(item.keys()) == {"mal_id", "title", "image_url", "mal_url"}
