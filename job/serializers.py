from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('title', 'slug', 'hours', 'area', 'posted_by_company', 'salary', 'description')
        read_only_fields = (['posted_by_company'])
