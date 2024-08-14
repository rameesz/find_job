from django.urls import path
from . import views

urlpatterns = [
        path('customer/register/',views.Customer_registerApi.as_view() ,name='customer_register' ),
        path('customer/login/',views.CustomerLogin.as_view(), name='customer_login'),
        path('customer/logout/',views.CustomerLogout.as_view(), name='customerLogout'),
        path('customer/profile/<int:id>',views.Customer_profile.as_view(),name='customerprofile'),
    ] 