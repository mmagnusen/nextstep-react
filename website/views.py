from __future__ import unicode_literals

from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, User
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from django import forms
from .forms import UserRegistrationForm
from django.utils import timezone
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import views as auth_views
from django.shortcuts import redirect
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def index(request):
    return render(request, 'website/index.html')

def dashboard(request):
    if request.user.groups.filter(name='employee').exists():
        return render(request, 'website/employee_dashboard.html')
    else:
        return render(request, 'website/employer_dashboard.html')


def employee_dashboard(request):
#    if not request.user.groups.filter(name='employee').exists():
#        raise Exception("You don't have access to this page")
    return render(request, 'website/employee_dashboard.html')

def employer_dashboard(request):
#    if not request.user.groups.filter(name='employer').exists():
#        raise Exception("You don't have access to this page")
    return render(request, 'website/employer_dashboard.html')


def register(request):
    form = UserRegistrationForm(request.POST or None)
    if request.method == 'POST':

        if form.is_valid():
            user_obj = form.cleaned_data
            password = user_obj.pop('password')
            user_type = user_obj.pop('user_type')
            user = get_user_model()(
                is_active=True,
                is_staff=False,
                **user_obj
            )
            user.set_password(password)
            user.save()


            if user_type == 'employee':
                user.groups.add(Group.objects.get(name='employee'))
            else:
                user.groups.add(Group.objects.get(name='employer'))

            auth_user = authenticate(email=user_obj['email'], password=password)
            if auth_user:
                login(request, auth_user)
                return HttpResponseRedirect(reverse('%s-dashboard' % user_type))

    return render(request, 'website/register.html', {'form' : form})
