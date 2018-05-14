from django.conf.urls import url
from . import views
from django.urls import include, path


urlpatterns = [
    url(r'^api_login/$', views.api_login, name='api_login'),
    url(r'^api_users/$', views.api_users, name='api_users'),
    url(r'^$', views.api_users, name='api_users'),
]