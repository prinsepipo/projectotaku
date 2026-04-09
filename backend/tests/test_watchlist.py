from sqlalchemy import select

from app.watchlist.models import WatchlistItem, WatchStatus

TEST_ANIME = [
    {
        "mal_id": 52991,
        "title": "Sousou no Frieren",
        "image_url": "https://myanimelist.net/images/anime/1015/138006.jpg",
        "mal_url": "https://myanimelist.net/anime/52991/Sousou_no_Frieren",
        "status": WatchStatus.WATCH,
        "position": 0,
    },
    {
        "mal_id": 61469,
        "title": "Steel Ball Run: JoJo no Kimyou na Bouken",
        "image_url": "https://myanimelist.net/images/anime/1448/154111.jpg",
        "mal_url": "https://myanimelist.net/anime/61469/Steel_Ball_Run__JoJo_no_Kimyou_na_Bouken",
        "status": WatchStatus.WATCHING,
        "position": 0,
    },
    {
        "mal_id": 5114,
        "title": "Fullmetal Alchemist: Brotherhood",
        "image_url": "https://myanimelist.net/images/anime/1208/94745.jpg",
        "mal_url": "https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood",
        "status": WatchStatus.WATCHED,
        "position": 0,
    },
]


async def test_watchlist_requires_auth(client):
    response = await client.get("/watchlist")

    assert response.status_code == 401

    data = response.json()

    assert "errors" in data


async def test_get_empty_watchlist(authenticated_client):
    response = await authenticated_client.get("/watchlist")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 0


async def test_get_watchlist(authenticated_client):
    for anime in TEST_ANIME:
        create_response = await authenticated_client.post("/watchlist", json=anime)

        assert create_response.status_code == 201

    response = await authenticated_client.get("/watchlist")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == len(TEST_ANIME)


async def test_add_item_to_watchlist(authenticated_client):
    anime = TEST_ANIME[0]
    response = await authenticated_client.post("/watchlist", json=anime)

    assert response.status_code == 201

    data = response.json()

    assert data is not None
    assert "id" in data
    assert anime["mal_id"] == data["mal_id"]
    assert anime["title"] == data["title"]
    assert anime["image_url"] == data["image_url"]
    assert anime["mal_url"] == data["mal_url"]
    assert anime["status"] == data["status"]
    assert anime["position"] == data["position"]
    assert "added_at" in data


async def test_update_item_in_watchlist(authenticated_client, db_session):
    anime = TEST_ANIME[0]
    create_response = await authenticated_client.post("/watchlist", json=anime)

    assert create_response.status_code == 201

    item_id = create_response.json()["id"]
    new_position = 1.5

    update_response = await authenticated_client.patch(
        f"/watchlist/{item_id}",
        json={"status": WatchStatus.WATCHING, "position": new_position},
    )

    assert update_response.status_code == 200

    data = update_response.json()

    result = await db_session.execute(
        select(WatchlistItem).where(WatchlistItem.id == item_id)
    )

    anime = result.scalar_one_or_none()

    assert data["status"] == WatchStatus.WATCHING
    assert data["position"] == new_position
    assert anime.status == data["status"]
    assert anime.position == data["position"]


async def test_remove_item_from_watchlist(authenticated_client):
    anime = TEST_ANIME[0]
    create_response = await authenticated_client.post("/watchlist", json=anime)

    assert create_response.status_code == 201

    item_id = create_response.json()["id"]
    delete_response = await authenticated_client.delete(f"/watchlist/{item_id}")

    assert delete_response.status_code == 200

    data = delete_response.json()

    assert data is not None
    assert data["id"] == item_id


async def test_delete_nonexistent_item(authenticated_client):
    response = await authenticated_client.delete(f"/watchlist/{99}")

    assert response.status_code == 404

    data = response.json()

    assert "errors" in data
