from django.db import models

# Create your models here.
class Company_register(models.Model):
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    
    
class JobOpening(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    requirement = models.TextField()
    education_qualification = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title