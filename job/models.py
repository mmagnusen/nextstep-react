from django.conf import settings
from django.db import models
from django.utils import timezone 
from company.models import Company

# Create your models here.
class Job(models.Model):
    FULLTIME = 'FT'
    PARTTIME = 'PT'
    HOURS_CHOICES = (
        (FULLTIME, 'Fulltime'),
        (PARTTIME, 'Partime'),
    )

    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    location = models.CharField(max_length=200, default="unknown")
    title = models.CharField(max_length=200)
    slug = models.CharField(max_length=200)
    hours = models.CharField(max_length=200, default="unknown")
    area = models.CharField(max_length=200, default="unknown")
    salary = models.CharField(max_length=200, default="unknown")
    description = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    experience = models.CharField(max_length=200, default="beginner")
    posted_by_company = models.ForeignKey('company.Company', default=1, on_delete=models.CASCADE, related_name="comp", related_query_name="comps")
    

    def publish(self):
        self.save()

    def __str__(self):
        return self.title