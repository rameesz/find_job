from django.urls import path
from . import views

urlpatterns = [
        path('api/',views.company_register.as_view() ,name='company_register' ),
        path('company/login/',views.CompanyLoginView.as_view(), name='company-login'),
        path('company/open_job/',views.Jobopen.as_view(), name= 'job_open'),

    ]
    