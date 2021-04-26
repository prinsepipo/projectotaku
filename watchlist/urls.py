from django.urls import path

from rest_framework import routers

from .api import WatchlistViewSet


router = routers.DefaultRouter()
router.register('', WatchlistViewSet, basename='watchlist')

urlpatterns = router.urls
