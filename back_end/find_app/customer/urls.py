from django.urls import path
from . import views

urlpatterns = [
        path('customer/register/',views.Customer_registerApi.as_view() ,name='customer_register' ),
        path('customer/login/',views.CustomerLogin.as_view(), name='customer_login'),
        path('customer/update_profile/',views.UpdateProfile.as_view(),name='UpdateProfile')
    ] 