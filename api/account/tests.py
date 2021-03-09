from django.contrib.auth.models import User

from rest_framework.test import APITestCase

from knox.models import AuthToken


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


class LoginTest(APITestCase):
    path = '/api/auth/login/'

    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username=USER['username'], password=USER['password'])

    def test_login_success(self):
        response = self.client.post(self.path, data=USER)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(AuthToken.objects.all()), 1)
        self.assertIn('user', response.data)
        self.assertIn('token', response.data)

    def test_login_unregistered_user(self):
        data = {
            'username': 'unknown',
            'password': 4321,
        }
        response = self.client.post(self.path, data=data)

        self.assertEqual(response.status_code, 400)
        self.assertEqual('Invalid credentials.', response.data['non_field_errors'][0])
