from django.db import models

# Create your models here.
class Customer_register(models.Model):
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    fname = models.CharField(max_length=100,null=True)
    lname = models.CharField(max_length=100,null=True)
    phone =models.CharField(max_length=100,null=True)
    qualification = models.CharField(max_length=100,null=True)
    experience = models.CharField(max_length=100,null=True)
    resume = models.ImageField( upload_to='./resume/',null=True)
    
    
