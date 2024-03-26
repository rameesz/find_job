from django.shortcuts import render 
from.models import Company_register
from rest_framework.response import Response
from rest_framework.views import APIView 
from .serializers import Company_serializer
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
            user = authenticate(request, username=email, password=password)
            if user:
                # User authenticated, perform further actions if needed
                return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)