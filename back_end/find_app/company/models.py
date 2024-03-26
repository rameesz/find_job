from django.db import models

# Create your models here.
class Company_register(models.Model):
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)