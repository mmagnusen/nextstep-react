from django.conf import settings
from django.db import models
from django.utils import timezone 
from datetime import date
from django.utils.crypto import get_random_string
import uuid

# Create your models here.

class Resume(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    created_date = models.DateTimeField(default=timezone.now)
    content = models.TextField()
    share_url = models.UUIDField(default=uuid.uuid4, editable=True, unique=True)
 

    def publish(self):
        self.save()

    def __str__(self):
        return self.name