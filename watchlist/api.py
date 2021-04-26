from rest_framework import viewsets, permissions
from rest_framework.response import Response

from knox import auth as knox_auth

from .models import WatchlistItem
from .serializers import WatchlistItemSerializer


class WatchlistViewSet(viewsets.ModelViewSet):
    serializer_class = WatchlistItemSerializer
    authentication_classes = [
        knox_auth.TokenAuthentication,
    ]
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.request.user.watchlistitem_set.all()
