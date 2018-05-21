from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^user_view$', views.user_view, name='user_view'),
    url(r'^$', views.all_list, name='all_list'),
]