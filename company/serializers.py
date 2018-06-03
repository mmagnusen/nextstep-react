from rest_framework import serializers
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    class Meta:
        model = Company
        fields = (
            'id',
            'name', 
            'description', 
            'owner',
            'small_logo',
            'large_logo')


