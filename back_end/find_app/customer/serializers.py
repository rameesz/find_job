from rest_framework import serializers
from .models import Customer_register

class Customer_serializer(serializers.ModelSerializer):
    resume_url = serializers.SerializerMethodField()
    class Meta:
        model = Customer_register
        fields = ['id','email','password','fname','lname','qualification','resume','experience','phone','resume_url']
    
    def get_resume_url(self, obj):
        request = self.context.get('request')
        if obj.resume:
            return request.build_absolute_uri(obj.resume.url)
        return None
        
