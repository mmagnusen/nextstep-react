from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Job
        fields = (
            'id',
            'author', 
            'location', 
            'title', 
            'slug', 
            'hours', 
            'area', 
            'salary', 
            'description', 
            'created_date',
            'experience',
            'posted_by_company',
            )
        
