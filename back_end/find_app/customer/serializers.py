from rest_framework import serializers
from .models import Customer_register

class Customer_serializer(serializers.ModelSerializer):
    class Meta:
        model = Customer_register
        fields = '__all__'  # You can specify fields you want to include here
        
