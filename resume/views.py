from __future__ import unicode_literals
from django.shortcuts import render
from django.shortcuts import redirect
from django.utils import timezone
from .models import Resume
from django.shortcuts import get_object_or_404
from .serializers import ResumeSerializer
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.views import APIView

# Create your views here.

# class ResumeDetail(APIView):
#     permission_classes = (permissions.AllowAny,)

#     def get(self, request, share_url, format=None):
#         print(request.user)
#         resume = get_object_or_404(Resume, share_url=share_url)
#         print(resume.owner)
#         serializer = ResumeSerializer(resume)
#         return JsonResponse(serializer.data)

class ResumeDetail(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, share_url, format=None):
        viewer = request.user
        resume = get_object_or_404(Resume, share_url=share_url)

        if viewer == resume.owner:
            serializer = ResumeSerializer(resume)
            return JsonResponse(serializer.data)
        else: 
            return HttpResponse("You can't leave a review for this book.")

    
# def get_detail(request, share_url):
#     viewer = request.user
#     resume = get_object_or_404(Resume, share_url=share_url)
#     if viewer == resume.owner:
#         serializer = ResumeSerializer(resume)
#         return JsonResponse(serializer.data)
#     else: 
#         return HttpResponse("You can't leave a review for this book.")

class CreateResumeViewSet(viewsets.ModelViewSet):
    model = Resume
    serializer_class = ResumeSerializer
    queryset = Resume.objects.none()

    #filters by current user
    def get_queryset(self):
        user= self.request.user
        print(user)
        return self.model.objects.filter(owner=user)