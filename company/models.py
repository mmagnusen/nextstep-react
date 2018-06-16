from django.conf import settings
from django.db import models
from django.utils import timezone
from django.core.validators import FileExtensionValidator

# Create your models here.

class Company(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, default='Default company name')
    created_date = models.DateTimeField(default=timezone.now)
    description = models.TextField(default='Default company description')
    small_logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)
    large_logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)
    #jobs = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="comp", related_query_name="comps")

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.name
