import json
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
    
    def get(self, request):
        # Retrieve all JobOpening objects from the database
        customer = Customer_register.objects.all()
        # Serialize the queryset of JobOpening objects
        serializer = Customer_serializer(customer, many=True)
        # Return the serialized data as a response
        return Response(serializer.data)
        
    
    def patch(self, request):
        # Assuming request.data contains the data to update and a primary key for the object
        customer_id = request.query_params.get('id', None)
        if customer_id:
            try:
                customer_instance = Customer_register.objects.get(pk=customer_id)
                serializer = Customer_serializer(customer_instance, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'result': 'profile updated successfully'})
                else:
                    return Response({'result': 'Invalid data for update'}, status=400)
            except Customer_register.DoesNotExist:
                return Response({'result': 'candidate does not exist'}, status=404)
        else:
            return Response({'result': 'candidate ID not provided'}, status=400)
   
    
class CustomerLogin(APIView):
   def post(self, request):
        serializer = Customer_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            try:
                user = Customer_register.objects.filter(email=email, password=password)

                if user.exists():
                    request.session['customer_id'] = user[0].id
                    request.session['customer_email'] = user[0].email
                    if not request.session.session_key:
                        request.session.create()  # Create the session if it doesn't exist
                        session_id = request.session.session_key  # Get the session ID
                        print(session_id)
                        print(request.session['customer_email'])
                    return Response({'message': 'User logged in successfully','session_id':session_id,'customer_id':user[0].id}, status=status.HTTP_200_OK)
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
    
class Customer_profile(APIView):
    def get(self,request,id):

        user_profile=Customer_register.objects.get(pk=id)
        
        if user_profile:
            serializer = Customer_serializer(user_profile,context={'request':request})
            return Response(serializer.data)
        else:
            return Response({'result': 'candidate does not exist'},status=404)
    
    
class CustomerLogout(APIView):
     def post(self, request):
         
        data1 = request.data
        print(f"Outer parsed data****: {data1}")
       
        
        # The 'body' field contains the actual JSON string, parse it again
       
        session_key = data1.get('sessionKey')
        
        
        print(f"session_key: {session_key}")
        if not session_key:
            return Response({'error': 'Session key not provided'}, status=status.HTTP_400_BAD_REQUEST)

        # if session_key == request.session.session_key:
        #     # Remove specific session data
        #     request.session.pop('candidate_id', None)
        #     request.session.pop('candidate_email', None)

        request.session.flush()    
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
        # else:
        #     return Response({'error': 'Invalid session key'}, status=status.HTTP_400_BAD_REQUEST)