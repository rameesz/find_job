from django.shortcuts import render 
from.models import Company_register,JobOpening
from rest_framework.response import Response
from rest_framework.views import APIView 
from .serializers import Company_serializer, Job_serializer
from django.contrib.auth import authenticate
from rest_framework import status



# Create your views here.
class company_register(APIView):
    def post(self,request):
        serializer = Company_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response({'result':'register success'})
        
    
        return Response ({'result':'register failed'})
    
    
class CompanyLoginView(APIView):
   def post(self, request):
        serializer = Company_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            try:
                user = Company_register.objects.get(email=email, password=password)
                if user:
                    return Response({'message': 'User logged in successfully'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            except Company_register.DoesNotExist:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        



class Jobopen(APIView):
    def post(self,request):
        serializer = Job_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response({'result':'Job added successfully'})
        return Response ({'result':'Job adding failed'})

class Jobview(APIView):
    def get(self, request):
        # Retrieve all JobOpening objects from the database
        job_openings = JobOpening.objects.all()
        # Serialize the queryset of JobOpening objects
        serializer = Job_serializer(job_openings, many=True)
        # Return the serialized data as a response
        return Response(serializer.data)
