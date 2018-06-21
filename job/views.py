from __future__ import unicode_literals
from django.shortcuts import render
from django.shortcuts import redirect
from django.utils import timezone
from .models import Job
from django.shortcuts import get_object_or_404
from .serializers import JobSerializer
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

# Create your views here.

def job_list(request):
    jobs = Job.objects.all()
    return render(request, 'job/job_list.html', {'jobs': jobs})

def api_job_list(request):
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return JsonResponse(serializer.data, safe=False)

def job_detail(request, pk):
   job = get_object_or_404(Job, pk=pk)
   return render(request, 'job_detail.html', {'job': job})

def api_job_detail(request, pk):
    job = get_object_or_404(Job, pk=pk)
    serializer = JobSerializer(job)
    return JsonResponse(serializer.data)

class CreateJobViewSet(viewsets.ModelViewSet):
    model = Job
    serializer_class = JobSerializer
    queryset = Job.objects.none()

    #filters by current user
    def get_queryset(self):
        user= self.request.user
        print(user)
        return self.model.objects.filter(author=user)
