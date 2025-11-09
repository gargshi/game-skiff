# myApp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
	path('login', views.goToLogin, name='login'),
    path('register', views.goToRegister, name='register'),
	path('bklogin', views.login, name='bklogin'),
    path('bkregister', views.register, name='bkregister'),
]
