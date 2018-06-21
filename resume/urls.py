from django.conf.urls import url
from . import views
from .views import ResumeDetail
from rest_framework import routers
from django.urls import include, path

router = routers.SimpleRouter()
router.register(r'resume', views.CreateResumeViewSet)

urlpatterns = [
    #url(r'^get_detail/(?P<share_url>[-\w]+)/$', views.get_detail, name='get_detail'),
    url(r'^get_detail/(?P<share_url>[-\w]+)/$', ResumeDetail.as_view()),
]


urlpatterns += router.urls