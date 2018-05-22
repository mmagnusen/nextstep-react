from __future__ import unicode_literals
from django.shortcuts import render
from django.shortcuts import redirect
from django.utils import timezone
from .models import Company
from django.shortcuts import get_object_or_404
from .serializers import CompanySerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import viewsets
from django.http import HttpResponse



# Create your views here.
def all_list(request):
    companies = Company.objects.all()
    serializer = CompanySerializer(companies, many=True)
    return JsonResponse(serializer.data, safe=False)

#def api_root todos get = get all, post = create single
def user_view(request):
    companies = Company.objects.filter(owner = request.user)
    serializer = CompanySerializer(companies, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def create_company(request, format=None):
    print(request)
    serializer = CompanySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(owner=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateCompanyViewSet(viewsets.ModelViewSet):
    model = Company
    serializer_class = CompanySerializer
    queryset = Company.objects.none()

    def get_queryset(self):
        return self.model.objects.all()