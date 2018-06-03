from django.conf.urls import url
from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'company', views.CreateCompanyViewSet)

urlpatterns = [
    url(r'^api/(?P<pk>\d+)/$', views.specific_company, name='specific_company'),
    url(r'^company_list$', views.company_list, name='company_list'),
    url(r'^user_view$', views.user_view, name='user_view'),
    url(r'^$', views.all_list, name='all_list'),
]

urlpatterns += router.urls