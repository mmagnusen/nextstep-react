from rest_framework import serializers
from .models import Resume

class ResumeSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Resume
        fields = (
            'owner',
            'name', 
            'created_date', 
            'content',
            'share_url',
            'pk',
            )
        