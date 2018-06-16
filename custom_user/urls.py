from django.conf.urls import url
from . import views
from .views import current_user, UserList, UserDetail
from django.urls import include, path
from rest_framework import routers
from django.views.decorators.csrf import csrf_exempt

# router = routers.SimpleRouter()
# router.register(r'update', views.UpdateUserViewSet)

urlpatterns = [
    #url(r'update_user/(?P<pk>\d+)/$', csrf_exempt(update_user)),
    path('current_user/', current_user),
    url(r'^users/(?P<pk>\d+)/$', UserDetail.as_view()),
    path('users/', UserList.as_view()),
    url(r'^api_login/$', views.api_login, name='api_login'),
    url(r'^api_users/$', views.api_users, name='api_users'),
    url(r'^$', views.api_users, name='api_users'),
]