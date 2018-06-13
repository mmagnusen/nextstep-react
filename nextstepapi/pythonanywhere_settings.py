from . settings import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

ALLOWED_HOSTS = ['www.thenextstep.io', 'marilynmags.pythonanywhere.com', 'thenextstep.io']