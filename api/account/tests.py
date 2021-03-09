from django.contrib.auth.models import User

from rest_framework.test import APITestCase


USER = {
    'username': 'testuser',
    'password': '1234',
}


class RegisterTest(APITestCase):
    path = '/api/auth/register/'

    def test_register_success(self):
        response = self.client.post(self.path, data=USER)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(User.objects.all()), 1)
        self.assertIn('user', response.data)

    def test_register_error(self):
        response = self.client.post(self.path, data={})

        self.assertEqual(response.status_code, 400)
        self.assertEqual(len(User.objects.all()), 0)

    def test_register_existing_data(self):
        User.objects.create_user(username=USER['username'], password=USER['password'])
        response = self.client.post(self.path, data=USER)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(len(User.objects.all()), 1)
        self.assertEqual('Username already used.', response.data['username'][0])
