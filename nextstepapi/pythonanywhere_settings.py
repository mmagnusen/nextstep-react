from . settings import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'nextstepreactdb',
        'USER': 'marilynnextstepdbsuperuser',
        'PASSWORD': 'sdfaercsertretsret234243@2',
        'HOST': 'marilynmags-625.postgres.pythonanywhere-services.com',
        'PORT': '10625',
    }
}

ALLOWED_HOSTS = ['www.thenextstep.io', 'marilynmags.pythonanywhere.com', 'thenextstep.io', '127.0.0.1', 'localhost']