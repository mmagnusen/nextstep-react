from __future__ import unicode_literals
from django.shortcuts import render
from django.shortcuts import redirect
from django.utils import timezone
from .models import Company
from job.models import Job
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
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated



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

def company_list(request):
    companies = Company.objects.all()
    jobs = Job.objects.all()
    return render(request, 'company/company_list.html', { 'companies': companies, 'jobs': jobs})

class CreateCompanyViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,) 
    #authentication_classes = (TokenAuthentication,) 
    model = Company
    serializer_class = CompanySerializer
    queryset = Company.objects.none()

    #filters by current user
    def get_queryset(self):
        user= self.request.user
        print(user)
        return self.model.objects.filter(owner=user)

    #def get_queryset(self):
    #    return self.model.objects.all()