from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^user/register/', views.register, name='register'),
    url(r'^user/employee-dashboard/', views.employee_dashboard, name='employee-dashboard'),
    url(r'^user/dashboard/', views.dashboard, name='dashboard'),
    url(r'^user/employer-dashboard/', views.employer_dashboard, name='employer-dashboard'),
    url(r'^$', views.index, name='index'),
]