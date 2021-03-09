from django.urls import path

from .api import RegisterAPI


urlpatterns = [
    path('register/', RegisterAPI.as_view()),
]
