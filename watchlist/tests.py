from django.contrib.auth.models import User

from rest_framework.test import APITestCase

from .models import WatchlistItem
from .serializers import WatchlistItemSerializer


class WatchlistAPITest(APITestCase):
    path = '/api/watchlist/'

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='testuser', password='1234')

    def test_create(self):
        self._authenticate()
        data = {
            'mal_id': 40028,
            'title': 'Shingeki no Kyojin: The Final Season',
            'image_url': 'https://cdn.myanimelist.net/images/anime/1000/110531.jpg',
            'mal_url': 'https://myanimelist.net/anime/40028/Shingeki_no_Kyojin__The_Final_Season',
            'type': 'anime',
            'status': 'watch',
        }
        response = self.client.post(self.path, data=data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(WatchlistItem.objects.all()), 1)
        watchlist_item = WatchlistItem.objects.get(mal_id=data['mal_id'])
        self.assertEqual(response.data, WatchlistItemSerializer(watchlist_item).data)

    def test_list(self):
        self._authenticate()
        self._fill_watchlist()
        response = self.client.get(self.path)

        self.assertEqual(response.status_code, 200)
        watchlist = WatchlistItem.objects.all()
        self.assertEqual(response.data, WatchlistItemSerializer(watchlist, many=True).data)

    def test_update(self):
        self._authenticate()
        self._fill_watchlist()
        item = WatchlistItem.objects.all()[0]
        updated_data = {
            'mal_id': item.mal_id,
            'title': item.title,
            'image_url': item.image_url,
            'mal_url': item.mal_url,
            'type': item.type,
            'status': 'watching',
        }
        response = self.client.put(f'{self.path}{item.id}/', data=updated_data)

        self.assertEqual(response.status_code, 200)
        target_item = WatchlistItem.objects.get(id=item.id)
        self.assertEqual(target_item.status, updated_data['status'])
        self.assertEqual(response.data, WatchlistItemSerializer(target_item).data)

    def test_delete(self):
        self._authenticate()
        self._fill_watchlist()
        watchlist = WatchlistItem.objects.all()
        initial_length = len(watchlist)
        item = watchlist[0]
        response = self.client.delete(f'{self.path}{item.id}/')

        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(WatchlistItem.objects.all()), initial_length - 1)

    def test_auth_required(self):
        response = self.client.get(self.path)

        self.assertEqual(response.status_code, 401)

    def _authenticate(self):
        data = {
            'username': 'testuser',
            'password': '1234',
        }
        response = self.client.post('/api/auth/login/', data=data)
        token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {token}')

    def _fill_watchlist(self):
        items = [
            {
                'mal_id': 40028,
                'title': 'Shingeki no Kyojin: The Final Season',
                'image_url': 'https://cdn.myanimelist.net/images/anime/1000/110531.jpg',
                'mal_url': 'https://myanimelist.net/anime/40028/Shingeki_no_Kyojin__The_Final_Season',
                'type': 'anime',
                'status': 'watch',
            },
            {
                'mal_id': 39617,
                'title': 'Yakusoku no Neverland 2nd Season',
                'image_url': 'https://cdn.myanimelist.net/images/anime/1815/110626.jpg',
                'mal_url': 'https://myanimelist.net/anime/39617/Yakusoku_no_Neverland_2nd_Season',
                'type': 'anime',
                'status': 'watch',
            },
            {
                'mal_id': 2,
                'title': 'Berserk',
                'image_url': 'https://cdn.myanimelist.net/images/manga/1/157931.jpg?s=8402b7b8190fa92d679a72d7f8c68152',
                'mal_url': 'https://myanimelist.net/manga/2/Berserk',
                'type': 'manga',
                'status': 'watch',
            },
            {
                'mal_id': 13,
                'title': 'One Piece',
                'image_url': 'https://cdn.myanimelist.net/images/manga/3/55539.jpg?s=b4d9e935b7152f0c9e69b34a7797fe02',
                'mal_url': 'https://myanimelist.net/manga/13/One_Piece',
                'type': 'manga',
                'status': 'watch',
            },
        ]

        for item in items:
            WatchlistItem.objects.create(user=self.user, mal_id=item['mal_id'], title=item['title'], image_url=item['image_url'],
                mal_url=item['mal_url'], type=item['type'], status=item['status'])
