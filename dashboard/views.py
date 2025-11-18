from django.shortcuts import render

from mainApp.views import get_logged_in_users
from mainApp.models import Game
from django.contrib.auth.models import User
from django.contrib import messages

# Create your views here.

def index(request):
    user=request.user
    context = {}
    if user.is_authenticated and user.is_superuser:
        metrics = {
			'users': User.objects.count(),
			'games': Game.objects.count(),
			'login_users': get_logged_in_users().count()
		}
    context['superuser_metrics'] = metrics
    return render(request, 'dashboard/index.html', context)
