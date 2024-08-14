from django.urls import path
from . import views

urlpatterns = [
        path('api/',views.company_register.as_view() ,name='company_register' ),
        path('company/login/',views.CompanyLoginView.as_view(), name='company-login'),
        path('company/openjob/',views.Jobopen.as_view(), name= 'job_open'),
        path('company/jobapplication/',views.jobapplicationApi.as_view(),name='jobapplication'),
        path('company/appliedcustomer/<int:job_id>/', views.AppliedCustomersView.as_view(), name='appliedCustomer'),
        path('company/logout/',views.CompanyLogout.as_view(), name='companyLogout'),
        path('singleCompany/open_job/',views.JobOpeningCompanyView.as_view(), name= 'JobOpeningCompanyView'),

    ]
    