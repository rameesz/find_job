from rest_framework import serializers
from .models import Company_register

class Company_serializer(serializers.ModelSerializer):
    class Meta:
        model = Company_register
        fields = '__all__'  # You can specify fields you want to include here
