from .settings import *

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'studyroadmaps',
        'USER': "qa",
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '5432',
        'URI': 'postgres://qa@localhost:5432/studyroadmaps',
    }
}