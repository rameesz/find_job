from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .models import Customer_register
from .serializers import Customer_serializer
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
class Customer_registerApi(APIView):
    def post(self,request):
        serializer = Customer_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response({'result':'register success'})
        
    
        return Response ({'result':'register failed'})
   
    
class CustomerLogin(APIView):
   def post(self, request):
        serializer = Customer_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            try:
                user = Customer_register.objects.filter(email=email, password=password)

                if user.exists():
                    request.session['canidate_id'] = user[0].id
                    request.session['canidate_email'] = user[0].email
                    if not request.session.session_key:
                        request.session.create()  # Create the session if it doesn't exist
                        session_id = request.session.session_key  # Get the session ID
                        print(session_id)
                        print(request.session['canidate_email'])
                    return Response({'message': 'User logged in successfully','session_id':session_id}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            except Customer_register.DoesNotExist:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class UpdateProfile(APIView):
    def post(self,request):
        serializer = Customer_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response({'result':'job applied successfully'})
        
    
        return Response ({'result':'job application failed'})
    def get(self, request):
        # Retrieve all JobOpening objects from the database
        profile_update = Customer_register.objects.all()
        # Serialize the queryset of JobOpening objects
        serializer = Customer_serializer(profile_update, many=True)
        # Return the serialized data as a response
        return Response(serializer.data)