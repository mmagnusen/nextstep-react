from __future__ import unicode_literals
from django.shortcuts import render
from django.shortcuts import redirect
from django.utils import timezone
from django.shortcuts import get_object_or_404
from .serializers import CustomUserSerializer
from django.http import JsonResponse
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken
from .models import CustomUser
from rest_framework import generics
from . import serializers
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

# Create your views here.
@csrf_exempt
def api_login(request):
    serializer = CustomUserLoginSerializer.validate()
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def api_users(request):
    users = CustomUser.objects.all()
    serializer = CustomUserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)


#react API
@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    permission_classes = (permissions.AllowAny,)
    
    serializer = UserSerializerWithToken(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    #gets list of all users at http://127.0.0.1:8000/authenticate/users/
    def get(self, request, format=None):
        users = CustomUser.objects.all()
        serializer = UserSerializerWithToken(users, many=True)
        return Response(serializer.data)
    
    #creates a new user at http://127.0.0.1:8000/authenticate/users/
    def post(self, request, format=None):
        print("random from views.py")
        print('post:', request.POST)
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetail(generics.RetrieveAPIView):
    permission_classes = (permissions.AllowAny,) 

    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        user = get_object_or_404(CustomUser, pk=pk)
        serializer = UserSerializerWithToken(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    


# class UpdateUserViewSet(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated,) 
   
#     model = CustomUser
#     serializer_class = UserSerializerWithToken
#     queryset = CustomUser.objects.none()

#     def get_queryset(self):
#         return self.model.objects.all()
    

# @csrf_exempt
# def update_user(request, pk):
#     user = get_object_or_404(CustomUser, pk=pk)
#     serializer = UserSerializerWithToken(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return JsonResponse(serializer.errors, status=400)
        