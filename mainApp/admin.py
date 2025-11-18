from django.contrib import admin

from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

# Register your models here.
from .models import Profile, Game, Genre, Rating

from django.contrib.sessions.models import Session
import datetime

def is_user_logged_in(user):
    sessions = Session.objects.filter(expire_date__gte=datetime.datetime.now())

    for session in sessions:
        data = session.get_decoded()
        if str(user.id) == data.get('_auth_user_id'):
            return True
    return False

class CustomUserAdmin(UserAdmin):

    list_display = UserAdmin.list_display + ("logged_in",)

    def logged_in(self, obj):
        return is_user_logged_in(obj)

    logged_in.boolean = True  # ✔ Adds a green tick / red cross icon
    logged_in.short_description = "Logged In"

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

admin.site.register(Profile)
admin.site.register(Game)
admin.site.register(Genre)
admin.site.register(Rating)

