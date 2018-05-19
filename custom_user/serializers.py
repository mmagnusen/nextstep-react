from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import CustomUser
from django.contrib.auth.models import Group


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'password')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email',)


#this is for handling new sign-ups. we want to return their user email and token, which will be stored in browser
#for further authentication. We don't need the token every time we request a user's data, only when signing up
#hence seperate serializers 

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)
    #groups = GroupSerializer(many=True)


    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)

        password = validated_data.pop('password', None)
        user_type = validated_data.get('user_type')
   
        if user_type == 'employee':
            instance.groups.add(Group.objects.get(name='employee'))
            
        if password is not None:
            instance.set_password(password)
        instance.save()

    
        return instance
    
    class Meta:
        model = CustomUser
        fields = ('token', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'user_type': {'required': True}}


