from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache
from .models import Profile

# Create your views here.


def index(request):
    return render(request, 'index.html')


def goToLogin(request):
    if request.user.is_authenticated:
        return redirect('user-profile', request.user)
    context = {
        'task': 'login',
        'message':''
    }
    return render(request, 'register-login.html', context)

def login_logic(request):
    if request.method == 'POST':
        username=request.POST['username']
        password=request.POST['password']

        # Input validation
        if not username or not password:
            messages.error(request, 'Please enter username and password')
            return redirect('login')
        
        # Authentication
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, 'Logged in successfully')
            return redirect('user-profile', user)
        else:
            messages.error(request, 'Invalid username or password')
            return redirect('login')
    return redirect('login')    

def goToRegister(request):
    if request.user.is_authenticated:
        return redirect('user-profile', request.user)
    context = {
        'task': 'register'
    }
    return render(request, 'register-login.html', context)

def register(request):
    username=request.POST['username']
    password=request.POST['password']
    repeatPassword=request.POST['repeat_password']

    # Input validation
    if not username or not password:
        messages.error(request, 'Please enter username and password')
        return redirect('register')
    if password != repeatPassword:
        messages.error(request, 'Passwords do not match')
        return redirect('register')
    
    user=User.objects.create_user(username=username, password=password)
    user.save()

    messages.success(request, 'Registered successfully')
    messages.success(request, 'Enter your username and password to login')
    return redirect('login')

@never_cache
@login_required(login_url='login')
def userProfile(request, user):
    user = User.objects.get(username=user)
    profile = Profile.objects.get_or_create(user=user)
    context={
        'user': user,
        'profile': profile
    }
    return render(request, 'user-profile.html',context)

def logout_logic(request):
    if request.user.is_authenticated:
        logout(request)
        messages.success(request, 'Logged out successfully')
    return redirect('login')