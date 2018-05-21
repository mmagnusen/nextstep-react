from __future__ import unicode_literals
from django.shortcuts import render
from django.shortcuts import redirect
from django.utils import timezone
from .models import Company
from django.shortcuts import get_object_or_404
from .serializers import CompanySerializer
from django.http import JsonResponse


# Create your views here.
def all_list(request):
    companies = Company.objects.all()
    serializer = CompanySerializer(companies, many=True)
    return JsonResponse(serializer.data, safe=False)

def user_view(request):
    companies = Company.objects.filter(owner = request.user)
    serializer = CompanySerializer(companies, many=True)
    return JsonResponse(serializer.data, safe=False)