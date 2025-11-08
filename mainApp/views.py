from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def index(request):
    return render(request, 'index.html')


def login(request):
    context = {
        'task': 'login'
    }
    return render(request, 'register-login.html', context)


def register(request):
    context = {
        'task': 'register'
    }
    return render(request, 'register-login.html', context)
