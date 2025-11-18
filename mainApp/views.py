from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache
from .models import Profile, Game
from .serializers import GameSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
import datetime

# Create your views here.

@api_view(['GET'])
def fetch_all_games(request):
    games = Game.objects.all()
    serializer = GameSerializer(games, many=True)
    return Response(serializer.data)

def index(request):
    games = Game.objects.all()
    context={
        'games': games
    }
    return render(request, 'index.html',context)


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
    if user != request.user:
        messages.error(request, 'Unauthorized access, this incident has been logged.')
        logout(request)
        messages.error(request, 'You have been logged out due to this action.')
        return redirect('login')
    profile,_ = Profile.objects.get_or_create(user=user)
    context={
        'user': user,
        'profile': profile
    }
    if request.user.is_superuser:
        metrics = {
            'users': User.objects.count(),
            'games': Game.objects.count(),
            'login_users': get_logged_in_users().count()
        }
        context['superuser_metrics'] = metrics
    return render(request, 'user-profile.html',context)

def logout_logic(request):
    if request.user.is_authenticated:
        logout(request)
        messages.success(request, 'Logged out successfully')
    return redirect('login')

def edit_profile(request):
    if not request.user.is_authenticated:
        messages.error(request, 'You must be logged in to edit your profile')
        return redirect('login')
    if request.method == 'POST' and request.user.is_authenticated:
        try:
            user = User.objects.get(username=request.user)
            profile= Profile.objects.get(user=user)     
            profile.name=request.POST["name"]
            profile.save()
            messages.success(request, ' Profile updated successfully')
        except Exception as e:
            print(e)
            messages.error(request, 'Something went wrong')
    return redirect('user-profile', request.user)

def add_game(request):
    if not request.user.is_authenticated:
        messages.error(request, 'You must be logged in to add a game')
        return redirect('login')
    if request.method == 'POST' and request.user.is_authenticated:
        messages.info(request, f'Adding game...{request.POST.get("title")} ')
        try:
            game = Game()
            game.author=request.user
            game.title=request.POST["title"]
            game.description=request.POST["description"]
            game.link=request.POST["link"]
            game.save()
            messages.success(request, 'Game added successfully')
        except Exception as e:
            print(e)
            messages.error(request, 'Something went wrong')
    return redirect('index')

def get_logged_in_users():
    sessions = Session.objects.filter(expire_date__gte=datetime.datetime.now())
    user_ids = []

    for session in sessions:
        data = session.get_decoded()
        uid = data.get('_auth_user_id')
        if uid:
            user_ids.append(uid)

    return User.objects.filter(id__in=set(user_ids))