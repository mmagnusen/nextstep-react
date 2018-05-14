from __future__ import unicode_literals
from django.shortcuts import render
from django.shortcuts import redirect
from django.utils import timezone
from django.shortcuts import get_object_or_404
from .serializers import CustomUserSerializer
from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from rest_framework import generics
from . import serializers

# Create your views here.
@csrf_exempt
def api_login(request):
    my_response = {'name': "marilyn"}
    content = JSON.parse(request.body)
    return JsonResponse(content, safe=False)

@csrf_exempt
def api_users(request):
    users = CustomUser.objects.all()
    serializer = CustomUserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)