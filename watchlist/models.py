from django.contrib.auth.models import User, AnonymousUser
from django.db import models


TYPES = (
    ('anime', 'Anime'),
    ('manga', 'Manga'),
)

STATUSES = (
    ('watch', 'Watch'),
    ('watching', 'Watching'),
    ('watched', 'Watched'),
)


class WatchlistItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    mal_id = models.IntegerField()
    title = models.CharField(max_length=200)
    image_url = models.URLField()
    mal_url = models.URLField()
    type = models.CharField(choices=TYPES, max_length=len(TYPES[0][0]), default=TYPES[0][0])
    status = models.CharField(choices=STATUSES, max_length=len(STATUSES[1][0]), default=STATUSES[0][0])
    next_item_id = models.IntegerField(null=True, blank=True)
