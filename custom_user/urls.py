from django.conf.urls import url
from . import views
from .views import current_user, UserList
from django.urls import include, path

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    #url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^api_login/$', views.api_login, name='api_login'),
    url(r'^api_users/$', views.api_users, name='api_users'),
    url(r'^$', views.api_users, name='api_users'),
]