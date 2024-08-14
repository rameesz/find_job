from django.shortcuts import get_object_or_404, render

from customer.models import Customer_register 
from.models import Company_register, JobApplications,JobOpening
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
                user = Company_register.objects.filter(email=email, password=password)

                if user.exists():
                    request.session['company_id'] = user[0].id
                    request.session['company_email'] = user[0].email
                    if not request.session.session_key:
                        request.session.create()  # Create the session if it doesn't exist
                        session_id = request.session.session_key  # Get the session ID
                        print(session_id)
                        print(request.session['company_email'])

                    return Response({'message': 'User logged in successfully','session_id':session_id,'company_id':user[0].id}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            except Company_register.DoesNotExist:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class CompanyLogout(APIView):
    def post(self, request):
        print(request)
        session_key = request.data.get('sessionKey')

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

class JobOpeningCompanyView(APIView):
    def get(self, request):
        company_id = request.query_params.get('company_id')
        if company_id:
            job_openings = JobOpening.objects.filter(company=company_id)
       
        serializer = Job_serializer(job_openings, many=True)
        return Response(serializer.data)
# class Jobopen(APIView):
#     def post(self,request):
#         serializer = Job_serializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()  
#             return Response({'result':'Job added successfully'})
#         return Response ({'result':'Job adding failed'})
#     def get(self, request):
#         # Retrieve all JobOpening objects from the database
#         job_openings = JobOpening.objects.all()
#         # Serialize the queryset of JobOpening objects
#         serializer = Job_serializer(job_openings, many=True)
#         # Return the serialized data as a response
#         return Response(serializer.data)
#     from rest_framework.response import Response


class Jobopen(APIView):
    def post(self, request):
        serializer = Job_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'result': 'Job added successfully'})
        return Response({'result': 'Job adding failed'})

    def get(self, request):
        # Retrieve all JobOpening objects from the database
        job_openings = JobOpening.objects.all()
        # Serialize the queryset of JobOpening objects
        serializer = Job_serializer(job_openings, many=True)
        # Return the serialized data as a response
        return Response(serializer.data)

    def delete(self, request):
        print("reached here..")
        job_id = request.query_params.get('id', None)
        if job_id:
            try:
                job_instance = JobOpening.objects.get(pk=job_id)
                job_instance.delete()
                return Response({'result': f'Job with ID {job_id} deleted successfully'})
            except JobOpening.DoesNotExist:
                return Response({'result': 'Job does not exist'}, status=404)
        else:
            return Response({'result': 'Job ID not provided'}, status=400)

    def patch(self, request):
        # Assuming request.data contains the data to update and a primary key for the object
        job_id = request.query_params.get('id', None)
        if job_id:
            try:
                job_instance = JobOpening.objects.get(pk=job_id)
                serializer = Job_serializer(job_instance, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'result': 'Job updated successfully'})
                else:
                    return Response({'result': 'Invalid data for update'}, status=400)
            except JobOpening.DoesNotExist:
                return Response({'result': 'Job does not exist'}, status=404)
        else:
            return Response({'result': 'Job ID not provided'}, status=400)
        
        
class jobapplicationApi(APIView):
    def post(self, request):
        print(request.data)
        job_id = request.data.get('job_id')
        customer_id =int(request.data.get('customer_id'))
        company_id = request.data.get('company_id')
        

        if not job_id or not customer_id or not company_id:
            return Response({"error": "Missing job_id, customer_id, or company_id"}, status=status.HTTP_400_BAD_REQUEST)

        job = get_object_or_404(JobOpening, id=job_id)
        customer = get_object_or_404(Customer_register, id=customer_id)
        company = get_object_or_404(Company_register, id=company_id)

        existing_application = JobApplications.objects.filter(job_id=job,  customer_id=customer).first()
        if existing_application:
            return Response({"error": "You have already applied for this job"},status=200)

        application = JobApplications.objects.create(job_id=job, customer_id=customer, company_id=company)
        return Response({"message": "Application submitted successfully"}, status=status.HTTP_201_CREATED)
    
    
class AppliedCustomersView(APIView):
    def get(self, request, job_id):
        job = get_object_or_404(JobOpening, id=job_id)
        applications = JobApplications.objects.filter(job_id=job).select_related('customer_id')
        data = [{
            'name': app.customer_id.fname,
            'email': app.customer_id.email,
            'phone': app.customer_id.phone,
            'qualification': app.customer_id.qualification,
            'resume_url': request.build_absolute_uri(app.customer_id.resume.url) if app.customer_id.resume else None,
        } for app in applications]
        return Response(data, status=status.HTTP_200_OK)