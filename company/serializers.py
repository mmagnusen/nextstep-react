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
            'owner')

    # def create(request):
    #    instance = Company.objects.create(**validated_data)
    #    instance.save()
    #    return  instance

