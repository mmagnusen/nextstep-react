"""nextstepapi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.contrib.auth import views as auth_views
from django.conf.urls import url
from django.conf import settings

urlpatterns = [
    url(r'^/user/register/', include('website.urls')),
    url(r'^login/', auth_views.login),
    url(r'^logout/', auth_views.logout),
    url('admin/', admin.site.urls),
    url(r'job/', include('job.urls')),
    url(r'', include('website.urls')),
]
