from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib import messages
# Create your views here.


def index(request):
    return render(request, 'index.html')


def goToLogin(request):
    context = {
        'task': 'login',
        'message':''
    }
    return render(request, 'register-login.html', context)

def login(request):
    username=request.POST['username']
    password=request.POST['password']
    # messages.success(request, 'Logged in successfully')
    messages.add_message(request, messages.SUCCESS, 'Logged in successfully')
    # messages.add_message(request, messages.WARNING, 'Warning ')
    # messages.add_message(request, messages.INFO, 'Info')
    # messages.add_message(request, messages.ERROR, 'Error')
    # messages.success(request, f'{request.POST}')
    return redirect('login')    

def goToRegister(request):
    context = {
        'task': 'register'
    }
    return render(request, 'register-login.html', context)

def register(request):
    username=request.POST['username']
    password=request.POST['password']
    messages.success(request, 'Registered successfully')
    return redirect('register')