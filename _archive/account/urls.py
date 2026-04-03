from django.urls import path

from knox import views as knox_views

from .api import RegisterAPI, LoginAPI


urlpatterns = [
    path('register/', RegisterAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('logout/', knox_views.LogoutView.as_view()),
    path('logout-all/', knox_views.LogoutAllView.as_view()),
]
