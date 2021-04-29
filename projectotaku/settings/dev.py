from .base import *


SECRET_KEY = '7t--#ta4sfsb4lqt$^t#9nxuc=!4+se6ds=k2s6s*)ldo#80%c'

DEBUG = True

ALLOWED_HOSTS = [
    '*',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'db',
        'PORT': 5432,
    }
}
